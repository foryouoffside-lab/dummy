"use client";

import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { ArrowLeft, Clock, Play, Target, Crosshair, Star, Zap, Eye, Brain, Gamepad2, Home, ChevronRight, Calculator, Settings, Activity, Sparkles, Cpu, Award, MessageSquare, Volume2, AlertTriangle, X, Smartphone } from "lucide-react";
import { COACHES, getActiveCoach, getCoachResponse, speakCoachText, getCoachDashboardRecommendation } from "../../../lib/coachVoice";
import { getWeaknessProfile, getWeakestPillar, getProgressionTrend, getTrendDisplay } from "../../../lib/performanceTelemetry";
import { getAllDrillTiers, getTierDisplay } from "../../../lib/adaptiveDifficulty";

// Mapping: drill folderName → drillId (for tier badge display)
const FOLDER_TO_DRILL_ID = {
  'flick-shot-training': 'pro-flick',
  'micro-flick-burst': 'micro-flick-burst',
  'micro-flick-precision': 'micro-flick-precision',
  'headshot-micro-adjust': 'headshot-reflex',
  'target-acquisition': 'target-acquisition',
  'pro-tracking': 'pro-tracking',
  'strafe-tracking': 'strafe-tracking',
  'reactive-sphere-tracking': 'reactive-sphere',
  'pro-smooth-pursuit': 'pro-smooth-pursuit',
  'evasive-slide-track': 'evasive-slide-track',
  'vertical-air-pursuit': 'vertical-air-pursuit',
  'vertical-air-track': 'vertical-air-track',
  'recoil-control': 'recoil-control',
  'pubg-dmr-rhythm': 'pubg-dmr-rhythm',
  'counter-strafe-trainer': 'counter-strafe',
  'deadzone-jiggle-snap': 'deadzone-jiggle-snap',
  'target-switching-swarm': 'target-switching-swarm',
  'target-prioritization': 'target-prioritization',
  'angle-hold-trainer': 'angle-hold',
  'prefire-corner-clearer': 'prefire-corner',
  '180-degree-awareness': '180-awareness',
  'sound-spatial-reflex': 'sound-spatial',
  'instant-response': 'instant-response',
  'high-speed-kinetic-trainer': 'kinetic-trainer',
  'pubg-drive-by': 'pubg-drive-by',
  'pubg-lead-drop': 'pubg-lead-drop',
  'parabolic-air-track': 'parabolic-air-track',
  'pixel-hold-swing': 'pixel-hold-swing',
};

const fpsCategories = [
  {
    name: "Precision Clicking",
    folderName: "fps",
    icon: Crosshair,
    color: "red",
    bgColor: "bg-red-500/10 border-red-500/20 text-red-400",
    textColor: "text-red-400",
    description: "Master flick shots, precision clicking, and cognitive prioritization",
    drills: [
      { name: "Flick Shot Training", folderName: "flick-shot-training", difficulty: "Advanced", duration: "60s", description: "One-tap flick shots with adaptive target windows (150-1000ms) and timer ring feedback" },
      { name: "Micro-Flick Control", folderName: "target-acquisition", difficulty: "Intermediate", duration: "90s", description: "Click 5 targets in brightness order (opacity 1.0→0.4). +1 per set, -1 wrong click." },
      { name: "Target Prioritization Swarm", folderName: "target-prioritization", difficulty: "Advanced", duration: "60s", description: "Clear targets in order of priority: Red (Critical, high value), Blue (Standard), avoid Yellow decoys" },
      { name: "Target Switching Swarm", folderName: "target-switching-swarm", difficulty: "Advanced", duration: "60s", description: "Gridshot speed flick switching: click neon targets as fast as they spawn in a moving dynamic swarm" },
      { name: "Micro-Flick Precision", folderName: "micro-flick-precision", difficulty: "Expert", duration: "60s", description: "Esports micro-flick snaps on extremely compact, fast-respawning headshot-size targets" },
      { name: "S+ Micro-Flick Burst", folderName: "micro-flick-burst", difficulty: "Expert", duration: "60s", description: "S+ Elite: click micro-targets at visual trigger threshold limits (180-220ms)" },
      { name: "S+ Pixel Hold & Lean Swing", folderName: "pixel-hold-swing", difficulty: "Expert", duration: "60s", description: "S+ Elite: hold 4px pixel angles, reacting to 150-180ms lean peeks and ignoring decoy bait peeks" },
      { name: "S+ PUBG DMR Rhythm & Recoil", folderName: "pubg-dmr-rhythm", difficulty: "Expert", duration: "60s", description: "S+ Elite: master vertical recoil reset cadence and tapping rhythm for PUBG DMRs" }
    ]
  },
  {
    name: "Tracking & Switching",
    folderName: "fps",
    icon: Eye,
    color: "blue",
    bgColor: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    textColor: "text-blue-400",
    description: "Smooth aim, reactive tracking, and multi-target flick-switching",
    drills: [
      { name: "Unpredictable Strafe Tracking", folderName: "strafe-tracking", difficulty: "Advanced", duration: "60s", description: "Maintain cursor lock-on targets executing unpredictable, high-rate strafing maneuvers" },
      { name: "Smooth Pursuit Lab", folderName: "pro-smooth-pursuit", difficulty: "Advanced", duration: "60s", description: "Lissajous curve target at 360Hz refresh. +1pt/1.0s on target. Green when tracked." },
      { name: "Target Switch Lab", folderName: "pro-tracking", difficulty: "Advanced", duration: "60s", description: "6 bouncing balls with target switching every 1.5s and +5pts/0.5s tracking ticks" },
      { name: "Vertical Air-Track", folderName: "vertical-air-track", difficulty: "Expert", duration: "60s", description: "Practice vertical and parabolic tracking of targets launched high into air flight paths subject to gravity" },
      { name: "Reactive Sphere Tracking", folderName: "reactive-sphere-tracking", difficulty: "Expert", duration: "60s", description: "Reactive 3D sphere tracking under sudden, unpredictable evasive direction changes" },
      { name: "S+ Parabolic Air-Track", folderName: "parabolic-air-track", difficulty: "Expert", duration: "60s", description: "S+ Elite: track vertical gravity-affected arcs under abrupt mid-air wind drifts" },
      { name: "S+ Evasive Slide & Track", folderName: "evasive-slide-track", difficulty: "Expert", duration: "60s", description: "S+ Elite: track high-velocity sliding and jump-pad boosting targets under recoil shake" },
      { name: "S+ Vertical Air-Pursuit", folderName: "vertical-air-pursuit", difficulty: "Expert", duration: "60s", description: "S+ Elite: track high-altitude flying/diving targets subject to sudden horizontal drafts and recoil screen vibration" },
      { name: "S+ PUBG Passenger Drive-By", folderName: "pubg-drive-by", difficulty: "Expert", duration: "60s", description: "S+ Elite: track targets from a moving passenger vehicle while compensating for speed translation" }
    ]
  },
  {
    name: "Movement & Recoil",
    folderName: "fps",
    icon: Gamepad2,
    color: "green",
    bgColor: "bg-green-500/10 border-green-500/20 text-green-400",
    textColor: "text-green-400",
    description: "Strafing-shooting synchronization, cover peeking, and spray patterns",
    drills: [
      { name: "Counter-Strafe Trainer", folderName: "counter-strafe-trainer", difficulty: "Expert", duration: "60s", description: "Train strafing-shooting sync: click targets exactly at the zero-velocity point of A/D counter-strafes" },
      { name: "Recoil Control Lab", folderName: "recoil-control", difficulty: "Advanced", duration: "60s", description: "Esports recoil control spray simulator: pull down mouse to counter spray vertical S-curve" },
      { name: "Angle Hold & Peek Trainer", folderName: "angle-hold-trainer", difficulty: "Expert", duration: "60s", description: "Train reaction times and crosshair placement against cover peeking, wide swings, and jiggle movements" },
      { name: "Prefire Corner Clearer", folderName: "prefire-corner-clearer", difficulty: "Expert", duration: "60s", description: "Clear defensive angles and corners using A/D strafing controls: shooting while moving incurs error penalties" },
      { name: "S+ Deadzone Jiggle & Snap", folderName: "deadzone-jiggle-snap", difficulty: "Expert", duration: "60s", description: "S+ Elite: shoot micro-targets at the exact 0-velocity deadzone point of AD jiggle strafes" }
    ]
  },
  {
    name: "Reflex & Awareness",
    folderName: "fps",
    icon: Zap,
    color: "amber",
    bgColor: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    textColor: "text-amber-400",
    description: "Instant reflex response, extreme-speed prediction, and peripheral vision",
    drills: [
      { name: "Instant Reflex Test", folderName: "instant-response", difficulty: "Beginner", duration: "60s", description: "Center-flash targets at random 0.8-2.5s with 80-1200ms adaptive window" },
      { name: "Kinetic Target Intercept", folderName: "high-speed-kinetic-trainer", difficulty: "Expert", duration: "60s", description: "Bouncing green target with teleports, combo streaks, and speed acceleration" },
      { name: "180° Peripheral Scan", folderName: "180-degree-awareness", difficulty: "Intermediate", duration: "60s", description: "Targets spawn at extreme screen edges every 250ms with 5 lives system" },
      { name: "3D Audio-Spatial Reflex", folderName: "sound-spatial-reflex", difficulty: "Advanced", duration: "60s", description: "Auditory reflex training using panning sound cues: scroll 360° viewport to locate and shoot targets" },
      { name: "S+ Headshot Reflex & Micro-Adjust", folderName: "headshot-micro-adjust", difficulty: "Expert", duration: "60s", description: "S+ Elite: quick 180° flicks to compact targets spawning outside primary FOV expiring at 180ms" },
      { name: "S+ PUBG Bullet Lead & Drop", folderName: "pubg-lead-drop", difficulty: "Expert", duration: "60s", description: "S+ Elite: long-range sniper calibration compensating for bullet travel delay and gravity drop" }
    ]
  }
];

