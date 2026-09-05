import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
} from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { IMAGES } from '../data/images';
import { useIsMobile } from '../hooks/useIsMobile';
import { useReducedMotion } from '../hooks/useReducedMotion';

const COUNT = IMAGES.length;
const LOCK_MS = 700;

// Per-word vw coefficient so every ghost word fills a similar visual width
// regardless of how many letters it has (Anton is a condensed display face,
// so a flat font-size makes long words overflow and short words look tiny).
// Two sets: mobile (word centered full-bleed) and desktop (word confined to
// the left column, photo lives in the right column).
const WORD_VW_MOBILE: Record<string, number> = {
  CREATIVITY: 15.5,
  STRATEGY: 17,
  COMMUNICATION: 10.5,
  ADAPTABILITY: 13,
  LEADERSHIP: 14.3,
};
const WORD_VW_DESKTOP: Record<string, number> = {
  CREATIVITY: 6.7,
  STRATEGY: 7.3,
  COMMUNICATION: 4.5,
  ADAPTABILITY: 5.6,
  LEADERSHIP: 6.1,
};
const wordFontSize = (word: string, isMobile: boolean) => {
  const map = isMobile ? WORD_VW_MOBILE : WORD_VW_DESKTOP;
  const vw = map[word] ?? (isMobile ? 14 : 6);
  return isMobile ? `clamp(64px, ${vw}vw, 260px)` : `clamp(52px, ${vw}vw, 190px)`;
};

type Role = 'center' | 'left' | 'right' | 'back' | 'farBack' | 'hidden';

interface RoleStyle {
  x: number;
  y: number;
  z: number;
  rotateY: number;
  scale: number;
  opacity: number;
  blur: number;
  zIndex: number;
}

const DESKTOP_ROLES: Record<Exclude<Role, 'hidden'>, RoleStyle> = {
  center: { x: 0, y: 0, z: 0, rotateY: 0, scale: 1.9, opacity: 1, blur: 0, zIndex: 30 },
  left: { x: -260, y: 30, z: -180, rotateY: 18, scale: 1, opacity: 0.5, blur: 1, zIndex: 20 },
  right: { x: 260, y: 30, z: -180, rotateY: -18, scale: 1, opacity: 0.5, blur: 1, zIndex: 20 },
  back: { x: -100, y: 55, z: -350, rotateY: 10, scale: 0.75, opacity: 0.22, blur: 4, zIndex: 10 },
  farBack: { x: 100, y: 70, z: -500, rotateY: -8, scale: 0.58, opacity: 0.1, blur: 7, zIndex: 5 },
};

const MOBILE_ROLES: Record<Exclude<Role, 'hidden'>, RoleStyle> = {
  center: { x: 0, y: 0, z: 0, rotateY: 0, scale: 1.4, opacity: 1, blur: 0, zIndex: 30 },
  left: { x: -120, y: 20, z: -140, rotateY: 14, scale: 0.65, opacity: 0.45, blur: 1.5, zIndex: 20 },
  right: { x: 120, y: 20, z: -140, rotateY: -14, scale: 0.65, opacity: 0.45, blur: 1.5, zIndex: 20 },
  back: { x: 0, y: 30, z: -260, rotateY: 0, scale: 0.48, opacity: 0, blur: 4, zIndex: 10 },
  farBack: { x: 0, y: 30, z: -300, rotateY: 0, scale: 0.42, opacity: 0, blur: 5, zIndex: 5 },
};

function getRole(index: number, activeIndex: number): Role {
  if (index === activeIndex) return 'center';
  if (index === (activeIndex + COUNT - 1) % COUNT) return 'left';
  if (index === (activeIndex + 1) % COUNT) return 'right';
  if (index === (activeIndex + 2) % COUNT) return 'back';
  if (index === (activeIndex + 3) % COUNT) return 'farBack';
  return 'hidden';
}

