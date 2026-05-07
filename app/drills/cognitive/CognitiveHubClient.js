"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Brain, Target, Star, Clock, Play, Eye, Zap, Puzzle, Home, ChevronRight } from "lucide-react";

const cognitiveCategories = [
  {
    name: "Attention Training",
    folderName: "attention",
    icon: Eye,
    color: "blue",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    description: "Divided, selective, and sustained attention exercises based on cognitive psychology research",
    drills: [
      { name: "Divided Attention", folderName: "divided-attention", difficulty: "Intermediate", duration: "60s", description: "Dual-task training: track moving balls while matching even numbers simultaneously" },
      { name: "Selective Attention", folderName: "selective-attention", difficulty: "Intermediate", duration: "60s", description: "Visual search: find items matching both color and shape among distractors" },
      { name: "Sustained Attention", folderName: "sustained-attention", difficulty: "Beginner", duration: "60s", description: "Vigilance training: click only when the flashing number matches your memorized target" },
    ]
  },
  {
    name: "Focus & Concentration",
    folderName: "focus",
    icon: Target,
    color: "purple",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    description: "Build deep work stamina, resist distractions, and enter flow state more easily",
    drills: [
      { name: "Concentration Grid", folderName: "concentration-grid", difficulty: "Intermediate", duration: "60s", description: "Sequential search: find numbers 1→2→3 on expanding 3×3 to 8×8 grids with level bonuses" },
      { name: "Distraction Fighter", folderName: "distraction-fighter", difficulty: "Advanced", duration: "60s", description: "Stroop test: identify ink colors while ignoring conflicting word meanings" },
      { name: "Focus Ripples", folderName: "focus-timer", difficulty: "Beginner", duration: "5 min", description: "Sustained attention: 5-minute visual meditation with expanding ripple patterns" },
    ]
  },
  {
    name: "Memory Games",
    folderName: "memory",
    icon: Brain,
    color: "indigo",
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-600",
    description: "Working memory, spatial recall, pattern recognition, and sequence memory exercises",
    drills: [
      { name: "Card Matching", folderName: "card-matching", difficulty: "Beginner", duration: "60s", description: "Visual memory: match icon pairs on expanding 12 to 32+ card grids with 15+ unique icons" },
      { name: "Memory Sequence", folderName: "memory-sequence", difficulty: "Intermediate", duration: "60s", description: "Spatial recall: repeat sequences on 4×4 to 7×7 grids with Memory Master achievement" },
      { name: "Number Recall", folderName: "number-recall", difficulty: "Advanced", duration: "60s", description: "Digit span: memorize and reproduce sequences from 4 to 49 digits across 5 levels" },
      { name: "Pattern Recognition", folderName: "pattern-recognition", difficulty: "Intermediate", duration: "60s", description: "5 pattern types: arithmetic, geometric, squares, Fibonacci, and alternating sequences" },
    ]
  },
  {
    name: "Problem Solving",
    folderName: "problem-solving",
    icon: Puzzle,
    color: "orange",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
    description: "Logic puzzles, strategic planning, recursive thinking, and critical reasoning",
    drills: [
      { name: "Logic Puzzles", folderName: "logic-puzzles", difficulty: "Advanced", duration: "60s", description: "8 puzzle types including sequences, algebra, PEMDAS, percentages & number manipulation" },
      { name: "Sudoku", folderName: "sudoku", difficulty: "Intermediate", duration: "60s", description: "Progressive 4×4 to 7×7 Sudoku with adaptive box constraints & Master achievement" },
      { name: "Tower of Hanoi", folderName: "tower-of-hanoi", difficulty: "Expert", duration: "60s", description: "Classic recursive puzzle: 3-8 disk levels with perfect move celebrations & no penalties" },
    ]
  },
  {
    name: "Processing Speed",
    folderName: "processing-speed",
    icon: Zap,
    color: "green",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    description: "Quick math, reaction time tests, cognitive flexibility, and symbol matching",
    drills: [
      { name: "Quick Math", folderName: "quick-math", difficulty: "Intermediate", duration: "60s", description: "Rapid arithmetic with adaptive difficulty, unique non-repeating problems & keyboard input" },
      { name: "Reaction Time", folderName: "reaction-time", difficulty: "Beginner", duration: "60s", description: "Neuro-switch: click RED targets only, ignore BLUE — targets reposition every 950ms" },
      { name: "Symbol Matching", folderName: "symbol-matching", difficulty: "Advanced", duration: "75s", description: "Cognitive flexibility: match Greek symbols to numbers with keys that change every answer" },
    ]
  },
];

