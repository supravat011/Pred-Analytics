import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Brain, Database, LineChart, Cpu, BookOpen } from 'lucide-react';
import { PageRoute } from '../types';
import { APP_TITLE, APP_SUBTITLE } from '../constants';

const Landing: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-white overflow-hidden relative selection:bg-orange-500/30">

      {/* Global Background Elements */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0"></div>
      <div className="bg-noise"></div>

      {/* Spotlight Effect */}
      <div className="fixed top-[-20%] left-[20%] w-[60%] h-[60%] bg-orange-500/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 pt-40 pb-20 px-6">
        <div className="mx-auto max-w-5xl text-center">

          <div className="mb-8 flex justify-center animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              AI-Powered Education
            </span>
          </div>

          <h1 className="animate-fade-in-up text-5xl sm:text-7xl font-bold tracking-tighter text-white mb-6 uppercase" style={{ animationDelay: '0.1s' }}>
            Predictive <span className="text-zinc-600">Analytics.</span>
          </h1>

          <p className="animate-fade-in-up mt-6 text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed border-l-2 border-orange-500 pl-6 text-left md:text-center md:border-l-0 md:pl-0" style={{ animationDelay: '0.2s' }}>
            {APP_SUBTITLE}. A minimalistic approach to Machine Learning. <br className="hidden md:block" /> Input data, visualize distinct patterns, and master the linear regression algorithm.
          </p>

          <div className="animate-fade-in-up mt-10 flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: '0.3s' }}>
            <Link
              to={PageRoute.DASHBOARD}
              className="w-full sm:w-auto rounded-full bg-orange-600 px-8 py-3 text-sm font-semibold text-white hover:bg-orange-500 transition-all border border-orange-500 hover:scale-105"
            >
              Start Prediction
            </Link>
            <Link to={PageRoute.ABOUT} className="w-full sm:w-auto rounded-full px-8 py-3 text-sm font-semibold text-zinc-300 border border-zinc-800 hover:border-zinc-600 hover:text-white transition-all bg-black/50 backdrop-blur-sm">
              Read Documentation
            </Link>
          </div>
        </div>
      </div>

      {/* Bento Grid Section */}
      <div className="relative z-10 py-12 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Header / Intro Block - Spans 2 cols on Large */}
            <div className="lg:col-span-2 glass rounded-3xl p-8 border border-white/10 flex flex-col justify-end min-h-[300px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                <Brain className="w-32 h-32 text-white" />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-4">Core Capabilities</h2>
                <p className="text-zinc-400 max-w-md">Explore the powerful features built into our regression model. From interactive charts to instant calculations.</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>

            {/* Feature 1 */}
            <div className="glass rounded-3xl p-8 border border-white/10 hover:border-orange-500/50 transition-colors group flex flex-col justify-between">
              <div className="h-12 w-12 rounded-2xl bg-orange-500/20 flex items-center justify-center mb-6 text-orange-400">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">ML Prediction</h3>
                <p className="text-sm text-zinc-500">Supervised learning algorithms to predict scores instantly.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="glass rounded-3xl p-8 border border-white/10 hover:border-orange-500/50 transition-colors group flex flex-col justify-between">
              <div className="h-12 w-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 text-zinc-200">
                <Database className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Historical Data</h3>
                <p className="text-sm text-zinc-500">Curated datasets ensure accurate coefficient calculation.</p>
              </div>
            </div>

            {/* Feature 3 - Large Vertical */}
            <div className="row-span-2 glass rounded-3xl p-8 border border-white/10 hover:border-orange-500/50 transition-colors group relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="h-14 w-14 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 text-white border border-white/10">
                  <LineChart className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Visual Analytics</h3>
                  <p className="text-zinc-500 leading-relaxed">
                    Interactive scatter plots and regression lines help visualize the relationship between variables clearly. Real-time rendering of data points.
                  </p>
                  <Link to={PageRoute.VISUALIZATION} className="inline-flex items-center mt-6 text-orange-400 font-medium hover:text-orange-300">
                    Open Visualizer <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="glass rounded-3xl p-8 border border-white/10 hover:border-orange-500/50 transition-colors group flex flex-col justify-between">
              <div className="h-12 w-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 text-zinc-200">
                <Cpu className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Real-time Calc</h3>
                <p className="text-sm text-zinc-500">Instant slope & intercept computation via Least Squares.</p>
              </div>
            </div>

            {/* Feature 5 - Wide */}
            <div className="lg:col-span-2 glass rounded-3xl p-8 border border-white/10 hover:border-orange-500/50 transition-colors group flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Educational Focus</h3>
                <p className="text-sm text-zinc-500">Designed for students to understand Supervised Learning.</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <BookOpen className="h-5 w-5 text-zinc-400" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;