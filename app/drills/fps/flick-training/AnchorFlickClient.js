'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Activity, Move,
  Lock, AlertCircle
} from 'lucide-react';

const ANCHOR_SIZE = 12;
const TARGET_START_RADIUS = 30;
const TARGET_MIN_RADIUS = 6;
const SHRINK_RATE = 0.08;

export default function AnchorFlickClient() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [uiScore, setUiScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [lockCooldown, setLockCooldown] = useState(false);
  const [bestReaction, setBestReaction] = useState(0);
  
  const [analyticsData, setAnalyticsData] = useState({
    overshoots: 0, undershoots: 0, totalShots: 0,
    reactionTimes: [], pathEfficiency: 0, averageDeviation: 0
  });
  
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const movementHistory = useRef([]);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const crosshairInitRef = useRef(false);
  
  const engine = useRef({
    score: 0, state: 'ANCHOR', lastTimestamp: 0,
    target: { x: 0, y: 0, r: TARGET_START_RADIUS, spawnTime: 0 },
    anchor: { x: 0, y: 0, r: ANCHOR_SIZE }
  });

  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);
  const comboRef = useRef(0);
  const bestComboRef = useRef(0);
  const hitsRef = useRef(0);
  const missesRef = useRef(0);
  const scoreRef = useRef(0);

  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);
  useEffect(() => { try { const s = localStorage.getItem('anchorFlickBest'); if (s) { const p = parseInt(s,10); if (!isNaN(p)) setBestScore(p); } } catch(e){} }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const updateBestScore = useCallback((fs) => { try { const c = parseInt(localStorage.getItem('anchorFlickBest')||'0',10); if (fs>c) { localStorage.setItem('anchorFlickBest',fs.toString()); setBestScore(fs); } } catch(e){} }, []);
  const showFeedback = useCallback((m,t) => { if(feedbackTimeoutRef.current)clearTimeout(feedbackTimeoutRef.current); setFeedback(m); setFeedbackType(t); feedbackTimeoutRef.current=setTimeout(()=>{setFeedback('');setFeedbackType('');},800); }, []);
  const initAudio = useCallback(() => { try { if(!audioCtxRef.current)audioCtxRef.current=new(window.AudioContext||window.webkitAudioContext)(); if(audioCtxRef.current.state==='suspended')audioCtxRef.current.resume(); return audioCtxRef.current; } catch(e){return null;} }, []);
  const playSound = useCallback((type) => { if(!soundEnabled)return; try { const ctx=initAudio(); if(!ctx)return; const o=ctx.createOscillator(),g=ctx.createGain(); o.connect(g);g.connect(ctx.destination); const now=ctx.currentTime; const f={hit:880,miss:440,combo:1046}; o.frequency.setValueAtTime(f[type]||440,now); g.gain.setValueAtTime(type==='combo'?0.12:0.1,now); g.gain.exponentialRampToValueAtTime(0.001,now+0.15); o.start(now);o.stop(now+0.15); } catch(e){} }, [soundEnabled,initAudio]);

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
      const now=performance.now();
      movementHistory.current.push({x:dx,y:dy,timestamp:now});
      movementHistory.current=movementHistory.current.filter(m=>now-m.timestamp<500);
      virtualCrosshair.current.x+=dx; virtualCrosshair.current.y+=dy;
      const c=canvasRef.current;
      if(c){virtualCrosshair.current.x=Math.max(0,Math.min(c.width,virtualCrosshair.current.x)); virtualCrosshair.current.y=Math.max(0,Math.min(c.height,virtualCrosshair.current.y));}
    };
    document.addEventListener('mousemove',h);
    return () => document.removeEventListener('mousemove',h);
  }, []);

  const toggleFullscreen = useCallback(async () => { try { if(!isFullscreen){const el=containerRef.current;if(el?.requestFullscreen){await el.requestFullscreen();setIsFullscreen(true);}}else{if(document.fullscreenElement)await document.exitFullscreen();setIsFullscreen(false);} } catch(e){} }, [isFullscreen]);
  useEffect(()=>{const h=()=>setIsFullscreen(!!document.fullscreenElement);document.addEventListener('fullscreenchange',h);return()=>document.removeEventListener('fullscreenchange',h);},[]);

  const spawn = useCallback((type) => {
    const e=engine.current, cvs=canvasRef.current; if(!cvs)return;
    const pad=Math.min(150,Math.min(cvs.width,cvs.height)*0.15);
    if(type==='ANCHOR'){e.anchor.x=pad+Math.random()*(cvs.width-pad*2);e.anchor.y=pad+Math.random()*(cvs.height-pad*2);e.state='ANCHOR';}
    else{const a=Math.random()*Math.PI*2,d=Math.min(300,Math.min(cvs.width,cvs.height)*0.4);e.target.x=Math.max(50,Math.min(cvs.width-50,e.anchor.x+Math.cos(a)*(150+Math.random()*d)));e.target.y=Math.max(50,Math.min(cvs.height-50,e.anchor.y+Math.sin(a)*(150+Math.random()*d)));e.target.r=Math.min(30,Math.min(cvs.width,cvs.height)*0.04);e.target.spawnTime=performance.now();e.state='FLICK';}
  }, []);

  const analyzeShot = useCallback((tp,cp,rt) => {
    const d=Math.hypot(cp.x-tp.x,cp.y-tp.y);
    setAnalyticsData(prev=>{const nd={...prev};nd.totalShots++;if(d<=tp.r)nd.reactionTimes=[...prev.reactionTimes,rt].slice(-50);else{if(d>tp.r)nd.overshoots++;else nd.undershoots++;}nd.averageDeviation=((prev.averageDeviation*prev.totalShots)+d)/(prev.totalShots+1);const pl=movementHistory.current.reduce((a,m,i,arr)=>{if(i===0)return a;return a+Math.hypot(m.x-arr[i-1].x,m.y-arr[i-1].y);},0);nd.pathEfficiency=Math.hypot(cp.x-engine.current.anchor.x,cp.y-engine.current.anchor.y)/(pl||1);return nd;});
  }, []);

  const handleShot = useCallback(() => {
    if(!isActiveRef.current||!crosshairInitRef.current)return;
    const eng=engine.current, cp={...virtualCrosshair.current};
    if(eng.state==='ANCHOR'){if(Math.hypot(cp.x-eng.anchor.x,cp.y-eng.anchor.y)<eng.anchor.r+15){spawn('FLICK');playSound('hit');}}
    else{const tt=performance.now()-eng.target.spawnTime,d=Math.hypot(cp.x-eng.target.x,cp.y-eng.target.y);
      if(d<eng.target.r+5){const pts=Math.max(10,Math.floor(5000/tt));eng.score+=pts;scoreRef.current=eng.score;setUiScore(eng.score);hitsRef.current++;setHits(hitsRef.current);comboRef.current++;setCombo(comboRef.current);if(comboRef.current>bestComboRef.current){bestComboRef.current=comboRef.current;setBestCombo(comboRef.current);}if(bestReaction===0||tt<bestReaction)setBestReaction(Math.round(tt));analyzeShot(eng.target,cp,tt);playSound('hit');if(comboRef.current%5===0){playSound('combo');showFeedback(`🔥 ${comboRef.current} Combo! +${pts} (${Math.round(tt)}ms)`,'success');}else showFeedback(`✓ Hit! +${pts} (${Math.round(tt)}ms)`,'success');spawn('ANCHOR');}
      else{missesRef.current++;setMisses(missesRef.current);comboRef.current=0;setCombo(0);analyzeShot(eng.target,cp,tt);playSound('miss');showFeedback(`✗ Miss! (${d.toFixed(0)}px)`,'error');spawn('ANCHOR');}}
  }, [spawn,playSound,showFeedback,analyzeShot,bestReaction]);

  useEffect(() => {
    const h = (e) => {
      if(e.target.tagName==='BUTTON'||e.target.closest('button'))return;
      if(gameState==='playing'){e.preventDefault();handleShot();}
    };
    document.addEventListener('mousedown',h);
    return () => document.removeEventListener('mousedown',h);
  }, [gameState,handleShot]);

  useEffect(() => {
    if(gameState!=='playing')return;
    const cvs=canvasRef.current;if(!cvs)return;
    const ctx=cvs.getContext('2d',{desynchronized:true,alpha:false});
    const update=()=>{const cr=containerRef.current;if(!cr)return;const rr=cr.getBoundingClientRect();let w=rr.width,h=w*(9/16);if(h>rr.height){h=rr.height;w=h*(16/9);}cvs.width=w;cvs.height=h;canvasSizeRef.current={width:w,height:h};cvs.style.position='absolute';cvs.style.left=`${(rr.width-w)/2}px`;cvs.style.top=`${(rr.height-h)/2}px`;if(!crosshairInitRef.current)virtualCrosshair.current={x:w/2,y:h/2};if(!engine.current.state||engine.current.state==='ANCHOR')spawn('ANCHOR');};
    update();
    const ro=new ResizeObserver(update);if(containerRef.current)ro.observe(containerRef.current);
    window.addEventListener('resize',update);
    const loop=(now)=>{const dt=now-engine.current.lastTimestamp;engine.current.lastTimestamp=now;const e=engine.current;
      if(e.state==='FLICK'){e.target.r-=SHRINK_RATE*dt;if(e.target.r<TARGET_MIN_RADIUS){missesRef.current++;setMisses(missesRef.current);comboRef.current=0;setCombo(0);playSound('miss');showFeedback('⏰ Timeout!','error');spawn('ANCHOR');}}
      ctx.fillStyle=isBoxDarkMode?'#020202':'#f9fafb';ctx.fillRect(0,0,cvs.width,cvs.height);
      ctx.strokeStyle=isBoxDarkMode?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.02)';ctx.lineWidth=1;
      for(let i=0;i<cvs.width;i+=40){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,cvs.height);ctx.stroke();}
      if(e.state==='ANCHOR'){ctx.beginPath();ctx.arc(e.anchor.x,e.anchor.y,e.anchor.r,0,Math.PI*2);ctx.fillStyle='#FFFFFF';ctx.shadowColor='#FFFFFF';ctx.shadowBlur=10;ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle='rgba(255,255,255,0.3)';ctx.lineWidth=2;ctx.stroke();}
      else{ctx.beginPath();ctx.arc(e.anchor.x,e.anchor.y,e.anchor.r,0,Math.PI*2);ctx.fillStyle=isBoxDarkMode?'#1a1a1a':'#d1d5db';ctx.fill();ctx.strokeStyle='rgba(255,255,255,0.2)';ctx.lineWidth=2;ctx.stroke();}
      if(e.state==='FLICK'){ctx.beginPath();ctx.setLineDash([5,10]);ctx.moveTo(e.anchor.x,e.anchor.y);ctx.lineTo(e.target.x,e.target.y);ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1.5;ctx.stroke();ctx.setLineDash([]);ctx.beginPath();ctx.arc(e.target.x,e.target.y,e.target.r,0,Math.PI*2);ctx.fillStyle='#00FF88';ctx.shadowColor='#00FF88';ctx.shadowBlur=15;ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle='rgba(255,255,255,0.5)';ctx.lineWidth=2;ctx.stroke();ctx.beginPath();ctx.arc(e.target.x,e.target.y,e.target.r/4,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.8)';ctx.fill();}
      const ch=virtualCrosshair.current;
      if(ch.x>0&&ch.x<cvs.width&&ch.y>0&&ch.y<cvs.height){ctx.strokeStyle=pointerLocked?'#00ff88':'#ff4444';ctx.lineWidth=2;ctx.beginPath();ctx.arc(ch.x,ch.y,12,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(ch.x-24,ch.y);ctx.lineTo(ch.x-10,ch.y);ctx.moveTo(ch.x+10,ch.y);ctx.lineTo(ch.x+24,ch.y);ctx.moveTo(ch.x,ch.y-24);ctx.lineTo(ch.x,ch.y-10);ctx.moveTo(ch.x,ch.y+10);ctx.lineTo(ch.x,ch.y+24);ctx.stroke();ctx.fillStyle=pointerLocked?'#00ff88':'#ff4444';ctx.beginPath();ctx.arc(ch.x,ch.y,3,0,Math.PI*2);ctx.fill();}
      animationRef.current=requestAnimationFrame(loop);};
    animationRef.current=requestAnimationFrame(loop);
    return()=>{cancelAnimationFrame(animationRef.current);window.removeEventListener('resize',update);ro.disconnect();};
  }, [gameState,isBoxDarkMode,pointerLocked,spawn,playSound,showFeedback]);

  useEffect(() => {
    if(gameState!=='playing')return;
    if(timerIntervalRef.current)clearInterval(timerIntervalRef.current);
    timerIntervalRef.current=setInterval(()=>{setTimeLeft(prev=>{if(prev<=1){setGameState('gameOver');gameStateRef.current='gameOver';isActiveRef.current=false;if(timerIntervalRef.current)clearInterval(timerIntervalRef.current);updateBestScore(scoreRef.current);document.exitPointerLock();return 0;}return prev-1;});},1000);
    return()=>{if(timerIntervalRef.current)clearInterval(timerIntervalRef.current);};
  }, [gameState,updateBestScore]);

  const startGame = useCallback(() => {
    if(timerIntervalRef.current)clearInterval(timerIntervalRef.current);
    engine.current.score=0;engine.current.state='ANCHOR';engine.current.target.r=TARGET_START_RADIUS;
    setAnalyticsData({overshoots:0,undershoots:0,totalShots:0,reactionTimes:[],pathEfficiency:0,averageDeviation:0});
    setUiScore(0);setTimeLeft(60);setFeedback('');setHits(0);setMisses(0);setCombo(0);setBestCombo(0);setBestReaction(0);
    setGameState('playing');gameStateRef.current='playing';isActiveRef.current=true;
    scoreRef.current=0;comboRef.current=0;bestComboRef.current=0;hitsRef.current=0;missesRef.current=0;
    crosshairInitRef.current=false;movementHistory.current=[];
    spawn('ANCHOR');
    setTimeout(()=>requestPointerLock(),300);
    setTimeout(()=>{crosshairInitRef.current=true;},500);
    showFeedback('Click anchor, then flick!','success');
  }, [spawn,showFeedback,requestPointerLock]);

  const resetGame = useCallback(() => {
    if(animationRef.current)cancelAnimationFrame(animationRef.current);
    if(timerIntervalRef.current)clearInterval(timerIntervalRef.current);
    if(feedbackTimeoutRef.current)clearTimeout(feedbackTimeoutRef.current);
    isActiveRef.current=false;setGameState('start');gameStateRef.current='start';
    setUiScore(0);setTimeLeft(60);setFeedback('');setHits(0);setMisses(0);setCombo(0);setBestCombo(0);setBestReaction(0);
    engine.current.score=0;engine.current.state='ANCHOR';engine.current.target.r=TARGET_START_RADIUS;
    crosshairInitRef.current=false;
    document.exitPointerLock();
    setLockCooldown(true);setTimeout(()=>setLockCooldown(false),1000);
  }, []);

  useEffect(()=>()=>{if(timerIntervalRef.current)clearInterval(timerIntervalRef.current);if(feedbackTimeoutRef.current)clearTimeout(feedbackTimeoutRef.current);if(animationRef.current)cancelAnimationFrame(animationRef.current);document.exitPointerLock();},[]);

  const getAccuracy=useCallback(()=>{const t=hits+misses;return t===0?100:Math.round((hits/t)*100);},[hits,misses]);
  const avgR=analyticsData.reactionTimes.length>0?Math.round(analyticsData.reactionTimes.reduce((a,b)=>a+b,0)/analyticsData.reactionTimes.length):0;

  if(loading||!isClient)return(<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto"/></div>);

  return (
    <div className={`min-h-screen select-none ${isDarkMode?'bg-gray-900':'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen&&(<nav className="mb-4"><ol className="flex flex-wrap items-center gap-2 text-sm"><li><Link href="/" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Home</Link></li><li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li><li><Link href="/drills/fps" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>FPS Drills</Link></li><li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li><li className={`font-medium ${isDarkMode?'text-orange-400':'text-orange-600'}`}>Anchor Flick Trainer</li></ol></nav>)}
        {!isFullscreen&&(<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"><div className="flex items-center gap-3"><div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl"><Move className="w-6 h-6 text-white"/></div><div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Anchor Flick Trainer</h1><p className={`text-sm sm:text-base ${isDarkMode?'text-gray-400':'text-gray-500'}`}>{pointerLocked?'🟢 Raw input active':'🔴 Click canvas'} • Anchor→Flick→Repeat</p></div></div><div className="flex gap-2"><button onClick={()=>setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>{isDarkMode?<Sun className="w-5 h-5"/>:<Moon className="w-5 h-5"/>}</button><button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}><Eye className="w-5 h-5"/></button><button onClick={()=>setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>{soundEnabled?<Volume2 className="w-5 h-5"/>:<VolumeX className="w-5 h-5"/>}</button><button onClick={toggleFullscreen} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>{isFullscreen?<Minimize2 className="w-5 h-5"/>:<Maximize2 className="w-5 h-5"/>}</button><button onClick={pointerLocked?()=>{document.exitPointerLock();setLockCooldown(true);setTimeout(()=>setLockCooldown(false),1000);}:requestPointerLock} className={`p-2 rounded-lg border ${pointerLocked?'bg-green-500 border-green-600 text-white':isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}><Lock className="w-5 h-5"/></button></div></div>)}
        {!isFullscreen&&(<div className="grid grid-cols-7 gap-3 mb-4 h-[88px]"><StatCard icon={<Target className="text-blue-600"/>} value={uiScore} label="Score" d={isDarkMode}/><StatCard icon={<Trophy className="text-yellow-500"/>} value={bestScore} label="Best" d={isDarkMode}/><StatCard icon={<Timer className={timeLeft<=10?'text-red-600':'text-green-600'}/>} value={timeLeft} label="Time" unit="s" d={isDarkMode}/><StatCard icon={<Move className="text-orange-500"/>} value={hits} label="Hits" d={isDarkMode}/><StatCard icon={<Zap className="text-purple-500"/>} value={combo} label="Combo" d={isDarkMode}/><StatCard icon={<Activity className="text-green-500"/>} value={getAccuracy()} label="Acc" unit="%" d={isDarkMode}/><StatCard icon={<Timer className="text-cyan-500"/>} value={bestReaction||'-'} label="Best" unit="ms" d={isDarkMode}/></div>)}
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
          {gameState==='start'&&(<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><Move className="w-16 h-16 text-orange-500 mx-auto mb-4"/><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Anchor Flick Trainer</h2><p className={`mb-4 ${isBoxDarkMode?'text-gray-300':'text-gray-600'}`}>Raw mouse input • Shrinking targets • Speed bonus</p><div className={`mb-6 p-3 rounded-lg border ${isBoxDarkMode?'border-yellow-600 bg-yellow-900/20':'border-yellow-200 bg-yellow-50'}`}><div className="flex items-center gap-2 mb-2"><AlertCircle className="w-4 h-4 text-yellow-500"/><p className={`text-sm font-medium ${isBoxDarkMode?'text-yellow-400':'text-yellow-700'}`}>Raw Input via Pointer Lock</p></div><p className={`text-xs ${isBoxDarkMode?'text-gray-400':'text-gray-600'}`}>Cursor locks to canvas. Click anchor, flick to target. Press ESC to unlock and exit fullscreen.</p></div><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg w-full">Start Training</button></div></div>)}
          {gameState==='gameOver'&&(<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border max-w-[520px] mx-4 ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Trophy className="w-10 h-10 text-yellow-500"/><h2 className={`text-2xl font-bold ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Training Complete</h2></div><div className="grid grid-cols-2 gap-3 mb-4"><RC label="Score" v={uiScore} i={<Target className="w-4 h-4"/>} c="blue" d={isBoxDarkMode}/><RC label="Best" v={bestScore} i={<Trophy className="w-4 h-4"/>} c="yellow" d={isBoxDarkMode}/><RC label="Hits" v={hits} i={<Move className="w-4 h-4"/>} c="emerald" d={isBoxDarkMode}/><RC label="Combo" v={bestCombo} i={<Zap className="w-4 h-4"/>} c="orange" d={isBoxDarkMode}/><RC label="Reaction" v={bestReaction||'-'} u="ms" i={<Timer className="w-4 h-4"/>} c="cyan" d={isBoxDarkMode}/><RC label="Accuracy" v={getAccuracy()} u="%" i={<Activity className="w-4 h-4"/>} c="purple" d={isBoxDarkMode}/></div>
            {analyticsData.totalShots>0&&(<div className={`mb-4 p-3 rounded-lg border ${isBoxDarkMode?'border-gray-600 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}><h3 className={`text-sm font-semibold mb-2 ${isBoxDarkMode?'text-gray-300':'text-gray-700'}`}>Shot Analysis</h3><div className="grid grid-cols-2 gap-2"><div className={`p-2 rounded text-center ${isBoxDarkMode?'bg-gray-700':'bg-white'}`}><p className="text-xs">Overshoots</p><p className="text-lg font-bold text-red-400">{analyticsData.overshoots}</p></div><div className={`p-2 rounded text-center ${isBoxDarkMode?'bg-gray-700':'bg-white'}`}><p className="text-xs">Undershoots</p><p className="text-lg font-bold text-blue-400">{analyticsData.undershoots}</p></div><div className={`p-2 rounded text-center ${isBoxDarkMode?'bg-gray-700':'bg-white'}`}><p className="text-xs">Avg Reaction</p><p className="text-lg font-bold">{avgR}ms</p></div><div className={`p-2 rounded text-center ${isBoxDarkMode?'bg-gray-700':'bg-white'}`}><p className="text-xs">Path Efficiency</p><p className="text-lg font-bold text-purple-400">{(analyticsData.pathEfficiency*100).toFixed(0)}%</p></div></div></div>)}
            {analyticsData.overshoots>analyticsData.undershoots*1.5&&(<div className={`mb-4 p-2 rounded-lg text-sm ${isBoxDarkMode?'bg-red-900/20 border border-red-800 text-red-400':'bg-red-50 border border-red-200 text-red-600'}`}>💡 Overshooting - try lower sensitivity</div>)}
            <div className="flex gap-3"><Link href="/drills/fps" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold ${isDarkMode?'bg-gray-700 text-gray-300':'bg-gray-200 text-gray-700'}`}>← Back</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold">Train Again →</button></div></div></div>)}
        </div>
        {!isFullscreen&&(<footer className="mt-6"><div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode?'text-orange-400':'text-orange-600'}`}/><h2 className={`font-semibold text-lg ${isDarkMode?'text-white':'text-gray-900'}`}>Drill Rules & Professional Features</h2></div></div><div className="p-6"><div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div className="space-y-3"><h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-orange-400':'text-orange-600'}`}><Move className="w-5 h-5"/>How to Play</h3><ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</span><span>Click <span className="font-semibold text-orange-400">white anchor</span> to spawn target</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</span><span>Flick to <span className="font-semibold text-orange-400">green target</span> before it shrinks</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</span><span>Target shrinks <span className="font-semibold">30px → 6px</span></span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</span><span>Faster flicks = <span className="font-semibold">more points</span> (speed bonus)</span></li></ul></div><div className="space-y-3"><h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-blue-400':'text-blue-600'}`}><Trophy className="w-5 h-5"/>Scoring System</h3><ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">+10-50</span><span><span className="font-semibold text-blue-400">Speed bonus</span> - Points = 5000 ÷ time(ms)</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">🔥</span><span><span className="font-semibold text-orange-400">Combo</span> - Every 5 consecutive hits</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">⏰</span><span><span className="font-semibold text-red-400">Timeout</span> - Target shrinks to 6px, then resets</span></li></ul></div><div className="space-y-3"><h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-purple-400':'text-purple-600'}`}><Zap className="w-5 h-5"/>Pro Features</h3><ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><li className="flex items-start gap-2"><Lock className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5"/><span><span className="font-semibold text-green-400">Raw Input</span> - Pointer Lock API</span></li><li className="flex items-start gap-2"><Activity className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5"/><span><span className="font-semibold text-blue-400">Analytics</span> - Path efficiency tracking</span></li><li className="flex items-start gap-2"><Timer className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5"/><span><span className="font-semibold text-orange-400">Dynamic</span> - Shrinking target mechanic</span></li></ul></div></div><div className={`mt-4 p-4 rounded-lg border ${isDarkMode?'border-gray-600 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}><h4 className={`text-sm font-semibold mb-2 ${isDarkMode?'text-gray-300':'text-gray-700'}`}>🖱️ Controls</h4><div className="grid grid-cols-2 gap-2"><p className={`text-xs ${isDarkMode?'text-gray-400':'text-gray-500'}`}><span className="font-semibold">ESC ×2</span> - Unlock cursor, then exit</p><p className={`text-xs ${isDarkMode?'text-gray-400':'text-gray-500'}`}><span className="font-semibold">Click Canvas</span> - Re-lock cursor</p><p className={`text-xs ${isDarkMode?'text-gray-400':'text-gray-500'}`}><span className="font-semibold">F11</span> - Toggle fullscreen</p><p className={`text-xs ${isDarkMode?'text-gray-400':'text-gray-500'}`}><span className="font-semibold">Left Click</span> - Click anchor / Shoot target</p></div></div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({icon,value,label,unit='',d}){return(<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full ${d?'bg-gray-800 border-gray-700':'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${d?'text-white':'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${d?'text-gray-400':'text-gray-500'}`}>{label}</p></div>);}
function RC({label,v,unit='',i,c,d}){const m={blue:'bg-blue-500/10 border-blue-500/30 text-blue-500',yellow:'bg-yellow-500/10 border-yellow-500/30 text-yellow-500',emerald:'bg-emerald-500/10 border-emerald-500/30 text-emerald-500',orange:'bg-orange-500/10 border-orange-500/30 text-orange-500',purple:'bg-purple-500/10 border-purple-500/30 text-purple-500',cyan:'bg-cyan-500/10 border-cyan-500/30 text-cyan-500'};const o=m[c]||m.blue;const[bg,border,text]=o.split(' ');return(<div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}><div className="flex items-center gap-2"><div className={text}>{i}</div><span className={`text-xs sm:text-sm ${d?'text-gray-300':'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg ${text}`}>{v}{unit}</span></div>);}