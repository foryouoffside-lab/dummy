'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { 
  Code2, Zap, Award, 
  Sun, Moon, Volume2, VolumeX,
  Eye, Maximize2, Minimize2, Timer,
  ArrowLeft, Target, Activity,
  Terminal, Keyboard, CheckCircle2, Trophy,
  BarChart3, Info, Hash
} from 'lucide-react';

export default function CodeTypingDrill() {
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

  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const startTimeRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Progressive Code Snippets Database
  const CODE_SNIPPETS = useMemo(() => ({
    JAVASCRIPT: [
      { code: "let x = 5;", points: 100 },
      { code: "const y = 10;", points: 100 },
      { code: "var name = 'John';", points: 100 },
      { code: "let count = 0;", points: 100 },
      { code: "const PI = 3.14;", points: 100 },
      { code: "let sum = a + b;", points: 150 },
      { code: "const fullName = first + last;", points: 150 },
      { code: "console.log('Hello World');", points: 150 },
      { code: "let isActive = true;", points: 150 },
      { code: "const doubled = num * 2;", points: 150 },
      { code: "function greet(name) { return 'Hi ' + name; }", points: 200 },
      { code: "const fruits = ['apple', 'banana', 'orange'];", points: 200 },
      { code: "let result = condition ? 'yes' : 'no';", points: 200 },
      { code: "const doubled = numbers.map(n => n * 2);", points: 200 },
      { code: "if (score >= 60) { console.log('Pass'); }", points: 200 },
      { code: "const { name, age, email } = user;", points: 250 },
      { code: "const merged = { ...obj1, ...obj2, ...obj3 };", points: 250 },
      { code: "setTimeout(() => { console.log('Done'); }, 1000);", points: 250 },
      { code: "const filtered = items.filter(item => item.active);", points: 250 },
      { code: "const sum = numbers.reduce((acc, n) => acc + n, 0);", points: 250 },
      { code: "const unique = [...new Set(array)];", points: 300 },
      { code: "const sorted = data.sort((a, b) => a.value - b.value);", points: 300 },
      { code: "const grouped = items.reduce((acc, item) => { acc[item.type] = item; return acc; }, {});", points: 300 },
      { code: "const [first, second, ...rest] = array;", points: 300 },
      { code: "export default function Component({ prop1, prop2 }) { return <div />; }", points: 300 }
    ],
    PYTHON: [
      { code: "x = 5", points: 100 },
      { code: "name = 'John'", points: 100 },
      { code: "count = 0", points: 100 },
      { code: "PI = 3.14", points: 100 },
      { code: "is_active = True", points: 100 },
      { code: "result = a + b", points: 150 },
      { code: "print('Hello World')", points: 150 },
      { code: "full_name = first + ' ' + last", points: 150 },
      { code: "doubled = num * 2", points: 150 },
      { code: "items = [1, 2, 3]", points: 150 },
      { code: "def greet(name):\n    return f'Hi {name}'", points: 200 },
      { code: "squared = [x**2 for x in numbers]", points: 200 },
      { code: "result = 'yes' if condition else 'no'", points: 200 },
      { code: "filtered = filter(lambda x: x > 0, numbers)", points: 200 },
      { code: "if score >= 60:\n    print('Pass')", points: 200 },
      { code: "name, age = user['name'], user['age']", points: 250 },
      { code: "merged = {**dict1, **dict2}", points: 250 },
      { code: "with open('file.txt') as f:\n    content = f.read()", points: 250 },
      { code: "unique = list(set(items))", points: 250 },
      { code: "@decorator\ndef function():\n    pass", points: 250 },
      { code: "class Dog(Animal):\n    def __init__(self, name):\n        super().__init__(name)", points: 300 },
      { code: "try:\n    risky_call()\nexcept Exception as e:\n    handle(e)", points: 300 },
      { code: "from collections import defaultdict\ncounts = defaultdict(int)", points: 300 }
    ],
    HTML: [
      { code: "<p>Hello</p>", points: 100 },
      { code: "<div></div>", points: 100 },
      { code: "<span>Text</span>", points: 100 },
      { code: "<h1>Title</h1>", points: 100 },
      { code: "<br>", points: 100 },
      { code: "<a href='#'>Link</a>", points: 150 },
      { code: "<img src='pic.jpg' alt='Desc'>", points: 150 },
      { code: "<button type='submit'>Send</button>", points: 150 },
      { code: "<input type='text' placeholder='Name'>", points: 150 },
      { code: "<ul><li>Item</li></ul>", points: 150 },
      { code: "<div class='container' id='main'>", points: 200 },
      { code: "<form method='POST' action='/submit'>", points: 200 },
      { code: "<meta charset='UTF-8'>", points: 200 },
      { code: "<link rel='stylesheet' href='style.css'>", points: 200 },
      { code: "<script src='app.js' defer></script>", points: 200 },
      { code: "<div data-user-id='123' role='button' aria-label='Click'>", points: 250 },
      { code: "<svg width='100' height='100'><circle cx='50' cy='50' r='40' fill='red' /></svg>", points: 250 },
      { code: "<video controls><source src='vid.mp4' type='video/mp4'></video>", points: 250 },
      { code: "<template id='card'><div class='card'></div></template>", points: 250 },
      { code: "<dialog open><h2>Modal</h2><p>Content</p><button>Close</button></dialog>", points: 300 },
      { code: "<details><summary>Click me</summary><p>Hidden content</p></details>", points: 300 },
      { code: "<custom-element prop='value' onchange='handleChange()'></custom-element>", points: 300 }
    ]
  }), []);

  // Get available snippets
  const availableSnippets = useMemo(() => {
    const allSnippets = CODE_SNIPPETS[language] || [];
    return allSnippets.filter((_, idx) => !completedSnippets.has(`${language}-${idx}`));
  }, [language, completedSnippets, CODE_SNIPPETS]);

  // Get current snippet
  const currentSnippet = availableSnippets[currentSnippetIdx] || 
    { code: "const hello = 'world';", points: 100 };

  // Calculate time based on code length
  const calculateTime = (code) => {
    const baseTime = Math.max(15, Math.floor(code.length / 3));
    return Math.min(45, baseTime);
  };

  // Load best score
  useEffect(() => {
    const savedBestScore = localStorage.getItem('codeTypingDrillBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score
  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('codeTypingDrillBestScore', score.toString());
    }
  }, [gameState, score, bestScore]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        const element = containerRef.current;
        if (element.requestFullscreen) {
          await element.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const showFeedback = (message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 500);
  };

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Play sound effect
  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = initAudio();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      if (type === 'start') {
        oscillator.frequency.value = 660;
        gainNode.gain.value = 0.1;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
        oscillator.stop(audioCtx.currentTime + 0.1);
      } else if (type === 'complete') {
        oscillator.frequency.value = 880;
        gainNode.gain.value = 0.1;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
        oscillator.stop(audioCtx.currentTime + 0.15);
      } else if (type === 'combo') {
        oscillator.frequency.value = 1046.5;
        gainNode.gain.value = 0.12;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
        oscillator.stop(audioCtx.currentTime + 0.15);
      } else if (type === 'error') {
        oscillator.frequency.value = 330;
        gainNode.gain.value = 0.08;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
        oscillator.stop(audioCtx.currentTime + 0.1);
      }
    } catch (e) {}
  };

  const startTest = () => {
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
    startTimeRef.current = Date.now();
    playSound('start');
    showFeedback(`Type the ${language} code exactly as shown`, 'success');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const nextSnippet = () => {
    if (availableSnippets.length === 0) {
      setGameState('gameOver');
      return;
    }
    
    const nextIdx = (currentSnippetIdx + 1) % availableSnippets.length;
    setCurrentSnippetIdx(nextIdx);
    const nextTime = calculateTime(availableSnippets[nextIdx].code);
    setTimeLeft(nextTime);
    setInput('');
    setCharactersTyped(0);
    setCorrectCharacters(0);
    startTimeRef.current = Date.now();
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);
    
    const charsTyped = val.length;
    setCharactersTyped(charsTyped);
    
    let correct = 0;
    
    for (let i = 0; i < val.length; i++) {
      if (val[i] === currentSnippet.code[i]) {
        correct++;
      } else {
        if (i >= input.length) {
          playSound('error');
        }
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
      const snippetKey = `${language}-${CODE_SNIPPETS[language].findIndex(s => s.code === currentSnippet.code)}`;
      setCompletedSnippets(prev => new Set([...prev, snippetKey]));
      
      const comboBonus = Math.floor(combo / 3) * 10;
      const totalPoints = currentSnippet.points + comboBonus;
      
      setScore(prev => prev + totalPoints);
      setCombo(prev => {
        const newCombo = prev + 1;
        if (newCombo > 0 && newCombo % 3 === 0) {
          playSound('combo');
          showFeedback(`🔥 ${newCombo}x Combo! +${comboBonus} bonus!`, 'success');
        }
        return newCombo;
      });
      
      playSound('complete');
      showFeedback(`✓ Complete! +${totalPoints}`, 'success');
      
      if (availableSnippets.length <= 1) {
        setGameState('gameOver');
      } else {
        nextSnippet();
      }
    }
  };

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState, timeLeft]);

  const resetSession = () => {
    setGameState('start');
    setInput('');
    setTimeLeft(30);
    setScore(0);
    setCombo(0);
    setFeedback('');
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resetGame = () => {
    resetSession();
  };

  const getProgress = () => {
    return currentSnippet.code.length > 0 
      ? Math.round((input.length / currentSnippet.code.length) * 100)
      : 0;
  };

  const displayedLevel = Math.floor(completedSnippets.size / 3) + 1;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drill...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link 
            href="/drills/academic" 
            className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Academic Drills
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Syntax Kinematics</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Progressive code typing • Level up as you go</p>
              </div>
            </div>
            
            {/* Control Buttons */}
            <div className="flex gap-2">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                <Eye className="w-5 h-5" />
              </button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Board - Code Typing specific metrics */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={wpm} label="WPM" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={accuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle2 className="text-emerald-600" />} value={combo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={<Code2 className="text-cyan-600" />} value={language.slice(0, 2)} label="Lang" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : 'bg-blue-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* Language Selector - Below Stats Board */}
        {gameState === 'start' && (
          <div className="flex justify-center gap-3 mb-4">
            <div className={`flex p-1 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              {['JAVASCRIPT', 'PYTHON', 'HTML'].map(lang => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setCompletedSnippets(new Set());
                    setScore(0);
                  }}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                    language === lang 
                      ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg' 
                      : `${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Game Container - 16:9 Ratio Box */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? "#0a0a0a" : "#1e1e1e",
            aspectRatio: '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}
        >
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          {/* Content Area */}
          <div className="absolute inset-0 flex items-center justify-center p-8 overflow-y-auto">
            {/* Start Screen */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-[#1e1e1e]/95'}`}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-800 border-gray-700'}`}>
                  <Terminal className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 text-white`}>Syntax Kinematics</h3>
                  <p className={`mb-6 text-gray-300`}>{language} • {availableSnippets.length} snippets available</p>
                  <button 
                    onClick={startTest}
                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* Playing Screen */}
            {gameState === 'playing' && (
              <div className="w-full h-full flex flex-col">
                <div className="mb-4 flex justify-between items-center">
                  <div>
                    <span className="text-orange-400 text-sm font-bold">{language}</span>
                    <span className="text-gray-400 text-sm mx-2">•</span>
                    <span className="text-gray-400 text-sm">Level {displayedLevel}</span>
                    <span className="text-gray-400 text-sm mx-2">•</span>
                    <span className="text-yellow-400 text-sm">+{currentSnippet.points} pts</span>
                  </div>
                  <span className="text-gray-400 text-xs">{availableSnippets.length} remaining</span>
                </div>
                
                {/* Display Code */}
                <div className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-900/50 rounded-xl">
                  <pre className="text-lg md:text-xl font-mono leading-relaxed whitespace-pre-wrap">
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
                    className={`w-full p-4 rounded-xl font-mono text-base outline-none border-2 transition-all resize-none ${
                      'bg-gray-800 border-gray-700 text-white focus:border-orange-500'
                    }`}
                    placeholder="Start typing here..."
                    rows={3}
                    autoFocus
                    spellCheck={false}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">
                      {getProgress()}% complete • {currentSnippet.code.length - input.length} chars left
                    </p>
                    <p className="text-xs text-orange-400">
                      Time: {timeLeft}s
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Game Over Screen */}
            {gameState === 'gameOver' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-[#1e1e1e]/95'}`}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-800 border-gray-700'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Trophy className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold text-white`}>Drill Complete!</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="text-purple-500" />
                    <ResultCard label="Snippets Done" value={completedSnippets.size} icon={<CheckCircle2 className="w-4 h-4" />} color="text-green-500" />
                    <ResultCard label="Final Level" value={displayedLevel} icon={<Hash className="w-4 h-4" />} color="text-blue-500" />
                    <ResultCard label="Max Combo" value={`${combo}x`} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                    <ResultCard label="Language" value={language} icon={<Code2 className="w-4 h-4" />} color="text-cyan-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/academic" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all bg-gray-700 text-gray-300 hover:bg-gray-600`}>
                        ← Back
                      </button>
                    </Link>
                    <button 
                      onClick={resetGame} 
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Type code <span className="font-semibold text-orange-500">exactly as shown</span> - character by character</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Base points: <span className="font-semibold text-green-500">100-300</span> based on complexity</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every 3 completions = <span className="font-semibold text-blue-500">+10 combo bonus</span></p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Dynamic time: <span className="font-semibold text-purple-500">15-45 seconds</span> per snippet</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>No repeats - <span className="font-semibold text-amber-500">unique snippets</span> per session</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Choose from <span className="font-semibold text-yellow-500">JavaScript, Python, HTML</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>⌨️ Level up automatically as you complete snippets</span>
                  <span>🏆 Best Score saves locally</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', isDark }) {
  return (
    <div className={`rounded-xl shadow-sm border p-3 text-center flex flex-col justify-center h-full ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className="mb-1 flex justify-center">{icon}</div>
      <p className={`text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p>
      <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
    </div>
  );
}

function ResultCard({ label, value, unit = '', icon, color }) {
  const bgColor = color === 'text-yellow-500' ? 'bg-yellow-500/10' : 
                   color === 'text-purple-500' ? 'bg-purple-500/10' : 
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-blue-500' ? 'bg-blue-500/10' :
                   color === 'text-orange-500' ? 'bg-orange-500/10' : 'bg-cyan-500/10';
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${bgColor}`}>
      <div className="flex items-center gap-2">
        <div className={color}>{icon}</div>
        <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
      </div>
      <span className={`font-bold text-lg ${color}`}>{value}{unit}</span>
    </div>
  );
}