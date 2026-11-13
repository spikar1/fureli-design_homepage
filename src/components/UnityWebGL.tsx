'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { UnityInstance } from '@/types/unity';

interface UnityWebGLProps {
  buildUrl: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  unityVersion?: '5' | 'new';
}

interface Resolution {
  width: number;
  height: number;
  label: string;
}

const RESOLUTIONS: Resolution[] = [
  { width: 1280, height: 720, label: '720p' },
  { width: 1920, height: 1080, label: '1080p' },
  { width: 2560, height: 1440, label: '1440p' },
  { width: 3840, height: 2160, label: '4K' },
];

const UnityWebGL: React.FC<UnityWebGLProps> = ({
  buildUrl,
  onLoad,
  onError,
  unityVersion = 'new',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const unityInstanceRef = useRef<UnityInstance | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState<Resolution>(RESOLUTIONS[0]);
  const [containerSize, setContainerSize] = useState({ width: '100%', height: '600px' });
  const [isFullWidth, setIsFullWidth] = useState(false);

  const isMountedRef = useRef(true);

  // Quit Unity without pulling its canvas out from under it. Unity's main loop
  // keeps running for a few frames after Quit() is called and looks the canvas up
  // by selector; if React has already removed it from the DOM, Unity throws
  // "Cannot read properties of null (reading 'onwheel')". So park the canvas in an
  // off-screen holder (non-zero size, still in the document) until Quit() resolves.
  const quitUnity = (instance: UnityInstance | null, nodes: Node[]) => {
    if (!instance || typeof instance.Quit !== 'function') {
      nodes.forEach((n) => n.parentNode?.removeChild(n));
      return;
    }
    const holder = document.createElement('div');
    holder.setAttribute('aria-hidden', 'true');
    holder.style.cssText =
      'position:fixed;left:-10000px;top:0;width:16px;height:16px;overflow:hidden;pointer-events:none;visibility:hidden;';
    nodes.forEach((n) => holder.appendChild(n));
    document.body.appendChild(holder);
    Promise.resolve()
      .then(() => instance.Quit())
      .catch(() => {})
      .finally(() => holder.remove());
  };

  // useLayoutEffect so the cleanup runs during the commit, before the browser can
  // schedule another Unity frame against a detached canvas.
  useLayoutEffect(() => {
    isMountedRef.current = true;
    const container = containerRef.current;
    return () => {
      isMountedRef.current = false;
      const nodes = container ? Array.from(container.childNodes) : [];
      quitUnity(unityInstanceRef.current, nodes);
      unityInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    console.log('Unity version:', unityVersion);
  }, [unityVersion]);

  

  const loadUnity = async () => {
    
    try {
      if (!isMountedRef.current || !containerRef.current) return;

      // Extract the build name from the buildUrl
      const buildName = buildUrl.split('/').pop() || '';

      // Remove any previous canvas or Unity instance
      containerRef.current.innerHTML = '';

      // Branch logic based on unityVersion
      if (unityVersion === '5') {
        // --- UNITY 5 LOADING LOGIC ---
        // Create a div for Unity 5 (UnityLoader will handle the canvas)
        const unityDiv = document.createElement('div');
        unityDiv.id = 'unityContainer';
        unityDiv.style.width = '100%';
        unityDiv.style.height = '100%';
        containerRef.current.appendChild(unityDiv);

        // Load UnityLoader.js dynamically
        const script = document.createElement('script');
        script.src = `${buildUrl}/UnityLoader.js`;
        script.onload = () => {
          if ((window as Window).UnityLoader) {
            unityInstanceRef.current = window.UnityLoader.instantiate(
              'unityContainer',
              `${buildUrl}/Build.json`,
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onProgress: (instance: any, progress: number) => {
                  console.log(`Loading progress: ${progress * 100}%`);
                },
                Module: {
                  onRuntimeInitialized: () => {
                    onLoad?.();
                  },
                },
              }
            );
          } else {
            onError?.(new Error('UnityLoader not found after script load.'));
          }
        };
        script.onerror = () => {
          onError?.(new Error('Failed to load UnityLoader.js'));
        };
        document.body.appendChild(script);
      } else {
        // --- NEW UNITY LOADING LOGIC ---
        // Create a canvas element for Unity
        const canvas = document.createElement('canvas');
        canvas.id = 'unity-canvas';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        containerRef.current.appendChild(canvas);

        // Load the Unity WebGL build
        const unityInstance = await window.createUnityInstance(
          canvas,
          {
            dataUrl: `${buildUrl}/Build/${buildName}.data`,
            frameworkUrl: `${buildUrl}/Build/${buildName}.framework.js`,
            codeUrl: `${buildUrl}/Build/${buildName}.wasm`,
            streamingAssetsUrl: `${buildUrl}/StreamingAssets`,
            companyName: 'Fureli Design',
            productName: 'Unity WebGL Project',
            productVersion: '1.0',
          },
          (progress: number) => {
            // Handle loading progress
            console.log(`Loading progress: ${progress * 100}%`);
          }
        );
        // The user may have navigated away while the build was loading.
        if (!isMountedRef.current) {
          quitUnity(unityInstance, canvas.isConnected ? [] : [canvas]);
          return;
        }
        unityInstanceRef.current = unityInstance;
        onLoad?.();
      }
    } catch (error) {
      console.error('Error loading Unity WebGL:', error);
      onError?.(error as Error);
    }
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleResolutionChange = (resolution: Resolution) => {
    setSelectedResolution(resolution);
    setContainerSize({
      width: `${resolution.width}px`,
      height: `${resolution.height}px`,
    });
  };

  const handleFitToScreen = () => {
    setIsFullWidth(!isFullWidth);
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.parentElement?.clientWidth || window.innerWidth;
    const aspectRatio = selectedResolution.width / selectedResolution.height;
    const newHeight = containerWidth / aspectRatio;

    setContainerSize({
      width: `${containerWidth}px`,
      height: `${newHeight}px`,
    });
  };

  const handleMatchPageWidth = () => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.parentElement?.clientWidth || window.innerWidth;
    const aspectRatio = selectedResolution.width / selectedResolution.height;
    const newHeight = containerWidth / aspectRatio;

    setContainerSize({
      width: `${containerWidth}px`,
      height: `${newHeight}px`,
    });
  };

  // Extract the build name from the buildUrl
  const buildName = buildUrl.split('/').pop() || '';

  return (
    <div className={`w-full transition-all duration-300 ${isFullWidth ? 'col-span-12' : 'col-span-6'}`}>
      <div className="flex flex-col gap-4">
        <motion.div
          ref={containerRef}
          style={{
            width: containerSize.width,
            height: containerSize.height,
          }}
          className="bg-black mx-auto rounded-2xl overflow-hidden drop-shadow-gray-950 drop-shadow-md"
          animate={{
            width: containerSize.width,
            height: containerSize.height,
          }}
          transition={{ duration: 0.2 }}
        />
        <div className="flex flex-wrap items-center gap-4 bg-gray-900/95 p-4 rounded-lg backdrop-blur-sm">
          <select
            value={selectedResolution.label}
            onChange={(e) => {
              const resolution = RESOLUTIONS.find(r => r.label === e.target.value);
              if (resolution) handleResolutionChange(resolution);
            }}
            className="px-3 py-2 bg-gray-800 text-white rounded-lg"
          >
            {RESOLUTIONS.map((res) => (
              <option key={res.label} value={res.label}>
                {res.label}
              </option>
            ))}
          </select>
          <button
            onClick={handleMatchPageWidth}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            Match Page Width
          </button>
          <button
            onClick={handleFitToScreen}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            {isFullWidth ? 'Normal Size' : 'Fit to Screen'}
          </button>
          <button
            onClick={handleFullscreen}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>
      {/* Loader script for new Unity only; Unity 5 loads via dynamic script */}
      {unityVersion !== '5' && (
        <Script
          src={`${buildUrl}/${buildName}.loader.js`}
          onLoad={loadUnity}
          onError={onError}
        />
      )}
      {/* For Unity 5, call loadUnity on mount via useEffect */}
      {unityVersion === '5' && (
        <Script
        src={`${buildUrl}/UnityLoader.js`}
        onLoad={loadUnity}
        onError={onError}
      />
      )}
    </div>
  );
};

export default UnityWebGL; 