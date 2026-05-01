'use client';

import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { luxuryBrandOrder, luxuryImageBySlug } from '@/components/luxury/luxuryAssets';
import attractionDining from '@/ref_img2/Culinary boulevard with destination dining.png';
import attractionFamily from '@/ref_img2/Immersive family entertainment district.png';
import attractionCinema from '@/ref_img2/Multi-screen premium cinema complex.png';
import attractionSeasonal from '@/ref_img2/Seasonal interactive installations.png';
import adidasIcon from '@/ref_icon/adidas_icon.png';
import ckIcon from '@/ref_icon/ck_icon.jpeg';
import hmIcon from '@/ref_icon/h&m_icon.jpeg';
import levisIcon from '@/ref_icon/levi_icon.jpeg';
import nikeIcon from '@/ref_icon/nike_icon.jpeg';
import tommyIcon from '@/ref_icon/tommy_icon.jpeg';
import uniqloIcon from '@/ref_icon/uniqlo_icon.jpeg';
import zaraIcon from '@/ref_icon/zara_icon.jpeg';
import bkIcon from '@/ref_iconfood/bk_icon.png';
import dominosIcon from '@/ref_iconfood/dominos_icon.jpeg';
import kfcIcon from '@/ref_iconfood/kfc_icon.png';
import mcdIcon from '@/ref_iconfood/mcd_icon.png';
import pizzaHutIcon from '@/ref_iconfood/pizzahut_icon.png';
import starbucksIcon from '@/ref_iconfood/starbucks_icon.jpeg';
import subwayIcon from '@/ref_iconfood/subway_icon.png';
import appleIcon from '@/ref_iconelectronics/apple_icon.png';
import boseIcon from '@/ref_iconelectronics/bose_icon.jpeg';
import dysonIcon from '@/ref_iconelectronics/dyson_icon.png';
import huaweiIcon from '@/ref_iconelectronics/huawei_icon.jpeg';
import oneplusIcon from '@/ref_iconelectronics/oneplus_icon.jpeg';
import redmiIcon from '@/ref_iconelectronics/redmi_icon.jpeg';
import samsungIcon from '@/ref_iconelectronics/samsung_icon.jpeg';
import sonyIcon from '@/ref_iconelectronics/sony_icon.jpeg';
import { attractions, diningLifestyle, eventsPlatform, propertyProfile, retailStory, whyProperty } from '@/data/deckContent';

const heroVisionaryVideo = '/ref_vids/The Visionary Retail Experience_720p.mp4';
const whyPropertyAmbientVideo = '/ref_vids/PixVerse_Pixverse-c1_Fusion_540P_1__2__3__4.mp4';
const experienceModeVideo = '/ref_vids/experience-mode.mp4';
const preIntroDeckVideo = '/ref_preintro/pixelbin-video (1).mp4';
const introDeckVideo = '/ref_intro/the-modern-mall-experience-720p_sdXBGcNw-ezremove.mp4';

type SectionKey = 'hero' | 'retail' | 'luxury' | 'dining' | 'entertainment' | 'events' | 'experience';

const sections: SectionKey[] = ['hero', 'retail', 'luxury', 'dining', 'entertainment', 'events'];
const sceneVideoByKey: Record<SectionKey, string> = {
  hero: heroVisionaryVideo,
  retail: whyPropertyAmbientVideo,
  luxury: '',
  dining: whyPropertyAmbientVideo,
  entertainment: experienceModeVideo,
  events: whyPropertyAmbientVideo,
  experience: heroVisionaryVideo
};
const orbitItems: {
  section: SectionKey;
  label: string;
  angle: number;
}[] = [
  { section: 'dining', label: 'Dining', angle: 210 },
  { section: 'retail', label: 'Retail', angle: 330 },
  { section: 'events', label: 'Events', angle: 30 },
  { section: 'luxury', label: 'Luxury', angle: 90 },
  { section: 'entertainment', label: 'Entertainment', angle: 150 }
];

const attractionVisuals: Record<string, { image: StaticImageData; caption: string }> = {
  'Immersive family entertainment district': {
    image: attractionFamily,
    caption: 'Family-led footfall engine'
  },
  'Multi-screen premium cinema complex': {
    image: attractionCinema,
    caption: 'Night and weekend traffic anchor'
  },
  'Culinary boulevard with destination dining': {
    image: attractionDining,
    caption: 'Food-forward dwell-time accelerator'
  },
  'Seasonal interactive installations': {
    image: attractionSeasonal,
    caption: 'Year-round programmable moments'
  }
};

const anchorLogoItems: { name: string; src: StaticImageData; widthClass: string }[] = [
  { name: 'Zara', src: zaraIcon, widthClass: 'w-24 md:w-28' },
  { name: 'H&M', src: hmIcon, widthClass: 'w-16 md:w-20' },
  { name: 'Nike', src: nikeIcon, widthClass: 'w-20 md:w-24' },
  { name: 'Adidas', src: adidasIcon, widthClass: 'w-24 md:w-28' },
  { name: 'Uniqlo', src: uniqloIcon, widthClass: 'w-16 md:w-20' },
  { name: 'Levi', src: levisIcon, widthClass: 'w-20 md:w-24' },
  { name: 'Tommy Hilfiger', src: tommyIcon, widthClass: 'w-24 md:w-28' },
  { name: 'Calvin Klein', src: ckIcon, widthClass: 'w-20 md:w-24' }
];

