'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProjectImageProps {
  projectId: string;
  name: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export const ProjectImage: React.FC<ProjectImageProps> = ({
  projectId,
  name,
  alt,
  className = '',
  width,
  height,
}) => {
  const [imgSrc, setImgSrc] = useState(`/projects/${projectId}/${name}.png`);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(`/projects/${projectId}/${name}.jpg`);
      setHasError(true);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={handleError}
    />
  );
}; 