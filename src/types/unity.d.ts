export interface UnityInstance {
  Quit(): Promise<void>;
  SendMessage(objectName: string, methodName: string, parameter?: string | number | boolean): void;
  SetFullscreen(fullscreen: boolean): void;
}

export interface UnityConfig {
  dataUrl: string;
  frameworkUrl: string;
  codeUrl: string;
  streamingAssetsUrl: string;
  companyName: string;
  productName: string;
  productVersion: string;
}

declare global {
  interface Window {
    createUnityInstance(
      canvas: HTMLCanvasElement,
      config: UnityConfig,
      onProgress?: (progress: number) => void
    ): Promise<UnityInstance>;
  }
}

export {}; 