'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, TrendingUp, Wind, AlertCircle, Brain, Info, Trophy, RefreshCw
} from 'lucide-react';

export default function StressInoculationClient() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const pacerRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [totalBreaths, setTotalBreaths] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [instruction, setInstruction] = useState('');
  const [isStressPhase, setIsStressPhase] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isClient, setIsClient] = useState(false);
  
  const isActiveRef = useRef(false);
  const timerIntervalRef = useRef(null);
  const inhaleTimeoutRef = useRef(null);
  const exhaleTimeoutRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const scoreRef = useRef(0);
  const breathsRef = useRef(0);
  const gameStateRef = useRef('start');
  
  const inhaleTime = 5000, exhaleTime = 6000, STRESS_START = 30, STRESS_END = 120;

  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const showFeedback = useCallback((msg, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(msg); setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 800);
  }, []);

  useEffect(() => {
    try { const s = localStorage.getItem('stressInoculationBestScore'); if (s) { const p = parseInt(s, 10); if (!isNaN(p)) setBestScore(p); } } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) { setBestScore(score); try { localStorage.setItem('stressInoculationBestScore', score.toString()); } catch (e) {} showFeedback('🏆 New Record!', 'success'); }
  }, [gameState, score, bestScore, showFeedback]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) { const el = containerRef.current; if (el?.requestFullscreen) { await el.requestFullscreen(); setIsFullscreen(true); } }
      else { if (document.fullscreenElement) await document.exitFullscreen(); setIsFullscreen(false); }
    } catch (e) {}
  }, [isFullscreen]);

  useEffect(() => {
    const h = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)(), o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      const now = ctx.currentTime;
      if (type==='inhale') { o.frequency.setValueAtTime(523.25, now); g.gain.setValueAtTime(0.08, now); g.gain.exponentialRampToValueAtTime(0.001, now+0.2); }
      else if (type==='exhale') { o.frequency.setValueAtTime(392.00, now); g.gain.setValueAtTime(0.08, now); g.gain.exponentialRampToValueAtTime(0.001, now+0.3); }
      else if (type==='stress') { o.frequency.setValueAtTime(880, now); g.gain.setValueAtTime(0.06, now); g.gain.exponentialRampToValueAtTime(0.001, now+0.1); }
      else if (type==='complete') { o.frequency.setValueAtTime(1046.5, now); g.gain.setValueAtTime(0.1, now); g.gain.exponentialRampToValueAtTime(0.001, now+0.3); }
      o.start(now); o.stop(now+0.3);
    } catch (e) {}
  }, [soundEnabled]);

  const updateTimerDisplay = useCallback((s) => {
    const m = Math.floor(s/60), sec = s%60;
    return `${m.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
  }, []);

  const checkStressPhase = useCallback((t) => {
    const elapsed = 300 - t, inPhase = elapsed>=STRESS_START&&elapsed<STRESS_END;
    setIsStressPhase(prev => {
      if (inPhase!==prev) { if (inPhase) { playSound('stress'); showFeedback('⚠️ STRESS PHASE ACTIVE - Stay Coherent!','warning'); } else if (elapsed>=STRESS_END) showFeedback('✅ Stress Phase Complete - Great Resilience!','success'); return inPhase; }
      return prev;
    });
  }, [playSound, showFeedback]);

  const runBreathingCycle = useCallback(() => {
    if (!isActiveRef.current) return;
    setInstruction('INHALE');
    if (pacerRef.current) { pacerRef.current.style.transition=`transform ${inhaleTime}ms cubic-bezier(0.4, 0, 0.2, 1)`; pacerRef.current.style.transform='scale(2.2)'; }
    playSound('inhale');
    inhaleTimeoutRef.current = setTimeout(() => {
      if (!isActiveRef.current) return;
      setInstruction('EXHALE');
      if (pacerRef.current) { pacerRef.current.style.transition=`transform ${exhaleTime}ms cubic-bezier(0.4, 0, 0.2, 1)`; pacerRef.current.style.transform='scale(1)'; }
      playSound('exhale');
      breathsRef.current+=1; setTotalBreaths(breathsRef.current);
      if (breathsRef.current%5===0) {
        const pts = isStressPhase?20:10;
        scoreRef.current+=pts; setScore(scoreRef.current);
        showFeedback(isStressPhase?`💪 +${pts} - Maintained Under Stress!`:`✨ +${pts} - Coherence Maintained!`,'success');
      }
      exhaleTimeoutRef.current = setTimeout(() => { runBreathingCycle(); }, exhaleTime);
    }, inhaleTime);
  }, [isStressPhase, playSound, showFeedback]);

  const startDrill = useCallback(() => {
    setGameState('playing'); gameStateRef.current='playing';
    if (isActiveRef.current) return;
    isActiveRef.current=true; setTimeLeft(300); setTotalBreaths(0); setScore(0); setIsStressPhase(false); setInstruction('');
    scoreRef.current=0; breathsRef.current=0;
    if (pacerRef.current) { pacerRef.current.style.transform='scale(1)'; pacerRef.current.style.transition='none'; }
    if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
    if (exhaleTimeoutRef.current) clearTimeout(exhaleTimeoutRef.current);
    runBreathingCycle();
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev<=1) {
          if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current=null; }
          if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
          if (exhaleTimeoutRef.current) clearTimeout(exhaleTimeoutRef.current);
          isActiveRef.current=false; setInstruction('COMPLETE'); setIsStressPhase(false); playSound('complete');
          setGameState('gameOver'); gameStateRef.current='gameOver'; showFeedback('🎯 Training Complete!','success');
          return 0;
        }
        const nt = prev-1; checkStressPhase(nt); return nt;
      });
    }, 1000);
  }, [runBreathingCycle, checkStressPhase, playSound, showFeedback]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current=null; }
    if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
    if (exhaleTimeoutRef.current) clearTimeout(exhaleTimeoutRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    isActiveRef.current=false; setGameState('start'); gameStateRef.current='start';
    setInstruction(''); setTotalBreaths(0); setScore(0); setTimeLeft(300); setIsStressPhase(false); setFeedback('');
    if (pacerRef.current) pacerRef.current.style.transform='scale(1)';
  }, []);

  useEffect(() => () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current); if (exhaleTimeoutRef.current) clearTimeout(exhaleTimeoutRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); }, []);

  if (loading||!isClient) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"/>
    </div>
  );

  return (
    <div className={`min-h-screen select-none ${isDarkMode?'bg-gray-900':'bg-gray-50'}`}>
      {isStressPhase&&gameState==='playing'&&<div className="fixed inset-0 pointer-events-none z-40" style={{animation:'visualStress 0.4s infinite',backgroundColor:'rgba(255,0,0,0.15)'}}/>}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Stress Inoculation Drill - Controlled Stress Exposure Training","url":"https://skilldrills.online/drills/mental-fitness/stress-control/stress-inoculation","description":"Build stress resilience through controlled exposure. Maintain 5:6 coherence breathing under red visual strobe and audio stress induction. 2x points during 90s stress phase. 5-minute progressive session.","applicationCategory":"HealthApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"author":{"@type":"Organization","name":"Global Drill System"},"educationalUse":["Stress Inoculation","Resilience Training","Stress Exposure","Coherence Training"],"learningResourceType":"Interactive Exercise","timeRequired":"PT5M","interactivityType":"active","inLanguage":"en-US","teaches":["Stress Resilience","Controlled Exposure","Coherence Under Stress","Emotional Regulation"]})}}/>
      <style jsx>{`@keyframes visualStress{0%{background-color:rgba(255,0,0,0.15)}50%{background-color:rgba(255,0,0,0)}100%{background-color:rgba(255,0,0,0.15)}}`}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <nav className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li><Link href="/" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
            <li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li>
            <li><Link href="/drills/mental-fitness" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Mental Fitness</Link></li>
            <li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li>
            <li className={isDarkMode?'text-gray-500':'text-gray-400'}>Stress Control</li>
            <li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li>
            <li className={`font-medium ${isDarkMode?'text-red-400':'text-red-600'}`}>Stress Inoculation</li>
          </ol>
        </nav>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl"><AlertCircle className="w-6 h-6 text-white"/></div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Stress Inoculation</h1>
              <p className={`text-sm sm:text-base ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Controlled stress exposure • 5:6 breathing • 5-minute session</p>
            </div>
          </div>
          <div className="flex gap-2">
            {gameState==='playing'&&<button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700':'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset"><RefreshCw className="w-5 h-5"/></button>}
            <button onClick={()=>setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title={isDarkMode?'Light':'Dark'}>{isDarkMode?<Sun className="w-5 h-5"/>:<Moon className="w-5 h-5"/>}</button>
            <button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title="Toggle box theme"><Eye className="w-5 h-5"/></button>
            <button onClick={()=>setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title={soundEnabled?'Mute':'Unmute'}>{soundEnabled?<Volume2 className="w-5 h-5"/>:<VolumeX className="w-5 h-5"/>}</button>
            <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title={isFullscreen?'Exit fullscreen':'Fullscreen'}>{isFullscreen?<Minimize2 className="w-5 h-5"/>:<Maximize2 className="w-5 h-5"/>}</button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
          <SCard icon={<Brain className="text-blue-500"/>} value={score} label="Resilience" dark={isDarkMode}/>
          <SCard icon={<Trophy className="text-yellow-500"/>} value={bestScore} label="Best" dark={isDarkMode}/>
          <SCard icon={<Wind className="text-cyan-500"/>} value={totalBreaths} label="Breaths" dark={isDarkMode}/>
          <SCard icon={<Timer className={timeLeft<60?'text-red-500':'text-green-500'}/>} value={updateTimerDisplay(timeLeft)} label="Time Left" dark={isDarkMode}/>
          <SCard icon={<AlertCircle className={isStressPhase?'text-red-500 animate-pulse':'text-green-500'}/>} value={isStressPhase?"STRESS":"CALM"} label="Phase" dark={isDarkMode}/>
        </div>

        <div className="h-10 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback?'opacity-100 scale-100':'opacity-0 scale-95'} ${feedbackType==='success'?'bg-green-500':feedbackType==='warning'?'bg-orange-500':'bg-red-500'}`}>{feedback||'\u00A0'}</div>
        </div>

        <div ref={containerRef} className={`relative ${isFullscreen?'fixed inset-0 z-50':'rounded-xl border-2'}`} style={{background:isBoxDarkMode?'#0a0a0a':'#ffffff',aspectRatio:isFullscreen?'auto':'16/9',display:'flex',alignItems:'center',justifyContent:'center',borderColor:isDarkMode?'#374151':'#e5e7eb'}}>
          {isFullscreen&&gameState==='playing'&&(
            <>
              <div className="absolute top-4 right-4 z-30 flex gap-3">
                <button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white" title="Reset"><RefreshCw className="w-5 h-5"/></button>
                <button onClick={()=>setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white">{isDarkMode?<Sun className="w-5 h-5"/>:<Moon className="w-5 h-5"/>}</button>
                <button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white"><Eye className="w-5 h-5"/></button>
                <button onClick={()=>setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white">{soundEnabled?<Volume2 className="w-5 h-5"/>:<VolumeX className="w-5 h-5"/>}</button>
                <button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white"><Minimize2 className="w-5 h-5"/></button>
              </div>
              <div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">Score: <span className="text-yellow-400 font-bold">{score}</span> | Breaths: <span className="text-cyan-400 font-bold">{totalBreaths}</span> | Time: <span className="text-blue-400 font-bold">{updateTimerDisplay(timeLeft)}</span></div>
            </>
          )}

          <div className="text-center">
            <div className="instruction" style={{fontSize:isFullscreen?'2rem':'1.5rem',height:isFullscreen?'50px':'40px',marginBottom:isFullscreen?'30px':'20px',letterSpacing:'3px',userSelect:'none',color:isStressPhase?'#ff4444':(isBoxDarkMode?'#00f2fe':'#0284c7'),fontWeight:'bold',transition:'color 0.3s ease'}}>{instruction}</div>
            <div className="pacer-container" style={{position:'relative',width:isFullscreen?'450px':'350px',height:isFullscreen?'450px':'350px',display:'flex',alignItems:'center',justifyContent:'center',zIndex:10}}>
              <div ref={pacerRef} className="pacer-circle" style={{width:isFullscreen?'160px':'120px',height:isFullscreen?'160px':'120px',background:'transparent',border:`4px solid ${isStressPhase?'#ff4444':(isBoxDarkMode?'#00f2fe':'#0284c7')}`,borderRadius:'50%',boxShadow:`0 0 20px ${isStressPhase?'rgba(255,68,68,0.6)':(isBoxDarkMode?'rgba(0,242,254,0.6)':'rgba(2,132,199,0.3)')}`,transition:'transform linear, border-color 0.3s ease, box-shadow 0.3s ease'}}/>
            </div>
            <div className="timer" style={{marginTop:isFullscreen?'40px':'30px',fontSize:isFullscreen?'2.5rem':'2rem',letterSpacing:'2px',userSelect:'none',color:isStressPhase?'#ff4444':(isBoxDarkMode?'#00f2fe':'#0284c7'),transition:'color 0.3s ease'}}>{updateTimerDisplay(timeLeft)}</div>
            {gameState==='playing'&&(
              <button onClick={()=>{if(timerIntervalRef.current)clearInterval(timerIntervalRef.current);if(inhaleTimeoutRef.current)clearTimeout(inhaleTimeoutRef.current);if(exhaleTimeoutRef.current)clearTimeout(exhaleTimeoutRef.current);isActiveRef.current=false;setIsStressPhase(false);setGameState('gameOver');gameStateRef.current='gameOver';}} className="mt-8 px-6 py-2 rounded-full text-sm transition-all hover:border-red-500 hover:text-red-500" style={{background:'transparent',border:`1px solid ${isBoxDarkMode?'#333':'#ddd'}`,color:isBoxDarkMode?'#666':'#999'}}>End Session</button>
            )}
          </div>

          {gameState==='start'&&(
            <div className="absolute inset-0 flex items-center justify-center rounded-xl z-20 backdrop-blur-sm" style={{background:isBoxDarkMode?'rgba(10,10,10,0.95)':'rgba(255,255,255,0.95)'}}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4"/>
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Stress Inoculation</h2>
                <p className={`mb-2 ${isBoxDarkMode?'text-gray-300':'text-gray-600'}`}>Controlled stress exposure • 5-minute session</p>
                <p className={`mb-6 text-sm ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}>Maintain 5:6 breathing while red strobe and audio stress challenge your focus. 2x points during 90s stress phase.</p>
                <button onClick={startDrill} className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]">Begin Training</button>
              </div>
            </div>
          )}

          {gameState==='gameOver'&&(
            <div className="absolute inset-0 flex items-center justify-center rounded-xl z-20 backdrop-blur-sm" style={{background:isBoxDarkMode?'rgba(10,10,10,0.95)':'rgba(255,255,255,0.95)'}}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[520px] mx-4 ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4"><Award className="w-10 h-10 text-yellow-500"/><h2 className={`text-2xl font-bold ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Training Complete!</h2></div>
                <p className={`text-center text-sm mb-6 ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}>Regular stress inoculation builds real-world resilience and improves emotional regulation under pressure.</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <RCard label="Resilience Score" value={score} icon={<Brain className="w-4 h-4"/>} color="blue" dark={isBoxDarkMode}/>
                  <RCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4"/>} color="yellow" dark={isBoxDarkMode}/>
                  <RCard label="Total Breaths" value={totalBreaths} icon={<Wind className="w-4 h-4"/>} color="cyan" dark={isBoxDarkMode}/>
                  <RCard label="Duration" value="5:00" icon={<Timer className="w-4 h-4"/>} color="green" dark={isBoxDarkMode}/>
                  <RCard label="Stress Phase" value="90s" icon={<AlertCircle className="w-4 h-4"/>} color="red" dark={isBoxDarkMode}/>
                  <RCard label="Tolerance" value={Math.min(100,Math.floor(score/2))} unit="%" icon={<TrendingUp className="w-4 h-4"/>} color="orange" dark={isBoxDarkMode}/>
                </div>
                <div className="flex gap-3">
                  <Link href="/drills/mental-fitness" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold ${isDarkMode?'bg-gray-700 text-gray-300 hover:bg-gray-600':'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back</button></Link>
                  <button onClick={resetGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]">Train Again →</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {!isFullscreen&&(
          <footer className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode?'text-red-400':'text-red-600'}`}/><h2 className={`font-semibold text-lg ${isDarkMode?'text-white':'text-gray-900'}`}>Stress Inoculation Protocol</h2></div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-cyan-500">INHALE (5s)</span> - Circle expands, breathe in slowly</p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-blue-500">EXHALE (6s)</span> - Circle contracts, breathe out gently</p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-red-500">Stress Phase (30s-120s)</span> - Red strobe + 880Hz audio induction</p></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-purple-500">Maintain coherence</span> - Keep breathing pattern despite stress</p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-yellow-500">Scoring</span> - 10pts/5 breaths (calm), 20pts/5 breaths (stress)</p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-green-500">5-minute session</span> - Best score saves locally</p></div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode?'border-gray-700 text-gray-400':'border-gray-200 text-gray-500'}`}>
                  <span>🧠 Improves stress tolerance, focus under pressure, emotional regulation</span>
                  <span>🎵 523Hz inhale • 392Hz exhale • 880Hz stress tone</span>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

function SCard({ icon, value, label, unit='', dark }) {
  return (
    <div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full ${dark?'bg-gray-800 border-gray-700':'bg-white border-gray-100'}`}>
      <div className="mb-1 flex justify-center">{icon}</div>
      <p className={`text-lg sm:text-xl font-bold truncate ${dark?'text-white':'text-gray-900'}`}>{value}{unit}</p>
      <p className={`text-[10px] sm:text-xs truncate ${dark?'text-gray-400':'text-gray-500'}`}>{label}</p>
    </div>
  );
}

function RCard({ label, value, unit='', icon, color, dark }) {
  const m={blue:'bg-blue-500/10 border-blue-500/30 text-blue-500',yellow:'bg-yellow-500/10 border-yellow-500/30 text-yellow-500',cyan:'bg-cyan-500/10 border-cyan-500/30 text-cyan-500',green:'bg-green-500/10 border-green-500/30 text-green-500',red:'bg-red-500/10 border-red-500/30 text-red-500',orange:'bg-orange-500/10 border-orange-500/30 text-orange-500'};
  const c=m[color]||m.blue,[bg,border,text]=c.split(' ');
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}>
      <div className="flex items-center gap-2 min-w-0"><div className={text}>{icon}</div><span className={`text-xs sm:text-sm truncate ${dark?'text-gray-300':'text-gray-600'}`}>{label}</span></div>
      <span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${text}`}>{value}{unit}</span>
    </div>
  );
}