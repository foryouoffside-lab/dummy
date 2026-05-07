"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Play, Brain, Target, Star, Home, ChevronRight } from "lucide-react";

const memoryCategories = [
  {
    name: "Short-Term Memory",
    folderName: "short-term-memory",
    icon: Brain,
    color: "purple",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    description: "Improve your ability to hold information temporarily in conscious awareness",
    drills: [
      { name: "Digit Span", folderName: "digit-span", difficulty: "Easy", duration: "60s", description: "Memorize and recall growing sequences of random digits" },
      { name: "Word Recall", folderName: "word-recall", difficulty: "Medium", duration: "60s", description: "Study word lists then type all words you remember" },
      { name: "Color Sequence", folderName: "color-sequence", difficulty: "Easy", duration: "60s", description: "Watch and reproduce color patterns in correct order" }
    ]
  },
  {
    name: "Working Memory",
    folderName: "working-memory",
    icon: Brain,
    color: "blue",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    description: "Enhance your ability to manipulate and process information mentally",
    drills: [
      { name: "3-Back Training", folderName: "n-back", difficulty: "Hard", duration: "60s", description: "Compare current letter with one from 3 steps back" },
      { name: "Mental Arithmetic", folderName: "mental-arithmetic", difficulty: "Medium", duration: "60s", description: "Solve math problems while tracking difficulty scaling" },
      { name: "Sentence Span", folderName: "sentence-span", difficulty: "Medium", duration: "60s", description: "Read sentences then recall key nouns from each one" }
    ]
  },
  {
    name: "Long-Term Memory",
    folderName: "long-term-memory",
    icon: Brain,
    color: "teal",
    bgColor: "bg-teal-50",
    textColor: "text-teal-600",
    description: "Build lasting memory associations through structured recall practice",
    drills: [
      { name: "Story Recall", folderName: "story-recall", difficulty: "Medium", duration: "60s", description: "Read short stories then answer detailed questions" },
      { name: "Image Association", folderName: "image-association", difficulty: "Easy", duration: "60s", description: "Link emoji items with 5 associated words each" },
      { name: "Paired Associates", folderName: "paired-associates", difficulty: "Medium", duration: "60s", description: "Learn and recall word pairs across 5 difficulty tiers" }
    ]
  },
  {
    name: "Spatial Memory",
    folderName: "spatial-memory",
    icon: Brain,
    color: "orange",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
    description: "Train your ability to remember positions, paths, and spatial layouts",
    drills: [
      { name: "Grid Memorization", folderName: "grid-memorization", difficulty: "Medium", duration: "60s", description: "Memorize lit cell patterns on 4×4 to 5×5 grids" },
      { name: "Path Tracing", folderName: "path-tracing", difficulty: "Hard", duration: "60s", description: "Watch animated dot paths then retrace in exact order" },
      { name: "Object Location", folderName: "object-location", difficulty: "Medium", duration: "60s", description: "Remember where emoji objects are placed on expanding grids" }
    ]
  },
  {
    name: "Associative Memory",
    folderName: "associative-memory",
    icon: Brain,
    color: "violet",
    bgColor: "bg-violet-50",
    textColor: "text-violet-600",
    description: "Strengthen connections between related pieces of information",
    drills: [
      { name: "Name-Face Memory", folderName: "name-face", difficulty: "Hard", duration: "60s", description: "Match emoji faces with names and professional roles" },
      { name: "Concept Linking", folderName: "concept-linking", difficulty: "Medium", duration: "60s", description: "Memorize and recall sequential concept chains" },
      { name: "Sound Pattern", folderName: "sound-pattern", difficulty: "Medium", duration: "60s", description: "Listen to rhythmic beat patterns then reproduce them" }
    ]
  }
];

