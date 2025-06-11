import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '../src/context/ThemeContext';
import Layout from '../src/components/layout/Layout';
import Home from '../src/pages/Home';
import Crisis from '../src/pages/Crisis';
import Data from '../src/pages/Data';
import Action from '../src/pages/Action';
import Community from '../src/pages/Community';
import About from '../src/pages/About';
import Report from '../src/pages/Report';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crisis" element={<Crisis />} />
            <Route path="/data" element={<Data />} />
            <Route path="/action" element={<Action />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about" element={<About />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;