'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Clock, Star, Play, Heart, Target, 
  Brain, Wind, Shield, Home, ChevronRight
} from 'lucide-react';

export default function MentalFitnessClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Categories with exact folder names from tree structure
  const categories = [
    { 
      name: 'Breathing Exercises', 
      folderName: 'breathing-exercises',
      icon: Wind,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      description: 'Master evidence-based breathing techniques for relaxation, energy, and vagal tone',
      drills: [
        { name: '4-7-8 Vagal Brake', folderName: '4-7-8', difficulty: 'Easy', duration: 'Untimed', description: 'Inhale 4s, hold 7s, exhale 8s to activate vagus nerve for deep relaxation' },
        { name: 'Box Breathing', folderName: 'box-breathing', difficulty: 'Easy', duration: 'Untimed', description: '4-4-4-4 tactical square breathing used by Navy SEALs for focus and calm' },
        { name: 'Wim Hof Method', folderName: 'wim-hof', difficulty: 'Medium', duration: '30 Breaths', description: '30 rapid power breaths for oxygenation, energy, and immune system activation' }
      ]
    },
    { 
      name: 'Stress Control', 
      folderName: 'stress-control',
      icon: Shield,
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      description: 'Build cognitive resilience and maintain coherence under pressure and distraction',
      drills: [
        { name: 'Coherence Breathing', folderName: 'biofeedback', difficulty: 'Medium', duration: '5 min', description: '5:6 resonance frequency breathing to optimize heart rate variability and vagal tone' },
        { name: 'Calm Under Pressure', folderName: 'calm-under-pressure', difficulty: 'Hard', duration: '3 min', description: 'Dual-task training: maintain breathing while random numbers flash as cognitive distraction' },
        { name: 'Stress Inoculation', folderName: 'stress-inoculation', difficulty: 'Hard', duration: '5 min', description: 'Controlled stress exposure with red visual strobe and audio induction to build resilience' }
      ]
    }
  ];

  // Helper function to get difficulty color
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
      case 'Stress Control': return 'from-red-500 to-orange-600';
      case 'Breathing Exercises': return 'from-blue-500 to-cyan-600';
      default: return 'from-pink-500 to-rose-600';
    }
  };

  // Calculate total drills
  const totalDrills = categories.reduce((acc, cat) => acc + cat.drills.length, 0);

  // Build schema items with proper position tracking
  const buildSchemaItems = () => {
    let position = 1;
    const items = [];
    
    categories.forEach(cat => {
      cat.drills.forEach(drill => {
        items.push({
          "@type": "ListItem",
          "position": position,
          "item": {
            "@type": "WebApplication",
            "name": drill.name,
            "url": `https://skilldrills.online/drills/mental-fitness/${cat.folderName}/${drill.folderName}`,
            "description": drill.description,
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Web"
          }
        });
        position++;
      });
    });
    
    return items;
  };

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading mental fitness drills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Mental Fitness Drills - Breathing Exercises & Stress Control Training",
            "url": "https://skilldrills.online/drills/mental-fitness",
            "description": "6 free mental fitness drills covering breathing exercises and stress control. Practice 4-7-8 breathing, box breathing, Wim Hof method, coherence biofeedback, stress inoculation, and calm under pressure training.",
            "isPartOf": {
              "@type": "WebSite",
              "name": "SkillDrills",
              "url": "https://skilldrills.online"
            },
            "about": {
              "@type": "Thing",
              "name": "Mental Fitness Training"
            },
            "numberOfItems": totalDrills,
            "itemListElement": buildSchemaItems()
          })
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="flex items-center gap-1 hover:text-pink-600 transition-colors">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
            </li>
            <li>
              <Link href="/drills" className="hover:text-pink-600 transition-colors">
                Drills
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
            </li>
            <li>
              <span className="text-pink-600 font-medium" aria-current="page">Mental Fitness</span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Mental Fitness Drills</h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">Train your breathing techniques and stress control with {totalDrills} free drills</p>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <section className="sr-only" aria-label="Mental fitness drills overview">
          <h2>Mental Fitness Training Drills Overview</h2>
          <p>
            Access {totalDrills} free mental fitness drills across {categories.length} categories.
            Breathing Exercises: 4-7-8 Vagal Brake for deep relaxation, Box Breathing (4-4-4-4 tactical technique),
            and Wim Hof Method power breathing with 30 rapid cycles.
            Stress Control: Coherence Breathing with 5:6 ratio for HRV optimization,
            Calm Under Pressure dual-task training with cognitive distractions,
            and Stress Inoculation with controlled red strobe exposure.
            All drills are free with no login required. Best scores saved locally.
          </p>
        </section>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">💨 Breathing Exercises</span>
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">🛡️ Stress Control</span>
          <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">🧘 Relaxation</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">😌 Mindfulness</span>
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
              <Heart className="w-4 h-4 text-pink-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            <p className="text-xs text-gray-500 mt-1">Wellness areas</p>
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
        {categories.map((category) => {
          const CategoryIcon = category.icon;
          
          return (
            <div key={category.name} className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${getCategoryGradient(category.name)}`}></div>
                <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                <span className="text-xs text-gray-400">({category.drills.length} drills)</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.drills.map((drill, index) => {
                  const drillPath = `/drills/mental-fitness/${category.folderName}/${drill.folderName}`;
                  
                  return (
                    <Link
                      key={index}
                      href={drillPath}
                      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
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
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
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
                          <div className="flex items-center gap-1 text-pink-600 group-hover:gap-2 transition-all">
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
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-8 mt-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6" />
            Mental Fitness Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Consistency Matters</h4>
              <p className="text-sm text-pink-100">Even 5 minutes of daily breathing practice can significantly improve your mental resilience and vagal tone.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Start Small</h4>
              <p className="text-sm text-pink-100">Begin with easier drills like 4-7-8 breathing and gradually progress to stress inoculation as you build mental fitness.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Breathe Deeply</h4>
              <p className="text-sm text-pink-100">Focus on slow, controlled exhales to activate your parasympathetic nervous system and reduce stress response.</p>
            </div>
          </div>
        </div>

        {/* Explore Related Categories */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Explore Related Categories</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <Link href="/drills/cognitive" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Cognitive Training</h3>
              <p className="text-xs text-gray-500 mt-1">Memory, focus & attention drills</p>
            </Link>
            <Link href="/drills/productivity" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
              <div className="text-3xl mb-3">⏱️</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">Productivity</h3>
              <p className="text-xs text-gray-500 mt-1">Focus endurance & time management</p>
            </Link>
            <Link href="/drills/physical" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              <div className="text-3xl mb-3">💪</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">Physical Training</h3>
              <p className="text-xs text-gray-500 mt-1">Balance, coordination & reflex drills</p>
            </Link>
            <Link href="/drills/memory" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <div className="text-3xl mb-3">💾</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">Memory Drills</h3>
              <p className="text-xs text-gray-500 mt-1">Working memory & spatial recall</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}