export default function IdentityCarousel({ standalone = true }: { standalone?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [flipDirection, setFlipDirection] = useState(1);
  const [enterKey, setEnterKey] = useState(0);

  const isMobile = useIsMobile(768);
  const reducedMotion = useReducedMotion();

  const lockRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevClearRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  const active = IMAGES[activeIndex];

  // ---------- Preload all images on mount ----------
  useEffect(() => {
    IMAGES.forEach((img) => {
      const preload = new Image();
      preload.src = img.src;
    });
  }, []);

  // ---------- Entry animation flag ----------
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // ---------- Navigation ----------
  const goTo = useCallback(
    (newIndex: number) => {
      if (isAnimating) return;
      const normalized = ((newIndex % COUNT) + COUNT) % COUNT;
      const forward = ((newIndex - activeIndex + COUNT) % COUNT) === 1;
      setFlipDirection(forward ? 1 : -1);
      setEnterKey((k) => k + 1);
      setPrevIndex(activeIndex);
      setActiveIndex(normalized);
      setIsAnimating(true);

      if (lockRef.current) clearTimeout(lockRef.current);
      lockRef.current = setTimeout(() => setIsAnimating(false), LOCK_MS);

      if (prevClearRef.current) clearTimeout(prevClearRef.current);
      prevClearRef.current = setTimeout(() => setPrevIndex(null), 380);
    },
    [activeIndex, isAnimating]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const previous = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(
    () => () => {
      if (lockRef.current) clearTimeout(lockRef.current);
      if (prevClearRef.current) clearTimeout(prevClearRef.current);
    },
    []
  );

  // ---------- Keyboard navigation ----------
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') previous();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [next, previous]);

  // ---------- Touch swipe ----------
  const onTouchStart = (e: ReactTouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: ReactTouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const THRESHOLD = 45;
    if (delta > THRESHOLD) previous();
    else if (delta < -THRESHOLD) next();
    touchStartX.current = null;
  };

  // ---------- Mouse parallax (desktop only) ----------
  const onMouseMove = (e: ReactMouseEvent) => {
    if (isMobile || reducedMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: nx, y: ny });
  };
  const onMouseLeave = () => setParallax({ x: 0, y: 0 });

  const roleMap = isMobile ? MOBILE_ROLES : DESKTOP_ROLES;

  const photoTransform = (role: Role, extraParallax = 1): CSSProperties => {
    if (role === 'hidden') {
      return { opacity: 0, pointerEvents: 'none', transform: 'translate(-50%, -50%) scale(0.3)' };
    }
    const r = roleMap[role];
    const px = reducedMotion ? 0 : parallax.x * 14 * extraParallax;
    const py = reducedMotion ? 0 : parallax.y * 10 * extraParallax;

    if (reducedMotion) {
      return {
        opacity: role === 'center' ? 1 : 0,
        transform: `translate(-50%, -50%) scale(${role === 'center' ? 1.15 : 0.9})`,
        filter: 'blur(0px)',
        zIndex: r.zIndex,
        transition: 'opacity 500ms ease, transform 500ms ease',
      };
    }

    return {
      opacity: r.opacity,
      transform: `translate(-50%, -50%) translate3d(${r.x + px}px, ${r.y + py}px, ${r.z}px) rotateY(${r.rotateY}deg) scale(${r.scale})`,
      filter: r.blur ? `blur(${r.blur}px)` : undefined,
      zIndex: r.zIndex,
      transition:
        'transform 700ms cubic-bezier(0.4,0,0.2,1), opacity 700ms cubic-bezier(0.4,0,0.2,1), filter 700ms cubic-bezier(0.4,0,0.2,1)',
    };
  };

  const orderedByRole = useMemo(() => {
    return IMAGES.map((img, i) => ({ img, i, role: getRole(i, activeIndex) }));
  }, [activeIndex]);

  return (
    <section
      id="top"
      ref={heroRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="5 dimensiones de mi perfil profesional"
      className={`no-scrollbar relative h-[100svh] w-full overflow-hidden select-none ${
        mounted ? 'animate-hero-fade' : 'opacity-0'
      }`}
      style={{
        backgroundColor: active.bg,
        transition: 'background-color 700ms cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* Grain texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Radial lighting behind active photo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: isMobile ? '50%' : '70%',
          top: isMobile ? '38%' : '46%',
          background:
            'radial-gradient(circle at center, rgba(255,255,255,0.22), transparent 55%)',
          transition: 'opacity 700ms ease, left 700ms ease, top 700ms ease',
        }}
      />

      {/* Giant ghost typography */}
      <div
        className="pointer-events-none absolute text-center"
        aria-hidden="true"
        style={{
          left: isMobile ? '50%' : '3%',
          top: isMobile ? '40%' : '50%',
          width: isMobile ? '100%' : '42%',
          textAlign: isMobile ? 'center' : 'left',
          transform: `translate(${isMobile ? -50 : 0}%, -50%) translate(${parallax.x * -10}px, ${parallax.y * -6}px)`,
        }}
      >
        {prevIndex !== null && (
          <span
            key={`word-prev-${prevIndex}`}
            className={`animate-word-exit absolute top-1/2 block whitespace-nowrap ${isMobile ? 'left-1/2' : 'left-0'}`}
            style={
              {
                fontFamily: 'var(--font-family-display)',
                fontSize: wordFontSize(IMAGES[prevIndex].strength, isMobile),
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 0.8,
                color: '#fff',
                '--word-opacity': 0.14,
                '--word-x': isMobile ? '-50%' : '0%',
              } as CSSProperties
            }
          >
            {IMAGES[prevIndex].strength}
          </span>
        )}
        <span
          key={`word-${activeIndex}`}
          className={`animate-word-enter absolute top-1/2 block whitespace-nowrap ${isMobile ? 'left-1/2' : 'left-0'}`}
          style={
            {
              fontFamily: 'var(--font-family-display)',
              fontSize: wordFontSize(active.strength, isMobile),
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 0.8,
              color: '#fff',
              '--word-opacity': 0.14,
              '--word-x': isMobile ? '-50%' : '0%',
            } as CSSProperties
          }
        >
          {active.strength}
        </span>
      </div>

      {/* Top-left branding (only when used standalone, outside the full site) */}
      {standalone && (
        <header
          className={`absolute left-5 top-5 z-40 sm:left-10 sm:top-8 ${
            mounted ? 'animate-rise-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '150ms', animationFillMode: 'backwards' }}
        >
          <p
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-white sm:text-xs"
            style={{ fontFamily: 'var(--font-family-body)' }}
          >
            Alejandro
            <br />
            Marketing &amp; Digital
          </p>
          <p className="mt-2 text-[9px] uppercase tracking-[0.3em] text-white/60 sm:text-[10px]">
            Personal Portfolio
          </p>
        </header>
      )}

      {/* Right side vertical label (desktop) */}
      <div
        className={`pointer-events-none absolute right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block ${
          mounted ? 'animate-rise-in' : 'opacity-0'
        }`}
        style={{ animationDelay: '250ms', animationFillMode: 'backwards' }}
      >
        <p
          className="whitespace-nowrap text-[10px] uppercase tracking-[0.35em] text-white/50"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}
        >
          Marketing · Creative · Strategy · Digital
        </p>
      </div>

      {/* 3D photo stage */}
      <div
        className="absolute inset-0"
        style={{ perspective: isMobile ? '900px' : '1400px', perspectiveOrigin: '50% 40%' }}
      >
        <div
          className="absolute -translate-x-1/2"
          style={{
            left: isMobile ? '50%' : '70%',
            top: isMobile ? '38%' : '52%',
            height: isMobile ? '58vh' : '66vh',
            width: isMobile ? '62vw' : '30vw',
            maxWidth: isMobile ? '360px' : '440px',
            transformStyle: 'preserve-3d',
          }}
        >
          {orderedByRole.map(({ img, role }) => (
            <div
              key={img.src}
              className="absolute left-1/2 top-1/2 h-full w-full origin-center overflow-hidden rounded-[18px] shadow-2xl sm:rounded-[22px]"
              style={{
                ...photoTransform(role, role === 'center' ? 1 : 0.4),
                boxShadow:
                  role === 'center'
                    ? '0 40px 90px -20px rgba(0,0,0,0.45)'
                    : '0 20px 40px -15px rgba(0,0,0,0.3)',
                perspective: role === 'center' ? (isMobile ? '700px' : '1000px') : undefined,
              }}
              aria-hidden={role !== 'center'}
            >
              <div
                key={role === 'center' && mounted ? `flip-${enterKey}` : undefined}
                className={role === 'center' && mounted && !reducedMotion ? 'photo-flip-in h-full w-full' : 'h-full w-full'}
                style={{ ['--flip-dir' as string]: flipDirection }}
              >
                <img
                  src={img.src}
                  alt={role === 'center' ? `${active.strength}: ${active.title}` : ''}
                  draggable={false}
                  className="h-full w-full"
                  style={{ objectFit: 'contain', objectPosition: 'center bottom' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strength panel (lower-left desktop, bottom-centered mobile) */}
      <div className="absolute inset-x-0 bottom-0 z-40 px-5 pb-28 sm:px-10 sm:pb-24 lg:bottom-10 lg:max-w-xl lg:px-10 lg:pb-0">
        <div className="relative">
          {prevIndex !== null && (
            <div
              key={`panel-prev-${prevIndex}`}
              className="animate-panel-exit absolute inset-x-0 bottom-0"
              style={{ transform: `translate(${parallax.x * 4}px, ${parallax.y * 3}px)` }}
            >
              <StrengthPanel index={prevIndex} />
            </div>
          )}
          <div
            key={`panel-${activeIndex}`}
            className="animate-panel-enter"
            style={{ transform: `translate(${parallax.x * 4}px, ${parallax.y * 3}px)` }}
          >
            <StrengthPanel index={activeIndex} />
          </div>
        </div>
      </div>

      {/* Navigation + progress */}
      <div
        className={`absolute bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-5 sm:bottom-8 lg:bottom-10 lg:left-auto lg:right-10 lg:translate-x-0 ${
          mounted ? 'animate-nav-in' : 'opacity-0'
        }`}
        style={{ animationDelay: '550ms', animationFillMode: 'backwards' }}
      >
        <NavButton direction="left" onClick={previous} isMobile={isMobile} />
        <ProgressIndicator activeIndex={activeIndex} />
        <NavButton direction="right" onClick={next} isMobile={isMobile} />
      </div>
    </section>
  );
}

function StrengthPanel({ index }: { index: number }) {
  const img = IMAGES[index];
  return (
    <div>
      <p
        className="text-xs font-semibold tracking-[0.2em] text-white/70"
        style={{ fontFamily: 'var(--font-family-body)' }}
      >
        {String(index + 1).padStart(2, '0')} / {String(COUNT).padStart(2, '0')}
      </p>
      <h2
        className="mt-2 text-[2.1rem] leading-[0.95] text-white sm:text-[2.6rem] lg:text-[3.2rem]"
        style={{ fontFamily: 'var(--font-family-display)', letterSpacing: '-0.01em' }}
      >
        {img.strength}
      </h2>
      <p className="mt-3 max-w-md text-base font-semibold leading-snug text-white/90 sm:text-lg">
        {img.title}
      </p>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70 sm:text-[15px]">
        {img.description}
      </p>
    </div>
  );
}

function NavButton({
  direction,
  onClick,
  isMobile,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
  isMobile: boolean;
}) {
  const size = isMobile ? 48 : 64;
  const Icon = direction === 'left' ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Dimensión anterior' : 'Siguiente dimensión'}
      className="group flex shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/0 text-white backdrop-blur-sm transition-all duration-300 hover:scale-[1.08] hover:border-white/70 hover:bg-white/10 hover:shadow-[0_0_24px_rgba(255,255,255,0.35)] active:scale-95"
      style={{ width: size, height: size }}
    >
      <Icon size={isMobile ? 18 : 22} strokeWidth={1.75} />
    </button>
  );
}

function ProgressIndicator({ activeIndex }: { activeIndex: number }) {
  return (
    <div
      className="flex items-center gap-1.5"
      role="tablist"
      aria-label="Progreso del carrusel"
    >
      {IMAGES.map((_, i) => {
        const isActive = i === activeIndex;
        return (
          <span
            key={i}
            role="tab"
            aria-selected={isActive}
            className="block h-[3px] rounded-full bg-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              width: isActive ? 34 : 8,
              opacity: isActive ? 1 : 0.35,
            }}
          />
        );
      })}
    </div>
  );
}