const foodLogoItems: { name: string; src: StaticImageData; widthClass: string }[] = [
  { name: 'Burger King', src: bkIcon, widthClass: 'w-20 md:w-24' },
  { name: 'Dominos', src: dominosIcon, widthClass: 'w-20 md:w-24' },
  { name: 'KFC', src: kfcIcon, widthClass: 'w-16 md:w-20' },
  { name: 'McDonalds', src: mcdIcon, widthClass: 'w-20 md:w-24' },
  { name: 'Pizza Hut', src: pizzaHutIcon, widthClass: 'w-20 md:w-24' },
  { name: 'Starbucks', src: starbucksIcon, widthClass: 'w-24 md:w-28' },
  { name: 'Subway', src: subwayIcon, widthClass: 'w-20 md:w-24' }
];

const electronicsLogoItems: { name: string; src: StaticImageData; widthClass: string }[] = [
  { name: 'Apple', src: appleIcon, widthClass: 'w-16 md:w-20' },
  { name: 'Bose', src: boseIcon, widthClass: 'w-20 md:w-24' },
  { name: 'Dyson', src: dysonIcon, widthClass: 'w-20 md:w-24' },
  { name: 'Huawei', src: huaweiIcon, widthClass: 'w-20 md:w-24' },
  { name: 'OnePlus', src: oneplusIcon, widthClass: 'w-20 md:w-24' },
  { name: 'Redmi', src: redmiIcon, widthClass: 'w-20 md:w-24' },
  { name: 'Samsung', src: samsungIcon, widthClass: 'w-24 md:w-28' },
  { name: 'Sony', src: sonyIcon, widthClass: 'w-20 md:w-24' }
];

const anchorLogoTrack = [...anchorLogoItems, ...anchorLogoItems];
const foodLogoTrack = [...foodLogoItems, ...foodLogoItems];
const electronicsLogoTrack = [...electronicsLogoItems, ...electronicsLogoItems];
const luxurySlidePairs = [
  ['louis_vuitton', 'burberry'],
  ['gucci', 'cartier'],
  ['prada', 'dior']
] as const;

const slideShell = 'relative h-screen w-full overflow-hidden bg-[#050505]';
const glassPanel = 'section-shell rounded-[2rem] border border-white/10 bg-black/38 p-6 backdrop-blur-xl md:p-10';

