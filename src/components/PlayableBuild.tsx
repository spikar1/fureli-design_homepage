'use client';

import { useState } from 'react';
import UnityWebGL from './UnityWebGL';

interface PlayableBuildProps {
  buildUrl: string;
  unityVersion?: '5' | 'new';
}

/** Unity WebGL player with a loading and error overlay. */
export default function PlayableBuild({ buildUrl, unityVersion }: PlayableBuildProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-x-0 top-0 z-20 flex h-[600px] max-h-full items-center justify-center rounded-2xl bg-ink/80">
          <div className="text-center" role="status">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-accent border-t-transparent" />
            <p className="text-sm text-muted">Loading game…</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-x-0 top-0 z-20 flex h-[600px] max-h-full items-center justify-center rounded-2xl bg-ink/90">
          <div className="p-4 text-center" role="alert">
            <p className="mb-4 text-text">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-ink hover:bg-accent-hover"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      <UnityWebGL
        buildUrl={buildUrl}
        unityVersion={unityVersion}
        onLoad={() => setIsLoading(false)}
        onError={(err) => {
          setIsLoading(false);
          setError('The game failed to load. Please try again.');
          console.error('Unity WebGL Error:', err);
        }}
      />
    </div>
  );
}
