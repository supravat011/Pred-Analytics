import React from 'react';
import { BookOpen, Target, Briefcase } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-32 relative">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0"></div>
      <div className="bg-noise"></div>

      <div className="text-center mb-16 relative z-10">
        <span className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-4 block">Documentation</span>
        <h1 className="text-5xl font-bold text-white tracking-tighter mb-6">About The Project</h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          An interactive platform designed to demystify Linear Regression through visualization and real-time computation.
        </p>
      </div>

      <div className="space-y-8 relative z-10">

        {/* Section 1 */}
        <div className="glass rounded-3xl p-8 lg:p-12 border border-white/10 group hover:border-orange-500/30 transition-colors">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 text-orange-500">
              <Target className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Project Objective</h2>
              <p className="text-zinc-400 leading-7">
                The primary goal is to provide a simplified yet comprehensive tool for students and enthusiasts to understand the core mechanics of
                <span className="text-orange-400 font-medium mx-1">Supervised Learning</span>.
                By stripping away complex libraries and code, we visualize the mathematical foundation—specifically the calculation of slope and intercept to determine the line of best fit.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="glass rounded-3xl p-8 lg:p-12 border border-white/10 group hover:border-orange-500/30 transition-colors">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center border border-white/10 text-zinc-200">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Key Concepts</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5"></span>
                  <p className="text-zinc-400"><strong className="text-zinc-200">Linear Regression:</strong> A statistical method to model the relationship between a dependent variable and one or more independent variables.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5"></span>
                  <p className="text-zinc-400"><strong className="text-zinc-200">Least Squares Method:</strong> The technique used to minimize the sum of the squares of the vertical distance between the observed variance and the fitted line.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5"></span>
                  <p className="text-zinc-400"><strong className="text-zinc-200">Predictive Modeling:</strong> Using historical data to predict future outcomes.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="glass rounded-3xl p-8 lg:p-12 border border-white/10 group hover:border-orange-500/30 transition-colors">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center border border-white/10 text-zinc-200">
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Real-World Applications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
                  <span className="block text-sm font-bold text-white mb-1">Financial Analysis</span>
                  <span className="block text-xs text-zinc-500">Predicting stock trends based on history.</span>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
                  <span className="block text-sm font-bold text-white mb-1">Real Estate</span>
                  <span className="block text-xs text-zinc-500">Estimating house prices by size/location.</span>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
                  <span className="block text-sm font-bold text-white mb-1">Medical Research</span>
                  <span className="block text-xs text-zinc-500">Correlating drug dosage to patient response.</span>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
                  <span className="block text-sm font-bold text-white mb-1">Sales Forecasting</span>
                  <span className="block text-xs text-zinc-500">Projecting future revenue based on past sales.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;