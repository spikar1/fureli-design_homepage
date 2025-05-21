'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { UnityInstance } from '@/types/unity';

interface UnityWebGLProps {
  buildUrl: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
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
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const unityInstanceRef = useRef<UnityInstance | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState<Resolution>(RESOLUTIONS[0]);
  const [containerSize, setContainerSize] = useState({ width: '100%', height: '600px' });
  const [isFullWidth, setIsFullWidth] = useState(false);

  useEffect(() => {
    // Cleanup function to destroy Unity instance when component unmounts
    return () => {
      if (unityInstanceRef.current) {
        unityInstanceRef.current.Quit();
      }
    };
  }, []);

  const loadUnity = async () => {
    try {
      if (!containerRef.current) return;

      // Extract the build name from the buildUrl
      const buildName = buildUrl.split('/').pop() || '';

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

      unityInstanceRef.current = unityInstance;
      onLoad?.();
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
          className="bg-black mx-auto"
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
      <Script
        src={`${buildUrl}/${buildName}.loader.js`}
        onLoad={loadUnity}
        onError={onError}
      />
    </div>
  );
};

export default UnityWebGL; 