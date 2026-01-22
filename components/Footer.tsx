import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Github, Twitter, Linkedin } from 'lucide-react';
import { PageRoute } from '../types';

const Footer: React.FC = () => {
    return (
        <footer className="relative border-t border-white/5 bg-black z-10 mt-auto">
            {/* Decorative Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>

            <div className="w-full px-6 md:px-12 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

                    {/* Brand Column */}
                    <div className="md:col-span-2 space-y-6">
                        <Link to={PageRoute.HOME} className="flex items-center gap-3 w-fit group">
                            <div className="p-2 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-colors border border-orange-500/10">
                                <BrainCircuit className="h-6 w-6 text-orange-500" />
                            </div>
                            <span className="font-bold text-xl text-white tracking-tight">Pred<span className="text-zinc-600">Analytics.</span></span>
                        </Link>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                            An educational open-source project designed to visualize the mathematics behind Linear Regression. Built for students, by students.
                        </p>
                        <div className="flex items-center gap-4">
                            {/* Social Links - Placeholders */}
                            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white text-zinc-400 transition-colors border border-white/5">
                                <Github className="h-4 w-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white text-zinc-400 transition-colors border border-white/5">
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white text-zinc-400 transition-colors border border-white/5">
                                <Linkedin className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Platform</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link to={PageRoute.HOME} className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link to={PageRoute.DASHBOARD} className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">Prediction Dashboard</Link>
                            </li>
                            <li>
                                <Link to={PageRoute.VISUALIZATION} className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">Visualizations</Link>
                            </li>
                            <li>
                                <Link to={PageRoute.ABOUT} className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">Documentation</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal/Resources Column */}
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Resources</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">Machine Learning Basics</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">Regression Theory</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">Terms of Use</a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-4">
                    <p className="text-xs text-zinc-600">
                        &copy; {new Date().getFullYear()} PredAnalytics Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
