'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Trophy, Target, Zap, Activity, Info,
  Lock, AlertCircle, RefreshCw, ArrowLeft,
  Crosshair, Dumbbell, Database, Keyboard, Star, Users,
  GraduationCap, Lightbulb, TrendingUp, Clock, ArrowRight,
  BookOpen, Brain, Hash, Code2, BarChart3, CheckCircle2
} from 'lucide-react';

const BALL_RADIUS = 25;
const BALL_COUNT = 6;

function createBall(isTarget) {
  return { radius: BALL_RADIUS, isTarget, x: 0, y: 0, vx: 0, vy: 0 };
}

function spawnBall(ball, cvs) {
  ball.x = Math.random() * (cvs.width - 100) + 50;
  ball.y = Math.random() * (cvs.height - 100) + 50;
}

function setRandomVelocity(ball, speed) {
  const angle = Math.random() * Math.PI * 2;
  ball.vx = Math.cos(angle) * speed;
  ball.vy = Math.sin(angle) * speed;
}

function updateBall(ball, dt, cvs) {
  ball.x += ball.vx * dt; ball.y += ball.vy * dt;
  if (ball.x < ball.radius) { ball.x = ball.radius; ball.vx *= -1; }
  if (ball.x > cvs.width - ball.radius) { ball.x = cvs.width - ball.radius; ball.vx *= -1; }
  if (ball.y < ball.radius) { ball.y = ball.radius; ball.vy *= -1; }
  if (ball.y > cvs.height - ball.radius) { ball.y = cvs.height - ball.radius; ball.vy *= -1; }
  if (Math.random() < 0.008) setRandomVelocity(ball, Math.hypot(ball.vx, ball.vy));
}