export default function CognitiveHubClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-50 text-green-600 border-green-200';
      case 'Intermediate': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'Advanced': return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'Expert': return 'bg-red-50 text-red-600 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getCategoryGradient = (category) => {
    switch(category) {
      case 'Attention Training': return 'from-blue-500 to-cyan-600';
      case 'Focus & Concentration': return 'from-purple-500 to-violet-600';
      case 'Memory Games': return 'from-indigo-500 to-purple-600';
      case 'Problem Solving': return 'from-orange-500 to-red-600';
      case 'Processing Speed': return 'from-green-500 to-emerald-600';
      default: return 'from-purple-500 to-indigo-600';
    }
  };

  const totalDrills = cognitiveCategories.reduce((acc, cat) => acc + cat.drills.length, 0);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cognitive training drills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Cognitive Brain Training - 16 Free Drills",
            "url": "https://skilldrills.online/drills/cognitive",
            "description": "Science-based cognitive training with 16 free drills across 5 domains: Attention, Focus, Memory, Problem Solving, and Processing Speed. No login required.",
            "isPartOf": { "@type": "WebSite", "name": "Global Drill System", "url": "https://skilldrills.online" },
            "about": { "@type": "Thing", "name": "Cognitive Training" },
            "numberOfItems": 16,
            "itemListElement": cognitiveCategories.flatMap(category =>
              category.drills.map((drill) => ({
                "@type": "ListItem",
                "item": {
                  "@type": "WebApplication",
                  "name": drill.name,
                  "url": `https://skilldrills.online/drills/cognitive/${category.folderName}/${drill.folderName}`,
                  "description": drill.description,
                  "applicationCategory": "EducationalApplication",
                  "operatingSystem": "Web"
                }
              }))
            )
          })
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li><Link href="/" className="flex items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors"><Home className="w-4 h-4" /><span>Home</span></Link></li>
            <li className="text-gray-400" aria-hidden="true"><ChevronRight className="w-4 h-4" /></li>
            <li><Link href="/drills" className="text-gray-500 hover:text-purple-600 transition-colors">Drills</Link></li>
            <li className="text-gray-400" aria-hidden="true"><ChevronRight className="w-4 h-4" /></li>
            <li><span className="text-purple-600 font-medium" aria-current="page">Cognitive Training</span></li>
          </ol>
        </nav>

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl"><Brain className="w-6 h-6 text-white" /></div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Cognitive Brain Training</h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">Science-based drills to sharpen memory, enhance focus, and boost problem-solving abilities</p>
            </div>
          </div>
        </div>

        <section className="sr-only" aria-label="Cognitive training overview">
          <h2>Cognitive Brain Training Drills Overview</h2>
          <p>Access 16 free cognitive training drills across 5 domains: Attention Training, Focus & Concentration, Memory Games, Problem Solving, and Processing Speed. All drills are free with no login required.</p>
        </section>

        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">👁️ Attention</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">🎯 Focus</span>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">🧠 Memory</span>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">🧩 Problem Solving</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">⚡ Processing Speed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Available Drills", value: totalDrills, sub: "Ready to train", icon: <Target className="w-4 h-4 text-green-500" /> },
            { label: "Domains", value: cognitiveCategories.length, sub: "Cognitive areas", icon: <Brain className="w-4 h-4 text-purple-500" /> },
            { label: "Free Access", value: "100%", sub: "No login required", icon: <Star className="w-4 h-4 text-yellow-500" /> }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="flex items-center justify-between mb-2"><p className="text-sm text-gray-500">{stat.label}</p>{stat.icon}</div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>

        {cognitiveCategories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <div key={category.name} className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${getCategoryGradient(category.name)}`}></div>
                <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                <span className="text-xs text-gray-400">({category.drills.length} drills)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.drills.map((drill, index) => (
                  <Link key={index} href={`/drills/cognitive/${category.folderName}/${drill.folderName}`} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2" aria-label={`${drill.name} - ${drill.description}. Difficulty: ${drill.difficulty}. Duration: ${drill.duration}.`}>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-2 rounded-lg ${category.bgColor}`}><CategoryIcon className={`w-5 h-5 ${category.textColor}`} /></div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(drill.difficulty)}`}>{drill.difficulty}</div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">{drill.name}</h3>
                      <p className="text-sm text-gray-500 mb-4 leading-relaxed">{drill.description}</p>
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500"><div className="flex items-center gap-1"><Clock className="w-3 h-3" /><span>{drill.duration}</span></div></div>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-400">{category.name}</span>
                        <div className="flex items-center gap-1 text-purple-600 group-hover:gap-2 transition-all"><span className="text-sm font-medium">Start Drill</span><Play className="w-4 h-4" /></div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 mt-8 text-white">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><Brain className="w-6 h-6" />Benefits of Cognitive Training</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { emoji: "🧠", title: "Better Memory", desc: "Strengthen working memory through pattern exercises and recall drills" },
              { emoji: "🎯", title: "Sharper Focus", desc: "Filter distractions with attention training and Stroop inhibition tasks" },
              { emoji: "⚡", title: "Faster Thinking", desc: "Quicker decisions with processing speed drills and reaction tests" },
              { emoji: "🧩", title: "Logic Skills", desc: "Develop recursive reasoning with puzzles and Sudoku challenges" }
            ].map((benefit, i) => (
              <div key={i}><h4 className="font-semibold mb-2 flex items-center gap-2"><span className="text-lg">{benefit.emoji}</span>{benefit.title}</h4><p className="text-sm text-purple-100">{benefit.desc}</p></div>
            ))}
          </div>
        </div>

        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Explore Related Categories</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { href: "/drills/memory", emoji: "💾", title: "Memory Drills", desc: "Short-term, working & spatial memory" },
              { href: "/drills/productivity", emoji: "⏱️", title: "Productivity", desc: "Focus endurance & time management" },
              { href: "/drills/academic", emoji: "📚", title: "Academic", desc: "Reading, math, typing & comprehension" },
              { href: "/drills/fps", emoji: "🎮", title: "FPS Training", desc: "Aim trainer, reflex & tracking drills" }
            ].map((link, i) => (
              <Link key={i} href={link.href} className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <div className="text-3xl mb-3">{link.emoji}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{link.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}