export function SalesDeck() {
  const [experienceMode, setExperienceMode] = useState<'idle' | 'running' | 'complete'>('idle');
  const [experiencePhase, setExperiencePhase] = useState<'calm' | 'build' | 'peak'>('calm');
  const [showExploreVideo, setShowExploreVideo] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isIntroReady, setIsIntroReady] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [introEnded, setIntroEnded] = useState(false);
  const [introMuted, setIntroMuted] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>('hero');
  const [visitedSections, setVisitedSections] = useState<SectionKey[]>(['hero']);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionSection, setTransitionSection] = useState<SectionKey | null>(null);
  const [transitionPulse, setTransitionPulse] = useState(false);
  const [showLuxuryIntro, setShowLuxuryIntro] = useState(false);
  const [fadeLuxuryIntro, setFadeLuxuryIntro] = useState(false);
  const [hasPlayedLuxuryIntro, setHasPlayedLuxuryIntro] = useState(false);
  const preIntroRef = useRef<HTMLVideoElement | null>(null);
  const introRef = useRef<HTMLVideoElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const orbitAnimationFrame = useRef<number | null>(null);

  const luxuryCards = useMemo(
    () =>
      luxurySlidePairs.map((pair) => {
        const brand = luxuryBrandOrder.find((entry) => entry.slug === pair[0])!;
        const images = luxuryImageBySlug[brand.slug];

        return {
          ...brand,
          image: images.primary
        };
      }),
    []
  );

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousTouchAction = body.style.touchAction;

    root.setAttribute('data-theme', hasEntered && activeSection === 'luxury' ? 'luxury' : 'default');
    body.style.overflow = 'hidden';
    body.style.touchAction = 'none';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        if (!hasEntered) {
          if (introEnded) {
            setHasEntered(true);
          }
          return;
        }

        const index = sections.indexOf(activeSection);
        setActiveSection(sections[Math.min(index + 1, sections.length - 1)]);
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        if (!hasEntered) {
          return;
        }

        const index = sections.indexOf(activeSection);
        setActiveSection(sections[Math.max(index - 1, 0)]);
      }

      if (event.key === 'Escape' && hasEntered) {
        event.preventDefault();
        setActiveSection('hero');
      }
    };

    const stopScroll = (event: WheelEvent | TouchEvent) => {
      event.preventDefault();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('wheel', stopScroll, { passive: false });
    window.addEventListener('touchmove', stopScroll, { passive: false });

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('wheel', stopScroll);
      window.removeEventListener('touchmove', stopScroll);
      body.style.overflow = previousOverflow;
      body.style.touchAction = previousTouchAction;
      root.setAttribute('data-theme', 'default');
    };
  }, [activeSection, hasEntered, introEnded]);

  useEffect(() => {
    if (!hasEntered) {
      return;
    }

    setVisitedSections((sections) => {
      if (sections.includes(activeSection)) {
        return sections;
      }

      return [...sections, activeSection];
    });
  }, [activeSection, hasEntered, isTransitioning]);

  useEffect(() => {
    if (!hasEntered || activeSection !== 'luxury' || hasPlayedLuxuryIntro) {
      setShowLuxuryIntro(false);
      setFadeLuxuryIntro(false);
      return;
    }

    setShowLuxuryIntro(true);
    setFadeLuxuryIntro(false);
    setHasPlayedLuxuryIntro(true);

    const fadeTimeoutId = window.setTimeout(() => {
      setFadeLuxuryIntro(true);
    }, 1200);

    const removeTimeoutId = window.setTimeout(() => {
      setShowLuxuryIntro(false);
      setFadeLuxuryIntro(false);
    }, 1850);

    return () => {
      window.clearTimeout(fadeTimeoutId);
      window.clearTimeout(removeTimeoutId);
    };
  }, [activeSection, hasEntered, hasPlayedLuxuryIntro]);

  useEffect(() => {
    if (experienceMode !== 'running') {
      return;
    }

    setExperiencePhase('calm');

    const buildTimeoutId = window.setTimeout(() => {
      setExperiencePhase('build');
    }, 1200);

    const peakTimeoutId = window.setTimeout(() => {
      setExperiencePhase('peak');
    }, 3200);

    const completeTimeoutId = window.setTimeout(() => {
      setExperienceMode('complete');
    }, 5200);

    return () => {
      window.clearTimeout(buildTimeoutId);
      window.clearTimeout(peakTimeoutId);
      window.clearTimeout(completeTimeoutId);
    };
  }, [experienceMode]);

  useEffect(() => {
    const introVideo = introRef.current;
    const preIntroVideo = preIntroRef.current;

    if (preIntroVideo && !hasEntered && !showIntro) {
      preIntroVideo.muted = true;
    }

    if (!introVideo || hasEntered) {
      return;
    }

    introVideo.muted = introMuted;
  }, [hasEntered, showIntro, introMuted]);

  useEffect(() => {
    if (isIntroReady) {
      setShowIntro(true);
      introRef.current?.play().catch(() => {});
      preIntroRef.current?.pause();
    }
  }, [isIntroReady]);

  useEffect(() => {
    if (!hasEntered || activeSection !== 'hero' || !ringRef.current) {
      return;
    }

    const RADIUS = 140;

    orbitItems.forEach((item, i) => {
      const pill = pillRefs.current[i];
      if (!pill) {
        return;
      }

      const rad = (item.angle * Math.PI) / 180;
      const x = Math.cos(rad) * RADIUS;
      const y = Math.sin(rad) * RADIUS;

      pill.style.left = `${x}px`;
      pill.style.top = `${y}px`;
      pill.style.transform = 'translate(-50%, -50%) rotate(0deg)';
    });

    const getRotation = (el: HTMLElement) => {
      const st = window.getComputedStyle(el);
      const tr = st.transform;
      if (!tr || tr === 'none') {
        return 0;
      }

      const values = tr.split('(')[1].split(')')[0].split(',');
      const a = Number.parseFloat(values[0]);
      const b = Number.parseFloat(values[1]);

      return Math.atan2(b, a) * (180 / Math.PI);
    };

    const animate = () => {
      if (!ringRef.current) {
        return;
      }

      const deg = getRotation(ringRef.current);

      pillRefs.current.forEach((pill) => {
        if (pill) {
          pill.style.transform = `translate(-50%, -50%) rotate(${-deg}deg)`;
        }
      });

      orbitAnimationFrame.current = window.requestAnimationFrame(animate);
    };

    orbitAnimationFrame.current = window.requestAnimationFrame(animate);

    return () => {
      if (orbitAnimationFrame.current) {
        window.cancelAnimationFrame(orbitAnimationFrame.current);
        orbitAnimationFrame.current = null;
      }
    };
  }, [activeSection, hasEntered]);

  const navigateToSection = (section: SectionKey, useZoom = false) => {
    if (section === activeSection) {
      if (section === 'hero') {
        setTransitionPulse(true);
        window.setTimeout(() => {
          setTransitionPulse(false);
        }, 1200);
      }

      return;
    }

    if (!useZoom) {
      setActiveSection(section);
      return;
    }

    if (isTransitioning) {
      return;
    }

    setIsTransitioning(true);
    setTransitionSection(section);

    window.setTimeout(() => {
      setActiveSection(section);
    }, 600);

    window.setTimeout(() => {
      setIsTransitioning(false);
      setTransitionSection(null);
    }, 900);
  };

  const navigateAdjacent = (direction: 'next' | 'prev') => {
    const index = sections.indexOf(activeSection);
    if (index < 0) {
      return;
    }
    const nextIndex =
      direction === 'next' ? Math.min(index + 1, sections.length - 1) : Math.max(index - 1, 0);
    navigateToSection(sections[nextIndex]);
  };

  const startExperienceMode = () => {
    setExperienceMode('running');
    setExperiencePhase('calm');
  };

  const closeExperienceMode = () => {
    setExperienceMode('idle');
    setExperiencePhase('calm');
  };

  const closeExploreVideo = () => {
    setShowExploreVideo(false);
  };

  const startIntroExperience = () => {
    const introVideo = introRef.current;
    setIntroEnded(false);

    if (introVideo) {
      introVideo.currentTime = 0;
      introVideo.muted = introMuted;
      introVideo.load();
    }
  };

  if (!hasEntered) {
    return (
      <main className="relative flex h-screen items-center justify-center overflow-hidden bg-[#050505] text-white">
        <video
          ref={preIntroRef}
          src={preIntroDeckVideo}
          className="intro-video absolute inset-0 h-full w-full object-cover transition-opacity duration-[800ms] ease-out"
          autoPlay
          playsInline
          muted
          preload="auto"
          style={{ display: showIntro ? 'none' : 'block' }}
        />
        <video
          ref={introRef}
          src={introDeckVideo}
          className="intro-video absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1000ms] ease-out"
          playsInline
          muted={introMuted}
          preload="metadata"
          onLoadedData={() => setIsIntroReady(true)}
          onCanPlay={() => setIsIntroReady(true)}
          onEnded={() => setIntroEnded(true)}
          style={{ display: showIntro ? 'block' : 'none' }}
        />
        <div
          className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.16),rgba(0,0,0,0.52))] transition-opacity duration-[900ms] ease-out ${
            showIntro ? 'opacity-100' : 'opacity-70'
          }`}
        />
        {!showIntro ? (
          <div className="absolute inset-x-0 bottom-[16vh] z-10 flex justify-center px-6">
            <button
              type="button"
              onClick={startIntroExperience}
              className="rounded-full border border-white/20 bg-white/12 px-8 py-4 text-sm font-medium tracking-[0.18em] text-white backdrop-blur-xl transition duration-300 ease-out hover:scale-[1.05] hover:bg-white/18 hover:shadow-[0_0_30px_rgba(255,255,255,0.22)] active:scale-[0.97]"
            >
              Start Experience
            </button>
          </div>
        ) : introEnded ? (
          <div className="relative z-10 flex w-full items-center justify-center px-6">
            <button
              type="button"
              onClick={() => setHasEntered(true)}
              className="rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.26em] text-black shadow-[0_0_0_rgba(255,255,255,0)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(255,255,255,0.45)]"
            >
              Start deck
            </button>
          </div>
        ) : (
          <div className="absolute bottom-6 right-6 z-10 flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setIntroEnded(true);
                setShowIntro(true);
                introRef.current?.pause();
                preIntroRef.current?.pause();
              }}
              className="rounded-full border border-white/15 bg-black/45 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-white backdrop-blur-xl transition hover:bg-white hover:text-black"
            >
              Skip intro
            </button>
            <button
              type="button"
              onClick={() => setIntroMuted((value) => !value)}
              className="rounded-full border border-white/15 bg-black/45 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-white backdrop-blur-xl transition hover:bg-white hover:text-black"
            >
              {introMuted ? 'Unmute audio' : 'Mute audio'}
            </button>
          </div>
        )}
      </main>
    );
  }

  const SectionVideo = ({ section }: { section: SectionKey }) => {
    if (section === 'luxury') {
      return null;
    }

    return (
      <div className="section-video-wrapper">
        <video
          src={sceneVideoByKey[section]}
          className={`section-video ${
            section === 'hero' ? 'scene-video-drift hero-background-video' : 'scene-video-float'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload={activeSection === section ? 'auto' : 'metadata'}
          onEnded={(event) => {
            const video = event.currentTarget;
            video.currentTime = 0;
            video.play().catch(() => {});
          }}
        />
      </div>
    );
  };

  const Hero = () => (
    <section className={`${slideShell} absolute inset-0 z-20`}>
      <SectionVideo section="hero" />
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.42)]" />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(4,4,4,0.78),rgba(4,4,4,0.22)_48%,rgba(4,4,4,0.7))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.34)_100%)]" />
      <div
        className="pointer-events-none absolute -right-[10%] top-[12%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(214,179,106,0.18),transparent_62%)] blur-3xl transition-transform duration-700 ease-out"
      />

      <div className="relative z-10 grid h-full gap-10 px-6 py-24 md:px-12 lg:grid-cols-[1fr_0.95fr] lg:px-20">
        <div className="flex max-w-3xl flex-col justify-center">
          <p className="theme-accent text-[0.72rem] uppercase tracking-[0.36em]">Explore the property</p>
          <h1 className="theme-heading mt-6 max-w-5xl text-5xl font-semibold leading-[0.92] md:text-7xl xl:text-[5.8rem]">
            {propertyProfile.name}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-200 md:text-2xl">
            The region&apos;s most kinetic destination for retail, culture, and brand moments.
          </p>
          <div className="mt-10">
            <button
              type="button"
              onClick={startExperienceMode}
              className="rounded-full border border-white/20 bg-white/12 px-6 py-3 text-sm font-medium uppercase tracking-[0.22em] text-white backdrop-blur-xl transition duration-500 hover:scale-[1.03] hover:bg-white/18 hover:shadow-[0_0_32px_rgba(255,255,255,0.22)]"
            >
              Explore the Property
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-end">
          <div
            className={`hero-radial-system relative h-[30rem] w-full max-w-[30rem] transition-all duration-700 ${
              transitionPulse ? 'scale-[1.02] shadow-[0_0_70px_rgba(214,179,106,0.18)]' : ''
            }`}
          >
              <div className="orbital-scene absolute inset-0">
                <div className="ring-outer" />
                <div className="ring-orbit" />
                <div className="centre-circle" />
                <div className="centre-label">Destination Planning</div>
                <div className="orbit-ring" ref={ringRef}>
                  {orbitItems.map((item, i) => (
                    <div key={i} className="orbit-item">
                      <div
                        className="orbit-pill"
                        ref={(el) => {
                          pillRefs.current[i] = el;
                        }}
                        onClick={() => navigateToSection(item.section, true)}
                        role="button"
                        tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          navigateToSection(item.section, true);
                        }
                        }}
                      >
                        <span className="pill-label">{item.label}</span>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const Retail = () => (
    <section className={`${slideShell} absolute inset-0 z-20`}>
      <SectionVideo section="retail" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(7,7,7,0.78),rgba(7,7,7,0.44)_48%,rgba(7,7,7,0.8))]" />
      <div className="section-container relative z-10 flex h-full items-center px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className={`${glassPanel} scene-card-rise`}>
            <p className="theme-accent text-[0.72rem] uppercase tracking-[0.34em]">Retail</p>
            <h2 className="theme-heading mt-6 text-4xl font-semibold leading-tight md:text-6xl">
              Volume anchors with flagship ambition.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
              Existing anchors establish daily traffic while curated leasing paths unlock premium growth categories.
            </p>
            <div className="metrics mt-8">
              <div className="metric">
                <svg width="22" height="22" viewBox="0 0 100 100" aria-hidden="true">
                  <path d="M10 50 Q50 10 90 50 Q50 90 10 50" className="flow-line" />
                </svg>
                <span>1.5M+ Monthly Footfall</span>
              </div>
              <div className="metric">
                <svg width="22" height="22" viewBox="0 0 100 100" aria-hidden="true">
                  <circle cx="20" cy="50" r="3" />
                  <circle cx="50" cy="20" r="3" />
                  <circle cx="80" cy="50" r="3" />
                  <circle cx="50" cy="80" r="3" />
                  <line x1="20" y1="50" x2="50" y2="20" />
                  <line x1="50" y1="20" x2="80" y2="50" />
                  <line x1="80" y1="50" x2="50" y2="80" />
                  <line x1="50" y1="80" x2="20" y2="50" />
                  <circle cx="50" cy="50" r="4" className="pulse-node" />
                </svg>
                <span>Premium Brand Ecosystem</span>
              </div>
              <div className="metric">
                <svg width="22" height="22" viewBox="0 0 100 100" aria-hidden="true">
                  <path d="M10 80 L40 50 L65 60 L90 20" className="growth-line" />
                </svg>
                <span>High-Intent Consumer Spend</span>
              </div>
            </div>
            <div className="relative mt-10 overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-6">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0b0b0b] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0b0b0b] to-transparent" />
              <div className="brand-marquee-track flex w-max items-center gap-10 md:gap-14">
                {anchorLogoTrack.map((logo, index) => (
                  <div
                    key={`${logo.name}-${index}`}
                    className="flex h-16 w-[7.5rem] shrink-0 items-center justify-center md:h-20 md:w-[9rem]"
                    aria-hidden={index >= anchorLogoItems.length}
                  >
                    <Image src={logo.src} alt={logo.name} className={`${logo.widthClass} h-auto object-contain`} />
                  </div>
                ))}
              </div>
              <div className="mx-auto mt-5 h-px w-[92%] bg-white/10" />
              <div className="relative mt-5 overflow-hidden">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0b0b0b] to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0b0b0b] to-transparent" />
                <div className="brand-marquee-track-reverse flex w-max items-center gap-10 md:gap-14">
                  {foodLogoTrack.map((logo, index) => (
                    <div
                      key={`${logo.name}-food-${index}`}
                      className="flex h-16 w-[7.5rem] shrink-0 items-center justify-center md:h-20 md:w-[9rem]"
                      aria-hidden={index >= foodLogoItems.length}
                    >
                      <Image src={logo.src} alt={logo.name} className={`${logo.widthClass} h-auto object-contain`} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mx-auto mt-5 h-px w-[92%] bg-white/10" />
              <div className="relative mt-5 overflow-hidden">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0b0b0b] to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0b0b0b] to-transparent" />
                <div className="brand-marquee-track flex w-max items-center gap-10 md:gap-14">
                  {electronicsLogoTrack.map((logo, index) => (
                    <div
                      key={`${logo.name}-electronics-${index}`}
                      className="flex h-16 w-[7.5rem] shrink-0 items-center justify-center md:h-20 md:w-[9rem]"
                      aria-hidden={index >= electronicsLogoItems.length}
                    >
                      <Image src={logo.src} alt={logo.name} className={`${logo.widthClass} h-auto object-contain`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 self-center">
            {retailStory.trajectory.map((line) => (
              <article
                key={line}
                className={`${glassPanel} scene-card-rise transition duration-700 hover:scale-[1.02] hover:border-white/18 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]`}
              >
                <p className="text-sm leading-relaxed text-zinc-300 md:text-base">{line}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const Luxury = () => (
    <section className={`${slideShell} absolute inset-0 z-20`}>
      <div className="luxury-gold-background absolute inset-0" />
      <div className="luxury-gold-overlay absolute inset-0" aria-hidden />
      <div className="luxury-window-glow absolute inset-[18px] rounded-[2.4rem]" aria-hidden />
      {showLuxuryIntro ? (
        <div
          className={`luxury-intro-overlay absolute inset-0 z-30 ${
            fadeLuxuryIntro ? 'luxury-intro-overlay-fade' : 'luxury-intro-overlay-show'
          }`}
          aria-hidden
        >
          <div className="luxury-intro-word">LUXURY</div>
        </div>
      ) : null}
      <div className="section-container relative z-10 flex h-full items-center px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-3xl text-center scene-card-rise">
            <p className="text-[0.72rem] uppercase tracking-[0.38em] text-[#d6b36a]">Luxury precinct</p>
            <h2 className="theme-heading mt-6 text-4xl font-semibold leading-tight md:text-6xl">
              A dedicated premium environment.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-400 md:text-lg">
              Investor-grade storytelling built around hero maisons, editorial imagery, and a more rarefied retail cadence.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {luxuryCards.map((brand, index) => (
              <article
                key={brand.slug}
                className="group overflow-hidden rounded-[1.8rem] border border-[rgba(214,179,106,0.24)] bg-[rgba(255,255,255,0.03)] transition duration-500 scene-card-rise hover:shadow-[0_24px_60px_-26px_rgba(214,179,106,0.65)]"
                style={{ transitionDelay: `${160 + index * 100}ms` }}
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={brand.image}
                    alt={brand.displayName}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/18 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 transition duration-500 group-hover:-translate-y-1">
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#d6b36a]">Maison</p>
                    <p className="theme-heading mt-3 text-3xl">{brand.displayName}</p>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-300">{brand.line}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const Dining = () => (
    <section className={`${slideShell} absolute inset-0 z-20`}>
      <SectionVideo section="dining" />
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(7,7,7,0.76),rgba(18,18,18,0.82))]" />
      <div className="relative z-10 flex h-full items-center px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className={`${glassPanel} scene-card-rise`}>
            <p className="theme-accent text-[0.72rem] uppercase tracking-[0.34em]">Dining &amp; lifestyle</p>
            <h2 className="theme-heading mt-6 text-4xl font-semibold leading-tight md:text-6xl">
              Food-led dwell time that extends day into night.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-300 md:text-lg">
              Daypart programming becomes an all-day engine for spend, social proof, and repeat visitation.
            </p>
            <div className="metrics mt-8">
              <div className="metric">
                <svg width="22" height="22" viewBox="0 0 100 100" aria-hidden="true">
                  <path d="M10 50 Q50 10 90 50 Q50 90 10 50" className="flow-line" />
                </svg>
                <span>Chef-led Dining Concepts</span>
              </div>
              <div className="metric">
                <svg width="22" height="22" viewBox="0 0 100 100" aria-hidden="true">
                  <path d="M10 80 L40 50 L65 60 L90 20" className="growth-line" />
                </svg>
                <span>Day-to-Night Culinary Experience</span>
              </div>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[whyProperty.demographics[0], whyProperty.scale[1]].map((line) => (
                <article key={line} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 transition duration-700 hover:scale-[1.02] hover:border-white/18">
                  <p className="text-sm leading-relaxed text-zinc-300">{line}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {diningLifestyle.map((line) => (
              <article
                key={line}
                className={`${glassPanel} scene-card-rise transition duration-700 hover:scale-[1.02] hover:border-white/18 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]`}
              >
                <p className="text-sm leading-relaxed text-zinc-300 md:text-base">{line}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const Entertainment = () => (
    <section className={`${slideShell} absolute inset-0 z-20`}>
      <SectionVideo section="entertainment" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(255,255,255,0.08),transparent_25%),linear-gradient(135deg,rgba(6,6,6,0.78),rgba(16,16,16,0.84))]" />
      <div className="relative z-10 flex h-full items-center px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-3xl text-center scene-card-rise">
            <p className="theme-accent text-[0.72rem] uppercase tracking-[0.34em]">Entertainment</p>
            <h2 className="theme-heading mt-6 text-4xl font-semibold leading-tight md:text-6xl">
              Destination experiences that standard malls cannot replicate.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {attractions.map((item, index) => {
              const visual = attractionVisuals[item];

              return (
                <article
                  key={item}
                  className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.03] transition duration-700 hover:scale-[1.03] hover:border-white/18 hover:shadow-[0_0_34px_rgba(255,255,255,0.08)]"
                  style={{ transitionDelay: `${180 + index * 120}ms` }}
                >
                  <div className="relative h-64">
                    {visual ? (
                      <Image
                        src={visual.image}
                        alt={item}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition duration-700 ease-out group-hover:scale-[1.08]"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/34 to-black/10" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-zinc-300">
                        {visual?.caption ?? 'Destination attraction'}
                      </p>
                      <p className="theme-heading mt-3 text-2xl leading-tight">{item}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );

  const Events = () => (
    <section className={`${slideShell} absolute inset-0 z-20`}>
      <SectionVideo section="events" />
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(6,6,6,0.76),rgba(18,18,18,0.84))]" />
      <div className="relative z-10 flex h-full items-center px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_1fr]">
          <div className={`${glassPanel} scene-card-rise`}>
            <p className="theme-accent text-[0.72rem] uppercase tracking-[0.34em]">Events platform</p>
            <h2 className="theme-heading mt-6 text-4xl font-semibold leading-tight md:text-6xl">
              A programmable venue ecosystem for sponsors and producers.
            </h2>
            <div className="metrics mt-8">
              <div className="metric">
                <svg width="22" height="22" viewBox="0 0 100 100" aria-hidden="true">
                  <path d="M10 80 L40 50 L65 60 L90 20" className="growth-line" />
                </svg>
                <span>Global Product Launches</span>
              </div>
              <div className="metric">
                <svg width="22" height="22" viewBox="0 0 100 100" aria-hidden="true">
                  <circle cx="20" cy="50" r="3" />
                  <circle cx="50" cy="20" r="3" />
                  <circle cx="80" cy="50" r="3" />
                  <circle cx="50" cy="80" r="3" />
                  <line x1="20" y1="50" x2="50" y2="20" />
                  <line x1="50" y1="20" x2="80" y2="50" />
                  <line x1="80" y1="50" x2="50" y2="80" />
                  <line x1="50" y1="80" x2="20" y2="50" />
                  <circle cx="50" cy="50" r="4" className="pulse-node" />
                </svg>
                <span>Fashion Week Capsules</span>
              </div>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {eventsPlatform.moments.map((event) => (
                <article key={event} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition duration-700 hover:scale-[1.02] hover:border-white/18">
                  <p className="theme-heading text-xl leading-snug">{event}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="grid gap-4 self-center">
            {eventsPlatform.venues.map((line) => (
              <article
                key={line}
                className={`${glassPanel} scene-card-rise transition duration-700 hover:scale-[1.02] hover:border-white/18 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]`}
              >
                <p className="text-sm leading-relaxed text-zinc-300 md:text-base">{line}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const Opportunities = () => (
    <section className={`${slideShell} absolute inset-0 z-20`}>
      <SectionVideo section="experience" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_25%),linear-gradient(180deg,rgba(6,6,6,0.74),rgba(15,15,15,0.92))]" />
      <div className="relative z-10 flex h-full items-center justify-center px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl text-center scene-card-rise">
          <p className="theme-accent text-[0.72rem] uppercase tracking-[0.34em]">Conversion</p>
          <h2 className="theme-heading mt-6 text-5xl font-semibold leading-[0.94] md:text-7xl">
            Leasing. Sponsorship. Events.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-xl">
            One destination platform for long-term tenancy, high-impact partnerships, and headline programming.
          </p>
          <div className="mt-8 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-[0.72rem] uppercase tracking-[0.28em] text-zinc-300">
            {propertyProfile.region}
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              { title: 'Leasing', note: 'Luxury, flagship, and selective pop-up modules.' },
              { title: 'Sponsorships', note: 'Tiered activations tied to audience and seasonality.' },
              { title: 'Events', note: 'Concerts, conventions, and launch-scale productions.' }
            ].map((path) => (
              <article
                key={path.title}
                className={`${glassPanel} transition duration-700 hover:scale-[1.03] hover:border-white/18 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]`}
              >
                <p className="theme-heading text-xl font-semibold">{path.title}</p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-300">{path.note}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  console.log('LOGO RENDERED');
  console.log('INTRO FIXED');
  console.log('NAVBAR FIXED');
  console.log('ARROWS FIXED');
  console.log('SECTION FLOW FIXED');

  return (
    <main className="relative h-screen overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,179,106,0.1),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_24%)]" />

      <div className="nav-bar">
        <div className="logo-container">
          <svg viewBox="0 0 200 200" className="logo-svg">
            <path className="line lA" d="M52 140 V98" pathLength="200"/>
            <path className="line lB" d="M148 140 V98" pathLength="200"/>
            <path className="line lC" d="M60 140 V90" pathLength="200"/>
            <path className="line lD" d="M140 140 V90" pathLength="200"/>
            <path className="line l1" d="M70 140 V85" pathLength="200"/>
            <path className="line l5" d="M130 140 V85" pathLength="200"/>
            <path className="line l2" d="M85 140 V78" pathLength="200"/>
            <path className="line l4" d="M115 140 V78" pathLength="200"/>
            <path className="line l3" d="M100 140 V70" pathLength="200"/>
            <path className="band" d="M52 100 L148 100" pathLength="200"/>
            <path className="inner-arch" d="M85 140 A15 15 0 0 1 115 140" pathLength="200"/>
            <path className="center" d="M100 140 V60" pathLength="200"/>
            <path className="arch" d="M40 60 A60 60 0 0 1 160 60" pathLength="200"/>
            <circle className="cap cap1" cx="85" cy="78" r="3" fill="#d4af37" />
            <circle className="cap cap2" cx="115" cy="78" r="3" fill="#d4af37" />
            <circle className="cap cap3" cx="100" cy="70" r="2.5" fill="#d4af37" />
          </svg>
        </div>

        <div className="nav-shell">
          <div
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setMenuOpen((value) => !value);
              }
            }}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="nav-dropdown z-50 rounded-2xl border border-white/15 p-6">
          <p onClick={() => { setActiveSection('hero'); setMenuOpen(false); }}>Hero</p>
          <p onClick={() => { setActiveSection('retail'); setMenuOpen(false); }}>Retail</p>
          <p onClick={() => { setActiveSection('luxury'); setMenuOpen(false); }}>Luxury</p>
          <p onClick={() => { setActiveSection('dining'); setMenuOpen(false); }}>Dining</p>
          <p onClick={() => { setActiveSection('entertainment'); setMenuOpen(false); }}>Entertainment</p>
          <p onClick={() => { setActiveSection('events'); setMenuOpen(false); }}>Events</p>
        </div>
      )}

      {activeSection !== 'hero' ? (
        activeSection === 'events' ? (
          <div className="end-experience z-50" onClick={() => setActiveSection('hero')}>
            End Experience
          </div>
        ) : (
          <div className="nav-arrows z-50">
            <span onClick={() => navigateAdjacent('prev')}>{'\u2190'}</span>
            <span onClick={() => navigateAdjacent('next')}>{'\u2192'}</span>
          </div>
        )
      ) : null}
      {activeSection === 'hero' && <Hero />}
      {activeSection === 'retail' && <Retail />}
      {activeSection === 'luxury' && <Luxury />}
      {activeSection === 'dining' && <Dining />}
      {activeSection === 'entertainment' && <Entertainment />}
      {activeSection === 'events' && <Events />}
      {activeSection === 'experience' && <Opportunities />}

      {activeSection === 'hero' && experienceMode !== 'idle' ? (
        <div className="absolute inset-0 z-[55] overflow-hidden bg-black">
          <div className="section-video-wrapper">
            <video
              src={experienceModeVideo}
              className={`section-video hero-video ${experiencePhase === 'peak' ? 'experience-mode-video-peak' : 'experience-mode-video'}`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </div>
          <div
            className={`pointer-events-none absolute inset-0 transition-all duration-[1200ms] ${
              experiencePhase === 'calm'
                ? 'bg-[linear-gradient(180deg,rgba(0,0,0,0.78),rgba(0,0,0,0.88))]'
                : experiencePhase === 'build'
                  ? 'bg-[linear-gradient(180deg,rgba(0,0,0,0.56),rgba(0,0,0,0.72))]'
                  : 'bg-[linear-gradient(180deg,rgba(0,0,0,0.34),rgba(0,0,0,0.52))]'
            }`}
          />
          <div className={`pointer-events-none absolute inset-0 experience-mode-vignette transition-opacity duration-[1200ms] ${experiencePhase === 'peak' ? 'opacity-100' : 'opacity-70'}`} />
          <div className={`pointer-events-none absolute inset-0 transition-opacity duration-[1200ms] ${experiencePhase === 'calm' ? 'opacity-20' : experiencePhase === 'build' ? 'opacity-55' : 'opacity-100'}`}>
            <div className="pointer-events-none absolute inset-x-[18%] top-[20%] h-px bg-gradient-to-r from-transparent via-[#d6b36a]/55 to-transparent" />
            <div className="pointer-events-none absolute inset-x-[12%] bottom-[26%] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="pointer-events-none absolute left-[22%] top-[28%] h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(214,179,106,0.22),transparent_68%)] blur-2xl" />
            <div className="pointer-events-none absolute right-[18%] top-[24%] h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_68%)] blur-2xl" />
          </div>

          <div className="absolute right-6 top-6 z-10 pointer-events-auto">
            <button
              type="button"
              onClick={closeExperienceMode}
              className="rounded-full border border-white/15 bg-black/45 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-white backdrop-blur-xl transition hover:bg-white hover:text-black"
            >
              Skip
            </button>
          </div>
          <div className="relative z-10 flex h-full items-center justify-center px-6">
            <div className="max-w-4xl text-center">
              <p className={`text-[0.72rem] uppercase tracking-[0.36em] text-[#d6b36a] transition-all duration-[1200ms] ${experiencePhase === 'calm' ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
                Experience Mode
              </p>
              <p className={`mt-8 text-3xl font-semibold leading-tight text-white transition-all duration-[1200ms] md:text-6xl ${experiencePhase === 'peak' ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                This isn&apos;t a location.
              </p>
              <p className={`mt-4 text-2xl leading-tight text-zinc-200 transition-all duration-[1200ms] md:text-5xl ${experiencePhase === 'peak' ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                This is a platform.
              </p>
              <p className={`mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-zinc-300 transition-all duration-[1200ms] md:text-base ${experiencePhase === 'build' || experiencePhase === 'peak' ? 'opacity-100' : 'opacity-0'}`}>
                The space shifts from calm to activated as light, motion, and brand presence turn environment into commercial momentum.
              </p>
              <div className={`mt-10 flex justify-center gap-4 transition-all duration-[1200ms] ${experienceMode === 'complete' ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                <button
                  type="button"
                  onClick={closeExperienceMode}
                  className="rounded-full border border-white/18 bg-white/12 px-6 py-3 text-sm font-medium uppercase tracking-[0.22em] text-white backdrop-blur-xl transition duration-500 hover:scale-[1.03] hover:bg-white/18 hover:shadow-[0_0_32px_rgba(255,255,255,0.22)]"
                >
                  Continue to Exploration
                </button>
                <button
                  type="button"
                  onClick={() => {
                    closeExperienceMode();
                    setShowExploreVideo(true);
                  }}
                  className="rounded-full border border-white/12 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-black transition duration-500 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.28)]"
                >
                  Enter the Platform
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {showExploreVideo ? (
        <div className="absolute inset-0 z-[56] overflow-hidden bg-black">
          <div className="section-video-wrapper">
            <video
              src="/ref_explore/6s Premium Mall Transition Experience_720p.mp4"
              className="section-video hero-background-video"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={(event) => {
                closeExploreVideo();
                setActiveSection('hero');
                closeExperienceMode();
              }}
            />
          </div>
          <div className="absolute right-6 top-6 z-10 pointer-events-auto">
            <button
              type="button"
              onClick={() => {
                closeExploreVideo();
                setActiveSection('hero');
                closeExperienceMode();
              }}
              className="rounded-full border border-white/15 bg-black/45 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-white backdrop-blur-xl transition hover:bg-white hover:text-black"
            >
              Skip
            </button>
          </div>
        </div>
      ) : null}

      {isTransitioning ? (
        <div className="transition-overlay absolute inset-0 z-[60] flex items-center justify-center">
          <div className="scene-zoom-transition flex h-48 w-48 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] backdrop-blur-xl">
            <span className="text-[0.8rem] uppercase tracking-[0.34em] text-white">{transitionSection}</span>
          </div>
        </div>
      ) : null}
    </main>
  );
}
