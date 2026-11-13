'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Project } from '@/data/projects';
import FeaturedProjectCard from './FeaturedProjectCard';

interface FeaturedSliderProps {
  projects: Project[];
}

const AUTOPLAY_MS = 7000;
const SWIPE_PX = 40;
/** Slots rendered around the focused card: -2 and +2 are hidden, ready to slide in. */
const SLOTS = [-2, -1, 0, 1, 2];

const mod = (n: number, m: number) => ((n % m) + m) % m;

/**
 * Steam-style carousel: the focused card in the middle, its neighbours scaled
 * down and dimmed at the sides. `position` is an unbounded counter and each card
 * is keyed by its absolute slot, so moving one step slides every card one slot
 * without any card jumping across the stage.
 */
export default function FeaturedSlider({ projects }: FeaturedSliderProps) {
  const n = projects.length;
  const [position, setPosition] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const swiped = useRef(false);

  const active = mod(position, n);
  const step = useCallback((delta: number) => setPosition((p) => p + delta), []);

  /** Go to a project by index, taking the shorter way round. */
  const goTo = (index: number) => {
    let delta = mod(index - active, n);
    if (delta > n / 2) delta -= n;
    step(delta);
  };

  // Autoplay only for visitors who haven't asked for reduced motion.
  useEffect(() => {
    setAutoplay(window.matchMedia('(prefers-reduced-motion: no-preference)').matches);
  }, []);

  useEffect(() => {
    if (!autoplay || paused || n < 2) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') step(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [autoplay, paused, n, step, position]);

  if (n === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') step(-1);
        if (e.key === 'ArrowRight') step(1);
      }}
    >
      {/* Stage: every slot shares one grid cell, so the stage is as tall as the tallest card. */}
      <div
        className="grid touch-pan-y select-none"
        onPointerDown={(e) => {
          pointerStart.current = e.clientX;
          swiped.current = false;
        }}
        onPointerUp={(e) => {
          if (pointerStart.current === null) return;
          const dx = e.clientX - pointerStart.current;
          pointerStart.current = null;
          if (Math.abs(dx) > SWIPE_PX) {
            swiped.current = true;
            step(dx < 0 ? 1 : -1);
          }
        }}
        onClickCapture={(e) => {
          // A swipe that ends on a card should not also open it.
          if (swiped.current) {
            e.preventDefault();
            e.stopPropagation();
            swiped.current = false;
          }
        }}
      >
        {SLOTS.map((offset) => {
          const slot = position + offset;
          const project = projects[mod(slot, n)];
          const isActive = offset === 0;
          const isSide = Math.abs(offset) === 1;
          const hidden = !isActive && !isSide;

          return (
            <div
              key={slot}
              aria-roledescription="slide"
              aria-label={`${mod(slot, n) + 1} of ${n}: ${project.title}`}
              aria-hidden={!isActive}
              className="relative mx-auto w-[min(86vw,540px)] transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none"
              style={{
                gridArea: '1 / 1',
                transform: `translateX(${offset * 96}%) scale(${isActive ? 1 : 0.82})`,
                opacity: isActive ? 1 : isSide ? 0.45 : 0,
                zIndex: isActive ? 10 : isSide ? 5 : 0,
                pointerEvents: hidden ? 'none' : undefined,
              }}
            >
              <div inert={!isActive} className="h-full">
                <FeaturedProjectCard project={project} priority={offset === 0 && position === 0} />
              </div>
              {isSide && (
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => step(offset)}
                  aria-label={`Show ${project.title}`}
                  className="absolute inset-0 z-10 cursor-pointer rounded-2xl"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous project"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-text transition-colors hover:border-accent hover:text-accent"
        >
          <span aria-hidden="true">←</span>
        </button>
        <div className="flex items-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${p.title}`}
              aria-current={i === active}
              className={`h-2.5 rounded-full transition-all ${
                i === active ? 'w-8 bg-accent' : 'w-2.5 bg-line-strong hover:bg-muted'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next project"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-text transition-colors hover:border-accent hover:text-accent"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