export default function FPSHubClient() {
  const [isClient, setIsClient] = useState(false);
  const [sensSource, setSensSource] = useState("valorant");
  const [sensValue, setSensValue] = useState("0.35");
  const [dpi, setDpi] = useState("800");
  const [results, setResults] = useState({ 
    valorant: "0.350", cs2: "1.114", apex: "1.114", overwatch: "3.712", siege: "4.298", fortnite: "2.450", cod: "1.114", pubg: "11.026",
    destiny2: "3.712", halo: "1.114", battlefield: "1.114", tf2: "1.114",
    valEdpi: 280, csEdpi: 891 
  });
  const [localScores, setLocalScores] = useState({ recoil: 0, strafe: 0, tracking: 0, reflex: 0, angleHold: 0, prioritization: 0 });
  const [activeCoachId, setActiveCoachId] = useState("athena");
  const [tournamentStress, setTournamentStress] = useState(false);
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [playlistStep, setPlaylistStep] = useState(0);
  const [copiedText, setCopiedText] = useState(null);
  const canvasRef = useRef(null);
  const [drillTiers, setDrillTiers] = useState({});
  const [weaknessData, setWeaknessData] = useState(null);

  const [latencyResult, setLatencyResult] = useState(null);
  const [latencyTesting, setLatencyTesting] = useState(false);

  // Mobile detection and notification state
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [mobileWarningDismissed, setMobileWarningDismissed] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === 'undefined') return false;
      const ua = navigator.userAgent || '';
      const mobileRegex = /Mobi|Android|iPhone|iPad|iPod|Windows Phone|webOS|BlackBerry|Opera Mini|IEMobile|Mobile/i;
      const isMobileDevice = mobileRegex.test(ua) || 
        (navigator.maxTouchPoints > 0 && window.innerWidth < 1024);
      setIsMobile(isMobileDevice);
      return isMobileDevice;
    };
    
    const isMobileDevice = checkMobile();
    
    // Check if warning was previously dismissed in this session
    const dismissed = sessionStorage.getItem('mobileWarningDismissed') === 'true';
    setMobileWarningDismissed(dismissed);
    
    // Show warning on mobile if not dismissed
    if (isMobileDevice && !dismissed) {
      // Show after a short delay
      setTimeout(() => setShowMobileWarning(true), 1500);
    }
  }, []);

  const runLatencyTest = (e) => {
    e.preventDefault();
    const t0 = performance.now();
    setLatencyTesting(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const t1 = performance.now();
        setLatencyResult((t1 - t0).toFixed(1));
        setLatencyTesting(false);
      });
    });
  };

  // Handle mobile drill click
  const handleDrillClick = (e, drillFolderName) => {
    if (isMobile) {
      e.preventDefault();
      setShowMobileWarning(true);
    }
  };

  // Dismiss mobile warning
  const dismissMobileWarning = () => {
    setShowMobileWarning(false);
    setMobileWarningDismissed(true);
    sessionStorage.setItem('mobileWarningDismissed', 'true');
  };

  useEffect(() => {
    setIsClient(true);
    try {
      const savedCoach = localStorage.getItem('activeFpCoach') || 'athena';
      setActiveCoachId(savedCoach);
      setTournamentStress(localStorage.getItem('tournamentStress') === 'true');
      
      const savedPlaylist = sessionStorage.getItem('esportsPlaylist');
      if (savedPlaylist) {
        setActivePlaylist(JSON.parse(savedPlaylist));
        setPlaylistStep(parseInt(sessionStorage.getItem('esportsPlaylistStep') || '0', 10));
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (!isClient) return;
    try {
      const recoil = parseInt(localStorage.getItem('recoilBestScore') || '0', 10);
      const strafeVal = parseInt(localStorage.getItem('counterStrafeBestScore') || '0', 10);
      const prefireVal = parseInt(localStorage.getItem('prefireCornerClearerBestScore') || '0', 10);
      const strafe = Math.round((strafeVal + prefireVal) / 2);
      const smoothPursuitVal = parseInt(localStorage.getItem('proSmoothPursuitBestScore') || '0', 10);
      const strafeTrackingVal = parseInt(localStorage.getItem('trackingBestScore') || '0', 10);
      const verticalAirTrackVal = parseInt(localStorage.getItem('verticalAirTrackBestScore') || '0', 10);
      const tracking = Math.round((smoothPursuitVal + strafeTrackingVal + verticalAirTrackVal) / 3);
      const instantResponseVal = parseInt(localStorage.getItem('instantResponseBest') || '0', 10);
      const kineticVal = parseInt(localStorage.getItem('kineticDrillBestScore') || '0', 10);
      const awarenessVal = parseInt(localStorage.getItem('awarenessDrillBestScore') || '0', 10);
      const soundSpatialVal = parseInt(localStorage.getItem('soundSpatialReflexBestScore') || '0', 10);
      const reflex = Math.round((instantResponseVal + kineticVal + awarenessVal + soundSpatialVal) / 4);
      const angleHoldVal = parseInt(localStorage.getItem('angleHoldBestScore') || '0', 10);
      const targetAcquisitionVal = parseInt(localStorage.getItem('targetAcquisitionBestScore') || '0', 10);
      const angleHold = Math.round((angleHoldVal + targetAcquisitionVal) / 2);
      const proFlickVal = parseInt(localStorage.getItem('proFlickBestScore') || '0', 10);
      const proTrackingVal = parseInt(localStorage.getItem('proTrackingBest') || '0', 10);
      const priorityVal = parseInt(localStorage.getItem('priorityBestScore') || '0', 10);
      const targetSwitchingSwarmVal = parseInt(localStorage.getItem('targetSwitchingSwarmBestScore') || '0', 10);
      const prioritization = Math.round(((proFlickVal / 30 + proTrackingVal / 30 + priorityVal / 100 + targetSwitchingSwarmVal / 100) / 4) * 100);
      
      setLocalScores({ recoil, strafe, tracking, reflex, angleHold, prioritization });

      try {
        setDrillTiers(getAllDrillTiers());
        setWeaknessData(getWeakestPillar());
      } catch (te) {}
    } catch (e) {}
  }, [isClient]);

  const getWeakestLink = () => {
    const { recoil, strafe, tracking, reflex, angleHold, prioritization } = localScores;
    const allZero = [recoil, strafe, tracking, reflex, angleHold, prioritization].every(score => score === 0);
    if (allZero) return 'none';
    
    const rPct = recoil > 0 ? (recoil / 25) * 100 : 0;
    const sPct = strafe > 0 ? (strafe / 15) * 100 : 0;
    const tPct = tracking > 0 ? (tracking / 30) * 100 : 0;
    const refPct = reflex > 0 ? (reflex / 60) * 100 : 0;
    const aPct = angleHold > 0 ? (angleHold / 25) * 100 : 0;
    const pPct = prioritization > 0 ? (prioritization / 100) * 100 : 0;
    
    const minVal = Math.min(rPct, sPct, tPct, refPct, aPct, pPct);
    if (minVal === rPct) return 'recoil';
    if (minVal === sPct) return 'strafe';
    if (minVal === tPct) return 'tracking';
    if (minVal === refPct) return 'reflex';
    if (minVal === aPct) return 'angleHold';
    return 'prioritization';
  };

  useEffect(() => {
    if (!isClient) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const targets = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      targets.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 20 + 10,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        angle: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.01,
        opacity: Math.random() * 0.12 + 0.04
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      targets.forEach((t) => {
        t.x += t.vx;
        t.y += t.vy;
        t.angle += t.spin;

        if (t.x < 0 || t.x > canvas.width) t.vx *= -1;
        if (t.y < 0 || t.y > canvas.height) t.vy *= -1;

        ctx.strokeStyle = `rgba(239, 68, 68, ${t.opacity})`;
        ctx.lineWidth = 1;
        
        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.rotate(t.angle);

        ctx.beginPath();
        ctx.arc(0, 0, t.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-t.radius - 4, 0);
        ctx.lineTo(-t.radius + 2, 0);
        ctx.moveTo(t.radius - 2, 0);
        ctx.lineTo(t.radius + 4, 0);
        ctx.moveTo(0, -t.radius - 4);
        ctx.lineTo(0, -t.radius + 2);
        ctx.moveTo(0, t.radius - 2);
        ctx.lineTo(0, t.radius + 4);
        ctx.stroke();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [isClient]);

  useEffect(() => {
    const val = parseFloat(sensValue) || 0;
    const currentDpi = parseFloat(dpi) || 800;
    let valSens = 0;
    
    if (sensSource === "valorant") {
      valSens = val;
    } else if (sensSource === "cs2" || sensSource === "apex" || sensSource === "cod" || sensSource === "halo" || sensSource === "battlefield" || sensSource === "tf2") {
      valSens = val / 3.18181818;
    } else if (sensSource === "overwatch" || sensSource === "destiny2") {
      valSens = val / 10.6060606;
    } else if (sensSource === "siege") {
      valSens = val / 12.28;
    } else if (sensSource === "fortnite") {
      valSens = val / 7.0;
    } else if (sensSource === "pubg") {
      valSens = val / 31.503;
    }

    const csSens = valSens * 3.18181818;
    const apexSens = valSens * 3.18181818;
    const owSens = valSens * 10.6060606;
    const siegeSens = valSens * 12.28;
    const fortniteSens = valSens * 7.0;
    const codSens = valSens * 3.18181818;
    const pubgSens = valSens * 31.503;
    const destiny2Sens = valSens * 10.6060606;
    const haloSens = valSens * 3.18181818;
    const bfSens = valSens * 3.18181818;
    const tf2Sens = valSens * 3.18181818;
    
    const valEdpi = valSens * currentDpi;
    const csEdpi = csSens * currentDpi;

    setResults({
      valorant: valSens.toFixed(3),
      cs2: csSens.toFixed(3),
      apex: apexSens.toFixed(3),
      overwatch: owSens.toFixed(3),
      siege: siegeSens.toFixed(3),
      fortnite: fortniteSens.toFixed(3),
      cod: codSens.toFixed(3),
      pubg: pubgSens.toFixed(3),
      destiny2: destiny2Sens.toFixed(3),
      halo: haloSens.toFixed(3),
      battlefield: bfSens.toFixed(3),
      tf2: tf2Sens.toFixed(3),
      valEdpi: Math.round(valEdpi),
      csEdpi: Math.round(csEdpi)
    });
  }, [sensSource, sensValue, dpi]);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Advanced': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Expert': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getCategoryGradient = (category) => {
    switch(category) {
      case 'Precision Clicking': return 'from-red-500 to-orange-500';
      case 'Tracking & Switching': return 'from-blue-500 to-cyan-500';
      case 'Movement & Recoil': return 'from-green-500 to-emerald-500';
      case 'Reflex & Awareness': return 'from-amber-500 to-yellow-500';
      default: return 'from-red-500 to-orange-500';
    }
  };

  const getCategoryIconBg = (category) => {
    switch(category) {
      case 'Precision Clicking': return 'bg-red-500/10 border-red-500/20 text-red-400';
      case 'Tracking & Switching': return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
      case 'Movement & Recoil': return 'bg-green-500/10 border-green-500/20 text-green-400';
      case 'Reflex & Awareness': return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
      default: return 'bg-red-500/10 border-red-500/20 text-red-400';
    }
  };

  const getCategoryCardBorder = (category) => {
    switch(category) {
      case 'Precision Clicking': return 'hover:border-red-500/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]';
      case 'Tracking & Switching': return 'hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]';
      case 'Movement & Recoil': return 'hover:border-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]';
      case 'Reflex & Awareness': return 'hover:border-amber-500/30 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]';
      default: return 'hover:border-red-500/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]';
    }
  };

  const totalDrills = fpsCategories.reduce((acc, cat) => acc + cat.drills.length, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "FPS Aim Training Drills",
    "url": "https://skilldrills.online/drills/fps",
    "description": `${totalDrills} free FPS aim training drills for Valorant, CS2, Apex Legends, Overwatch 2 and all FPS games. 4 categories: Aim Accuracy, Tracking, Reaction Speed, and Awareness.`,
    "isPartOf": { "@type": "WebSite", "name": "SkillDrills", "url": "https://skilldrills.online" },
    "about": { "@type": "Thing", "name": "FPS Gaming Aim Training" },
    "numberOfItems": totalDrills,
    "itemListElement": fpsCategories.flatMap(cat => cat.drills).map((drill, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "WebApplication",
        "name": drill.name,
        "url": `https://skilldrills.online/drills/fps/${drill.folderName}`,
        "description": drill.description,
        "applicationCategory": "GameApplication",
        "operatingSystem": "Web"
      }
    }))
  };

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080d1a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-red-400 font-mono tracking-widest uppercase animate-pulse">Initializing Combat Core...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 font-sans selection:bg-red-500/30 selection:text-red-350 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-slate-950 to-slate-950 pointer-events-none z-0" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.45)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(18,24,38,0.45)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      {/* Mobile Warning Modal */}
      {showMobileWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-red-500/30 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl shadow-red-500/10 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <Smartphone className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Mobile Device Detected</h3>
                <p className="text-xs text-red-400 font-mono uppercase tracking-wider">DESKTOP REQUIRED</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6 text-sm text-slate-300 leading-relaxed">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <p>These FPS aim training drills require a <span className="text-white font-semibold">physical mouse</span> and <span className="text-white font-semibold">keyboard</span> to function correctly.</p>
              </div>
              <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 text-xs text-slate-400 space-y-1.5">
                <p className="font-bold text-red-400 uppercase text-[10px] tracking-wider mb-1">Why mobile doesn't work:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Touchscreens lack precise cursor control</li>
                  <li>Pointer Lock API requires a mouse</li>
                  <li>Drills use raw mouse input for 1:1 tracking</li>
                  <li>Physical mouse movement is essential for muscle memory</li>
                </ul>
              </div>
              <p className="text-xs text-slate-500 italic">
                Please switch to a desktop or laptop with a mouse for the full training experience.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={dismissMobileWarning}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                I Understand
              </button>
              <button
                onClick={dismissMobileWarning}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold rounded-lg text-xs uppercase tracking-wider transition"
              >
                Continue Anyway
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd)
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
            <li><Link href="/" className="flex items-center gap-1.5 hover:text-red-400 transition-colors"><Home className="w-3.5 h-3.5" /><span>HQ</span></Link></li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li><Link href="/drills" className="hover:text-red-400 transition-colors">Drills</Link></li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li><span className="text-red-400 font-bold" aria-current="page">FPS Sector</span></li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-10 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 shadow-inner shrink-0">
              <Gamepad2 className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-red-500/15 border border-red-500/30 text-red-300 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                <Activity className="w-3 h-3 animate-pulse" />
                TACTICAL AIM LAB SECTOR
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">FPS Aim & Reflex</h1>
              <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-xl leading-relaxed">
                Hone mouse raw-input reflexes, smooth target tracking, and extreme 180° awareness indicators.
              </p>
              {/* Mobile warning badge */}
              {isMobile && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-400 text-xs">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="font-mono font-bold uppercase tracking-wider">Desktop Recommended</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 self-start md:self-center">
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-350 rounded-md text-xs font-mono font-semibold">🔫 VALORANT</span>
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-350 rounded-md text-xs font-mono font-semibold">💣 CS2_AIM</span>
          </div>
        </div>

        {/* Diagnostic Stats & Interactive Sensitivity Converter */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between text-center lg:text-left backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-900 pb-3">
                <span className="text-xs font-mono font-bold uppercase text-slate-400 tracking-widest">DRILLS_CONNECTED</span>
                <Cpu className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-4xl font-extrabold text-white tracking-tight">{totalDrills}</p>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">Esports Portals Loaded</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-900 text-xs text-slate-400 leading-relaxed font-mono">
              Raw-input pointer interfaces align pixel coordinates with standard operating system desktop sensitivity maps.
            </div>
          </div>

          {/* Interactive Sensitivity Converter Widget */}
          <div className="lg:col-span-2 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between backdrop-blur-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full pointer-events-none" />
            <div className="flex items-center justify-between mb-3 text-red-400 border-b border-slate-900 pb-3">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 animate-pulse" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Cross-Game Sensitivity Converter</h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">STANDARDIZED: eDPI_CALC</span>
            </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Source Game</label>
                <select 
                  value={sensSource}
                  onChange={(e) => setSensSource(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-red-500/50 transition"
                >
                  <option value="valorant">Valorant</option>
                  <option value="cs2">CS2 / Global Offensive</option>
                  <option value="apex">Apex Legends</option>
                  <option value="overwatch">Overwatch 2</option>
                  <option value="siege">Rainbow Six Siege</option>
                  <option value="fortnite">Fortnite</option>
                  <option value="cod">Call of Duty / Warzone</option>
                  <option value="pubg">PUBG</option>
                  <option value="destiny2">Destiny 2</option>
                  <option value="halo">Halo Infinite</option>
                  <option value="battlefield">Battlefield 2042</option>
                  <option value="tf2">Team Fortress 2</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Sensitivity</label>
                <input 
                  type="number"
                  step="0.01"
                  value={sensValue}
                  onChange={(e) => setSensValue(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-red-500/50 transition"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Mouse DPI</label>
                <input 
                  type="number"
                  step="50"
                  value={dpi}
                  onChange={(e) => setDpi(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-red-500/50 transition"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3.5 p-3.5 bg-slate-950 rounded-xl border border-slate-900">
              <div className="text-center sm:text-left bg-slate-900/20 p-2 rounded border border-slate-900/50">
                <p className="text-[9px] text-slate-550 font-mono font-bold uppercase">VALORANT</p>
                <p className="text-sm font-extrabold text-white font-mono">{results.valorant}</p>
                <p className="text-[8px] text-slate-650 font-mono">eDPI: {results.valEdpi}</p>
              </div>
              <div className="text-center sm:text-left bg-slate-900/20 p-2 rounded border border-slate-900/50">
                <p className="text-[9px] text-slate-550 font-mono font-bold uppercase">CS2 / CS:GO</p>
                <p className="text-sm font-extrabold text-white font-mono">{results.cs2}</p>
                <p className="text-[8px] text-slate-650 font-mono">eDPI: {results.csEdpi}</p>
              </div>
              <div className="text-center sm:text-left bg-slate-900/20 p-2 rounded border border-slate-900/50">
                <p className="text-[9px] text-slate-550 font-mono font-bold uppercase">APEX LEGENDS</p>
                <p className="text-sm font-extrabold text-white font-mono">{results.apex}</p>
                <p className="text-[8px] text-slate-650 font-mono">eDPI: {results.csEdpi}</p>
              </div>
              <div className="text-center sm:text-left bg-slate-900/20 p-2 rounded border border-slate-900/50">
                <p className="text-[9px] text-slate-550 font-mono font-bold uppercase">OVERWATCH 2</p>
                <p className="text-sm font-extrabold text-white font-mono">{results.overwatch}</p>
                <p className="text-[8px] text-slate-650 font-mono">eDPI: {Math.round(results.overwatch * dpi)}</p>
              </div>
              <div className="text-center sm:text-left bg-slate-900/20 p-2 rounded border border-slate-900/50">
                <p className="text-[9px] text-slate-550 font-mono font-bold uppercase">R6 SIEGE</p>
                <p className="text-sm font-extrabold text-white font-mono">{results.siege}</p>
                <p className="text-[8px] text-slate-650 font-mono">eDPI: {Math.round(results.siege * dpi)}</p>
              </div>
              <div className="text-center sm:text-left bg-slate-900/20 p-2 rounded border border-slate-900/50">
                <p className="text-[9px] text-slate-550 font-mono font-bold uppercase">FORTNITE</p>
                <p className="text-sm font-extrabold text-white font-mono">{results.fortnite}</p>
                <p className="text-[8px] text-slate-650 font-mono">eDPI: {Math.round(results.fortnite * dpi)}</p>
              </div>
              <div className="text-center sm:text-left bg-slate-900/20 p-2 rounded border border-slate-900/50">
                <p className="text-[9px] text-slate-550 font-mono font-bold uppercase">COD/WARZONE</p>
                <p className="text-sm font-extrabold text-white font-mono">{results.cod}</p>
                <p className="text-[8px] text-slate-650 font-mono">eDPI: {results.csEdpi}</p>
              </div>
              <div className="text-center sm:text-left bg-slate-900/20 p-2 rounded border border-slate-900/50">
                <p className="text-[9px] text-slate-550 font-mono font-bold uppercase">PUBG</p>
                <p className="text-sm font-extrabold text-white font-mono">{results.pubg}</p>
                <p className="text-[8px] text-slate-650 font-mono">eDPI: {Math.round(results.pubg * dpi)}</p>
              </div>
              <div className="text-center sm:text-left bg-slate-900/20 p-2 rounded border border-slate-900/50">
                <p className="text-[9px] text-slate-550 font-mono font-bold uppercase">DESTINY 2</p>
                <p className="text-sm font-extrabold text-white font-mono">{results.destiny2}</p>
                <p className="text-[8px] text-slate-650 font-mono">eDPI: {Math.round(results.destiny2 * dpi)}</p>
              </div>
              <div className="text-center sm:text-left bg-slate-900/20 p-2 rounded border border-slate-900/50">
                <p className="text-[9px] text-slate-550 font-mono font-bold uppercase">HALO INFINITE</p>
                <p className="text-sm font-extrabold text-white font-mono">{results.halo}</p>
                <p className="text-[8px] text-slate-650 font-mono">eDPI: {Math.round(results.halo * dpi)}</p>
              </div>
              <div className="text-center sm:text-left bg-slate-900/20 p-2 rounded border border-slate-900/50">
                <p className="text-[9px] text-slate-550 font-mono font-bold uppercase">BATTLEFIELD</p>
                <p className="text-sm font-extrabold text-white font-mono">{results.battlefield}</p>
                <p className="text-[8px] text-slate-650 font-mono">eDPI: {Math.round(results.battlefield * dpi)}</p>
              </div>
              <div className="text-center sm:text-left bg-slate-900/20 p-2 rounded border border-slate-900/50">
                <p className="text-[9px] text-slate-550 font-mono font-bold uppercase">TEAM FORTRESS 2</p>
                <p className="text-sm font-extrabold text-white font-mono">{results.tf2}</p>
                <p className="text-[8px] text-slate-650 font-mono">eDPI: {Math.round(results.tf2 * dpi)}</p>
              </div>
              <div className="col-span-2 sm:col-span-4 lg:col-span-6 text-center bg-red-950/20 p-2.5 rounded-xl border border-red-500/20 shadow-inner flex items-center justify-between px-6 mt-1">
                <span className="text-[10px] text-red-400 font-mono font-bold uppercase tracking-wider flex items-center gap-1.5"><Crosshair className="w-3.5 h-3.5" /> PHYSICAL 360° ROTATION DISTANCE</span>
                <span className="text-sm font-extrabold text-red-400 font-mono">
        {results.valEdpi > 0 ? (31530 / results.valEdpi).toFixed(1) : 0} cm / 360°
                </span>
            </div>
            </div>
          </div>
        </div>

        {/* Pro Esports Calibration & Warmup Routines Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Col 1: Esports Playlist Routine Manager */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-3xl rounded-full" />
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-900 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-slate-400 tracking-widest">Esports Warmup Routine</span>
                </div>
                <Zap className="w-4 h-4 text-yellow-550 animate-pulse animate-duration-1000 text-yellow-450" />
              </div>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed font-sans">
                Queue multiple S+ caliber drills sequentially to warm up motor speed and reaction cadence.
              </p>
              
              {activePlaylist ? (
                <div className="p-4 bg-[#0c1224] rounded-xl border border-slate-900 mb-4 text-xs font-mono">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-yellow-400 font-bold uppercase">Routine Active</span>
                    <span className="text-slate-400">Stage {playlistStep + 1} of {activePlaylist.length}</span>
                  </div>
                  <p className="text-white font-bold mb-3">
                    Current: {activePlaylist[playlistStep].replace(/-/g, ' ').toUpperCase()}
                  </p>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-yellow-500" style={{ width: `${((playlistStep) / activePlaylist.length) * 100}%` }} />
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/drills/fps/${activePlaylist[playlistStep]}`}
                      onClick={(e) => isMobile && handleDrillClick(e, activePlaylist[playlistStep])}
                      className="w-full text-center py-2 bg-yellow-600 hover:bg-yellow-750 text-slate-950 font-bold rounded text-[10px] uppercase transition shadow-md shadow-yellow-500/20"
                    >
                      Resume Routine
                    </Link>
                    <button
                      onClick={() => {
                        sessionStorage.removeItem('esportsPlaylist');
                        sessionStorage.removeItem('esportsPlaylistStep');
                        setActivePlaylist(null);
                        setPlaylistStep(0);
                      }}
                      className="px-3 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 font-bold rounded text-[10px] uppercase transition"
                    >
                      Abort
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 mb-4">
                  <button
                    onClick={() => {
                      const queue = ["flick-shot-training", "strafe-tracking", "recoil-control"];
                      sessionStorage.setItem('esportsPlaylist', JSON.stringify(queue));
                      sessionStorage.setItem('esportsPlaylistStep', '0');
                      setActivePlaylist(queue);
                      setPlaylistStep(0);
                    }}
                    className="w-full p-3 bg-slate-900/40 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 text-left rounded-xl transition flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-white font-bold text-xs uppercase tracking-wider group-hover:text-red-405 transition-colors">Daily Esports Warmup</h4>
                      <p className="text-[9px] text-slate-500 font-mono uppercase mt-0.5">Flick Shot → Strafe → Recoil (6 mins)</p>
                    </div>
                    <span className="text-[10px] font-bold text-red-500 font-mono">START →</span>
                  </button>
                  <button
                    onClick={() => {
                      const queue = ["pixel-hold-swing", "parabolic-air-track", "headshot-micro-adjust"];
                      sessionStorage.setItem('esportsPlaylist', JSON.stringify(queue));
                      sessionStorage.setItem('esportsPlaylistStep', '0');
                      setActivePlaylist(queue);
                      setPlaylistStep(0);
                    }}
                    className="w-full p-3 bg-slate-900/40 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 text-left rounded-xl transition flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-white font-bold text-xs uppercase tracking-wider group-hover:text-red-405 transition-colors">Aim God Mastery Routine</h4>
                      <p className="text-[9px] text-slate-500 font-mono uppercase mt-0.5">Pixel Hold → Parabolic → Headshot (6 mins)</p>
                    </div>
                    <span className="text-[10px] font-bold text-red-500 font-mono">START →</span>
                  </button>
                </div>
              )}
            </div>
            <div className="text-[9px] text-slate-550 font-mono leading-normal mt-2 border-t border-slate-900/80 pt-2.5">
              Playlist state is cached dynamically across page transitions.
            </div>
          </div>

          {/* Col 2: Tournament Stress Simulator & Trajectory Options */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-3xl rounded-full" />
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-900 pb-3">
                <span className="text-xs font-mono font-bold uppercase text-slate-400 tracking-widest">Esports Stress Calibrator</span>
                <Settings className="w-4 h-4 text-red-500 animate-spin animate-duration-5000" />
              </div>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed font-sans">
                Stress-test raw reflexes under simulated competition environments: shakes, flashbangs, and auditory crowd noise.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#0c1224] rounded-xl border border-slate-900">
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase">Tournament Stress Mode</h4>
                    <p className="text-[8.5px] text-slate-500 font-mono mt-0.5">Simulates flashbangs, screen shakes & crowd static</p>
                  </div>
                  <button
                    onClick={() => {
                      const next = !tournamentStress;
                      setTournamentStress(next);
                      localStorage.setItem('tournamentStress', next ? 'true' : 'false');
                    }}
                    className={`px-3 py-1.5 rounded font-mono font-bold uppercase text-[9px] border transition ${
                      tournamentStress 
                        ? 'bg-red-955 text-red-404 border-red-500/35 shadow-md shadow-red-550/10' 
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}
                  >
                    {tournamentStress ? 'ACTIVE_ON' : 'DEACTIVE'}
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#0c1224] rounded-xl border border-slate-900">
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase">Input Trajectory Path</h4>
                    <p className="text-[8.5px] text-slate-500 font-mono mt-0.5">Renders fading vector trails behind your crosshair</p>
                  </div>
                  <span className="px-2.5 py-1 bg-green-950/40 text-green-400 border border-green-500/20 rounded font-mono text-[8px] font-bold">
                    ALWAYS_ENABLED
                  </span>
                </div>
                <div className="p-3 bg-[#0c1224] rounded-xl border border-slate-900 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-white font-bold text-xs uppercase">Reflex Latency Profiler</h4>
                      <p className="text-[8.5px] text-slate-500 font-mono mt-0.5">Measures screen-to-render event paint latency</p>
                    </div>
                    <button
                      onClick={runLatencyTest}
                      className={`px-2.5 py-1.5 rounded font-mono font-bold uppercase text-[9px] border transition ${
                        latencyTesting
                          ? "bg-yellow-600 border-yellow-500 text-slate-950 animate-pulse"
                          : "bg-slate-950 border-slate-800 text-red-400 hover:text-red-300"
                      }`}
                    >
                      {latencyTesting ? "WAIT..." : "TEST NOW"}
                    </button>
                  </div>
                  {latencyResult && (
                    <div className="flex justify-between items-center text-[10px] font-mono border-t border-slate-900/60 pt-2 mt-0.5">
                      <span className="text-slate-550">LATEST DELAY:</span>
                      <span className={`font-bold ${parseFloat(latencyResult) < 16 ? "text-green-400" : "text-yellow-400"}`}>
                        {latencyResult} ms ({parseFloat(latencyResult) < 16 ? "OPTIMAL" : "DELAYED"})
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="text-[9px] text-slate-550 font-mono leading-normal mt-2 border-t border-slate-900/80 pt-2.5">
              Drills automatically check local variables on execution launch.
            </div>
          </div>

          {/* Col 3: Pro Esports Calibration Advisor */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-3xl rounded-full" />
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-900 pb-3">
                <span className="text-xs font-mono font-bold uppercase text-slate-400 tracking-widest">Esports Config Generator</span>
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
              
              {(() => {
                const weakest = getWeakestLink();
                let advice = "No training logs detected. Complete any drill to generate config binds.";
                let bindCmd = "";
                
                if (weakest !== 'none') {
                  const csSens = results.cs2;
                  
                  if (weakest === 'recoil' || weakest === 'angleHold') {
                    advice = `High recoil sway/angle drift. Lowering sens improves deceleration.`;
                    bindCmd = `sensitivity ${(csSens * 0.92).toFixed(3)}; cl_crosshairsize 1.5;`;
                  } else {
                    advice = `Aim lag detected during snap/pursuits. Raising sens boosts tracking response.`;
                    bindCmd = `sensitivity ${(csSens * 1.08).toFixed(3)}; cl_crosshairsize 2.5;`;
                  }
                }
                
                return (
                  <div className="space-y-4">
                    <div className="bg-slate-900/30 border border-slate-900 p-3.5 rounded-xl">
                      <h4 className="text-white font-bold text-xs uppercase mb-1">Calibration Recommendation</h4>
                      <p className="text-[10px] text-slate-400 leading-normal font-sans italic">
                        "{advice}"
                      </p>
                    </div>
                    {bindCmd ? (
                      <div className="bg-slate-950 p-2.5 rounded border border-slate-900 text-xs font-mono relative">
                        <div className="flex justify-between items-center mb-1 text-[8.5px] text-slate-550 uppercase">
                          <span>CS2/Valorant Console Bind</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(bindCmd);
                              setCopiedText("Copied!");
                              setTimeout(() => setCopiedText(null), 2000);
                            }}
                            className="text-red-400 hover:text-red-300 font-bold uppercase"
                          >
                            {copiedText || 'Copy'}
                          </button>
                        </div>
                        <input
                          type="text"
                          readOnly
                          value={bindCmd}
                          className="w-full bg-transparent text-cyan-400 text-[10px] focus:outline-none font-mono"
                        />
                      </div>
                    ) : (
                      <p className="text-[10px] text-slate-550 font-mono italic text-center py-2">
                        Calibration advice unlocks after your first score.
                      </p>
                    )}
                  </div>
                );
              })()}
            </div>
            <div className="text-[9px] text-slate-550 font-mono leading-normal mt-2 border-t border-slate-900/80 pt-2.5">
              Calculates sensitivity vectors dynamically from diagnostic scores.
            </div>
          </div>
        </div>

        {/* Global Esports Coaching Academy & Calibration Guide */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 mb-12 relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-red-500 animate-pulse" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">Global Pro Coach Academy & Diagnostics</h3>
            </div>
            <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/25 px-2.5 py-0.5 rounded-full font-mono font-bold self-start sm:self-center">
              MULTI-MILLION DOLLAR S+ PRACTICE SUITE
            </span>
          </div>

          {/* Coach Selection Grid */}
          <div className="mb-8 bg-slate-900/10 p-4 rounded-xl border border-slate-900">
            <p className="text-[10px] text-slate-550 font-mono font-bold uppercase tracking-wider mb-3">SELECT YOUR ACTIVE COACH FOR VOICE & PRESCRIPTIONS:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {COACHES.map(c => {
                const isActive = activeCoachId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveCoachId(c.id);
                      localStorage.setItem('activeFpCoach', c.id);
                      speakCoachText(c.id, getCoachResponse(c.id, 'start', 'Tactical HQ').text, true);
                    }}
                    className={`flex flex-col items-center justify-between p-3 rounded-lg border transition-all text-center ${
                      isActive 
                        ? `bg-slate-900/80 border-red-500/50 shadow-md ${c.glowColor}` 
                        : 'bg-slate-900/25 border-slate-900 hover:border-slate-800'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${c.avatarColor} flex items-center justify-center text-lg mb-2.5 border ${isActive ? 'border-white/20' : 'border-transparent'}`}>
                      {c.avatarText}
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-400'}`}>{c.name}</h4>
                      <p className="text-[7.5px] text-slate-550 uppercase tracking-wider font-mono mt-0.5">{c.title.split(' ')[0]} SPECIALIST</p>
                    </div>
                    {isActive && (
                      <span className="mt-2 px-1.5 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded text-[7px] font-mono font-bold uppercase tracking-wider">
                        ACTIVE COACH
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Coach Dashboard Roster Display & AI Diagnostics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-slate-350">
            
            {/* Active Coach Bio Card */}
            {(() => {
              const coach = COACHES.find(c => c.id === activeCoachId) || COACHES[0];
              return (
                <div className="bg-slate-900/30 border border-slate-900 hover:border-slate-850 rounded-xl p-5 flex flex-col justify-between backdrop-blur-sm relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${coach.avatarColor} opacity-5 blur-2xl rounded-full`} />
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${coach.avatarColor} flex items-center justify-center text-2xl border border-white/10 shadow-lg`}>
                        {coach.avatarText}
                      </div>
                      <div>
                        <h4 className="text-white font-extrabold text-sm uppercase tracking-wide">{coach.name}</h4>
                        <span className="text-[9px] text-red-400 font-mono uppercase font-bold">{coach.title}</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-400 leading-relaxed font-sans mb-4">
                      {coach.description}
                    </p>
                    
                    <div className="space-y-2 text-[10px] font-mono">
                      <div className="flex justify-between border-b border-slate-900/80 pb-1.5">
                        <span className="text-slate-550 uppercase">Primary Focus:</span>
                        <span className="text-slate-300 font-semibold">{coach.gameFocus}</span>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span className="text-slate-550 uppercase">Voice Tone:</span>
                        <span className="text-slate-300 font-semibold uppercase">{coach.voiceSettings.gender} / speed {coach.voiceSettings.rate}x</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => speakCoachText(coach.id, getCoachResponse(coach.id, 'start', 'Antigravity Aim Lab').text, true)}
                    className="w-full mt-5 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 text-slate-300 font-mono font-bold text-[10px] rounded-lg transition uppercase flex items-center justify-center gap-2 shadow-inner"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                    Test Coach Voice
                  </button>
                </div>
              );
            })()}

            {/* AI Diagnostics & Personalized Training Prescription */}
            <div className="bg-slate-900/30 border border-slate-900 hover:border-slate-850 rounded-xl p-5 flex flex-col justify-between backdrop-blur-sm relative">
              <div>
                <div className="flex items-center gap-2 mb-3 border-b border-slate-900 pb-2">
                  <MessageSquare className="w-4 h-4 text-red-400" />
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest">COACH DIAGNOSTICS & ROADMAP</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-350 font-sans italic pr-2">
                  "{getCoachDashboardRecommendation(activeCoachId, localScores)}"
                </p>
              </div>
              
              {(() => {
                if (weaknessData && weaknessData.recommendation) {
                  const rec = weaknessData.recommendation;
                  return (
                    <div className="mt-4 pt-3 border-t border-slate-900">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[9px] font-mono text-red-400 font-bold uppercase tracking-widest flex items-center gap-1">
                          <Activity className="w-3.5 h-3.5 text-red-500 animate-pulse" /> AI COACH RECOMMENDS
                        </span>
                        <span className="text-[8px] font-mono text-slate-550 uppercase">
                          Weakest: {rec.pillarLabel} ({weaknessData.score}%)
                        </span>
                      </div>
                      <Link 
                        href={rec.drill.path || '#'}
                        onClick={(e) => isMobile && handleDrillClick(e, rec.drill.path?.split('/').pop())}
                        className="flex items-center justify-between w-full py-2 px-3 bg-red-950/40 hover:bg-red-900/30 border border-red-500/20 hover:border-red-500/40 rounded-lg transition group"
                      >
                        <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider group-hover:text-red-300">{rec.drill.name}</span>
                        <Play className="w-3.5 h-3.5 text-red-500 fill-current" />
                      </Link>
                    </div>
                  );
                }
                
                const weakest = getWeakestLink();
                if (weakest === 'none') return null;
                return (
                  <div className="mt-4 pt-3 border-t border-slate-900 flex justify-between items-center">
                    <span className="text-[9px] font-mono text-red-400 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-red-500 animate-pulse" /> RECOMMENDED DRILL
                    </span>
                    <Link 
                      href={weakest === 'recoil' ? "/drills/fps/recoil-control" :
                            weakest === 'strafe' ? "/drills/fps/counter-strafe-trainer" :
                            weakest === 'tracking' ? "/drills/fps/pro-smooth-pursuit" :
                            weakest === 'reflex' ? "/drills/fps/instant-response" :
                            weakest === 'angleHold' ? "/drills/fps/angle-hold-trainer" :
                            "/drills/fps/target-prioritization"}
                      onClick={(e) => isMobile && handleDrillClick(e, weakest)}
                      className="text-[9px] font-mono font-bold bg-red-600 hover:bg-red-700 text-white px-3.5 py-1.5 rounded transition uppercase tracking-wider shadow shadow-red-500/20"
                    >
                      Launch Drill
                    </Link>
                  </div>
                );
              })()}
            </div>

            {/* Esports Conditioning Index Progress Bars */}
            <div className="bg-slate-900/30 border border-slate-900 hover:border-slate-850 rounded-xl p-5 flex flex-col justify-between backdrop-blur-sm">
              <div>
                <div className="flex items-center gap-2 mb-4 border-b border-slate-900 pb-2">
                  <Award className="w-4 h-4 text-yellow-500 animate-pulse" />
                  <span className="text-[10px] text-slate-400 block uppercase font-mono tracking-widest">Esports Conditioning Index</span>
                </div>
                
                <div className="space-y-2.5 font-mono text-[10px]">
                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-slate-400 font-bold">Spray Control:</span>
                      <span className="text-white font-bold">{Math.min(100, Math.round((localScores.recoil / 25) * 100))}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: `${Math.min(100, Math.round((localScores.recoil / 25) * 100))}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-slate-400 font-bold">Stop Sync:</span>
                      <span className="text-white font-bold">{Math.min(100, Math.round((localScores.strafe / 15) * 100))}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: `${Math.min(100, Math.round((localScores.strafe / 15) * 100))}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-slate-400 font-bold">Pursuit Track:</span>
                      <span className="text-white font-bold">{Math.min(100, Math.round((localScores.tracking / 30) * 100))}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${Math.min(100, Math.round((localScores.tracking / 30) * 100))}%` }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-slate-400 font-bold">Reflex React:</span>
                      <span className="text-white font-bold">{Math.min(100, Math.round((localScores.reflex / 60) * 100))}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, Math.round((localScores.reflex / 60) * 100))}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-slate-400 font-bold">Angle Hold:</span>
                      <span className="text-white font-bold">{Math.min(100, Math.round((localScores.angleHold / 25) * 100))}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: `${Math.min(100, Math.round((localScores.angleHold / 25) * 100))}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-slate-400 font-bold">Priorities:</span>
                      <span className="text-white font-bold">{Math.min(100, Math.round((localScores.prioritization / 100) * 100))}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-pink-500" style={{ width: `${Math.min(100, Math.round((localScores.prioritization / 100) * 100))}%` }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-[9px] text-slate-550 leading-relaxed border-t border-slate-900 pt-2.5 mt-3">
                Conditioning metrics automatically refresh based on your locally persisted records.
              </div>
            </div>

          </div>
        </div>

        {/* Drills Grid by Category */}
        {fpsCategories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <div key={category.name} className="mb-14 relative">
              
              <div className="flex items-center gap-2 mb-6 border-b border-slate-900 pb-3">
                <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${getCategoryGradient(category.name)}`} />
                <h2 className="text-lg font-bold uppercase tracking-wider text-white font-mono">{category.name}</h2>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-500">
                  {category.drills.length} DRILL{category.drills.length > 1 ? 'S' : ''}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.drills.map((drill, index) => {
                  const drillPath = `/drills/${category.folderName}/${drill.folderName}`;
                  const drillId = FOLDER_TO_DRILL_ID[drill.folderName];
                  const tierInfo = drillId && drillTiers[drillId] ? drillTiers[drillId] : null;
                  const trend = drillId ? getProgressionTrend(drillId) : 'insufficient';
                  const trendDisplay = getTrendDisplay(trend);
                  return (
                    <Link 
                      key={index} 
                      href={drillPath}
                      onClick={(e) => isMobile && handleDrillClick(e, drill.folderName)}
                      className={`group relative overflow-hidden bg-slate-950/80 border border-slate-900 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-1 focus:ring-red-500/50 ${getCategoryCardBorder(category.name)}`}
                      aria-label={`${drill.name} - ${drill.description}. Difficulty: ${drill.difficulty}. Duration: ${drill.duration}.`}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-2.5 rounded-lg border ${getCategoryIconBg(category.name)}`}>
                            <CategoryIcon className="w-5 h-5" />
                          </div>
                          <div className="flex items-center gap-1.5">
                            {tierInfo && tierInfo.tier !== 'silver' && (
                              <div className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wide border ${tierInfo.display.bgColor} ${tierInfo.display.borderColor} ${tierInfo.display.textColor}`}>
                                {tierInfo.display.icon} {tierInfo.display.label}
                              </div>
                            )}
                            <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide border uppercase ${getDifficultyColor(drill.difficulty)}`}>
                              {drill.difficulty}
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="text-base font-bold text-white mb-2 group-hover:text-red-400 transition-colors uppercase tracking-tight font-mono">
                          {drill.name}
                        </h3>
                        
                        <p className="text-xs text-slate-400 mb-4 leading-relaxed min-h-[48px]">
                          {drill.description}
                        </p>
                        
                        <div className="flex items-center gap-4 mb-4 text-[10px] font-mono text-slate-500 border-b border-slate-900 pb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{drill.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Cpu className="w-3.5 h-3.5" />
                            <span>Aim Engine</span>
                          </div>
                          {trend !== 'insufficient' && (
                            <div className="flex items-center gap-0.5 ml-auto" style={{ color: trendDisplay.color }}>
                              <span className="text-sm font-bold">{trendDisplay.arrow}</span>
                              <span className="text-[8px] uppercase">{trendDisplay.label}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{category.name}</span>
                          <div className="flex items-center gap-1 text-red-400 group-hover:gap-2 transition-all font-bold text-xs uppercase tracking-widest font-mono">
                            <span>EXEC_DRILL</span>
                            <Play className="w-3.5 h-3.5 fill-current" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Training Guide Section */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-8 mt-12 relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-6 flex items-center gap-2 font-mono">
            <Sparkles className="w-5 h-5 text-red-400" />
            RECOMMENDED TRAINING PROTOCOLS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            <div className="bg-slate-900/30 border border-slate-900 hover:border-slate-800 transition rounded-xl p-5">
              <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2 uppercase text-xs tracking-wider font-mono">
                <span>🌅</span> Phase 01: Warm-Up
              </h4>
              <ul className="text-[11px] font-mono text-slate-400 space-y-2">
                <li className="flex items-start gap-1"><span className="text-red-500">•</span> Single Target Track (2 runs)</li>
                <li className="flex items-start gap-1"><span className="text-red-500">•</span> Instant Response (2 runs)</li>
                <li className="flex items-start gap-1"><span className="text-red-500">•</span> Pro Smooth Pursuit (1 run)</li>
              </ul>
            </div>
            <div className="bg-slate-900/30 border border-slate-900 hover:border-slate-800 transition rounded-xl p-5">
              <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2 uppercase text-xs tracking-wider font-mono">
                <span>🎯</span> Phase 02: Core Load
              </h4>
              <ul className="text-[11px] font-mono text-slate-400 space-y-2">
                <li className="flex items-start gap-1"><span className="text-red-500">•</span> Flick Shot Training (3 runs)</li>
                <li className="flex items-start gap-1"><span className="text-red-500">•</span> Reactive Tracking (3 runs)</li>
                <li className="flex items-start gap-1"><span className="text-red-500">•</span> Peripheral Awareness (2 runs)</li>
              </ul>
            </div>
            <div className="bg-slate-900/30 border border-slate-900 hover:border-slate-800 transition rounded-xl p-5">
              <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2 uppercase text-xs tracking-wider font-mono">
                <span>⚡</span> Phase 03: Overload
              </h4>
              <ul className="text-[11px] font-mono text-slate-400 space-y-2">
                <li className="flex items-start gap-1"><span className="text-red-500">•</span> 360Hz Pro Tracking (2 runs)</li>
                <li className="flex items-start gap-1"><span className="text-red-500">•</span> Predictive Tracking (2 runs)</li>
                <li className="flex items-start gap-1"><span className="text-red-500">•</span> Kinetic Trainer (2 runs)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Explore Related Categories */}
        <div className="mt-16 mb-8 border-t border-slate-900 pt-12">
          <h2 className="text-lg font-bold tracking-widest text-center text-white font-mono uppercase mb-8">Explore Adjacent Sectors</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <Link href="/drills/cognitive" className="group bg-slate-950/80 border border-slate-900 rounded-xl p-5 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.05)] transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">🧠</div>
              <h3 className="font-bold text-slate-200 group-hover:text-purple-400 transition-colors uppercase text-xs tracking-wider font-mono">Cognitive</h3>
              <p className="text-[10px] text-slate-500 uppercase mt-1 font-mono">Memory, focus & solving</p>
            </Link>
            <Link href="/drills/visual" className="group bg-slate-950/80 border border-slate-900 rounded-xl p-5 hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">👁️</div>
              <h3 className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors uppercase text-xs tracking-wider font-mono">Visual</h3>
              <p className="text-[10px] text-slate-500 uppercase mt-1 font-mono">Reaction, tracking & fov</p>
            </Link>
            <Link href="/drills/motor" className="group bg-slate-950/80 border border-slate-900 rounded-xl p-5 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">✋</div>
              <h3 className="font-bold text-slate-200 group-hover:text-emerald-400 transition-colors uppercase text-xs tracking-wider font-mono">Motor Skills</h3>
              <p className="text-[10px] text-slate-500 uppercase mt-1 font-mono">Hand-eye coordination</p>
            </Link>
            <Link href="/drills/memory" className="group bg-slate-950/80 border border-slate-900 rounded-xl p-5 hover:border-indigo-500/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.05)] transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">💾</div>
              <h3 className="font-bold text-slate-200 group-hover:text-indigo-400 transition-colors uppercase text-xs tracking-wider font-mono">Memory</h3>
              <p className="text-[10px] text-slate-500 uppercase mt-1 font-mono">Working & sequence recall</p>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}