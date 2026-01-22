import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Visualization from './pages/Visualization';
import About from './pages/About';
import { PageRoute } from './types';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-black text-zinc-100 font-sans selection:bg-orange-500/30">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path={PageRoute.HOME} element={<Landing />} />
            <Route path={PageRoute.DASHBOARD} element={<Dashboard />} />
            <Route path={PageRoute.VISUALIZATION} element={<Visualization />} />
            <Route path={PageRoute.ABOUT} element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;