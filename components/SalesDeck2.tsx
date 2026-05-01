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

export function SalesDeck() {

  const [isIntroReady, setIsIntroReady] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [introEnded, setIntroEnded] = useState(false);
  const [introMuted, setIntroMuted] = useState(true);

  const preIntroRef = useRef<HTMLVideoElement | null>(null);
  const introRef = useRef<HTMLVideoElement | null>(null);

  // ✅ FIXED EFFECT (NO AUTO TRIGGER)
  useEffect(() => {
    if (showIntro && isIntroReady) {
      introRef.current?.play().catch(() => {});
      preIntroRef.current?.pause();
    }
  }, [showIntro, isIntroReady]);

  // ✅ FIXED START FUNCTION
  const startIntroExperience = () => {
    const video = introRef.current;

    setShowIntro(true);
    setIsIntroReady(false);
    setIntroEnded(false);

    if (video) {
      video.currentTime = 0;
      video.muted = introMuted;
      video.load();

      video.oncanplay = () => {
        setTimeout(() => {
          setIsIntroReady(true);
        }, 100);
      };
    }
  };

  return (
    <main className="relative flex h-screen items-center justify-center overflow-hidden bg-[#050505] text-white">

      {/* PREINTRO */}
      <video
        ref={preIntroRef}
        src={preIntroDeckVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{ display: showIntro ? 'none' : 'block' }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* INTRO */}
      <video
        ref={introRef}
        src={introDeckVideo}
        muted={introMuted}
        playsInline
        preload="none"
        onEnded={() => setIntroEnded(true)}
        style={{ display: showIntro ? 'block' : 'none' }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* START BUTTON */}
      {!showIntro && (
        <button
          onClick={startIntroExperience}
          className="z-10 px-8 py-4 border border-white/20 bg-white/10 rounded-full"
        >
          Start Experience
        </button>
      )}

      {/* SKIP */}
      {showIntro && !introEnded && (
        <button
          onClick={() => {
            setIntroEnded(true);
            introRef.current?.pause();
            preIntroRef.current?.pause();
          }}
          className="absolute bottom-6 right-6 z-10 px-4 py-2 border border-white/20"
        >
          Skip
        </button>
      )}

    </main>
  );
}
