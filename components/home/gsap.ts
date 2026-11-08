'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/** 用户未要求减少动态效果时才播放位移动画 */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const MOTION_REDUCE = '(prefers-reduced-motion: reduce)';

export { gsap, ScrollTrigger, SplitText, useGSAP };
