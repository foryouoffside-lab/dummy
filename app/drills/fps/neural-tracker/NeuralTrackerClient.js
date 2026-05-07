'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Activity, MousePointer,
  Lock, AlertCircle
} from 'lucide-react';

export default function NeuralTrackerClient() {
  const canvasRef = useRef(null);
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
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [lockCooldown, setLockCooldown] = useState(false);
  
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const crosshairInitRef = useRef(false);
  
  const ballsRef = useRef([]);
  const targetIndexRef = useRef(0);
  const animationFrameRef = useRef(null);
  const isInitializedRef = useRef(false);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const trackingAccuracyRef = useRef(100);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(60);
  const totalHitsRef = useRef(0);
  const trackingTimeRef = useRef(0);
  const bestAccuracyRef = useRef(0);
  const bestComboRef = useRef(0);
  const trackingIntervalRef = useRef(null);
  
  const ballRadius = 24;
  const movementSpeed = 3.5;
  const BALL_COUNT = 5;

  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);
  useEffect(() => { try { const s = localStorage.getItem('neuralTrackerBest'); if(s) { const p = parseInt(s,10); if(!isNaN(p)) setBestScore(p); } } catch(e){} }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  
  const updateBestScore = useCallback((fs) => { try { const c = parseInt(localStorage.getItem('neuralTrackerBest')||'0',10); if(fs>c) { localStorage.setItem('neuralTrackerBest',fs.toString()); setBestScore(fs); } } catch(e){} }, []);
  const showFeedback = useCallback((m,t) => { if(feedbackTimeoutRef.current)clearTimeout(feedbackTimeoutRef.current); setFeedback(m);setFeedbackType(t); feedbackTimeoutRef.current=setTimeout(()=>{setFeedback('');setFeedbackType('');},800); }, []);
  const initAudio = useCallback(() => { try { if(!audioCtxRef.current)audioCtxRef.current=new(window.AudioContext||window.webkitAudioContext)(); if(audioCtxRef.current.state==='suspended')audioCtxRef.current.resume(); return audioCtxRef.current; } catch(e){return null;} }, []);
  const playSound = useCallback((type) => { if(!soundEnabled)return; try { const ctx=initAudio(); if(!ctx)return; const o=ctx.createOscillator(),g=ctx.createGain(); o.connect(g);g.connect(ctx.destination); const now=ctx.currentTime; o.frequency.setValueAtTime(type==='combo'?1046:880,now); g.gain.setValueAtTime(0.1,now); g.gain.exponentialRampToValueAtTime(0.001,now+0.1); o.start(now);o.stop(now+0.1); } catch(e){} }, [soundEnabled,initAudio]);

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
      virtualCrosshair.current.x+=e.movementX||0;
      virtualCrosshair.current.y+=e.movementY||0;
      const c=canvasRef.current;
      if(c){virtualCrosshair.current.x=Math.max(0,Math.min(c.width,virtualCrosshair.current.x)); virtualCrosshair.current.y=Math.max(0,Math.min(c.height,virtualCrosshair.current.y));}
    };
    document.addEventListener('mousemove',h);
    return () => document.removeEventListener('mousemove',h);
  }, []);

  const toggleFullscreen = useCallback(async () => { try { if(!isFullscreen){const el=containerRef.current;if(el?.requestFullscreen){await el.requestFullscreen();setIsFullscreen(true);}}else{if(document.fullscreenElement)await document.exitFullscreen();setIsFullscreen(false);} } catch(e){} }, [isFullscreen]);
  useEffect(()=>{const h=()=>setIsFullscreen(!!document.fullscreenElement);document.addEventListener('fullscreenchange',h);return()=>document.removeEventListener('fullscreenchange',h);},[]);

  const resolveCollisions = useCallback(() => {
    const balls=ballsRef.current, count=balls.length;
    for(let i=0;i<count;i++){for(let j=i+1;j<count;j++){const b1=balls[i],b2=balls[j],dx=b2.x-b1.x,dy=b2.y-b1.y,dist=Math.sqrt(dx*dx+dy*dy),minDist=b1.radius+b2.radius;if(dist<minDist){const nx=dx/dist,ny=dy/dist,overlap=minDist-dist;b1.x-=nx*overlap*0.5;b1.y-=ny*overlap*0.5;b2.x+=nx*overlap*0.5;b2.y+=ny*overlap*0.5;const dvx=b2.vx-b1.vx,dvy=b2.vy-b1.vy,vn=dvx*nx+dvy*ny;if(vn<0){const impulse=vn*0.9;b1.vx+=impulse*nx;b1.vy+=impulse*ny;b2.vx-=impulse*nx;b2.vy-=impulse*ny;}}}}
  }, []);

  class Ball {
    constructor(id,isTarget){this.id=id;this.isTarget=isTarget;this.radius=ballRadius;this.x=0;this.y=0;this.vx=0;this.vy=0;}
    init(width,height){let ov,att=0;do{ov=false;this.x=this.radius+20+Math.random()*(width-this.radius*2-40);this.y=this.radius+20+Math.random()*(height-this.radius*2-40);for(const b of ballsRef.current){if(b!==this&&Math.hypot(b.x-this.x,b.y-this.y)<this.radius+b.radius+15){ov=true;break;}}att++;}while(ov&&att<200);const a=Math.random()*Math.PI*2,s=movementSpeed*(0.8+Math.random()*0.5);this.vx=Math.cos(a)*s;this.vy=Math.sin(a)*s;}
    update(width,height){this.x+=this.vx;this.y+=this.vy;if(this.x<this.radius){this.x=this.radius;this.vx=Math.abs(this.vx);}else if(this.x>width-this.radius){this.x=width-this.radius;this.vx=-Math.abs(this.vx);}if(this.y<this.radius){this.y=this.radius;this.vy=Math.abs(this.vy);}else if(this.y>height-this.radius){this.y=height-this.radius;this.vy=-Math.abs(this.vy);}const cs=Math.sqrt(this.vx*this.vx+this.vy*this.vy);if(cs>movementSpeed*1.3){this.vx*=movementSpeed*1.2/cs;this.vy*=movementSpeed*1.2/cs;}if(cs<movementSpeed*0.7){this.vx*=movementSpeed*0.9/cs;this.vy*=movementSpeed*0.9/cs;}}
  }

  const startTimer = useCallback(() => {
    if(timerIntervalRef.current)clearInterval(timerIntervalRef.current);
    timerIntervalRef.current=setInterval(()=>{if(gameStateRef.current==='playing'&&isActiveRef.current){timeLeftRef.current-=1;setTimeLeft(timeLeftRef.current);if(timeLeftRef.current<=0){clearInterval(timerIntervalRef.current);timerIntervalRef.current=null;if(trackingIntervalRef.current)clearInterval(trackingIntervalRef.current);setGameState('gameOver');gameStateRef.current='gameOver';isActiveRef.current=false;updateBestScore(scoreRef.current);document.exitPointerLock();}}},1000);
  }, [updateBestScore]);

  useEffect(() => {
    if(gameState!=='playing'){if(trackingIntervalRef.current)clearInterval(trackingIntervalRef.current);return;}
    trackingIntervalRef.current=setInterval(()=>{
      if(!isActiveRef.current||!crosshairInitRef.current)return;
      const t=ballsRef.current[targetIndexRef.current]; if(!t)return;
      const ch=virtualCrosshair.current;
      const closeness=Math.max(0,100-(Math.hypot(t.x-ch.x,t.y-ch.y)/120)*100);
      trackingAccuracyRef.current=Math.round(closeness);setTrackingAccuracy(trackingAccuracyRef.current);
      if(trackingAccuracyRef.current>bestAccuracyRef.current){bestAccuracyRef.current=trackingAccuracyRef.current;setBestAccuracy(trackingAccuracyRef.current);}
      if(trackingAccuracyRef.current>60){trackingTimeRef.current+=2;if(trackingTimeRef.current>=2){scoreRef.current+=1;comboRef.current+=1;totalHitsRef.current+=1;setTrackingScore(scoreRef.current);setTrackingCombo(comboRef.current);setTotalHits(totalHitsRef.current);if(comboRef.current>bestComboRef.current){bestComboRef.current=comboRef.current;setBestCombo(comboRef.current);}showFeedback('✓ +1','success');playSound('success');if(comboRef.current%5===0){playSound('combo');showFeedback(`🔥 ${comboRef.current} Combo!`,'success');}trackingTimeRef.current=0;}}else{trackingTimeRef.current=0;comboRef.current=0;setTrackingCombo(0);}
    },2000);
    return()=>{if(trackingIntervalRef.current)clearInterval(trackingIntervalRef.current);};
  }, [gameState,playSound,showFeedback]);

  useEffect(() => {
    if(gameState!=='playing'){if(animationFrameRef.current){cancelAnimationFrame(animationFrameRef.current);animationFrameRef.current=null;}isInitializedRef.current=false;return;}
    const cvs=canvasRef.current; if(!cvs)return;
    const ctx=cvs.getContext('2d');
    const update=()=>{const cr=containerRef.current;if(!cr)return;const rr=cr.getBoundingClientRect();let w=rr.width,h=w*(9/16);if(h>rr.height){h=rr.height;w=h*(16/9);}cvs.width=w;cvs.height=h;canvasSizeRef.current={width:w,height:h};cvs.style.position='absolute';cvs.style.left=`${(rr.width-w)/2}px`;cvs.style.top=`${(rr.height-h)/2}px`;if(!crosshairInitRef.current)virtualCrosshair.current={x:w/2,y:h/2};if(!isInitializedRef.current){ballsRef.current=[];for(let i=0;i<BALL_COUNT;i++){const b=new Ball(i,i===0);ballsRef.current.push(b);}ballsRef.current.forEach(b=>b.init(w,h));targetIndexRef.current=0;isInitializedRef.current=true;}};
    update();
    const ro=new ResizeObserver(update);if(containerRef.current)ro.observe(containerRef.current);
    window.addEventListener('resize',update);
    const loop=()=>{if(gameStateRef.current!=='playing')return;
      const w=canvasSizeRef.current.width,h=canvasSizeRef.current.height;
      ballsRef.current.forEach(b=>b.update(w,h));
      for(let p=0;p<3;p++)resolveCollisions();
      ctx.fillStyle=isBoxDarkMode?'#020202':'#f9fafb';ctx.fillRect(0,0,w,h);
      ctx.strokeStyle=isBoxDarkMode?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.02)';ctx.lineWidth=1;
      for(let i=0;i<w;i+=40){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,h);ctx.stroke();}
      ballsRef.current.forEach(b=>{ctx.beginPath();ctx.arc(b.x,b.y,b.radius,0,Math.PI*2);if(b.isTarget){ctx.shadowBlur=12;ctx.shadowColor="#00ff88";ctx.fillStyle="#00ff88";ctx.fill();ctx.shadowBlur=0;ctx.beginPath();ctx.arc(b.x,b.y,b.radius,0,Math.PI*2);ctx.strokeStyle="rgba(255,255,255,0.3)";ctx.lineWidth=2;ctx.stroke();}else{ctx.shadowBlur=0;ctx.fillStyle=isBoxDarkMode?"#e0e0e0":"#9ca3af";ctx.fill();ctx.beginPath();ctx.arc(b.x,b.y,b.radius,0,Math.PI*2);ctx.strokeStyle=isBoxDarkMode?"rgba(255,255,255,0.15)":"rgba(0,0,0,0.1)";ctx.lineWidth=1.5;ctx.stroke();}});
      const ch=virtualCrosshair.current, t=ballsRef.current[targetIndexRef.current];
      if(ch.x>0&&ch.x<w&&ch.y>0&&ch.y<h){
        const tq=t?Math.max(0,1-Math.hypot(t.x-ch.x,t.y-ch.y)/120):0, lockColor=pointerLocked?(tq>0.4?'#00ff88':'rgba(255,255,255,0.6)'):'#ff4444';
        ctx.strokeStyle=lockColor;ctx.lineWidth=2;ctx.beginPath();ctx.arc(ch.x,ch.y,12,0,Math.PI*2);ctx.stroke();
        ctx.beginPath();ctx.moveTo(ch.x-24,ch.y);ctx.lineTo(ch.x-10,ch.y);ctx.moveTo(ch.x+10,ch.y);ctx.lineTo(ch.x+24,ch.y);ctx.moveTo(ch.x,ch.y-24);ctx.lineTo(ch.x,ch.y-10);ctx.moveTo(ch.x,ch.y+10);ctx.lineTo(ch.x,ch.y+24);ctx.stroke();
        ctx.fillStyle=lockColor;ctx.beginPath();ctx.arc(ch.x,ch.y,3,0,Math.PI*2);ctx.fill();
      }
      animationFrameRef.current=requestAnimationFrame(loop);};
    animationFrameRef.current=requestAnimationFrame(loop);
    return()=>{cancelAnimationFrame(animationFrameRef.current);window.removeEventListener('resize',update);ro.disconnect();animationFrameRef.current=null;};
  }, [gameState,isBoxDarkMode,pointerLocked,resolveCollisions]);

  const startGame = useCallback(() => {
    if(timerIntervalRef.current)clearInterval(timerIntervalRef.current);
    if(trackingIntervalRef.current)clearInterval(trackingIntervalRef.current);
    isInitializedRef.current=false;scoreRef.current=0;comboRef.current=0;bestComboRef.current=0;trackingAccuracyRef.current=100;bestAccuracyRef.current=0;totalHitsRef.current=0;trackingTimeRef.current=0;
    setGameState('playing');gameStateRef.current='playing';
    setTrackingScore(0);setTrackingAccuracy(100);setBestAccuracy(0);setTrackingCombo(0);setBestCombo(0);
    timeLeftRef.current=60;setTimeLeft(60);setTotalHits(0);setFeedback('');
    isActiveRef.current=true;crosshairInitRef.current=false;
    setTimeout(()=>requestPointerLock(),300);
    setTimeout(()=>{crosshairInitRef.current=true;},500);
    startTimer();
  }, [startTimer,requestPointerLock]);

  const resetGame = useCallback(() => {
    if(timerIntervalRef.current)clearInterval(timerIntervalRef.current);
    if(trackingIntervalRef.current)clearInterval(trackingIntervalRef.current);
    if(feedbackTimeoutRef.current)clearTimeout(feedbackTimeoutRef.current);
    if(animationFrameRef.current)cancelAnimationFrame(animationFrameRef.current);
    isActiveRef.current=false;setGameState('start');gameStateRef.current='start';
    setTrackingScore(0);setTrackingAccuracy(100);setBestAccuracy(0);setTrackingCombo(0);setBestCombo(0);
    timeLeftRef.current=60;setTimeLeft(60);setTotalHits(0);setFeedback('');
    crosshairInitRef.current=false;document.exitPointerLock();
    setLockCooldown(true);setTimeout(()=>setLockCooldown(false),1000);
  }, []);

  useEffect(()=>()=>{if(timerIntervalRef.current)clearInterval(timerIntervalRef.current);if(trackingIntervalRef.current)clearInterval(trackingIntervalRef.current);if(feedbackTimeoutRef.current)clearTimeout(feedbackTimeoutRef.current);if(animationFrameRef.current)cancelAnimationFrame(animationFrameRef.current);document.exitPointerLock();},[]);

  if(loading||!isClient)return(<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"/></div>);

  return (
    <div className={`min-h-screen select-none ${isDarkMode?'bg-gray-900':'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen&&(<nav className="mb-4"><ol className="flex flex-wrap items-center gap-2 text-sm"><li><Link href="/" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Home</Link></li><li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li><li><Link href="/drills/fps" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>FPS Drills</Link></li><li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li><li className={`font-medium ${isDarkMode?'text-green-400':'text-green-600'}`}>Neural Tracker</li></ol></nav>)}
        {!isFullscreen&&(<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"><div className="flex items-center gap-3"><div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl"><MousePointer className="w-6 h-6 text-white"/></div><div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Neural Tracker</h1><p className={`text-sm sm:text-base ${isDarkMode?'text-gray-400':'text-gray-500'}`}>{pointerLocked?'🟢 Raw input active':'🔴 Click canvas'} • 2s = +1pt • No penalties</p></div></div><div className="flex gap-2"><button onClick={()=>setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>{isDarkMode?<Sun className="w-5 h-5"/>:<Moon className="w-5 h-5"/>}</button><button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}><Eye className="w-5 h-5"/></button><button onClick={()=>setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>{soundEnabled?<Volume2 className="w-5 h-5"/>:<VolumeX className="w-5 h-5"/>}</button><button onClick={toggleFullscreen} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>{isFullscreen?<Minimize2 className="w-5 h-5"/>:<Maximize2 className="w-5 h-5"/>}</button><button onClick={pointerLocked?()=>{document.exitPointerLock();setLockCooldown(true);setTimeout(()=>setLockCooldown(false),1000);}:requestPointerLock} className={`p-2 rounded-lg border ${pointerLocked?'bg-green-500 border-green-600 text-white':isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}><Lock className="w-5 h-5"/></button></div></div>)}
        {!isFullscreen&&(<div className="grid grid-cols-6 gap-3 mb-4 h-[88px]"><StatCard icon={<Target className="text-blue-600"/>} value={trackingScore} label="Score" d={isDarkMode}/><StatCard icon={<Trophy className="text-yellow-500"/>} value={bestScore} label="Best" d={isDarkMode}/><StatCard icon={<Timer className={timeLeft<=10?'text-red-600':'text-green-600'}/>} value={timeLeft} label="Time" unit="s" d={isDarkMode}/><StatCard icon={<Activity className="text-green-500"/>} value={trackingAccuracy} label="Accuracy" unit="%" d={isDarkMode}/><StatCard icon={<Zap className="text-orange-500"/>} value={trackingCombo} label="Combo" d={isDarkMode}/><StatCard icon={<Target className="text-purple-500"/>} value={totalHits} label="Hits" d={isDarkMode}/></div>)}
        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback?'opacity-100 scale-100':'opacity-0 scale-95'} ${feedbackType==='success'?'bg-green-500':'bg-red-500'}`}>{feedback||'\u00A0'}</div></div>
        <div ref={containerRef} className={`relative ${isFullscreen?'fixed inset-0 z-50':'rounded-xl border-2'}`} style={{background:isBoxDarkMode?"#020202":"#fff",aspectRatio:isFullscreen?'auto':'16/9',maxWidth:'100%',margin:'0 auto',borderColor:isDarkMode?'#374151':'#e5e7eb',overflow:'hidden'}}>
          {isFullscreen&&gameState==='playing'&&(
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <span className="text-white/40 text-xs font-medium bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5">
                Press <span className="text-white/70 font-bold">ESC</span> to exit fullscreen
              </span>
            </div>
          )}
          <canvas ref={canvasRef} style={{display:'block',position:'absolute',cursor:'none'}}/>
          {gameState==='start'&&(<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><MousePointer className="w-16 h-16 text-green-500 mx-auto mb-4"/><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Neural Tracker</h2><p className={`mb-4 ${isBoxDarkMode?'text-gray-300':'text-gray-600'}`}>Raw input • 2s tracking = +1pt • No penalties</p><div className={`mb-6 p-3 rounded-lg border ${isBoxDarkMode?'border-yellow-600 bg-yellow-900/20':'border-yellow-200 bg-yellow-50'}`}><div className="flex items-center gap-2 mb-2"><AlertCircle className="w-4 h-4 text-yellow-500"/><p className={`text-sm font-medium ${isBoxDarkMode?'text-yellow-400':'text-yellow-700'}`}>Raw Input via Pointer Lock</p></div><p className={`text-xs ${isBoxDarkMode?'text-gray-400':'text-gray-600'}`}>Track green target. Press ESC to unlock and exit fullscreen.</p></div><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg w-full">Start Tracking</button></div></div>)}
          {gameState==='gameOver'&&(<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border max-w-[520px] mx-4 ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Trophy className="w-10 h-10 text-yellow-500"/><h2 className={`text-2xl font-bold ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Training Complete</h2></div><div className="grid grid-cols-2 gap-3 mb-4"><RC label="Score" v={trackingScore} i={<Target className="w-4 h-4"/>} c="blue" d={isBoxDarkMode}/><RC label="Best" v={bestScore} i={<Trophy className="w-4 h-4"/>} c="yellow" d={isBoxDarkMode}/><RC label="Accuracy" v={bestAccuracy} u="%" i={<Activity className="w-4 h-4"/>} c="emerald" d={isBoxDarkMode}/><RC label="Combo" v={bestCombo} i={<Zap className="w-4 h-4"/>} c="orange" d={isBoxDarkMode}/><RC label="Hits" v={totalHits} i={<Target className="w-4 h-4"/>} c="purple" d={isBoxDarkMode}/><RC label="Efficiency" v={trackingScore>0?(trackingScore/60).toFixed(1):'0'} u="/s" i={<Timer className="w-4 h-4"/>} c="cyan" d={isBoxDarkMode}/></div><div className="flex gap-3"><Link href="/drills/fps" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold ${isDarkMode?'bg-gray-700 text-gray-300':'bg-gray-200 text-gray-700'}`}>← Back</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold">Track Again →</button></div></div></div>)}
        </div>
        {!isFullscreen&&(<footer className="mt-6"><div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode?'text-green-400':'text-green-600'}`}/><h2 className={`font-semibold text-lg ${isDarkMode?'text-white':'text-gray-900'}`}>Drill Rules & Professional Features</h2></div></div><div className="p-6"><div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div className="space-y-3"><h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-green-400':'text-green-600'}`}><MousePointer className="w-5 h-5"/>How to Play</h3><ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</span><span>Click <span className="font-semibold text-green-400">Start Tracking</span></span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</span><span>Cursor locks for <span className="font-semibold text-green-400">raw input</span></span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</span><span>Track the <span className="font-semibold text-green-400">green target</span> ball</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</span><span>Ignore <span className="font-semibold">gray decoy</span> balls</span></li></ul></div><div className="space-y-3"><h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-blue-400':'text-blue-600'}`}><Trophy className="w-5 h-5"/>Scoring System</h3><ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">+1</span><span><span className="font-semibold text-blue-400">Tracking</span> = +1 pt per 2s</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">60%</span><span><span className="font-semibold text-green-400">Threshold</span> to earn points</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">🔥</span><span><span className="font-semibold text-orange-400">Combo</span> every 5 hits</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">✓</span><span><span className="font-semibold text-purple-400">No penalties</span> - pure practice</span></li></ul></div><div className="space-y-3"><h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-purple-400':'text-purple-600'}`}><Zap className="w-5 h-5"/>Pro Features</h3><ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><li className="flex items-start gap-2"><Lock className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5"/><span><span className="font-semibold text-green-400">Raw Input</span> - Pointer Lock API</span></li><li className="flex items-start gap-2"><Activity className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5"/><span><span className="font-semibold text-blue-400">Real-time</span> accuracy tracking</span></li><li className="flex items-start gap-2"><Timer className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5"/><span><span className="font-semibold text-orange-400">Collision</span> physics between balls</span></li><li className="flex items-start gap-2"><Target className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5"/><span><span className="font-semibold text-purple-400">5 balls</span> - 1 green, 4 decoys</span></li></ul></div></div><div className={`mt-4 p-4 rounded-lg border ${isDarkMode?'border-gray-600 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}><h4 className={`text-sm font-semibold mb-2 ${isDarkMode?'text-gray-300':'text-gray-700'}`}>🖱️ Controls</h4><div className="grid grid-cols-2 gap-2"><p className={`text-xs ${isDarkMode?'text-gray-400':'text-gray-500'}`}><span className="font-semibold">ESC ×2</span> - Unlock cursor, then exit</p><p className={`text-xs ${isDarkMode?'text-gray-400':'text-gray-500'}`}><span className="font-semibold">Click Canvas</span> - Re-lock cursor</p><p className={`text-xs ${isDarkMode?'text-gray-400':'text-gray-500'}`}><span className="font-semibold">F11</span> - Toggle fullscreen</p><p className={`text-xs ${isDarkMode?'text-gray-400':'text-gray-500'}`}><span className="font-semibold">Track Target</span> - Follow green ball</p></div></div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({icon,value,label,unit='',d}){return(<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full ${d?'bg-gray-800 border-gray-700':'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${d?'text-white':'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${d?'text-gray-400':'text-gray-500'}`}>{label}</p></div>);}
function RC({label,v,unit='',i,c,d}){const m={blue:'bg-blue-500/10 border-blue-500/30 text-blue-500',yellow:'bg-yellow-500/10 border-yellow-500/30 text-yellow-500',emerald:'bg-emerald-500/10 border-emerald-500/30 text-emerald-500',orange:'bg-orange-500/10 border-orange-500/30 text-orange-500',purple:'bg-purple-500/10 border-purple-500/30 text-purple-500',cyan:'bg-cyan-500/10 border-cyan-500/30 text-cyan-500'};const o=m[c]||m.blue;const[bg,border,text]=o.split(' ');return(<div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}><div className="flex items-center gap-2"><div className={text}>{i}</div><span className={`text-xs sm:text-sm ${d?'text-gray-300':'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg ${text}`}>{v}{unit}</span></div>);}