'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Award, Clock, Eye,
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Timer, Trophy, Flame, Wind, Brain, Info, TrendingUp, Zap, RefreshCw
} from 'lucide-react';

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

  if (loading || !isClient) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto"/>
    </div>
  );

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":"Wim Hof Method Power Breathing Drill","url":"https://skilldrills.online/drills/mental-fitness/breathing-exercises/wim-hof","description":"Practice the Wim Hof Method power breathing with 30 rapid inhale-exhale cycles. Visual pacer expands on inhale and contracts on exhale. Track breath count, combo streaks, and oxygen boost level.","applicationCategory":"HealthApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"author":{"@type":"Organization","name":"Global Drill System"},"educationalUse":["Breathwork","Wim Hof Method","Oxygenation","Energy Breathing"],"learningResourceType":"Interactive Exercise","interactivityType":"active","inLanguage":"en-US","teaches":["Wim Hof Breathing","Power Breathing","Oxygen Saturation","Breath Control"]})}}/>
      
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
              <p className={`text-sm sm:text-base ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Wim Hof Method • 30 power breaths • 1 point per breath</p>
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
                  <p className={`mb-6 text-sm ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}>Rapid inhale-exhale cycles following the Wim Hof Method. Node expands on inhale, contracts on exhale.</p>
                  <button onClick={startDrill} className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]">Start Breathing</button>
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
                  <span>🧘 Developed by Wim Hof "The Iceman"</span>
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
  const m={orange:'bg-orange-500/10 border-orange-500/30 text-orange-500',yellow:'bg-yellow-500/10 border-yellow-500/30 text-yellow-500',green:'bg-green-500/10 border-green-500/30 text-green-500',purple:'bg-purple-500/10 border-purple-500/30 text-purple-500',cyan:'bg-cyan-500/10 border-cyan-500/30 text-cyan-500'};
  const c=m[color]||m.orange,[bg,border,text]=c.split(' ');
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}>
      <div className="flex items-center gap-2 min-w-0"><div className={text}>{icon}</div><span className={`text-xs sm:text-sm truncate ${dark?'text-gray-300':'text-gray-600'}`}>{label}</span></div>
      <span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${text}`}>{value}{unit}</span>
    </div>
  );
}