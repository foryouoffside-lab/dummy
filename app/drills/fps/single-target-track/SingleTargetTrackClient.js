'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Activity, MousePointer,
  Lock, AlertCircle
} from 'lucide-react';

const TARGET_RADIUS = 30;
const SPEED = 8;
const SCORE_INTERVAL = 200; // +1 point every 200ms of tracking

export default function SingleTargetTrackClient() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [trackingScore, setTrackingScore] = useState(0);
  const [bestTrackingScore, setBestTrackingScore] = useState(0);
  const [trackingAccuracy, setTrackingAccuracy] = useState(0);
  const [bestAccuracy, setBestAccuracy] = useState(0);
  const [trackingStreak, setTrackingStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [lockCooldown, setLockCooldown] = useState(false);
  
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  
  const targetRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, r: TARGET_RADIUS, isTracked: false });
  const lastChangeRef = useRef(0);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(60);
  const trackingIntervalRef = useRef(null);
  const bestAccuracyRef = useRef(0);
  const bestStreakRef = useRef(0);
  const trackingAccumulatorRef = useRef(0);

  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);
  useEffect(() => { try { const s = localStorage.getItem('smoothTrackingBest'); if(s) { const p = parseInt(s,10); if(!isNaN(p)) setBestTrackingScore(p); } } catch(e){} }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  
  const updateBestScore = useCallback((fs) => { try { const c = parseInt(localStorage.getItem('smoothTrackingBest')||'0',10); if(fs>c) { localStorage.setItem('smoothTrackingBest',fs.toString()); setBestTrackingScore(fs); } } catch(e){} }, []);
  const showFeedback = useCallback((m,t) => { if(feedbackTimeoutRef.current)clearTimeout(feedbackTimeoutRef.current); setFeedback(m);setFeedbackType(t); feedbackTimeoutRef.current=setTimeout(()=>{setFeedback('');setFeedbackType('');},800); }, []);
  const initAudio = useCallback(() => { try { if(!audioCtxRef.current)audioCtxRef.current=new(window.AudioContext||window.webkitAudioContext)(); if(audioCtxRef.current.state==='suspended')audioCtxRef.current.resume(); return audioCtxRef.current; } catch(e){return null;} }, []);
  const playSound = useCallback((type) => { if(!soundEnabled)return; try { const ctx=initAudio(); if(!ctx)return; const o=ctx.createOscillator(),g=ctx.createGain(); o.connect(g);g.connect(ctx.destination); const now=ctx.currentTime; const f={score:1320,streak:1046}; o.frequency.setValueAtTime(f[type]||880,now); g.gain.setValueAtTime(type==='streak'?0.12:0.08,now); g.gain.exponentialRampToValueAtTime(0.001,now+0.1); o.start(now);o.stop(now+0.1); } catch(e){} }, [soundEnabled,initAudio]);

  const requestPointerLock = useCallback(() => {
    if (!lockCooldown && canvasRef.current) canvasRef.current.requestPointerLock();
  }, [lockCooldown]);
  
  useEffect(() => {
    const h = () => {
      const l = document.pointerLockElement === canvasRef.current;
      setPointerLocked(l);
      if(!l && gameState==='playing') { setLockCooldown(true); setTimeout(() => setLockCooldown(false), 1000); }
    };
    const e = () => { setLockCooldown(true); setTimeout(() => setLockCooldown(false), 1000); };
    document.addEventListener('pointerlockchange',h);
    document.addEventListener('pointerlockerror',e);
    return () => { document.removeEventListener('pointerlockchange',h); document.removeEventListener('pointerlockerror',e); };
  }, [gameState]);

  useEffect(() => {
    const c = canvasRef.current; if(!c)return;
    const h = () => { if(gameState==='playing'&&!pointerLocked&&!lockCooldown)requestPointerLock(); };
    c.addEventListener('click',h);
    return () => c.removeEventListener('click',h);
  }, [gameState,pointerLocked,requestPointerLock,lockCooldown]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cvs = canvasRef.current;
      if (!cvs) return;
      
      if (document.pointerLockElement === cvs) {
        virtualCrosshair.current.x += e.movementX || 0;
        virtualCrosshair.current.y += e.movementY || 0;
      }
      
      virtualCrosshair.current.x = Math.max(0, Math.min(cvs.width, virtualCrosshair.current.x));
      virtualCrosshair.current.y = Math.max(0, Math.min(cvs.height, virtualCrosshair.current.y));
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleFullscreen = useCallback(async () => { try { if(!isFullscreen){const el=containerRef.current;if(el?.requestFullscreen){await el.requestFullscreen();setIsFullscreen(true);}}else{if(document.fullscreenElement)await document.exitFullscreen();setIsFullscreen(false);} } catch(e){} }, [isFullscreen]);
  useEffect(()=>{const h=()=>setIsFullscreen(!!document.fullscreenElement);document.addEventListener('fullscreenchange',h);return()=>document.removeEventListener('fullscreenchange',h);},[]);

  function updateDirection() { const a=Math.random()*Math.PI*2; targetRef.current.vx=Math.cos(a)*SPEED; targetRef.current.vy=Math.sin(a)*SPEED; lastChangeRef.current=performance.now(); }

  const startTimer = useCallback(() => {
    if(timerIntervalRef.current)clearInterval(timerIntervalRef.current);
    timerIntervalRef.current=setInterval(()=>{if(gameStateRef.current==='playing'&&isActiveRef.current){timeLeftRef.current-=1;setTimeLeft(timeLeftRef.current);if(timeLeftRef.current<=0){clearInterval(timerIntervalRef.current);timerIntervalRef.current=null;if(trackingIntervalRef.current)clearInterval(trackingIntervalRef.current);setGameState('gameOver');gameStateRef.current='gameOver';isActiveRef.current=false;updateBestScore(scoreRef.current);document.exitPointerLock();}}},1000);
  }, [updateBestScore]);

  useEffect(() => {
    if(gameState!=='playing'){if(trackingIntervalRef.current)clearInterval(trackingIntervalRef.current);return;}
    trackingIntervalRef.current=setInterval(()=>{
      if(!isActiveRef.current)return;
      const t=targetRef.current, ch=virtualCrosshair.current;
      const dist=Math.hypot(ch.x-t.x,ch.y-t.y);
      t.isTracked=dist<t.r;
      
      const ca=Math.max(0,Math.min(100,Math.round(100-(dist/t.r)*100)));
      setTrackingAccuracy(ca);
      if(ca>bestAccuracyRef.current){bestAccuracyRef.current=ca;setBestAccuracy(ca);}
      
      if(t.isTracked){
        trackingAccumulatorRef.current += 50;
        streakRef.current++;setTrackingStreak(streakRef.current);
        if(streakRef.current>bestStreakRef.current){bestStreakRef.current=streakRef.current;setBestStreak(streakRef.current);}
        
        if(trackingAccumulatorRef.current >= SCORE_INTERVAL){
          scoreRef.current+=1;setTrackingScore(scoreRef.current);
          trackingAccumulatorRef.current -= SCORE_INTERVAL;
          playSound('score');showFeedback('✓ +1','success');
          if(streakRef.current%10===0){playSound('streak');showFeedback(`🔥 ${streakRef.current} Streak!`,'success');}
        }
      } else {
        trackingAccumulatorRef.current = 0;
        if(streakRef.current>0){streakRef.current=0;setTrackingStreak(0);}
      }
    },50);
    return()=>{if(trackingIntervalRef.current)clearInterval(trackingIntervalRef.current);};
  }, [gameState,playSound,showFeedback]);

  useEffect(() => {
    if(gameState!=='playing')return;
    const cvs=canvasRef.current; if(!cvs)return;
    const ctx=cvs.getContext('2d');
    const update=()=>{const cr=containerRef.current;if(!cr)return;const rr=cr.getBoundingClientRect();let w=rr.width,h=w*(9/16);if(h>rr.height){h=rr.height;w=h*(16/9);}cvs.width=w;cvs.height=h;canvasSizeRef.current={width:w,height:h};cvs.style.position='absolute';cvs.style.left=`${(rr.width-w)/2}px`;cvs.style.top=`${(rr.height-h)/2}px`;virtualCrosshair.current={x:w/2,y:h/2};targetRef.current.x=w/2;targetRef.current.y=h/2;updateDirection();};
    update();
    const ro=new ResizeObserver(update);if(containerRef.current)ro.observe(containerRef.current);
    window.addEventListener('resize',update);
    const loop=()=>{if(!isActiveRef.current){animationRef.current=requestAnimationFrame(loop);return;}
      const t=targetRef.current;
      t.x+=t.vx;t.y+=t.vy;
      if(t.x<t.r){t.x=t.r;t.vx*=-1;}if(t.x>cvs.width-t.r){t.x=cvs.width-t.r;t.vx*=-1;}
      if(t.y<t.r){t.y=t.r;t.vy*=-1;}if(t.y>cvs.height-t.r){t.y=cvs.height-t.r;t.vy*=-1;}
      if(performance.now()-lastChangeRef.current>400+Math.random()*600)updateDirection();
      const ch=virtualCrosshair.current, dist=Math.hypot(ch.x-t.x,ch.y-t.y);
      t.isTracked=dist<t.r;
      
      ctx.fillStyle=isBoxDarkMode?'#020202':'#f9fafb';ctx.fillRect(0,0,cvs.width,cvs.height);
      ctx.strokeStyle=isBoxDarkMode?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.02)';ctx.lineWidth=1;
      for(let i=0;i<cvs.width;i+=40){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,cvs.height);ctx.stroke();}
      
      ctx.beginPath();ctx.arc(t.x,t.y,t.r,0,Math.PI*2);
      if(t.isTracked){ctx.fillStyle='#00ff88';ctx.shadowBlur=12;ctx.shadowColor='#00ff88';}
      else{ctx.fillStyle=isBoxDarkMode?'#1a1a1a':'#cccccc';ctx.shadowBlur=0;}
      ctx.fill();ctx.shadowBlur=0;
      ctx.beginPath();ctx.arc(t.x,t.y,t.r,0,Math.PI*2);ctx.strokeStyle=t.isTracked?'rgba(0,255,136,0.8)':'rgba(255,255,255,0.2)';ctx.lineWidth=2;ctx.stroke();
      
      if(!t.isTracked){
        ctx.beginPath();ctx.moveTo(t.x,t.y);ctx.lineTo(t.x+t.vx*5,t.y+t.vy*5);ctx.strokeStyle='rgba(255,255,255,0.2)';ctx.lineWidth=2;ctx.stroke();
        const a=Math.atan2(t.vy,t.vx),ax=t.x+t.vx*5,ay=t.y+t.vy*5;
        ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(ax-6*Math.cos(a-0.7),ay-6*Math.sin(a-0.7));ctx.lineTo(ax-6*Math.cos(a+0.7),ay-6*Math.sin(a+0.7));ctx.closePath();ctx.fillStyle='rgba(255,255,255,0.2)';ctx.fill();
      }
      
      ctx.beginPath();ctx.arc(t.x,t.y,4,0,Math.PI*2);ctx.fillStyle=t.isTracked?'#000000':(isBoxDarkMode?'#333333':'#999999');ctx.fill();
      
      if(ch.x>0&&ch.x<cvs.width&&ch.y>0&&ch.y<cvs.height){
        const cc=t.isTracked?'#00ff88':'rgba(255,255,255,0.6)', lc=pointerLocked?cc:'rgba(255,255,255,0.4)';
        ctx.strokeStyle=lc;ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(ch.x,ch.y,12,0,Math.PI*2);ctx.stroke();
        ctx.beginPath();ctx.moveTo(ch.x-24,ch.y);ctx.lineTo(ch.x-10,ch.y);ctx.moveTo(ch.x+10,ch.y);ctx.lineTo(ch.x+24,ch.y);ctx.moveTo(ch.x,ch.y-24);ctx.lineTo(ch.x,ch.y-10);ctx.moveTo(ch.x,ch.y+10);ctx.lineTo(ch.x,ch.y+24);ctx.stroke();
        ctx.fillStyle=lc;ctx.beginPath();ctx.arc(ch.x,ch.y,3,0,Math.PI*2);ctx.fill();
        ctx.beginPath();ctx.moveTo(ch.x,ch.y);ctx.lineTo(t.x,t.y);ctx.strokeStyle='rgba(0,255,136,0.15)';ctx.lineWidth=1;ctx.stroke();
        if(t.isTracked){ctx.beginPath();ctx.arc(ch.x,ch.y,t.r,0,Math.PI*2);ctx.strokeStyle='rgba(0,255,136,0.25)';ctx.lineWidth=1.5;ctx.stroke();}
      }
      animationRef.current=requestAnimationFrame(loop);};
    animationRef.current=requestAnimationFrame(loop);
    return()=>{cancelAnimationFrame(animationRef.current);window.removeEventListener('resize',update);ro.disconnect();};
  }, [gameState,isBoxDarkMode,pointerLocked]);

  const startGame = useCallback(() => {
    if(timerIntervalRef.current)clearInterval(timerIntervalRef.current);
    if(trackingIntervalRef.current)clearInterval(trackingIntervalRef.current);
    setGameState('playing');gameStateRef.current='playing';
    setTrackingScore(0);setTrackingAccuracy(0);setBestAccuracy(0);setTrackingStreak(0);setBestStreak(0);
    timeLeftRef.current=60;setTimeLeft(60);setFeedback('');
    isActiveRef.current=true;scoreRef.current=0;streakRef.current=0;bestStreakRef.current=0;bestAccuracyRef.current=0;
    trackingAccumulatorRef.current=0;targetRef.current.isTracked=false;
    if(canvasRef.current){targetRef.current.x=canvasRef.current.width/2;targetRef.current.y=canvasRef.current.height/2;}
    setTimeout(()=>requestPointerLock(),300);
    startTimer();
  }, [startTimer,requestPointerLock]);

  const resetGame = useCallback(() => {
    if(timerIntervalRef.current)clearInterval(timerIntervalRef.current);
    if(trackingIntervalRef.current)clearInterval(trackingIntervalRef.current);
    if(feedbackTimeoutRef.current)clearTimeout(feedbackTimeoutRef.current);
    if(animationRef.current)cancelAnimationFrame(animationRef.current);
    isActiveRef.current=false;setGameState('start');gameStateRef.current='start';
    setFeedback('');setFeedbackType('');
    document.exitPointerLock();
    setLockCooldown(true);setTimeout(()=>setLockCooldown(false),1000);
  }, []);

  useEffect(()=>()=>{if(timerIntervalRef.current)clearInterval(timerIntervalRef.current);if(trackingIntervalRef.current)clearInterval(trackingIntervalRef.current);if(feedbackTimeoutRef.current)clearTimeout(feedbackTimeoutRef.current);if(animationRef.current)cancelAnimationFrame(animationRef.current);document.exitPointerLock();},[]);

  if(loading||!isClient)return(<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-16 h-16 border-4 border-gray-600 border-t-transparent rounded-full animate-spin mx-auto"/></div>);

  return (
    <div className={`min-h-screen select-none ${isDarkMode?'bg-gray-900':'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen&&(<nav className="mb-4"><ol className="flex flex-wrap items-center gap-2 text-sm"><li><Link href="/" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Home</Link></li><li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li><li><Link href="/drills/fps" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>FPS Drills</Link></li><li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li><li className={`font-medium ${isDarkMode?'text-gray-400':'text-gray-600'}`}>Single Target Track</li></ol></nav>)}
        {!isFullscreen&&(<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"><div className="flex items-center gap-3"><div className="p-3 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl"><MousePointer className="w-6 h-6 text-white"/></div><div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Single Target Track Trainer</h1><p className={`text-sm sm:text-base ${isDarkMode?'text-gray-400':'text-gray-500'}`}>{pointerLocked?'🟢 Raw input active':'🔴 Click canvas'} • +1pt/200ms • Lock-on glow</p></div></div><div className="flex gap-2"><button onClick={()=>setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>{isDarkMode?<Sun className="w-5 h-5"/>:<Moon className="w-5 h-5"/>}</button><button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}><Eye className="w-5 h-5"/></button><button onClick={()=>setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>{soundEnabled?<Volume2 className="w-5 h-5"/>:<VolumeX className="w-5 h-5"/>}</button><button onClick={toggleFullscreen} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>{isFullscreen?<Minimize2 className="w-5 h-5"/>:<Maximize2 className="w-5 h-5"/>}</button><button onClick={pointerLocked?()=>{document.exitPointerLock();setLockCooldown(true);setTimeout(()=>setLockCooldown(false),1000);}:requestPointerLock} className={`p-2 rounded-lg border ${pointerLocked?'bg-green-500 border-green-600 text-white':isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}><Lock className="w-5 h-5"/></button></div></div>)}
        {!isFullscreen&&(<div className="grid grid-cols-5 gap-3 mb-4 h-[88px]"><StatCard icon={<Target className="text-blue-600"/>} value={trackingScore} label="Score" d={isDarkMode}/><StatCard icon={<Trophy className="text-yellow-500"/>} value={bestTrackingScore} label="Best" d={isDarkMode}/><StatCard icon={<Timer className={timeLeft<=10?'text-red-600':'text-green-600'}/>} value={timeLeft} label="Time" unit="s" d={isDarkMode}/><StatCard icon={<Activity className="text-purple-500"/>} value={trackingAccuracy} label="Accuracy" unit="%" d={isDarkMode}/><StatCard icon={<Zap className="text-orange-500"/>} value={trackingStreak} label="Streak" d={isDarkMode}/></div>)}
        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback?'opacity-100 scale-100':'opacity-0 scale-95'} ${feedbackType==='success'?'bg-green-500':'bg-red-500'}`}>{feedback||'\u00A0'}</div></div>
        <div ref={containerRef} className={`relative ${isFullscreen?'fixed inset-0 z-50':'rounded-xl border-2'}`} style={{background:isBoxDarkMode?"#020202":"#fff",aspectRatio:isFullscreen?'auto':'16/9',maxWidth:'100%',margin:'0 auto',borderColor:isDarkMode?'#374151':'#e5e7eb',overflow:'hidden',cursor:'none'}}>
          {isFullscreen&&gameState==='playing'&&(<div className="absolute top-4 right-4 z-20 pointer-events-none"><span className="text-white/40 text-xs font-medium bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5">Press <span className="text-white/70 font-bold">ESC</span> to exit fullscreen</span></div>)}
          <canvas ref={canvasRef} style={{display:'block',position:'absolute'}}/>
          {gameState==='start'&&(<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><MousePointer className="w-16 h-16 text-gray-500 mx-auto mb-4"/><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Single Target Track Trainer</h2><p className={`mb-4 ${isBoxDarkMode?'text-gray-300':'text-gray-600'}`}>Raw input • +1pt/200ms • Lock-on glow • Max ~300pts</p><div className={`mb-6 p-3 rounded-lg border ${isBoxDarkMode?'border-yellow-600 bg-yellow-900/20':'border-yellow-200 bg-yellow-50'}`}><div className="flex items-center gap-2 mb-2"><AlertCircle className="w-4 h-4 text-yellow-500"/><p className={`text-sm font-medium ${isBoxDarkMode?'text-yellow-400':'text-yellow-700'}`}>Raw Input via Pointer Lock</p></div><p className={`text-xs ${isBoxDarkMode?'text-gray-400':'text-gray-600'}`}>Track the target. +1 point every 200ms on target. Click canvas to lock cursor.</p></div><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl font-semibold hover:shadow-lg w-full">Start Tracking</button><button onClick={resetGame} className="mt-3 w-full px-4 py-2 rounded-lg border border-gray-500 text-gray-400 hover:bg-gray-700 transition-all text-sm">Reset Session</button></div></div>)}
          {gameState==='gameOver'&&(<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border max-w-[520px] mx-4 ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Trophy className="w-10 h-10 text-yellow-500"/><h2 className={`text-2xl font-bold ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Training Complete</h2></div><div className="grid grid-cols-2 gap-3 mb-4"><RC label="Score" v={trackingScore} i={<Target className="w-4 h-4"/>} c="blue" d={isBoxDarkMode}/><RC label="Best" v={bestTrackingScore} i={<Trophy className="w-4 h-4"/>} c="yellow" d={isBoxDarkMode}/><RC label="Accuracy" v={bestAccuracy} u="%" i={<Activity className="w-4 h-4"/>} c="emerald" d={isBoxDarkMode}/><RC label="Streak" v={bestStreak} i={<Zap className="w-4 h-4"/>} c="orange" d={isBoxDarkMode}/></div><div className="flex gap-3"><Link href="/drills/fps" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold ${isDarkMode?'bg-gray-700 text-gray-300':'bg-gray-200 text-gray-700'}`}>← Back</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg font-semibold">Track Again →</button></div></div></div>)}
        </div>
        {!isFullscreen&&(<footer className="mt-6"><div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode?'text-gray-400':'text-gray-600'}`}/><h2 className={`font-semibold text-lg ${isDarkMode?'text-white':'text-gray-900'}`}>Drill Rules & Professional Features</h2></div></div><div className="p-6"><div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div className="space-y-3"><h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-gray-400':'text-gray-600'}`}><MousePointer className="w-5 h-5"/>How to Play</h3><ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</span><span>Click <span className="font-semibold text-gray-400">Start Tracking</span></span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</span><span>Cursor locks for <span className="font-semibold text-gray-400">raw input</span></span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</span><span>Keep crosshair on <span className="font-semibold text-gray-400">the target</span></span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</span><span>Target <span className="font-semibold">glows green</span> on lock-on</span></li></ul></div><div className="space-y-3"><h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-blue-400':'text-blue-600'}`}><Trophy className="w-5 h-5"/>Scoring System</h3><ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">+1</span><span><span className="font-semibold text-blue-400">Tracking</span> = +1 pt/200ms</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">~300</span><span><span className="font-semibold text-green-400">Max score</span> with perfect tracking</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">🔥</span><span><span className="font-semibold text-orange-400">Streak</span> every 10 ticks</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">✓</span><span><span className="font-semibold text-purple-400">No penalties</span> - pure practice</span></li></ul></div><div className="space-y-3"><h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-purple-400':'text-purple-600'}`}><Zap className="w-5 h-5"/>Pro Features</h3><ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><li className="flex items-start gap-2"><Lock className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5"/><span><span className="font-semibold text-green-400">Raw Input</span> - Pointer Lock API</span></li><li className="flex items-start gap-2"><Activity className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5"/><span><span className="font-semibold text-blue-400">Real-time</span> accuracy tracking</span></li><li className="flex items-start gap-2"><Timer className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5"/><span><span className="font-semibold text-orange-400">Direction arrow</span> when off-target</span></li><li className="flex items-start gap-2"><MousePointer className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5"/><span><span className="font-semibold text-purple-400">Lock-on ring</span> - visual feedback</span></li></ul></div></div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({icon,value,label,unit='',d}){return(<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full ${d?'bg-gray-800 border-gray-700':'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${d?'text-white':'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${d?'text-gray-400':'text-gray-500'}`}>{label}</p></div>);}
function RC({label,v,unit='',i,c,d}){const m={blue:'bg-blue-500/10 border-blue-500/30 text-blue-500',yellow:'bg-yellow-500/10 border-yellow-500/30 text-yellow-500',emerald:'bg-emerald-500/10 border-emerald-500/30 text-emerald-500',orange:'bg-orange-500/10 border-orange-500/30 text-orange-500'};const o=m[c]||m.blue;const[bg,border,text]=o.split(' ');return(<div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}><div className="flex items-center gap-2"><div className={text}>{i}</div><span className={`text-xs sm:text-sm ${d?'text-gray-300':'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg ${text}`}>{v}{unit}</span></div>);}