export default function MemoryClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-50 text-green-600 border-green-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'Hard': return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'Expert': return 'bg-red-50 text-red-600 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getCategoryGradient = (category) => {
    switch(category) {
      case 'Short-Term Memory': return 'from-purple-500 to-pink-600';
      case 'Working Memory': return 'from-blue-500 to-cyan-600';
      case 'Long-Term Memory': return 'from-teal-500 to-green-600';
      case 'Spatial Memory': return 'from-orange-500 to-red-600';
      case 'Associative Memory': return 'from-violet-500 to-purple-600';
      default: return 'from-purple-500 to-pink-600';
    }
  };

  const totalDrills = memoryCategories.reduce((acc, cat) => acc + cat.drills.length, 0);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading memory training drills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Memory Training Drills - Free Brain Memory Exercises",
            "url": "https://skilldrills.online/drills/memory",
            "description": "15 free memory training drills across 5 categories: Short-Term, Working, Long-Term, Spatial, and Associative Memory. No login required.",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Global Drill System",
              "url": "https://skilldrills.online"
            },
            "about": {
              "@type": "Thing",
              "name": "Memory Training & Cognitive Enhancement"
            },
            "numberOfItems": 15,
            "itemListElement": memoryCategories.flatMap(cat => cat.drills).map((drill, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "WebApplication",
                "name": drill.name,
                "url": `https://skilldrills.online/drills/memory/${memoryCategories.find(c => c.drills.includes(drill))?.folderName}/${drill.folderName}`,
                "description": drill.description,
                "applicationCategory": "EducationalApplication",
                "operatingSystem": "Web"
              }
            }))
          })
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
            </li>
            <li>
              <Link href="/drills" className="hover:text-purple-600 transition-colors">
                Drills
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
            </li>
            <li>
              <span className="text-purple-600 font-medium" aria-current="page">Memory Training</span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Memory Training</h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">15 free drills across 5 memory types - no login required</p>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <section className="sr-only" aria-label="Memory training drills overview">
          <h2>Memory Training Categories & Drills</h2>
          <p>
            Access 15 free memory training drills across 5 categories. Short-Term Memory: Digit Span, Word Recall, and Color Sequence for immediate recall. Working Memory: 3-Back Training, Mental Arithmetic, and Sentence Span for mental manipulation. Long-Term Memory: Story Recall, Image Association, and Paired Associates for lasting retention. Spatial Memory: Grid Memorization, Path Tracing, and Object Location for visual-spatial skills. Associative Memory: Name-Face Memory, Concept Linking, and Sound Pattern for connecting related information. All drills are free with no login required.
          </p>
        </section>

        {/* Memory Type Tags */}
        <div className="flex flex-wrap gap-2 mb-8" aria-label="Memory training categories">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">🧠 Short-Term Memory</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">💭 Working Memory</span>
          <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">📚 Long-Term Memory</span>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">🗺️ Spatial Memory</span>
          <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-medium">🔗 Associative Memory</span>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Available Drills</p>
              <Target className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalDrills}</p>
            <p className="text-xs text-gray-500 mt-1">Ready to train</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Categories</p>
              <Brain className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{memoryCategories.length}</p>
            <p className="text-xs text-gray-500 mt-1">Memory types</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Free Access</p>
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">100%</p>
            <p className="text-xs text-gray-500 mt-1">No login required</p>
          </div>
        </div>

        {/* Drills Grid by Category */}
        {memoryCategories.map((category) => {
          const CategoryIcon = category.icon;
          
          return (
            <div key={category.name} className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${getCategoryGradient(category.name)}`} aria-hidden="true"></div>
                <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                <span className="text-xs text-gray-400">({category.drills.length} drills)</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.drills.map((drill, index) => {
                  const drillPath = `/drills/memory/${category.folderName}/${drill.folderName}`;
                  
                  return (
                    <Link
                      key={index}
                      href={drillPath}
                      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      aria-label={`${drill.name} - ${drill.description}. Difficulty: ${drill.difficulty}. Duration: ${drill.duration}.`}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-2 rounded-lg ${category.bgColor}`}>
                            <CategoryIcon className={`w-5 h-5 ${category.textColor}`} />
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(drill.difficulty)}`}>
                            {drill.difficulty}
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                          {drill.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4 leading-relaxed">{drill.description}</p>
                        
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{drill.duration}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-400">{category.name}</span>
                          <div className="flex items-center gap-1 text-purple-600 group-hover:gap-2 transition-all">
                            <span className="text-sm font-medium">Start Drill</span>
                            <Play className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mt-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Memory Training Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Practice Daily</h4>
              <p className="text-sm text-purple-100">Consistent short sessions are more effective than long, infrequent practice for memory improvement.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Use Association</h4>
              <p className="text-sm text-purple-100">Connect new information with existing knowledge to create stronger, more retrievable memory traces.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Sleep Well</h4>
              <p className="text-sm text-purple-100">Quality sleep is essential for memory consolidation. Review material before bed for better retention.</p>
            </div>
          </div>
        </div>

        {/* Explore Related Categories */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Explore Related Training Categories</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <Link href="/drills/cognitive" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition">Cognitive Training</h3>
              <p className="text-xs text-gray-500 mt-1">Attention, focus & problem solving</p>
            </Link>
            <Link href="/drills/visual" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              <div className="text-3xl mb-3">👁️</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">Visual Training</h3>
              <p className="text-xs text-gray-500 mt-1">Reaction speed & peripheral vision</p>
            </Link>
            <Link href="/drills/academic" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition">Academic Drills</h3>
              <p className="text-xs text-gray-500 mt-1">Reading, math, typing & comprehension</p>
            </Link>
            <Link href="/drills/fps" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              <div className="text-3xl mb-3">🎮</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition">FPS Training</h3>
              <p className="text-xs text-gray-500 mt-1">Aim trainer, reflex & tracking</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}