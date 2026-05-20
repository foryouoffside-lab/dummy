'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Award, BarChart3, BookOpen, Brain, CheckCircle2, Clock, Code2, Crosshair, Database, Dumbbell, Eye, Flame, GraduationCap, Hash, Heart, Info, Keyboard, Lightbulb, Maximize2, Minimize2, Moon, RefreshCw, Star, Sun, Target, Timer, TrendingUp, Trophy, Users, Volume2, VolumeX, Wind, Zap } from 'lucide-react';

export default function WimHofClient() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [action, setAction] = useState('READY');
  const [breathCount, setBreathCount] = useState(0);
  const [subData, setSubData] = useState('BREATH 0 / 30');
  const [nodeScale, setNodeScale] = useState(1);
  const [nodeOpacity, setNodeOpacity] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isClient, setIsClient] = useState(false);
  
  const targetBreaths = 30;
  const breathTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const breathCountRef = useRef(0);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const bestComboRef = useRef(0);
  const feedbackTimeoutRef = useRef(null);
  const gameStateRef = useRef('start');

  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const showFeedback = useCallback((msg, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(msg); setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 600);
  }, []);

  useEffect(() => {
    try { const s = localStorage.getItem('whmPowerBestScore'); if (s) { const p = parseInt(s, 10); if (!isNaN(p)) setBestScore(p); } } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) { setBestScore(score); try { localStorage.setItem('whmPowerBestScore', score.toString()); } catch (e) {} showFeedback('🏆 New Record!', 'success'); }
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
      const f = { inhale: 880, exhale: 660, complete: 1046.5 };
      o.frequency.setValueAtTime(f[type] || 660, now);
      g.gain.setValueAtTime(0.08, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + (type==='complete' ? 0.3 : 0.15));
      o.start(now); o.stop(now + (type==='complete' ? 0.3 : 0.15));
    } catch (e) {}
  }, [soundEnabled]);

  const performInhale = useCallback(() => {
    if (!isActiveRef.current) return;
    setAction("INHALE"); setNodeScale(5); setNodeOpacity(1); playSound('inhale');
    breathTimeoutRef.current = setTimeout(() => { performExhale(); }, 1500);
  }, [playSound]);

  const performExhale = useCallback(() => {
    if (!isActiveRef.current) return;
    setAction("EXHALE"); setNodeScale(1); playSound('exhale');
    const nc = breathCountRef.current + 1;
    breathCountRef.current = nc; setBreathCount(nc); setSubData(`BREATH ${nc} / ${targetBreaths}`);
    scoreRef.current += 1; setScore(scoreRef.current);
    comboRef.current += 1; setCombo(comboRef.current);
    if (comboRef.current > bestComboRef.current) { bestComboRef.current = comboRef.current; setBestCombo(bestComboRef.current); }
    playSound('complete');
    if (nc >= targetBreaths) { setGameState('gameOver'); gameStateRef.current = 'gameOver'; isActiveRef.current = false; setIsActive(false); showFeedback('🎉 30 Breaths Complete!', 'success'); return; }
    breathTimeoutRef.current = setTimeout(() => { performInhale(); }, 1500);
  }, [playSound, showFeedback, performInhale]);

  const resetDrill = useCallback(() => {
    isActiveRef.current = false; setIsActive(false); setBreathCount(0); breathCountRef.current = 0;
    setAction('READY'); setSubData('BREATH 0 / 30'); setNodeScale(1); setNodeOpacity(1);
    setScore(0); setCombo(0); scoreRef.current = 0; comboRef.current = 0; bestComboRef.current = 0; setBestCombo(0);
    setGameState('start'); gameStateRef.current = 'start'; setFeedback('');
    if (breathTimeoutRef.current) clearTimeout(breathTimeoutRef.current);
  }, []);

  const startDrill = useCallback(() => {
    setGameState('playing'); gameStateRef.current = 'playing';
    if (breathTimeoutRef.current) clearTimeout(breathTimeoutRef.current);
    setScore(0); scoreRef.current = 0; setBreathCount(0); breathCountRef.current = 0;
    setCombo(0); comboRef.current = 0; bestComboRef.current = 0; setBestCombo(0);
    setAction('INHALE'); setSubData('BREATH 0 / 30'); setNodeScale(1); setNodeOpacity(1);
    isActiveRef.current = true; setIsActive(true);
    setTimeout(() => { if (isActiveRef.current) performInhale(); }, 300);
  }, [performInhale]);

  useEffect(() => () => { isActiveRef.current = false; if (breathTimeoutRef.current) clearTimeout(breathTimeoutRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); }, []);

  const sharePage = async () => { if (navigator.share) { try { await navigator.share({ title: 'Free Wim Hof Breathing Drill | SkillDrills', text: 'Practice WHM power breathing with 30 breaths. Free!', url: 'https://skilldrills.online/drills/mental-fitness/breathing-exercises/wim-hof' }); } catch (e) {} } else { navigator.clipboard.writeText('https://skilldrills.online/drills/mental-fitness/breathing-exercises/wim-hof'); alert('Link copied!'); } };
  const copyPageLink = () => { navigator.clipboard.writeText('https://skilldrills.online/drills/mental-fitness/breathing-exercises/wim-hof'); alert('Link copied!'); };

  if (loading || !isClient) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto"/>
    </div>
  );

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li><Link href="/" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
            <li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li>
            <li><Link href="/drills/mental-fitness" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Mental Fitness</Link></li>
            <li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li>
            <li className={isDarkMode?'text-gray-500':'text-gray-400'}>Breathing Exercises</li>
            <li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li>
            <li className={`font-medium ${isDarkMode?'text-cyan-400':'text-cyan-600'}`}>Wim Hof Method</li>
          </ol>
        </nav>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl"><Flame className="w-6 h-6 text-white"/></div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>WHM Power Breathing</h1>
              <p className={`text-sm sm:text-base ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Wim Hof Method • 30 power breaths • 1 point per breath • Free breathing exercise</p>
            </div>
          </div>
          <div className="flex gap-2">
            {gameState==='playing'&&<button onClick={resetDrill} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700':'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset"><RefreshCw className="w-5 h-5"/></button>}
            <button onClick={()=>setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title={isDarkMode?'Light':'Dark'}>{isDarkMode?<Sun className="w-5 h-5"/>:<Moon className="w-5 h-5"/>}</button>
            <button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title="Toggle box theme"><Eye className="w-5 h-5"/></button>
            <button onClick={()=>setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title={soundEnabled?'Mute':'Unmute'}>{soundEnabled?<Volume2 className="w-5 h-5"/>:<VolumeX className="w-5 h-5"/>}</button>
            <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title={isFullscreen?'Exit fullscreen':'Fullscreen'}>{isFullscreen?<Minimize2 className="w-5 h-5"/>:<Maximize2 className="w-5 h-5"/>}</button>
          </div>
        </div>

        <section className="sr-only" aria-label="Drill description for search engines">
          <h2>Free Wim Hof Method Power Breathing Drill - Breathwork Training for Energy Immunity and Mental Clarity</h2>
          <p>Practice the Wim Hof Method power breathing with this free interactive breathwork drill. Follow 30 rapid inhale exhale cycles with visual pacer that expands on inhale and contracts on exhale. Track breath count combo streaks and oxygen boost level. Perfect for stress reduction increased energy improved immunity and mental clarity. No registration required.</p>
        </section>

        <div className="grid grid-cols-6 gap-3 mb-4 h-[88px]">
          <SCard icon={<Flame className="text-orange-500"/>} value={score} label="Score" dark={isDarkMode}/>
          <SCard icon={<Trophy className="text-yellow-500"/>} value={bestScore} label="Best" dark={isDarkMode}/>
          <SCard icon={<Wind className="text-green-500"/>} value={`${breathCount}/30`} label="Breaths" dark={isDarkMode}/>
          <SCard icon={<Zap className="text-purple-500"/>} value={combo} label="Combo" dark={isDarkMode}/>
          <SCard icon={<Award className="text-amber-500"/>} value={bestCombo} label="Best Combo" dark={isDarkMode}/>
          <SCard icon={<Brain className="text-cyan-500"/>} value={Math.min(100, Math.floor(score * 3.33))} unit="%" label="Oxygen" dark={isDarkMode}/>
        </div>

        <div className="h-10 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback?'opacity-100 scale-100':'opacity-0 scale-95'} ${feedbackType==='success'?'bg-green-500':'bg-red-500'}`}>{feedback||'\u00A0'}</div>
        </div>

        <div ref={containerRef} className={`relative ${isFullscreen?'fixed inset-0 z-50':'rounded-xl border-2'}`} style={{background:isBoxDarkMode?'#030303':'#ffffff',aspectRatio:isFullscreen?'auto':'16/9',maxWidth:'100%',margin:'0 auto',borderColor:isDarkMode?'#374151':'#e5e7eb'}}>
          {isFullscreen&&gameState==='playing'&&(
            <>
              <div className="absolute top-4 right-4 z-30 flex gap-3">
                <button onClick={resetDrill} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white" title="Reset"><RefreshCw className="w-5 h-5"/></button>
                <button onClick={()=>setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white">{isDarkMode?<Sun className="w-5 h-5"/>:<Moon className="w-5 h-5"/>}</button>
                <button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white"><Eye className="w-5 h-5"/></button>
                <button onClick={()=>setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white">{soundEnabled?<Volume2 className="w-5 h-5"/>:<VolumeX className="w-5 h-5"/>}</button>
                <button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white"><Minimize2 className="w-5 h-5"/></button>
              </div>
              <div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">Score: <span className="text-yellow-400 font-bold">{score}</span> | Breaths: <span className="text-green-400 font-bold">{breathCount}/30</span> | Combo: <span className="text-purple-400 font-bold">{combo}</span></div>
            </>
          )}

          <div className="absolute inset-0 flex items-center justify-center">
            {gameState==='start'&&(
              <div className="absolute inset-0 flex items-center justify-center rounded-xl z-10 backdrop-blur-sm" style={{background:isBoxDarkMode?'rgba(3,3,3,0.95)':'rgba(255,255,255,0.95)'}}>
                <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
                  <Flame className="w-16 h-16 text-cyan-500 mx-auto mb-4"/>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode?'text-white':'text-gray-900'}`}>WHM Power Breathing</h2>
                  <p className={`mb-2 ${isBoxDarkMode?'text-gray-300':'text-gray-600'}`}>30 power breaths • 1 point per breath • Combo streaks</p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}>Rapid inhale-exhale cycles following the Wim Hof Method. Node expands on inhale, contracts on exhale. Perfect for boosting energy, immunity, and mental clarity.</p>
                  <button onClick={startDrill} className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]">Start Free Drill</button>
                </div>
              </div>
            )}

            {gameState==='playing'&&(
              <div className="text-center" style={{width:isFullscreen?'550px':'400px'}}>
                <div style={{fontSize:isFullscreen?'3rem':'2.2rem',fontWeight:'200',letterSpacing:'8px',height:isFullscreen?'85px':'65px',color:isBoxDarkMode?'#ffffff':'#000000',textTransform:'uppercase'}}>{action}</div>
                <div className="pacer-ring" style={{width:isFullscreen?'260px':'180px',height:isFullscreen?'260px':'180px',border:`1px solid ${isBoxDarkMode?'rgba(0,212,255,0.1)':'rgba(2,132,199,0.15)'}`,borderRadius:'50%',margin:'0 auto 50px',display:'flex',justifyContent:'center',alignItems:'center',position:'relative'}}>
                  <div style={{width:isFullscreen?'45px':'30px',height:isFullscreen?'45px':'30px',background:isBoxDarkMode?'#00d4ff':'#0284c7',borderRadius:'50%',boxShadow:`0 0 35px ${isBoxDarkMode?'#00d4ff':'#0284c7'}`,transition:'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.5s ease',transform:`scale(${nodeScale})`,opacity:nodeOpacity}}/>
                </div>
                <div style={{fontSize:isFullscreen?'1rem':'0.8rem',letterSpacing:'3px',color:isBoxDarkMode?'#00d4ff':'#0284c7',opacity:0.5,marginTop:'20px'}}>{subData}</div>
              </div>
            )}

            {gameState==='gameOver'&&(
              <div className="absolute inset-0 flex items-center justify-center rounded-xl z-20 backdrop-blur-sm" style={{background:isBoxDarkMode?'rgba(3,3,3,0.95)':'rgba(255,255,255,0.95)'}}>
                <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[520px] mx-4 ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-4"><Award className="w-10 h-10 text-yellow-500"/><h2 className={`text-2xl font-bold ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Session Complete!</h2></div>
                  <p className={`text-center text-sm mb-6 ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}>You've completed all 30 power breaths. Regular WHM practice boosts energy, immunity, and mental clarity.</p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <RCard label="Final Score" value={score} icon={<Flame className="w-4 h-4"/>} color="orange" dark={isBoxDarkMode}/>
                    <RCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4"/>} color="yellow" dark={isBoxDarkMode}/>
                    <RCard label="Breaths" value={`${breathCount}/30`} icon={<Wind className="w-4 h-4"/>} color="green" dark={isBoxDarkMode}/>
                    <RCard label="Best Combo" value={bestCombo} icon={<Zap className="w-4 h-4"/>} color="purple" dark={isBoxDarkMode}/>
                    <RCard label="Oxygen Boost" value={Math.min(100,Math.floor(score*3.33))} unit="%" icon={<Brain className="w-4 h-4"/>} color="cyan" dark={isBoxDarkMode}/>
                  </div>
                  <div className="flex gap-3">
                    <Link href="/drills/mental-fitness" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold ${isDarkMode?'bg-gray-700 text-gray-300 hover:bg-gray-600':'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back</button></Link>
                    <button onClick={startDrill} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]">Breathe Again →</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 1. DRILL RULES & INSTRUCTIONS */}
        {!isFullscreen&&(
          <footer className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode?'text-cyan-400':'text-cyan-600'}`}/><h2 className={`font-semibold text-lg ${isDarkMode?'text-white':'text-gray-900'}`}>Wim Hof Method Instructions</h2></div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-cyan-500">INHALE</span> deeply through your nose for <span className="font-semibold">1.5 seconds</span></p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-green-500">EXHALE</span> passively for <span className="font-semibold">1.5 seconds</span></p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Complete <span className="font-semibold text-orange-500">30 power breaths</span> • <span className="font-semibold text-green-500">+1 point each</span></p></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Build your <span className="font-semibold text-purple-500">combo streak</span> with consecutive breaths</p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Session auto-completes after <span className="font-semibold text-yellow-500">30 breaths</span></p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Best practiced on an <span className="font-semibold text-red-500">empty stomach</span> • Best score saves locally</p></div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode?'border-gray-700 text-gray-400':'border-gray-200 text-gray-500'}`}>
                  <span>🔥 Increases oxygen saturation and energy levels</span>
                  <span>🧘 Developed by Wim Hof • Free forever</span>
                </div>
              </div>
            </div>
          </footer>
        )}

        {/* 2. ABOUT THIS DRILL */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="About this Wim Hof breathing drill">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2"><GraduationCap className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About This Free WHM Breathing Drill</h2></div>
              </div>
              <div className="p-5">
                <p className={`text-sm leading-relaxed mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>This free Wim Hof Method power breathing drill guides you through 30 rapid inhale-exhale cycles. The visual pacer node expands on inhale and contracts on exhale, helping you maintain rhythm. Regular WHM practice has been shown to boost energy, strengthen immunity, reduce stress, and improve mental clarity.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-cyan-50 border-cyan-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Who It's For</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Anyone seeking stress reduction, increased energy, better focus, improved immunity, and mental clarity through breathwork.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50 border-green-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Benefits</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Increased oxygen saturation, boosted energy levels, strengthened immune response, reduced stress, and enhanced mental focus.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50 border-purple-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What You'll Track</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Breath count, combo streaks, oxygen boost level, and best performance across sessions.</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-yellow-50 border-yellow-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Why Practice WHM Breathing?</h3></div><ul className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Scientifically studied method by Wim Hof</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Alkalizes the blood and increases oxygen</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Builds mental resilience and body awareness</li></ul></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-amber-50 border-amber-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center"><Clock className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to Practice Safely</h3></div><ol className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span> Always practice sitting or lying down</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span> Practice on an empty stomach</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span> Never force the breath - stay relaxed</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span> Practice 2-3 times daily for best results</li></ol></div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. RELATED DRILLS */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="Related training drills and resources">
            <div className="flex items-center gap-2 mb-4"><div className="w-1 h-6 rounded-full bg-gradient-to-b from-cyan-500 to-blue-600"></div><h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore Related Free Drills</h2><span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>8 drills</span></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/drills/mental-fitness/breathing-exercises/box-breathing" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><Wind className="w-4 h-4 text-blue-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Breathing</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} transition-colors`}>Box Breathing</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>4-4-4-4 pattern used by Navy SEALs for calm focus under pressure.</p><div className="flex items-center gap-1 mt-3 text-blue-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/mental-fitness/breathing-exercises/4-7-8" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center"><Clock className="w-4 h-4 text-purple-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Breathing</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600'} transition-colors`}>4-7-8 Breathing</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Relaxation technique for deep sleep and anxiety reduction.</p><div className="flex items-center gap-1 mt-3 text-purple-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/mental-fitness/stress-control/biofeedback" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-emerald-500' : 'bg-white border-gray-200 hover:border-emerald-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center"><Brain className="w-4 h-4 text-emerald-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Stress Control</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-emerald-400' : 'text-gray-900 group-hover:text-emerald-600'} transition-colors`}>Biofeedback</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Heart rate variability training for stress management.</p><div className="flex items-center gap-1 mt-3 text-emerald-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/mental-fitness/stress-control/calm-under-pressure" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-orange-500' : 'bg-white border-gray-200 hover:border-orange-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center"><Target className="w-4 h-4 text-orange-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Stress Control</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-orange-400' : 'text-gray-900 group-hover:text-orange-600'} transition-colors`}>Calm Under Pressure</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Decision-making drills under time pressure with stress inoculation.</p><div className="flex items-center gap-1 mt-3 text-orange-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/cognitive/focus/focus-timer" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-rose-500' : 'bg-white border-gray-200 hover:border-rose-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center"><Timer className="w-4 h-4 text-rose-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Focus</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-rose-400' : 'text-gray-900 group-hover:text-rose-600'} transition-colors`}>Focus Timer</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Build concentration stamina with structured focus sessions.</p><div className="flex items-center gap-1 mt-3 text-rose-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/productivity/focus-endurance/deep-work" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-red-500' : 'bg-white border-gray-200 hover:border-red-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center"><Brain className="w-4 h-4 text-red-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Productivity</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-red-400' : 'text-gray-900 group-hover:text-red-600'} transition-colors`}>Deep Work Timer</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Structured focus sessions for peak productivity and flow state.</p><div className="flex items-center gap-1 mt-3 text-red-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/physical/Reflex-Training/reaction-chain" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-teal-500' : 'bg-white border-gray-200 hover:border-teal-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-green-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center"><Zap className="w-4 h-4 text-teal-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Physical</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-teal-400' : 'text-gray-900 group-hover:text-teal-600'} transition-colors`}>Reaction Chain</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Chain multiple reflex actions in sequence for full-body coordination.</p><div className="flex items-center gap-1 mt-3 text-teal-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/cognitive/focus/concentration-grid" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-indigo-500' : 'bg-white border-gray-200 hover:border-indigo-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center"><Hash className="w-4 h-4 text-indigo-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Focus</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-indigo-600'} transition-colors`}>Concentration Grid</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Find numbers in sequence under time pressure to build attention.</p><div className="flex items-center gap-1 mt-3 text-indigo-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
            </div>
          </section>
        )}

        {/* 4. GLOBAL FOOTER */}
        {!isFullscreen && (<footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo"><div className="max-w-7xl mx-auto"><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8"><div><h3 className="text-white font-semibold mb-3 text-sm">FPS Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li><li><Link href="/drills/fps/target-acquisition" className="hover:text-white transition-colors">Target Acquisition</Link></li><li><Link href="/drills/fps/reactive-tracking" className="hover:text-white transition-colors">Reactive Tracking</Link></li><li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 21 FPS Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li><li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li><li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li><li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 16 Cognitive Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Academic</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li><li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-white transition-colors">Speed Reader</Link></li><li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-white transition-colors">Mental Math</Link></li><li><Link href="/drills/academic" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 12 Academic Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Visual & Motor</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li><li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Hand-Eye Coordination</Link></li><li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-white transition-colors">Moving Target Tracking</Link></li><li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 14 Visual Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">More Categories</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/memory" className="hover:text-white transition-colors">Memory (15 drills)</Link></li><li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li><li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li><li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li></ul></div></div><div className="border-t border-gray-800 pt-8 text-center"><div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><Target className="w-5 h-5 text-white" aria-hidden="true" /></div><span className="text-white font-bold text-lg">SkillDrills</span></div><p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p><p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">Free online Wim Hof Method power breathing drill. Practice 30 rapid inhale exhale cycles with visual pacer. Boost energy immunity and mental clarity through breathwork. No registration required. More free drills at skilldrills.online.</p><div className="flex items-center justify-center gap-5 flex-wrap"><button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors" title="Share this drill" aria-label="Share this free WHM breathing drill"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg></button><button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors" title="Copy link" aria-label="Copy drill link to clipboard"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg></button><a href="https://twitter.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Twitter X" aria-label="Follow SkillDrills on Twitter X"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a><a href="https://instagram.com/skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Instagram" aria-label="Follow SkillDrills on Instagram"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a><a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Subscribe on YouTube" aria-label="Subscribe to SkillDrills on YouTube"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a><a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Pinterest" aria-label="Follow SkillDrills on Pinterest"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg></a></div></div></div></footer>)}
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
  const m={orange:'bg-orange-500/10 border-orange-500/30 text-orange-500',yellow:'bg-yellow-500/10 border-yellow-500/30 text-yellow-500',green:'bg-green-500/10 border-green-500/30 text-green-500',purple:'bg-purple-500/10 border-purple-500/30 text-purple-500',cyan:'bg-cyan-500/10 border-cyan-500/30 text-cyan-500'};
  const c=m[color]||m.orange; const [bg,border,text]=c.split(' ');
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}>
      <div className="flex items-center gap-2 min-w-0"><div className={text}>{icon}</div><span className={`text-xs sm:text-sm truncate ${dark?'text-gray-300':'text-gray-600'}`}>{label}</span></div>
      <span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${text}`}>{value}{unit}</span>
    </div>
  );
}