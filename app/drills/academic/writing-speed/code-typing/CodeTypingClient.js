'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { 
  Code2, Zap, Award, 
  Sun, Moon, Volume2, VolumeX,
  Eye, Maximize2, Minimize2, Timer,
  ArrowLeft, Target, Activity,
  Terminal, Keyboard, CheckCircle2, Trophy,
  BarChart3, Info, Hash, RefreshCw
} from 'lucide-react';

export default function CodeTypingClient() {
  const [gameState, setGameState] = useState('start');
  const [language, setLanguage] = useState('JAVASCRIPT');
  const [currentSnippetIdx, setCurrentSnippetIdx] = useState(0);
  const [input, setInput] = useState('');
  const [completedSnippets, setCompletedSnippets] = useState(new Set());
  
  // Performance Metrics
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeLeft, setTimeLeft] = useState(30);
  const [charactersTyped, setCharactersTyped] = useState(0);
  const [correctCharacters, setCorrectCharacters] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [combo, setCombo] = useState(0);
  
  // UI State
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isClient, setIsClient] = useState(false);

  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const startTimeRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const gameStateRef = useRef('start');
  const languageRef = useRef('JAVASCRIPT');

  // Progressive Code Snippets Database
  const CODE_SNIPPETS = useMemo(() => ({
    JAVASCRIPT: [
      { code: "let x = 5;" },
      { code: "const y = 10;" },
      { code: "var name = 'John';" },
      { code: "let count = 0;" },
      { code: "const PI = 3.14;" },
      { code: "let sum = a + b;" },
      { code: "const fullName = first + last;" },
      { code: "console.log('Hello World');" },
      { code: "let isActive = true;" },
      { code: "const doubled = num * 2;" },
      { code: "function greet(name) { return 'Hi ' + name; }" },
      { code: "const fruits = ['apple', 'banana', 'orange'];" },
      { code: "let result = condition ? 'yes' : 'no';" },
      { code: "const doubled = numbers.map(n => n * 2);" },
      { code: "if (score >= 60) { console.log('Pass'); }" },
      { code: "const { name, age, email } = user;" },
      { code: "const merged = { ...obj1, ...obj2, ...obj3 };" },
      { code: "setTimeout(() => { console.log('Done'); }, 1000);" },
      { code: "const filtered = items.filter(item => item.active);" },
      { code: "const sum = numbers.reduce((acc, n) => acc + n, 0);" },
      { code: "const unique = [...new Set(array)];" },
      { code: "const sorted = data.sort((a, b) => a.value - b.value);" },
      { code: "const grouped = items.reduce((acc, item) => { acc[item.type] = item; return acc; }, {});" },
      { code: "const [first, second, ...rest] = array;" },
      { code: "export default function Component({ prop1, prop2 }) { return <div />; }" }
    ],
    PYTHON: [
      { code: "x = 5" },
      { code: "name = 'John'" },
      { code: "count = 0" },
      { code: "PI = 3.14" },
      { code: "is_active = True" },
      { code: "result = a + b" },
      { code: "print('Hello World')" },
      { code: "full_name = first + ' ' + last" },
      { code: "doubled = num * 2" },
      { code: "items = [1, 2, 3]" },
      { code: "def greet(name):\n    return f'Hi {name}'" },
      { code: "squared = [x**2 for x in numbers]" },
      { code: "result = 'yes' if condition else 'no'" },
      { code: "filtered = filter(lambda x: x > 0, numbers)" },
      { code: "if score >= 60:\n    print('Pass')" },
      { code: "name, age = user['name'], user['age']" },
      { code: "merged = {**dict1, **dict2}" },
      { code: "with open('file.txt') as f:\n    content = f.read()" },
      { code: "unique = list(set(items))" },
      { code: "@decorator\ndef function():\n    pass" },
      { code: "class Dog(Animal):\n    def __init__(self, name):\n        super().__init__(name)" },
      { code: "try:\n    risky_call()\nexcept Exception as e:\n    handle(e)" },
      { code: "from collections import defaultdict\ncounts = defaultdict(int)" }
    ],
    HTML: [
      { code: "<p>Hello</p>" },
      { code: "<div></div>" },
      { code: "<span>Text</span>" },
      { code: "<h1>Title</h1>" },
      { code: "<br>" },
      { code: "<a href='#'>Link</a>" },
      { code: "<img src='pic.jpg' alt='Desc'>" },
      { code: "<button type='submit'>Send</button>" },
      { code: "<input type='text' placeholder='Name'>" },
      { code: "<ul><li>Item</li></ul>" },
      { code: "<div class='container' id='main'>" },
      { code: "<form method='POST' action='/submit'>" },
      { code: "<meta charset='UTF-8'>" },
      { code: "<link rel='stylesheet' href='style.css'>" },
      { code: "<script src='app.js' defer></script>" },
      { code: "<div data-user-id='123' role='button' aria-label='Click'>" },
      { code: "<svg width='100' height='100'><circle cx='50' cy='50' r='40' fill='red' /></svg>" },
      { code: "<video controls><source src='vid.mp4' type='video/mp4'></video>" },
      { code: "<template id='card'><div class='card'></div></template>" },
      { code: "<dialog open><h2>Modal</h2><p>Content</p><button>Close</button></dialog>" },
      { code: "<details><summary>Click me</summary><p>Hidden content</p></details>" },
      { code: "<custom-element prop='value' onchange='handleChange()'></custom-element>" }
    ]
  }), []);

  // Sync refs
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Get available snippets
  const availableSnippets = useMemo(() => {
    const allSnippets = CODE_SNIPPETS[language] || [];
    return allSnippets.filter((_, idx) => !completedSnippets.has(`${language}-${idx}`));
  }, [language, completedSnippets, CODE_SNIPPETS]);

  // Get current snippet
  const currentSnippet = useMemo(() => 
    availableSnippets[currentSnippetIdx] || { code: "const hello = 'world';" },
    [availableSnippets, currentSnippetIdx]
  );

  // Calculate time based on code length
  const calculateTime = useCallback((code) => {
    const baseTime = Math.max(15, Math.floor(code.length / 3));
    return Math.min(45, baseTime);
  }, []);

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('codeTypingDrillBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  // Update best score
  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem('codeTypingDrillBestScore', score.toString());
      } catch (e) { /* localStorage not available */ }
    }
  }, [gameState, score, bestScore]);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        const element = containerRef.current;
        if (element?.requestFullscreen) {
          await element.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  }, [isFullscreen]);

  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 600);
  }, []);

  const initAudio = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      return audioCtxRef.current;
    } catch (e) {
      return null;
    }
  }, []);

  // Play sound effect
  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = initAudio();
      if (!audioCtx) return;
      
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      const now = audioCtx.currentTime;
      
      const freqMap = { start: 660, complete: 880, combo: 1046.5, error: 330 };
      const durMap = { start: 0.1, complete: 0.15, combo: 0.2, error: 0.1 };
      
      oscillator.frequency.setValueAtTime(freqMap[type] || 660, now);
      gainNode.gain.setValueAtTime(type === 'combo' ? 0.12 : type === 'error' ? 0.08 : 0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + (durMap[type] || 0.15));
      oscillator.start(now);
      oscillator.stop(now + (durMap[type] || 0.15));
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  const startTest = useCallback(() => {
    if (availableSnippets.length === 0) {
      setCompletedSnippets(new Set());
      setCurrentSnippetIdx(0);
    } else {
      setCurrentSnippetIdx(0);
    }
    
    const initialTime = calculateTime(currentSnippet.code);
    setInput('');
    setWpm(0);
    setAccuracy(100);
    setTimeLeft(initialTime);
    setCharactersTyped(0);
    setCorrectCharacters(0);
    setGameState('playing');
    gameStateRef.current = 'playing';
    scoreRef.current = 0;
    comboRef.current = 0;
    setScore(0);
    setCombo(0);
    startTimeRef.current = Date.now();
    playSound('start');
    showFeedback(`Type the ${language} code exactly as shown`, 'success');
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [availableSnippets.length, calculateTime, currentSnippet.code, language, playSound, showFeedback]);

  const nextSnippet = useCallback(() => {
    if (availableSnippets.length === 0) {
      setGameState('gameOver');
      gameStateRef.current = 'gameOver';
      return;
    }
    
    const nextIdx = (currentSnippetIdx + 1) % availableSnippets.length;
    setCurrentSnippetIdx(nextIdx);
    const nextTime = calculateTime(availableSnippets[nextIdx]?.code || '');
    setTimeLeft(nextTime);
    setInput('');
    setCharactersTyped(0);
    setCorrectCharacters(0);
    startTimeRef.current = Date.now();
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [availableSnippets, currentSnippetIdx, calculateTime]);

  const handleInputChange = useCallback((e) => {
    const val = e.target.value;
    setInput(val);
    
    const charsTyped = val.length;
    setCharactersTyped(charsTyped);
    
    let correct = 0;
    
    for (let i = 0; i < val.length; i++) {
      if (val[i] === currentSnippet.code[i]) {
        correct++;
      }
    }
    
    setCorrectCharacters(correct);
    
    if (startTimeRef.current) {
      const timeElapsed = (Date.now() - startTimeRef.current) / 1000 / 60;
      const wordCount = correct / 5;
      setWpm(timeElapsed > 0 ? Math.round(wordCount / timeElapsed) : 0);
      setAccuracy(charsTyped > 0 ? Math.round((correct / charsTyped) * 100) : 100);
    }
    
    if (val === currentSnippet.code) {
      const snippetIdx = CODE_SNIPPETS[languageRef.current].findIndex(s => s.code === currentSnippet.code);
      const snippetKey = `${languageRef.current}-${snippetIdx}`;
      setCompletedSnippets(prev => new Set([...prev, snippetKey]));
      
      const basePoints = 1;
      const comboBonus = Math.floor(comboRef.current / 3) * 1;
      const totalPoints = basePoints + comboBonus;
      
      scoreRef.current = scoreRef.current + totalPoints;
      setScore(scoreRef.current);
      comboRef.current = comboRef.current + 1;
      setCombo(comboRef.current);
      
      if (comboRef.current > 0 && comboRef.current % 3 === 0) {
        playSound('combo');
        showFeedback(`🔥 ${comboRef.current}x Combo! +${comboBonus} bonus!`, 'success');
      }
      
      playSound('complete');
      showFeedback(`✓ Complete! +${totalPoints} point${totalPoints !== 1 ? 's' : ''}`, 'success');
      
      if (availableSnippets.length <= 1) {
        setGameState('gameOver');
        gameStateRef.current = 'gameOver';
      } else {
        nextSnippet();
      }
    }
  }, [currentSnippet, availableSnippets.length, nextSnippet, playSound, showFeedback, CODE_SNIPPETS]);

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameState]);

  const resetGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    setGameState('start');
    gameStateRef.current = 'start';
    setInput('');
    setTimeLeft(30);
    setScore(0);
    setCombo(0);
    setFeedback('');
    setWpm(0);
    setAccuracy(100);
    setCharactersTyped(0);
    setCorrectCharacters(0);
    setCompletedSnippets(new Set());
    setCurrentSnippetIdx(0);
    scoreRef.current = 0;
    comboRef.current = 0;
  }, []);

  const getProgress = useCallback(() => {
    return currentSnippet.code.length > 0 
      ? Math.round((input.length / currentSnippet.code.length) * 100)
      : 0;
  }, [input.length, currentSnippet.code.length]);

  const displayedLevel = useMemo(() => Math.floor(completedSnippets.size / 3) + 1, [completedSnippets.size]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading code typing drill...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Syntax Kinematics - Code Typing Drill",
            "url": "https://skilldrills.online/drills/academic/writing-speed/code-typing",
            "description": "Progressive code typing drill for JavaScript, Python, and HTML. 22-25 unique snippets per language with dynamic 15-45s timer per snippet. Track WPM, accuracy, combo streaks, and earn bonus points.",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "Global Drill System"
            },
            "educationalUse": ["Code Typing", "Programming Practice", "Developer Skills", "Typing Speed"],
            "learningResourceType": "Interactive Exercise",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["JavaScript Syntax", "Python Syntax", "HTML Syntax", "Code Typing Speed", "Developer Productivity"]
          })
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li>
              <Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Home
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li>
              <Link href="/drills/academic" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Academic Drills
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Writing Speed
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} aria-current="page">
              Syntax Kinematics
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl flex-shrink-0">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Syntax Kinematics
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Code typing speed • {language} • 1 point per completion + combo bonuses
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset session"
                aria-label="Reset code typing drill"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'Light mode' : 'Dark mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label="Toggle editor theme"
              title="Toggle editor theme"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
              title={soundEnabled ? 'Mute' : 'Unmute'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button 
              onClick={toggleFullscreen} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* SEO Content */}
        <section className="sr-only" aria-label="Drill description for search engines">
          <h2>Syntax Kinematics - Code Typing Speed Training</h2>
          <p>
            Improve your coding speed and accuracy with progressive code typing drills.
            Choose from JavaScript, Python, or HTML with 22-25 unique snippets per language.
            Dynamic timer adjusts from 15 to 45 seconds based on code length.
            Earn 1 point per completion with +1 combo bonus every 3 consecutive completions.
            Tracks WPM (words per minute), accuracy percentage, and combo streaks.
            Character-by-character feedback shows correct (green) and incorrect (red) typing.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={wpm} label="WPM" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={accuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle2 className="text-emerald-600" />} value={combo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={<Code2 className="text-cyan-600" />} value={language.slice(0, 2)} label="Lang" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-10 mb-2 flex justify-center items-center">
          <div 
            className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${
              feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } ${feedbackType === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {feedback || '\u00A0'}
          </div>
        </div>

        {/* Language Selector */}
        {gameState === 'start' && (
          <div className="flex justify-center gap-3 mb-4">
            <div className={`flex p-1 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`} role="radiogroup" aria-label="Programming language">
              {['JAVASCRIPT', 'PYTHON', 'HTML'].map(lang => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    languageRef.current = lang;
                    setCompletedSnippets(new Set());
                    setScore(0);
                    scoreRef.current = 0;
                    comboRef.current = 0;
                    setCombo(0);
                  }}
                  role="radio"
                  aria-checked={language === lang}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                    language === lang 
                      ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg' 
                      : `${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
                  aria-label={`${lang} - ${CODE_SNIPPETS[lang]?.length || 0} snippets available`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? "#0a0a0a" : "#1e1e1e",
            aspectRatio: isFullscreen ? 'auto' : '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}
        >
          {/* Fullscreen Controls */}
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button 
                onClick={resetGame} 
                className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" 
                title="Reset session"
                aria-label="Reset code typing drill"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle dark mode">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle editor theme">
                <Eye className="w-5 h-5" />
              </button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle sound">
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen">
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
            
            {/* ============ START SCREEN ============ */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-[#1e1e1e]/95'}`}>
                <div className="rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border bg-gray-800 border-gray-700">
                  <div className="mb-4">
                    <Terminal className="w-16 h-16 text-orange-500 mx-auto" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-white">
                    Syntax Kinematics
                  </h2>
                  <p className="mb-2 text-gray-300">
                    {language} • {availableSnippets.length} snippets • +1 point per completion
                  </p>
                  <p className="mb-6 text-sm text-gray-400">
                    Type code exactly as shown. Character-by-character feedback. Combo bonus every 3 completions.
                  </p>
                  <button 
                    onClick={startTest}
                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    aria-label={`Start ${language} code typing drill`}
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* ============ PLAYING SCREEN ============ */}
            {gameState === 'playing' && (
              <div className="w-full h-full flex flex-col">
                <div className="mb-4 flex flex-wrap justify-between items-center gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-orange-400 text-sm font-bold">{language}</span>
                    <span className="text-gray-500 text-sm">•</span>
                    <span className="text-gray-400 text-sm">Level {displayedLevel}</span>
                    <span className="text-gray-500 text-sm">•</span>
                    <span className="text-yellow-400 text-sm">+1pt per completion</span>
                  </div>
                  <span className="text-gray-400 text-xs">{availableSnippets.length} remaining</span>
                </div>
                
                {/* Display Code */}
                <div className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                  <pre className="text-base sm:text-lg md:text-xl font-mono leading-relaxed whitespace-pre-wrap">
                    {currentSnippet.code.split('').map((char, i) => {
                      let color = 'text-gray-500';
                      let bg = 'transparent';
                      
                      if (i < input.length) {
                        if (input[i] === currentSnippet.code[i]) {
                          color = 'text-green-400';
                        } else {
                          color = 'text-red-500';
                          bg = 'bg-red-900/30';
                        }
                      }
                      
                      return (
                        <span 
                          key={i} 
                          className={`${color} ${bg} transition-colors duration-75 ${
                            i === input.length ? 'border-l-2 border-orange-500 animate-pulse' : ''
                          }`}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </pre>
                </div>
                
                {/* Input Area */}
                <div className="mt-auto">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-xl font-mono text-base outline-none border-2 transition-all resize-none bg-gray-800 border-gray-700 text-white focus:border-orange-500"
                    placeholder="Start typing here..."
                    rows={3}
                    autoFocus
                    spellCheck={false}
                    aria-label="Type the code shown above"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">
                      {getProgress()}% complete • {currentSnippet.code.length - input.length} chars left
                    </p>
                    <p className={`text-xs font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-orange-400'}`}>
                      Time: {timeLeft}s
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ============ GAME OVER SCREEN ============ */}
            {gameState === 'gameOver' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-[#1e1e1e]/95'}`}>
                <div className="rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 bg-gray-800 border-gray-700">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Timer className="w-10 h-10 text-orange-500" aria-hidden="true" />
                    <h2 className="text-2xl font-bold text-white">
                      Drill Complete!
                    </h2>
                  </div>
                  
                  <p className="text-center text-sm text-gray-400 mb-6">
                    Keep practicing to improve your code typing speed and syntax accuracy.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={true} />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={true} />
                    <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={true} />
                    <ResultCard label="Snippets Done" value={completedSnippets.size} icon={<CheckCircle2 className="w-4 h-4" />} color="emerald" isDark={true} />
                    <ResultCard label="Final Level" value={displayedLevel} icon={<Hash className="w-4 h-4" />} color="blue" isDark={true} />
                    <ResultCard label="Max Combo" value={`${combo}x`} icon={<Zap className="w-4 h-4" />} color="orange" isDark={true} />
                    <ResultCard label="Language" value={language} icon={<Code2 className="w-4 h-4" />} color="cyan" isDark={true} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/academic" className="flex-1">
                      <button className="w-full px-4 py-2.5 rounded-lg font-semibold transition-all bg-gray-700 text-gray-300 hover:bg-gray-600">
                        ← Back to Drills
                      </button>
                    </Link>
                    <button 
                      onClick={resetGame} 
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                      Play Again →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rules Section */}
        {!isFullscreen && (
          <footer className="mt-6" aria-label="Drill rules and scoring information">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Type code <span className="font-semibold text-orange-500">exactly as shown</span> - character by character</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Each completion: <span className="font-semibold text-green-500">+1 point</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every 3 completions = <span className="font-semibold text-blue-500">+1 combo bonus point</span></p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Dynamic timer: <span className="font-semibold text-purple-500">15-45s</span> based on code length</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>3 languages: <span className="font-semibold text-amber-500">JavaScript, Python, HTML</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Snippets <span className="font-semibold text-yellow-500">never repeat</span> in same session</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>⌨️ Level up automatically • Character-by-character feedback</span>
                  <span>🏆 Best Score saves locally</span>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

// ============ HELPER COMPONENTS ============

function StatCard({ icon, value, label, unit = '', isDark }) {
  return (
    <div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div>
      <p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p>
      <p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
    </div>
  );
}

function ResultCard({ label, value, unit = '', icon, color, isDark }) {
  const colorMap = {
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' },
  };
  
  const colors = colorMap[color] || colorMap.yellow;
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${colors.bg} ${colors.border}`}>
      <div className="flex items-center gap-2 min-w-0">
        <div className={colors.icon} aria-hidden="true">{icon}</div>
        <span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span>
      </div>
      <span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${colors.text}`}>{value}{unit}</span>
    </div>
  );
}