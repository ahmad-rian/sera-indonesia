import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Crisis from './pages/Crisis';
import Data from './pages/Data';
import Action from './pages/Action';
import Community from './pages/Community';
import About from './pages/About';
import Report from './pages/Report';

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
        <Analytics />
      </Router>
    </ThemeProvider>
  );
}

export default App;