export default function ProTrackingClient() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [trackingScore, setTrackingScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [trackingAccuracy, setTrackingAccuracy] = useState(100);
  const [bestAccuracy, setBestAccuracy] = useState(0);
  const [trackingCombo, setTrackingCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentSpeed, setCurrentSpeed] = useState(500);
  const [targetSwitches, setTargetSwitches] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [lockCooldown, setLockCooldown] = useState(false);
  
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const crosshairInitRef = useRef(false);
  
  const ballsRef = useRef([]);
  const targetIndexRef = useRef(0);
  const lastSwitchTimeRef = useRef(0);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(60);
  const moveSpeedRef = useRef(500);
  const trackingTimeRef = useRef(0);
  const bestAccuracyRef = useRef(0);
  const bestComboRef = useRef(0);
  const trackingIntervalRef = useRef(null);

  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);
  useEffect(() => { try { const s = localStorage.getItem('proTrackingBest'); if(s) { const p = parseInt(s,10); if(!isNaN(p)) setBestScore(p); } } catch(e){} }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  
  const updateBestScore = useCallback((fs) => { try { const c = parseInt(localStorage.getItem('proTrackingBest')||'0',10); if(fs>c) { localStorage.setItem('proTrackingBest',fs.toString()); setBestScore(fs); } } catch(e){} }, []);
  const showFeedback = useCallback((m,t) => { if(feedbackTimeoutRef.current)clearTimeout(feedbackTimeoutRef.current); setFeedback(m);setFeedbackType(t); feedbackTimeoutRef.current=setTimeout(()=>{setFeedback('');setFeedbackType('');},1000); }, []);
  const initAudio = useCallback(() => { try { if(!audioCtxRef.current)audioCtxRef.current=new(window.AudioContext||window.webkitAudioContext)(); if(audioCtxRef.current.state==='suspended')audioCtxRef.current.resume(); return audioCtxRef.current; } catch(e){return null;} }, []);
  const playSound = useCallback((type) => { if(!soundEnabled)return; try { const ctx=initAudio(); if(!ctx)return; const o=ctx.createOscillator(),g=ctx.createGain(); o.connect(g);g.connect(ctx.destination); const now=ctx.currentTime; const f={switch:660,tracking:880,combo:1046}; o.frequency.setValueAtTime(f[type]||660,now); g.gain.setValueAtTime(type==='combo'?0.12:0.08,now); g.gain.exponentialRampToValueAtTime(0.001,now+0.1); o.start(now);o.stop(now+0.1); } catch(e){} }, [soundEnabled,initAudio]);

  const requestPointerLock = useCallback(() => {
    if (!lockCooldown && canvasRef.current) {
      canvasRef.current.requestPointerLock();
    }
  }, [lockCooldown]);
  
  useEffect(() => {
    const h = () => {
      const l = document.pointerLockElement === canvasRef.current;
      setPointerLocked(l);
      if(l) crosshairInitRef.current = true;
      else if(gameState==='playing') {
        setLockCooldown(true);
        setTimeout(() => setLockCooldown(false), 1000);
      }
    };
    const e = () => {
      setLockCooldown(true);
      setTimeout(() => setLockCooldown(false), 1000);
    };
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
    const h = (e) => {
      if(document.pointerLockElement!==canvasRef.current)return;
      const dx=e.movementX||0, dy=e.movementY||0;
      virtualCrosshair.current.x+=dx; virtualCrosshair.current.y+=dy;
      const c=canvasRef.current;
      if(c){virtualCrosshair.current.x=Math.max(0,Math.min(c.width,virtualCrosshair.current.x)); virtualCrosshair.current.y=Math.max(0,Math.min(c.height,virtualCrosshair.current.y));}
    };
    document.addEventListener('mousemove',h);
    return () => document.removeEventListener('mousemove',h);
  }, []);

  const toggleFullscreen = useCallback(async () => { try { if(!isFullscreen){const el=containerRef.current;if(el?.requestFullscreen){await el.requestFullscreen();setIsFullscreen(true);}}else{if(document.fullscreenElement)await document.exitFullscreen();setIsFullscreen(false);} } catch(e){} }, [isFullscreen]);
  useEffect(()=>{const h=()=>setIsFullscreen(!!document.fullscreenElement);document.addEventListener('fullscreenchange',h);return()=>document.removeEventListener('fullscreenchange',h);},[]);

  const switchTarget = useCallback(() => {
    if(!isActiveRef.current||ballsRef.current.length===0)return;
    ballsRef.current[targetIndexRef.current].isTarget=false;
    targetIndexRef.current=(targetIndexRef.current+Math.floor(Math.random()*(BALL_COUNT-1))+1)%BALL_COUNT;
    ballsRef.current[targetIndexRef.current].isTarget=true;
    moveSpeedRef.current+=10; setCurrentSpeed(moveSpeedRef.current);
    setTargetSwitches(prev=>prev+1);
    playSound('switch'); showFeedback(`🎯 New Target! Speed: ${moveSpeedRef.current}`,'success');
  }, [playSound,showFeedback]);

  useEffect(() => {
    if(gameState!=='playing'){if(trackingIntervalRef.current)clearInterval(trackingIntervalRef.current);return;}
    trackingIntervalRef.current=setInterval(()=>{
      if(!isActiveRef.current||!crosshairInitRef.current)return;
      const t=ballsRef.current[targetIndexRef.current]; if(!t)return;
      const ch=virtualCrosshair.current;
      const dist=Math.hypot(ch.x-t.x,ch.y-t.y);
      if(dist<t.radius){trackingTimeRef.current+=0.2;if(trackingTimeRef.current>=1){const st=Math.floor(trackingTimeRef.current);scoreRef.current+=st*5;setTrackingScore(scoreRef.current);trackingTimeRef.current-=st;showFeedback(`+${st*5} Tracking!`,'success');}comboRef.current++;setTrackingCombo(comboRef.current);if(comboRef.current>bestComboRef.current){bestComboRef.current=comboRef.current;setBestCombo(comboRef.current);}if(comboRef.current%10===0){playSound('combo');showFeedback(`🔥 ${comboRef.current} Combo!`,'success');}}
      else{trackingTimeRef.current=0;comboRef.current=0;setTrackingCombo(0);}
      const acc=Math.max(0,Math.min(100,Math.round(100-(dist/t.radius)*100)));setTrackingAccuracy(acc);
      if(acc>bestAccuracyRef.current){bestAccuracyRef.current=acc;setBestAccuracy(acc);}
    },200);
    return()=>{if(trackingIntervalRef.current)clearInterval(trackingIntervalRef.current);};
  }, [gameState,playSound,showFeedback]);

  const startTimer = useCallback(() => {
    if(timerIntervalRef.current)clearInterval(timerIntervalRef.current);
    timerIntervalRef.current=setInterval(()=>{if(gameStateRef.current==='playing'&&isActiveRef.current){timeLeftRef.current-=1;setTimeLeft(timeLeftRef.current);if(timeLeftRef.current<=0){clearInterval(timerIntervalRef.current);timerIntervalRef.current=null;if(trackingIntervalRef.current)clearInterval(trackingIntervalRef.current);setGameState('gameOver');gameStateRef.current='gameOver';isActiveRef.current=false;updateBestScore(scoreRef.current);document.exitPointerLock();}}},1000);
  }, [updateBestScore]);

  useEffect(() => {
    if(gameState!=='playing'&&gameState!=='gameOver')return;
    const cvs=canvasRef.current; if(!cvs)return;
    const ctx=cvs.getContext('2d');
    const update=()=>{const cr=containerRef.current;if(!cr)return;const rr=cr.getBoundingClientRect();cvs.width=rr.width;cvs.height=rr.height;canvasSizeRef.current={width:rr.width,height:rr.height};cvs.style.width=rr.width+'px';cvs.style.height=rr.height+'px';if(!crosshairInitRef.current)virtualCrosshair.current={x:rr.width/2,y:rr.height/2};if(gameState==='playing'&&ballsRef.current.length===0){ballsRef.current=[];for(let i=0;i<BALL_COUNT;i++){const b=createBall(i===0);spawnBall(b,cvs);setRandomVelocity(b,moveSpeedRef.current);ballsRef.current.push(b);}targetIndexRef.current=0;lastSwitchTimeRef.current=performance.now();}};
    update();
    const ro=new ResizeObserver(update);if(containerRef.current)ro.observe(containerRef.current);
    window.addEventListener('resize',update);
    let lt=performance.now();
    const loop=(now)=>{const dt=Math.min(0.033,(now-lt)/1000);lt=now;
      if(gameStateRef.current==='playing'&&isActiveRef.current){if(now-lastSwitchTimeRef.current>1500){switchTarget();lastSwitchTimeRef.current=now;}ballsRef.current.forEach(b=>updateBall(b,dt,cvs));}
      ctx.fillStyle=isBoxDarkMode?'#020202':'#f9fafb';ctx.fillRect(0,0,cvs.width,cvs.height);
      ctx.strokeStyle=isBoxDarkMode?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.02)';ctx.lineWidth=1;
      for(let i=0;i<cvs.width;i+=40){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,cvs.height);ctx.stroke();}
      ballsRef.current.forEach(b=>{ctx.beginPath();ctx.arc(b.x,b.y,b.radius,0,Math.PI*2);if(b.isTarget){ctx.shadowBlur=12;ctx.shadowColor="#00ff88";ctx.fillStyle="#00ff88";ctx.fill();ctx.beginPath();ctx.arc(b.x,b.y,3,0,Math.PI*2);ctx.fillStyle="#000000";ctx.fill();}else{ctx.shadowBlur=0;ctx.fillStyle="#FFFFFF";ctx.fill();}ctx.shadowBlur=0;ctx.beginPath();ctx.arc(b.x,b.y,b.radius,0,Math.PI*2);ctx.strokeStyle=isBoxDarkMode?"rgba(255,255,255,0.15)":"rgba(0,0,0,0.1)";ctx.lineWidth=1.5;ctx.stroke();});
      const ch=virtualCrosshair.current;
      if(ch.x>0&&ch.x<cvs.width&&ch.y>0&&ch.y<cvs.height){ctx.strokeStyle=pointerLocked?'#00ff88':'#ff4444';ctx.lineWidth=2;ctx.beginPath();ctx.arc(ch.x,ch.y,12,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(ch.x-24,ch.y);ctx.lineTo(ch.x-10,ch.y);ctx.moveTo(ch.x+10,ch.y);ctx.lineTo(ch.x+24,ch.y);ctx.moveTo(ch.x,ch.y-24);ctx.lineTo(ch.x,ch.y-10);ctx.moveTo(ch.x,ch.y+10);ctx.lineTo(ch.x,ch.y+24);ctx.stroke();ctx.fillStyle=pointerLocked?'#00ff88':'#ff4444';ctx.beginPath();ctx.arc(ch.x,ch.y,3,0,Math.PI*2);ctx.fill();}
      animationRef.current=requestAnimationFrame(loop);};
    animationRef.current=requestAnimationFrame(loop);
    return()=>{cancelAnimationFrame(animationRef.current);window.removeEventListener('resize',update);ro.disconnect();};
  }, [gameState,isBoxDarkMode,pointerLocked,switchTarget]);

  const startGame = useCallback(() => {
    if(timerIntervalRef.current)clearInterval(timerIntervalRef.current);
    if(trackingIntervalRef.current)clearInterval(trackingIntervalRef.current);
    setGameState('playing');gameStateRef.current='playing';
    setTrackingScore(0);setTrackingAccuracy(100);setBestAccuracy(0);setTrackingCombo(0);setBestCombo(0);
    timeLeftRef.current=60;setTimeLeft(60);setCurrentSpeed(500);setTargetSwitches(0);setFeedback('');
    isActiveRef.current=true;scoreRef.current=0;comboRef.current=0;bestComboRef.current=0;bestAccuracyRef.current=0;
    trackingTimeRef.current=0;ballsRef.current=[];moveSpeedRef.current=500;
    crosshairInitRef.current=false;
    setTimeout(()=>requestPointerLock(),300);
    setTimeout(()=>{crosshairInitRef.current=true;},500);
    startTimer();
  }, [startTimer,requestPointerLock]);

  const resetGame = useCallback(() => {
    if(timerIntervalRef.current)clearInterval(timerIntervalRef.current);
    if(trackingIntervalRef.current)clearInterval(trackingIntervalRef.current);
    if(feedbackTimeoutRef.current)clearTimeout(feedbackTimeoutRef.current);
    if(animationRef.current)cancelAnimationFrame(animationRef.current);
    isActiveRef.current=false;setGameState('start');gameStateRef.current='start';
    setTrackingScore(0);setTrackingAccuracy(100);setBestAccuracy(0);setTrackingCombo(0);setBestCombo(0);
    timeLeftRef.current=60;setTimeLeft(60);setFeedback('');
    crosshairInitRef.current=false;document.exitPointerLock();
    setLockCooldown(true);setTimeout(()=>setLockCooldown(false),1000);
  }, []);

  const sharePage = async () => { if (navigator.share) { try { await navigator.share({ title: 'Free Pro Tracking Trainer | SkillDrills', text: 'Raw input tracking with pointer lock. Free!', url: 'https://skilldrills.online/drills/fps/pro-tracking' }); } catch (e) {} } else { navigator.clipboard.writeText('https://skilldrills.online/drills/fps/pro-tracking'); alert('Link copied!'); } };
  const copyPageLink = () => { navigator.clipboard.writeText('https://skilldrills.online/drills/fps/pro-tracking'); alert('Link copied!'); };

  useEffect(()=>()=>{if(timerIntervalRef.current)clearInterval(timerIntervalRef.current);if(trackingIntervalRef.current)clearInterval(trackingIntervalRef.current);if(feedbackTimeoutRef.current)clearTimeout(feedbackTimeoutRef.current);if(animationRef.current)cancelAnimationFrame(animationRef.current);document.exitPointerLock();},[]);

  if(loading||!isClient)return(<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-600">Loading pro tracking trainer...</p></div></div>);

  return (
    <div className={`min-h-screen select-none ${isDarkMode?'bg-gray-900':'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen&&(
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className={`hover:underline transition-colors ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
              <li className={isDarkMode?'text-gray-500':'text-gray-400'} aria-hidden="true">/</li>
              <li><Link href="/drills/fps" className={`hover:underline transition-colors ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>FPS Training</Link></li>
              <li className={isDarkMode?'text-gray-500':'text-gray-400'} aria-hidden="true">/</li>
              <li className={`font-medium ${isDarkMode?'text-green-400':'text-green-600'}`} aria-current="page">Pro Tracking</li>
            </ol>
          </nav>
        )}
        {!isFullscreen&&(
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex-shrink-0"><Target className="w-6 h-6 text-white"/></div>
              <div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Pro Tracking Trainer</h1><p className={`text-sm sm:text-base ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Raw input tracking • 1.5s target switches • +5pts/sec • Free FPS aim training</p></div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {gameState==='playing'&&(<button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title="Reset"><RefreshCw className="w-5 h-5"/></button>)}
              <button onClick={()=>setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} aria-label="Toggle dark mode">{isDarkMode?<Sun className="w-5 h-5"/>:<Moon className="w-5 h-5"/>}</button>
              <button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} aria-label="Toggle theme"><Eye className="w-5 h-5"/></button>
              <button onClick={()=>setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} aria-label="Toggle sound">{soundEnabled?<Volume2 className="w-5 h-5"/>:<VolumeX className="w-5 h-5"/>}</button>
              <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} aria-label="Toggle fullscreen">{isFullscreen?<Minimize2 className="w-5 h-5"/>:<Maximize2 className="w-5 h-5"/>}</button>
            </div>
          </div>
        )}

        <section className="sr-only" aria-label="Drill description for search engines">
          <h2>Free Pro Tracking Trainer - Raw Input FPS Aim Tracking Drill for Valorant CS2 Apex Overwatch</h2>
          <p>Train your tracking aim with this free pro-level FPS tracking drill featuring raw mouse input via Pointer Lock API. 6 balls with 1 green target that switches every 1.5 seconds. Speed scales infinitely with each switch. Real-time accuracy tracking combo streaks and 60-second timed challenge. Perfect for Valorant CS2 Overwatch Apex Legends and all competitive FPS games. No registration required.</p>
        </section>

        {!isFullscreen&&(
          <div className="grid grid-cols-6 gap-3 mb-4 h-[88px]">
            <StatCard icon={<Target className="text-blue-600"/>} value={trackingScore} label="Score" d={isDarkMode}/>
            <StatCard icon={<Trophy className="text-yellow-500"/>} value={bestScore} label="Best" d={isDarkMode}/>
            <StatCard icon={<Timer className={timeLeft<=10?'text-red-600':'text-green-600'}/>} value={timeLeft} label="Time" unit="s" d={isDarkMode}/>
            <StatCard icon={<Activity className="text-green-500"/>} value={trackingAccuracy} label="Accuracy" unit="%" d={isDarkMode}/>
            <StatCard icon={<Zap className="text-orange-500"/>} value={trackingCombo} label="Combo" d={isDarkMode}/>
            <StatCard icon={<Target className="text-purple-500"/>} value={currentSpeed} label="Speed" d={isDarkMode}/>
          </div>
        )}

        <div className="h-10 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback?'opacity-100 scale-100':'opacity-0 scale-95'} ${feedbackType==='success'?'bg-green-500':'bg-red-500'}`} role="status" aria-live="polite">{feedback||'\u00A0'}</div>
        </div>

        <div ref={containerRef} className={`relative ${isFullscreen?'fixed inset-0 z-50':'rounded-xl border-2'}`} style={{background:isBoxDarkMode?"#020202":"#ffffff",aspectRatio:isFullscreen?'auto':'16/9',maxWidth:'100%',margin:'0 auto',borderColor:isDarkMode?'#374151':'#e5e7eb',overflow:'hidden'}}>
          {isFullscreen&&gameState==='playing'&&(
            <div className="absolute top-4 right-4 z-20 flex gap-3">
              <button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all"><RefreshCw className="w-5 h-5"/></button>
              <button onClick={()=>setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode?<Sun className="w-5 h-5"/>:<Moon className="w-5 h-5"/>}</button>
              <button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5"/></button>
              <button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5"/></button>
            </div>
          )}
          <canvas ref={canvasRef} style={{display:'block',position:'absolute',cursor:'none'}}/>
          {gameState==='start'&&(
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
                <Target className="w-16 h-16 text-green-500 mx-auto mb-4" aria-hidden="true"/>
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Pro Tracking Trainer</h2>
                <p className={`mb-2 ${isBoxDarkMode?'text-gray-300':'text-gray-600'}`}>Raw input • 1.5s target switches • Speed scales infinitely</p>
                <p className={`mb-6 text-sm ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}>Track the green target ball with raw mouse input. Target switches every 1.5 seconds. Speed increases with each switch. Perfect for FPS tracking aim training.</p>
                <button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" aria-label="Start free pro tracking drill">Start Free Drill</button>
              </div>
            </div>
          )}
          {gameState==='gameOver'&&(
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4"><Timer className="w-10 h-10 text-orange-500" aria-hidden="true"/><h2 className={`text-2xl font-bold ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Training Complete!</h2></div>
                <p className={`text-center text-sm mb-6 ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}>Keep practicing to improve tracking aim for Valorant, CS2, Apex, and all FPS games.</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Score" v={trackingScore} i={<Target className="w-4 h-4"/>} c="blue" d={isBoxDarkMode}/>
                  <ResultCard label="Best Score" v={bestScore} i={<Trophy className="w-4 h-4"/>} c="yellow" d={isBoxDarkMode}/>
                  <ResultCard label="Best Accuracy" v={bestAccuracy} u="%" i={<Activity className="w-4 h-4"/>} c="emerald" d={isBoxDarkMode}/>
                  <ResultCard label="Best Combo" v={bestCombo} i={<Zap className="w-4 h-4"/>} c="orange" d={isBoxDarkMode}/>
                  <ResultCard label="Final Speed" v={currentSpeed} i={<Timer className="w-4 h-4"/>} c="purple" d={isBoxDarkMode}/>
                  <ResultCard label="Switches" v={targetSwitches} i={<Target className="w-4 h-4"/>} c="cyan" d={isBoxDarkMode}/>
                </div>
                <div className="flex gap-3"><Link href="/drills/fps" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode?'bg-gray-700 text-gray-300 hover:bg-gray-600':'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back to FPS</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Track Again →</button></div>
              </div>
            </div>
          )}
        </div>

        {/* 1. DRILL RULES */}
        {!isFullscreen&&(
          <footer className="mt-6" aria-label="Drill rules and scoring information">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode?'text-green-400':'text-green-600'}`} aria-hidden="true"/><h2 className={`font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Drill Rules & Scoring</h2></div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Track the <span className="font-semibold text-green-500">green target ball</span> with your crosshair</p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Raw input via <span className="font-semibold text-blue-500">Pointer Lock API</span></p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Target switches <span className="font-semibold text-orange-500">every 1.5 seconds</span></p></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Tracking: <span className="font-semibold text-purple-500">+5 points per second</span></p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Speed <span className="font-semibold text-yellow-500">scales infinitely</span> with each switch</p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Combo <span className="font-semibold text-red-500">every 10 tracking ticks</span></p></div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode?'border-gray-700 text-gray-400':'border-gray-200 text-gray-500'}`}><span>🖱️ Raw mouse input • 6 balls • 60 second challenge</span><span>🏆 Best Score saves locally • Free forever</span></div>
              </div>
            </div>
          </footer>
        )}

        {/* 2. ABOUT THIS DRILL */}
        {!isFullscreen&&(
          <section className="mt-8" aria-label="About this pro tracking drill">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2"><GraduationCap className={`w-5 h-5 ${isDarkMode?'text-green-400':'text-green-600'}`} aria-hidden="true"/><h2 className={`font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>About This Free Pro Tracking Drill</h2></div>
              </div>
              <div className="p-5">
                <p className={`text-sm leading-relaxed mb-5 ${isDarkMode?'text-gray-300':'text-gray-600'}`}>This pro-level tracking trainer uses raw mouse input via the Pointer Lock API for the most accurate FPS aim training. Track the green target ball among 5 white distractors. The target switches every 1.5 seconds and speed scales infinitely. Perfect for competitive FPS players.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-green-50 border-green-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white"/></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Who It's For</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Competitive FPS players (Valorant, CS2, Overwatch, Apex), tracking aim enthusiasts, and esports athletes.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-blue-50 border-blue-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white"/></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Skills Improved</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Smooth tracking, target switching, raw mouse control, hand-eye coordination, and reactive aim.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-purple-50 border-purple-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white"/></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>What You'll Track</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Score, tracking accuracy, combo streaks, target switches, and infinitely scaling speed.</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-yellow-50 border-yellow-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white"/></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Why Pro Tracking?</h3></div><ul className={`text-xs space-y-2 ${isDarkMode?'text-gray-400':'text-gray-600'}`}><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0"/> Raw input for true 1:1 mouse movement</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0"/> Infinite speed scaling pushes your limits</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0"/> 1.5s switches train reactive tracking</li></ul></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-orange-50 border-orange-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center"><Clock className="w-4 h-4 text-white"/></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>How to Practice Effectively</h3></div><ol className={`text-xs space-y-2 ${isDarkMode?'text-gray-400':'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span> Click canvas to lock cursor for raw input</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span> Smoothly track the green target ball</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span> React quickly when target switches every 1.5s</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span> Practice 10-15 minutes daily for best tracking improvement</li></ol></div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. RELATED DRILLS */}
        {!isFullscreen&&(
          <section className="mt-8" aria-label="Related FPS training drills">
            <div className="flex items-center gap-2 mb-4"><div className="w-1 h-6 rounded-full bg-gradient-to-b from-green-500 to-emerald-600"></div><h2 className={`text-xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Explore Related FPS Drills</h2><span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>8 drills</span></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/drills/fps/reactive-tracking" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-orange-500':'bg-white border-gray-200 hover:border-orange-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center"><Zap className="w-4 h-4 text-orange-600"/></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>FPS Tracking</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-orange-400':'text-gray-900 group-hover:text-orange-600'} transition-colors`}>Reactive Tracking</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Targets change direction randomly for reactive aim training.</p><div className="flex items-center gap-1 mt-3 text-orange-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3"/></div></div></Link>
              <Link href="/drills/fps/single-target-track" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-blue-500':'bg-white border-gray-200 hover:border-blue-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><Target className="w-4 h-4 text-blue-600"/></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>FPS Tracking</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-blue-400':'text-gray-900 group-hover:text-blue-600'} transition-colors`}>Single Target Track</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Focus on one moving target for smooth tracking fundamentals.</p><div className="flex items-center gap-1 mt-3 text-blue-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3"/></div></div></Link>
              <Link href="/drills/fps/flick-shot-training" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-red-500':'bg-white border-gray-200 hover:border-red-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center"><Crosshair className="w-4 h-4 text-red-600"/></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>FPS Aim</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-red-400':'text-gray-900 group-hover:text-red-600'} transition-colors`}>Flick Shot Training</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Master one-tap flick shots for Valorant and CS2.</p><div className="flex items-center gap-1 mt-3 text-red-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3"/></div></div></Link>
              <Link href="/drills/fps/multi-target-tracking" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-purple-500':'bg-white border-gray-200 hover:border-purple-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center"><Activity className="w-4 h-4 text-purple-600"/></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>FPS Tracking</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-purple-400':'text-gray-900 group-hover:text-purple-600'} transition-colors`}>Multi-Target Tracking</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Track multiple targets simultaneously for battlefield awareness.</p><div className="flex items-center gap-1 mt-3 text-purple-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3"/></div></div></Link>
              <Link href="/drills/fps/chaos-tracking" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-teal-500':'bg-white border-gray-200 hover:border-teal-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-green-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center"><Zap className="w-4 h-4 text-teal-600"/></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>FPS Tracking</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-teal-400':'text-gray-900 group-hover:text-teal-600'} transition-colors`}>Chaos Tracking</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Unpredictable target patterns for expert-level tracking.</p><div className="flex items-center gap-1 mt-3 text-teal-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3"/></div></div></Link>
              <Link href="/drills/fps/360fps-reflex" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-cyan-500':'bg-white border-gray-200 hover:border-cyan-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center"><Timer className="w-4 h-4 text-cyan-600"/></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>FPS Reflex</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-cyan-400':'text-gray-900 group-hover:text-cyan-600'} transition-colors`}>360 FPS Reflex</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Ultra-fast reflex training at 360 FPS for high refresh rate gaming.</p><div className="flex items-center gap-1 mt-3 text-cyan-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3"/></div></div></Link>
              <Link href="/drills/fps/target-acquisition" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-emerald-500':'bg-white border-gray-200 hover:border-emerald-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center"><Target className="w-4 h-4 text-emerald-600"/></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>FPS Aim</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-emerald-400':'text-gray-900 group-hover:text-emerald-600'} transition-colors`}>Target Acquisition</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Quickly identify and acquire targets in cluttered environments.</p><div className="flex items-center gap-1 mt-3 text-emerald-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3"/></div></div></Link>
              <Link href="/drills/fps/peripheral-awareness" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-indigo-500':'bg-white border-gray-200 hover:border-indigo-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center"><Eye className="w-4 h-4 text-indigo-600"/></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>FPS Awareness</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-indigo-400':'text-gray-900 group-hover:text-indigo-600'} transition-colors`}>Peripheral Awareness</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Detect and react to targets at screen edges without tunnel vision.</p><div className="flex items-center gap-1 mt-3 text-indigo-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3"/></div></div></Link>
            </div>
          </section>
        )}

        {/* 4. GLOBAL FOOTER */}
        {!isFullscreen&&(
          <footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div><h3 className="text-white font-semibold mb-3 text-sm">FPS Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li><li><Link href="/drills/fps/reactive-tracking" className="hover:text-white transition-colors">Reactive Tracking</Link></li><li><Link href="/drills/fps/target-acquisition" className="hover:text-white transition-colors">Target Acquisition</Link></li><li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 21 FPS Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li><li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li><li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li><li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 16 Cognitive Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Academic</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li><li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-white transition-colors">Speed Reader</Link></li><li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-white transition-colors">Mental Math</Link></li><li><Link href="/drills/academic" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 12 Academic Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Visual & Motor</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li><li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Hand-Eye Coordination</Link></li><li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-white transition-colors">Moving Target Tracking</Link></li><li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 14 Visual Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">More Categories</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/memory" className="hover:text-white transition-colors">Memory (15 drills)</Link></li><li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li><li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li><li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li></ul></div>
              </div>
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><Target className="w-5 h-5 text-white" aria-hidden="true"/></div><span className="text-white font-bold text-lg">SkillDrills</span></div>
                <p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">Free online pro tracking trainer with raw mouse input via Pointer Lock API. Track green target among 6 balls with 1.5s switches and infinite speed scaling. Perfect for Valorant CS2 Overwatch Apex Legends and all competitive FPS tracking aim training. No registration required. More free drills at skilldrills.online.</p>
                <div className="flex items-center justify-center gap-5 flex-wrap">
                  <button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors" title="Share" aria-label="Share this drill"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg></button>
                  <button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors" title="Copy link" aria-label="Copy link"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg></button>
                  <a href="https://twitter.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Twitter X"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                  <a href="https://instagram.com/skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Instagram"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="YouTube"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Pinterest"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg></a>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

function StatCard({icon,value,label,unit='',d}){return(<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full ${d?'bg-gray-800 border-gray-700':'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${d?'text-white':'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${d?'text-gray-400':'text-gray-500'}`}>{label}</p></div>);}

function ResultCard({label,v,unit='',i,c,d}){const m={blue:'bg-blue-500/10 border-blue-500/30 text-blue-500',yellow:'bg-yellow-500/10 border-yellow-500/30 text-yellow-500',emerald:'bg-emerald-500/10 border-emerald-500/30 text-emerald-500',orange:'bg-orange-500/10 border-orange-500/30 text-orange-500',purple:'bg-purple-500/10 border-purple-500/30 text-purple-500',cyan:'bg-cyan-500/10 border-cyan-500/30 text-cyan-500'};const o=m[c]||m.blue;const[bg,border,text]=o.split(' ');return(<div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}><div className="flex items-center gap-2 min-w-0"><div className={text} aria-hidden="true">{i}</div><span className={`text-xs sm:text-sm truncate ${d?'text-gray-300':'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${text}`}>{v}{unit}</span></div>);}