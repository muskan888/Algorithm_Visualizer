
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Cpu, Book, Play, Code, BarChart, Brain, 
  ArrowRight, GitFork, Share2, Zap, 
  ArrowDown, CheckCircle2, Sparkles, MousePointer,
  RefreshCw, Lightbulb, Clock, Trophy, PenTool, MoveUpRight,
  Rocket, Stars, PartyPopper, Medal, Star, Laptop, FlaskConical, Atom
} from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { 
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from '@/components/ui/hover-card';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const PastelBackgroundShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="blurred-circle w-96 h-96 top-0 left-0 bg-pastel-pink/40"></div>
      <div className="blurred-circle w-80 h-80 bottom-0 right-0 bg-pastel-mint/40"></div>
      <div className="blurred-circle w-72 h-72 top-1/3 right-1/4 bg-pastel-lavender/40"></div>
      <div className="blurred-circle w-64 h-64 bottom-1/3 left-1/4 bg-pastel-peach/40"></div>
      <div className="blurred-circle w-48 h-48 top-1/2 right-1/2 bg-pastel-sky/40"></div>
    </div>
  );
};

const ParticlesBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-60 pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full">
        {Array.from({ length: 80 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full animate-pulse-soft"
            style={{
              width: Math.random() * 12 + 4 + 'px',
              height: Math.random() * 12 + 4 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              background: `hsl(${Math.random() * 60 + 270}, 100%, 85%)`,
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 5 + 3 + 's',
              boxShadow: `0 0 15px hsl(${Math.random() * 60 + 270}, 100%, 85%, 0.9)`,
              filter: 'blur(1px)',
              transform: `scale(${Math.random() * 1 + 0.5})`,
            }}
          />
        ))}
        {Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={i + 'line'}
            className="absolute animate-pulse-soft opacity-60"
            style={{
              height: '1px',
              width: Math.random() * 200 + 80 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              transform: `rotate(${Math.random() * 360}deg)`,
              background: `linear-gradient(90deg, transparent, hsl(${Math.random() * 60 + 270}, 100%, 80%), transparent)`,
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 5 + 3 + 's',
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

const AnimatedCodeSnippet = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const codeLines = [
    'function binarySearch(arr, target) {',
    '  let left = 0;',
    '  let right = arr.length - 1;',
    '  while (left <= right) {',
    '    const mid = Math.floor((left + right) / 2);',
    '    if (arr[mid] === target) return mid;',
    '    if (arr[mid] < target) left = mid + 1;',
    '    else right = mid - 1;',
    '  }',
    '  return -1;',
    '}'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % codeLines.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getLineColor = (index) => {
    const colors = ['text-pink-400', 'text-purple-400', 'text-blue-400', 'text-cyan-400', 'text-green-400', 'text-yellow-400', 'text-orange-400', 'text-red-400'];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white/30 backdrop-blur-md rounded-xl p-4 text-left text-sm font-mono shadow-xl overflow-hidden border-2 border-pink-200 relative transition-all duration-300 hover:scale-105 transform hover:shadow-[0_0_15px_rgba(255,192,203,0.5)] card-3d-effect">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pastel-pink via-pastel-lavender to-pastel-sky"></div>
      {codeLines.map((line, i) => (
        <div 
          key={i} 
          className={`transition-colors duration-300 py-1 ${getLineColor(i)} ${i === currentLine ? 'bg-gradient-to-r from-pastel-pink/30 via-pastel-lavender/30 to-pastel-sky/30 text-gray-800 font-bold translate-x-2' : ''}`}
          style={{ transition: 'all 0.3s ease' }}
        >
          {line}
        </div>
      ))}
    </div>
  );
};

const SimpleVisualization = () => {
  const [bars, setBars] = useState([
    { height: 60, color: 'bg-pastel-pink', active: false },
    { height: 90, color: 'bg-pastel-lavender', active: false },
    { height: 40, color: 'bg-pastel-sky', active: false },
    { height: 75, color: 'bg-pastel-mint', active: false },
    { height: 55, color: 'bg-pastel-peach', active: false },
    { height: 85, color: 'bg-pastel-yellow', active: false },
    { height: 30, color: 'bg-pastel-coral', active: false },
  ]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setBars(prev => 
        prev.map((bar, i) => ({
          ...bar,
          active: i === currentIndex
        }))
      );
      currentIndex = (currentIndex + 1) % bars.length;
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-xl border border-pink-200 flex items-end justify-center h-56 gap-3 transition-all duration-300 hover:scale-105 transform hover:shadow-[0_0_15px_rgba(255,192,203,0.5)] card-3d-effect">
      {bars.map((bar, i) => (
        <div 
          key={i} 
          className={`w-8 rounded-t-md transition-all duration-300 ${bar.color} ${bar.active ? 'shadow-lg shadow-pink-300/50 scale-y-110' : ''}`}
          style={{ 
            height: `${bar.height}%`,
            transform: bar.active ? 'scaleY(1.1)' : 'scaleY(1)',
            boxShadow: bar.active ? '0 0 10px rgba(255, 192, 203, 0.7)' : 'none'
          }}
        ></div>
      ))}
    </div>
  );
};

const FeatureCard = ({ icon, title, description, iconColor, delay }) => {
  return (
    <div 
      className="feature-card card-3d-effect group"
      style={{ 
        animationDelay: `${delay}ms`,
        animation: 'scale-in 0.5s ease-out forwards'
      }}
    >
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-transparent to-white/5 rounded-full transition-transform duration-500 group-hover:scale-150"></div>
      
      <div className={`w-16 h-16 ${iconColor} rounded-xl flex items-center justify-center mb-6 shadow-lg transition-all duration-300 group-hover:scale-110`}>
        <div className="transform transition-transform duration-500 group-hover:rotate-12 text-gray-700">
          {icon}
        </div>
      </div>
      
      <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">{title}</h3>
      
      <p className="text-gray-700 transition-colors duration-300 group-hover:text-gray-800">
        {description}
      </p>
      
      <div className="absolute bottom-3 right-3 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        <MoveUpRight className="text-pink-400 w-5 h-5" />
      </div>
    </div>
  );
};

const AlgorithmPatternCard = ({ icon, title, description, delay, colorClass }) => {
  const cardClasses = [
    "bg-pastel-pink/50",
    "bg-pastel-lavender/50",
    "bg-pastel-sky/50",
    "bg-pastel-mint/50",
    "bg-pastel-peach/50",
    "bg-pastel-yellow/50",
  ];
  
  const hoverClasses = [
    "hover:bg-pastel-pink/60",
    "hover:bg-pastel-lavender/60",
    "hover:bg-pastel-sky/60",
    "hover:bg-pastel-mint/60", 
    "hover:bg-pastel-peach/60",
    "hover:bg-pastel-yellow/60",
  ];

  return (
    <div 
      className={`glassmorphism p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/40 transform hover:-translate-y-2 ${cardClasses[colorClass % cardClasses.length]} ${hoverClasses[colorClass % hoverClasses.length]} card-3d-effect`}
      style={{ 
        animationDelay: `${delay}ms`,
        animation: 'float 5s infinite ease-in-out',
        transform: 'translateY(0px)'
      }}
    >
      <div className="w-14 h-14 bg-white/70 rounded-xl flex items-center justify-center mb-4 shadow-md text-gray-700">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-700">
        {description}
      </p>
    </div>
  );
};

const ComparisonTable = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 mb-16 overflow-hidden rounded-xl backdrop-blur-md bg-white/30 border border-pink-200/70 shadow-lg">
      <div className="grid grid-cols-3 text-left">
        <div className="p-5 bg-pastel-lavender/40 border-b border-white/30">
          <h3 className="text-lg font-bold text-gray-800">Feature</h3>
        </div>
        <div className="p-5 bg-pastel-pink/40 border-b border-white/30">
          <h3 className="text-lg font-bold text-gray-800">Without AlgoLab</h3>
        </div>
        <div className="p-5 bg-pastel-mint/40 border-b border-white/30">
          <h3 className="text-lg font-bold text-gray-800">With AlgoLab</h3>
        </div>
        
        <div className="p-5 border-b border-pink-200/30 bg-white/20">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-700" />
            <span className="font-medium text-gray-800">Learning Speed</span>
          </div>
        </div>
        <div className="p-5 border-b border-pink-200/30 bg-white/10">
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Slow, text-heavy learning with minimal visual aids</span>
          </div>
        </div>
        <div className="p-5 border-b border-pink-200/30 bg-white/20">
          <div className="flex items-center gap-2 text-gray-700">
            <span>2-3x faster with interactive visualizations and step-by-step guides</span>
          </div>
        </div>
        
        <div className="p-5 border-b border-pink-200/30 bg-white/20">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-gray-700" />
            <span className="font-medium text-gray-800">Comprehension</span>
          </div>
        </div>
        <div className="p-5 border-b border-pink-200/30 bg-white/10">
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Surface-level understanding with frequent confusion</span>
          </div>
        </div>
        <div className="p-5 border-b border-pink-200/30 bg-white/20">
          <div className="flex items-center gap-2 text-gray-700">
            <span>Deep intuition through visual pattern recognition</span>
          </div>
        </div>
        
        <div className="p-5 border-b border-pink-200/30 bg-white/20">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-gray-700" />
            <span className="font-medium text-gray-800">Interview Readiness</span>
          </div>
        </div>
        <div className="p-5 border-b border-pink-200/30 bg-white/10">
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Memorization without understanding the "why"</span>
          </div>
        </div>
        <div className="p-5 border-b border-pink-200/30 bg-white/20">
          <div className="flex items-center gap-2 text-gray-700">
            <span>Pattern recognition skills for solving novel problems</span>
          </div>
        </div>
        
        <div className="p-5 bg-white/20">
          <div className="flex items-center gap-2">
            <PenTool className="h-5 w-5 text-gray-700" />
            <span className="font-medium text-gray-800">Learning Experience</span>
          </div>
        </div>
        <div className="p-5 bg-white/10">
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Tedious and frustrating</span>
          </div>
        </div>
        <div className="p-5 bg-white/20">
          <div className="flex items-center gap-2 text-gray-700">
            <span>Engaging, interactive, and enjoyable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Landing = () => {
  const [isVisible, setIsVisible] = useState({
    features: false,
    patterns: false,
    cta: false,
    comparison: false
  });
  
  const heroRef = useRef(null);
  const visualizerSectionRef = useRef(null);
  
  const [offset, setOffset] = useState(0);
  
  const handleScroll = () => {
    setOffset(window.pageYOffset);
    
    const scrollPosition = window.scrollY + window.innerHeight;
    
    const featuresSection = document.getElementById('features-section');
    const patternsSection = document.getElementById('patterns-section');
    const comparisonSection = document.getElementById('comparison-section');
    const ctaSection = document.getElementById('cta-section');
    
    if (featuresSection && scrollPosition > featuresSection.offsetTop + 100) {
      setIsVisible(prev => ({ ...prev, features: true }));
    }
    
    if (patternsSection && scrollPosition > patternsSection.offsetTop + 100) {
      setIsVisible(prev => ({ ...prev, patterns: true }));
    }
    
    if (comparisonSection && scrollPosition > comparisonSection.offsetTop + 100) {
      setIsVisible(prev => ({ ...prev, comparison: true }));
    }
    
    if (ctaSection && scrollPosition > ctaSection.offsetTop + 100) {
      setIsVisible(prev => ({ ...prev, cta: true }));
    }
  };
  
  const scrollToVisualizer = () => {
    visualizerSectionRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <PastelBackgroundShapes />
      <ParticlesBackground />
      
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-50"
        style={{ transform: `translateY(${offset * 0.2}px)` }}
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-pastel-pink to-pastel-lavender blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full bg-gradient-to-r from-pastel-sky to-pastel-mint blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 rounded-full bg-gradient-to-r from-pastel-peach to-pastel-yellow blur-3xl"></div>
      </div>
      
      <header className="container mx-auto px-4 py-6 relative z-10">
        <NavigationMenu className="max-w-full w-full justify-between">
          <NavigationMenuList>
            <NavigationMenuItem className="font-bold text-2xl text-gray-800 flex items-center">
              <Atom className="mr-2 h-6 w-6 text-gray-800" />
              <span className="shimmer">AlgoLab</span>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuList className="space-x-2">
            <NavigationMenuItem>
              <Link to="/visualizer" className="px-4 py-2 rounded-md hover:bg-pastel-pink/20 transition-colors flex items-center group text-gray-800">
                <Zap className="w-4 h-4 mr-1 text-gray-700 transition-transform duration-300 group-hover:rotate-12" />
                <span>Visualizer</span>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/learn" className="px-4 py-2 rounded-md hover:bg-pastel-lavender/20 transition-colors flex items-center group text-gray-800">
                <Book className="w-4 h-4 mr-1 text-gray-700 transition-transform duration-300 group-hover:scale-110" />
                <span>Learn</span>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      <div ref={heroRef} className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6 animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-pastel-lavender via-pastel-pink to-white rounded-2xl flex items-center justify-center shadow-lg animate-float glow">
              <Cpu className="text-gray-800" size={40} />
            </div>
          </div>
          <Badge className="mb-2 px-4 py-1 bg-gradient-to-r from-pastel-lavender to-pastel-pink hover:from-pastel-lavender/90 hover:to-pastel-pink/90 text-gray-800">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Interactive Algorithm Visualizer
          </Badge>
          <h1 className="text-7xl font-bold text-gray-800 mb-4 leading-tight">
            Master DSA. Visually.
          </h1>
          <p className="text-2xl text-gray-700 max-w-2xl mx-auto">
            Master data structures and algorithms through interactive visualizations and pattern-based learning
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
            <Link to="/visualizer">
              <button className="pastel-btn-primary flex items-center justify-center">
                <Play className="mr-2 h-5 w-5" />
                Start Visualizing
              </button>
            </Link>
            <Link to="/learn">
              <button className="pastel-btn-secondary flex items-center justify-center">
                <Book className="mr-2 h-5 w-5 text-gray-700" />
                Learn Patterns
              </button>
            </Link>
          </div>
          
          <div className="pt-20 flex justify-center">
            <button onClick={scrollToVisualizer} className="text-gray-700 hover:text-gray-900 transition-colors animate-bounce">
              <ArrowDown className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
      
      <div ref={visualizerSectionRef} className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <Badge className="mb-4 px-4 py-1 bg-gradient-to-r from-pastel-sky to-pastel-mint hover:from-pastel-sky/90 hover:to-pastel-mint/90 text-gray-800">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Interactive Preview
          </Badge>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Watch Algorithms in Action</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Experience algorithm execution like never before with our visual step-by-step approach
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <SimpleVisualization />
          </div>
          <div className="space-y-8 order-1 md:order-2">
            <h3 className="text-3xl font-bold text-gray-800">
              See How It Works
            </h3>
            <p className="text-xl text-gray-700">
              Experience our interactive algorithm visualizer that lets you see complex algorithms in action, step by step.
            </p>
            <ul className="space-y-4">
              {[
                "Real-time visualization of algorithm execution",
                "Step through code line-by-line",
                "Adjust speed and input parameters",
                "Compare different algorithms side by side"
              ].map((item, index) => (
                <li key={index} className="flex items-start bg-white/40 p-3 rounded-lg border border-pastel-pink/30">
                  <CheckCircle2 className="h-6 w-6 text-gray-700 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <Link to="/visualizer">
                <button className="pastel-btn-primary flex items-center group">
                  Try Full Visualizer <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 order-2 lg:order-1">
          <AnimatedCodeSnippet />
        </div>
        <div className="lg:w-1/2 space-y-8 order-1 lg:order-2">
          <Badge className="mb-2 px-4 py-1 bg-gradient-to-r from-pastel-lavender to-pastel-pink hover:from-pastel-lavender/90 hover:to-pastel-pink/90 text-gray-800">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Interactive Learning
          </Badge>
          <h2 className="text-4xl font-bold text-gray-800">
            Visualize Your Algorithms in Action
          </h2>
          <p className="text-xl text-gray-700">
            Watch your code execute step by step with intuitive visualizations that make complex algorithms crystal clear.
          </p>
          <ul className="space-y-4">
            {[
              "See each step of the algorithm in real-time",
              "Understand time and space complexity visually",
              "Debug and optimize algorithms with ease",
              "Learn by seeing, not just reading"
            ].map((item, index) => (
                <li key={index} className="flex items-start bg-white/40 p-3 rounded-lg border border-pastel-lavender/30">
                <CheckCircle2 className="h-6 w-6 text-gray-700 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div id="comparison-section" className="container mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <Badge className="mb-4 px-4 py-1 bg-gradient-to-r from-pastel-sky to-pastel-lavender hover:from-pastel-sky/90 hover:to-pastel-lavender/90 text-gray-800">
            <Trophy className="mr-1.5 h-3.5 w-3.5" /> Why Choose AlgoLab
          </Badge>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            The AlgoLab Difference
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            See how our approach transforms the way you learn algorithms
          </p>
        </div>
        
        <div className={`transition-all duration-1000 transform ${isVisible.comparison ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <ComparisonTable />
        </div>
      </div>

      <div id="patterns-section" className="container mx-auto px-4 py-24">
        <div className="text-center mb-14">
          <Badge className="mb-4 px-4 py-1 bg-gradient-to-r from-pastel-mint to-pastel-sky hover:from-pastel-mint/90 hover:to-pastel-sky/90 text-gray-800">
            <Brain className="mr-1.5 h-3.5 w-3.5" /> Algorithm Patterns
          </Badge>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Master the Key Algorithm Patterns
          </h2>
          <p className="text-xl text-gray-700 mt-2 max-w-2xl mx-auto">
            Learn the fundamental patterns that solve 90% of coding interview problems
          </p>
        </div>
        
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-1000 ${isVisible.patterns ? 'opacity-100' : 'opacity-0'}`}>
          {[
            {
              icon: <GitFork className="h-6 w-6" />,
              title: "Divide & Conquer",
              description: "Breaking problems into smaller, manageable sub-problems that are solved independently."
            },
            {
              icon: <Share2 className="h-6 w-6" />,
              title: "Two Pointers",
              description: "Efficient technique for problems involving sorted arrays or searching for pairs."
            },
            {
              icon: <Brain className="h-6 w-6" />,
              title: "Dynamic Programming",
              description: "Optimize recursive algorithms by storing results of subproblems to avoid recomputation."
            },
            {
              icon: <BarChart className="h-6 w-6" />,
              title: "Sliding Window",
              description: "Find subarrays or substrings that satisfy given conditions with optimized time complexity."
            },
            {
              icon: <Code className="h-6 w-6" />,
              title: "Graph Algorithms",
              description: "Master traversal techniques like BFS, DFS and algorithms for shortest paths and connectivity."
            },
            {
              icon: <Rocket className="h-6 w-6" />,
              title: "Greedy Algorithms",
              description: "Make optimal local choices at each step with the hope of finding a global optimum."
            }
          ].map((item, index) => (
            <AlgorithmPatternCard 
              key={index} 
              icon={item.icon} 
              title={item.title} 
              description={item.description} 
              delay={index * 100}
              colorClass={index}
            />
          ))}
        </div>
      </div>

      <div id="features-section" className="container mx-auto px-4 py-20 relative">
        <div className="text-center mb-16">
          <Badge className="mb-4 px-4 py-1 bg-gradient-to-r from-pastel-lavender to-pastel-peach hover:from-pastel-lavender/90 hover:to-pastel-peach/90 text-gray-800">
            <Stars className="mr-1.5 h-3.5 w-3.5" /> Our Approach
          </Badge>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">How AlgoLab Works</h2>
          <p className="text-xl text-gray-700 mt-2 max-w-2xl mx-auto">
            Three pillars to master algorithms effectively
          </p>
        </div>
        
        <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[{
            icon: <Laptop size={32} />,
            title: "Algorithm Visualizer",
            description: "See algorithms in action with step-by-step visualizations that help you understand how they work in real-time.",
            gradient: "bg-pastel-pink/60",
            delay: 0
          }, {
            icon: <FlaskConical size={32} />,
            title: "Pattern-Based Learning",
            description: "Learn the 15 essential algorithm patterns that will help you solve 90% of coding interview problems.",
            gradient: "bg-pastel-lavender/60",
            delay: 200
          }, {
            icon: <Code size={32} />,
            title: "Interactive Code",
            description: "Follow along with code implementations as they execute, with highlighted lines showing each step of the algorithm.",
            gradient: "bg-pastel-sky/60",
            delay: 400
          }].map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconColor={feature.gradient}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>

      <div id="cta-section" className="container mx-auto px-4 py-20">
        <div className={`relative overflow-hidden rounded-2xl p-12 text-center shadow-xl transition-all duration-1000 ${isVisible.cta ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          style={{
            background: 'linear-gradient(135deg, rgba(246,219,245,0.9) 0%, rgba(234,172,232,0.9) 50%, rgba(249,255,182,0.9) 100%)'
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={i}
                className="absolute bg-white rounded-full opacity-30"
                style={{
                  width: Math.random() * 12 + 5 + 'px',
                  height: Math.random() * 12 + 5 + 'px',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                }}
              />
            ))}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30"></div>
          </div>
          <div className="relative z-10">
            <PartyPopper className="h-14 w-14 mx-auto mb-6 text-gray-800" />
            <h2 className="text-5xl font-bold mb-6 text-gray-800">Ready to master algorithms?</h2>
            <p className="text-2xl mb-10 max-w-2xl mx-auto text-gray-700">
              Start your journey to algorithmic thinking today and transform your problem-solving abilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link to="/visualizer">
                <button className="pastel-btn-primary text-lg px-8 py-4">
                  Try Algorithm Visualizer
                </button>
              </Link>
              <Link to="/learn">
                <button className="pastel-btn-secondary text-lg px-8 py-4 flex items-center">
                  Explore DSA Patterns <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
            <div className="mt-8 flex justify-center gap-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <p className="text-gray-700 mt-2">Join thousands of developers who improved their algorithm skills</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <Alert className="bg-gradient-to-r from-pastel-lavender/30 to-pastel-pink/30 border-pastel-pink/20">
          <Medal className="h-5 w-5 text-gray-700" />
          <AlertTitle className="text-gray-800 flex items-center">
            <Play className="mr-2" size={18} />
            Improved Visualizations
          </AlertTitle>
          <AlertDescription className="text-gray-700">
            We've enhanced algorithm visualizations for all pattern types! Try them out in the Learn section.
          </AlertDescription>
        </Alert>
      </div>

      <div className="container mx-auto px-4 py-6 border-t border-pastel-pink/20">
        <p className="text-center text-gray-700">
          Made with ❤️ by Muskan Dhingra
        </p>
      </div>
    </div>
  );
};

export default Landing;
