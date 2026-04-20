'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Clock, Zap, Star, Play, BookOpen, Target, 
  TrendingUp, Award, BarChart3, Brain, Eye, PenTool, 
  FileText, Calculator, Type, Headphones
} from 'lucide-react';

export default function AcademicDrillsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    
    if (session?.user?.id) {
      fetchStats();
    }
    setLoading(false);
  }, [status, session]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/user/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading academic drills...</p>
        </div>
      </div>
    );
  }

  // Categories with exact folder names from your tree structure
  const categories = [
    {
      name: 'Math Speed',
      slug: 'math-speed',
      folderName: 'math-speed',
      icon: Calculator,
      description: 'Test and improve your mental arithmetic speed',
      color: 'from-red-500 to-orange-500',
      bg: 'bg-red-50',
      textColor: 'text-red-600',
      drillCount: 4,
      subcategories: ['Arithmetic Race', 'Math Reaction', 'Multiplication Tables', 'Mental Math']
    },
    {
      name: 'Reading Speed',
      slug: 'reading-speed',
      folderName: 'reading-speed',
      icon: Eye,
      description: 'Increase your words-per-minute reading rate',
      color: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-50',
      textColor: 'text-blue-600',
      drillCount: 3,
      subcategories: ['Speed Reader', 'RSVP Reader', 'Peripheral Reader']
    },
    {
      name: 'Writing Speed',
      slug: 'writing-speed',
      folderName: 'writing-speed',
      icon: PenTool,
      description: 'Improve typing speed and accuracy',
      color: 'from-green-500 to-emerald-500',
      bg: 'bg-green-50',
      textColor: 'text-green-600',
      drillCount: 3,
      subcategories: ['Typing Test', 'Transcription', 'Code Typing']
    },
    {
      name: 'Comprehension',
      slug: 'comprehension',
      folderName: 'comprehension',
      icon: Brain,
      description: 'Enhance reading and listening comprehension',
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-50',
      textColor: 'text-purple-600',
      drillCount: 3,
      subcategories: ['Reading Comprehension', 'Listening Comprehension', 'Inference Drill']
    }
  ];

  // All drills with exact folder names matching your structure
  const drills = [
    // Math Speed Drills (4 drills including Math-Reaction)
    { 
      id: 1, 
      name: 'Arithmetic Race', 
      folderName: 'arithmetic-race',
      category: 'Math Speed', 
      difficulty: 'Medium', 
      duration: '2 min', 
      points: 100, 
      description: 'Solve arithmetic problems as quickly as possible',
      icon: Calculator
    },
    { 
      id: 2, 
      name: 'Math Reaction', 
      folderName: 'Math-Reaction',
      category: 'Math Speed', 
      difficulty: 'Hard', 
      duration: '2 min', 
      points: 130, 
      description: 'React quickly to math problems under time pressure',
      icon: Zap
    },
    { 
      id: 3, 
      name: 'Multiplication Tables', 
      folderName: 'multiplication-tables',
      category: 'Math Speed', 
      difficulty: 'Easy', 
      duration: '2 min', 
      points: 80, 
      description: 'Test your multiplication table recall speed',
      icon: Calculator
    },
    { 
      id: 4, 
      name: 'Mental Math', 
      folderName: 'mental-math',
      category: 'Math Speed', 
      difficulty: 'Hard', 
      duration: '3 min', 
      points: 150, 
      description: 'Calculate complex problems without writing',
      icon: Brain
    },
    
    // Reading Speed Drills
    { 
      id: 5, 
      name: 'Speed Reader', 
      folderName: 'speed-reader',
      category: 'Reading Speed', 
      difficulty: 'Medium', 
      duration: '5 min', 
      points: 120, 
      description: 'Practice reading at increasing speeds',
      icon: Eye
    },
    { 
      id: 6, 
      name: 'RSVP Reader', 
      folderName: 'rsvp-reader',
      category: 'Reading Speed', 
      difficulty: 'Medium', 
      duration: '4 min', 
      points: 110, 
      description: 'Rapid Serial Visual Presentation reading technique',
      icon: FileText
    },
    { 
      id: 7, 
      name: 'Peripheral Reader', 
      folderName: 'peripheral-reader',
      category: 'Reading Speed', 
      difficulty: 'Hard', 
      duration: '5 min', 
      points: 140, 
      description: 'Use peripheral vision to read faster',
      icon: Eye
    },
    
    // Writing Speed Drills
    { 
      id: 8, 
      name: 'Typing Test', 
      folderName: 'typing-test',
      category: 'Writing Speed', 
      difficulty: 'Medium', 
      duration: '3 min', 
      points: 120, 
      description: 'Test your typing speed and accuracy',
      icon: Type
    },
    { 
      id: 9, 
      name: 'Transcription', 
      folderName: 'transcription',
      category: 'Writing Speed', 
      difficulty: 'Medium', 
      duration: '4 min', 
      points: 130, 
      description: 'Copy text accurately and quickly',
      icon: PenTool
    },
    { 
      id: 10, 
      name: 'Code Typing', 
      folderName: 'code-typing',
      category: 'Writing Speed', 
      difficulty: 'Hard', 
      duration: '5 min', 
      points: 160, 
      description: 'Type code with special characters accurately',
      icon: FileText
    },
    
    // Comprehension Drills
    { 
      id: 11, 
      name: 'Reading Comprehension', 
      folderName: 'reading-comprehension',
      category: 'Comprehension', 
      difficulty: 'Medium', 
      duration: '5 min', 
      points: 150, 
      description: 'Read passages and answer questions correctly',
      icon: BookOpen
    },
    { 
      id: 12, 
      name: 'Listening Comprehension', 
      folderName: 'listening-comprehension',
      category: 'Comprehension', 
      difficulty: 'Medium', 
      duration: '4 min', 
      points: 130, 
      description: 'Listen and recall important information',
      icon: Headphones
    },
    { 
      id: 13, 
      name: 'Inference Drill', 
      folderName: 'inference-drill',
      category: 'Comprehension', 
      difficulty: 'Hard', 
      duration: '5 min', 
      points: 170, 
      description: 'Draw logical conclusions from given information',
      icon: Brain
    }
  ];

  const hasData = stats?.totalSessions > 0;

  // Helper function to get difficulty style
  const getDifficultyStyle = (difficulty) => {
    const styles = {
      Easy: { bg: 'bg-green-50', text: 'text-green-600' },
      Medium: { bg: 'bg-yellow-50', text: 'text-yellow-600' },
      Hard: { bg: 'bg-orange-50', text: 'text-orange-600' },
      Expert: { bg: 'bg-red-50', text: 'text-red-600' }
    };
    return styles[difficulty] || styles.Medium;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/drills" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Drills
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Academic Drills</h1>
              <p className="text-gray-500 mt-1">Train your math, reading, writing, and comprehension skills</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Drills Completed</p>
              <Target className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats?.totalSessions || 0}</p>
            <p className="text-xs text-gray-500 mt-1">Total academic drills</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Average Score</p>
              <BarChart3 className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{hasData ? `${stats?.averageScore || 0}%` : '—'}</p>
            <p className="text-xs text-gray-500 mt-1">Across all drills</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Best Streak</p>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats?.streak || 0}</p>
            <p className="text-xs text-gray-500 mt-1">Days in a row</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Total XP</p>
              <Award className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats?.xp || 0}</p>
            <p className="text-xs text-gray-500 mt-1">From academic drills</p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {categories.map((category) => {
            const CategoryIcon = category.icon;
            const categoryDrills = drills.filter(d => d.category === category.name);
            
            return (
              <Link
                key={category.slug}
                href={`/drills/academic/${category.folderName}`}
                className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <CategoryIcon className="w-10 h-10 mb-2 opacity-90" />
                      <h3 className="text-xl font-bold">{category.name}</h3>
                      <p className="text-white/80 text-sm mt-1">{category.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{categoryDrills.length}</div>
                      <div className="text-sm text-white/70">Drills</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub, idx) => (
                        <span key={idx} className="text-xs text-gray-500">• {sub}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-blue-600 group-hover:gap-2 transition-all">
                      <span className="text-sm font-medium">Browse</span>
                      <Play className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Drill Cards by Category */}
        {categories.map((category) => {
          const CategoryIcon = category.icon;
          const categoryDrills = drills.filter(d => d.category === category.name);
          
          return (
            <div key={category.slug} className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${category.color}`}></div>
                  <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                  <span className="text-xs text-gray-400">({categoryDrills.length} drills)</span>
                </div>
                <Link 
                  href={`/drills/academic/${category.folderName}`}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  View All
                  <ArrowLeft className="w-3 h-3 rotate-180" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {categoryDrills.map((drill) => {
                  const difficultyStyle = getDifficultyStyle(drill.difficulty);
                  const drillPath = `/drills/academic/${category.folderName}/${drill.folderName}`;
                  
                  return (
                    <Link
                      key={drill.id}
                      href={drillPath}
                      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                    >
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className={`p-2 rounded-lg ${category.bg}`}>
                            <CategoryIcon className={`w-5 h-5 ${category.textColor}`} />
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyStyle.bg} ${difficultyStyle.text}`}>
                            {drill.difficulty}
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                          {drill.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{drill.description}</p>
                        
                        <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{drill.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            <span>{drill.points} XP</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-400">{drill.category}</span>
                          <div className="flex items-center gap-1 text-blue-600 group-hover:gap-2 transition-all">
                            <span className="text-sm font-medium">Start</span>
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
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Award className="w-6 h-6" />
            Academic Training Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Practice Daily</h4>
              <p className="text-sm text-yellow-100">Consistent short practice sessions are more effective than long, infrequent ones.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Track Your Speed</h4>
              <p className="text-sm text-yellow-100">Monitor your words-per-minute and accuracy to see improvement over time.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Challenge Yourself</h4>
              <p className="text-sm text-yellow-100">Gradually increase difficulty levels to continuously improve your skills.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}