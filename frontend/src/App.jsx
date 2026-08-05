/* ================================================
   App — Router Setup
   ================================================ */

import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CareerPage from './pages/CareerPage';
import MyStoryPage from './pages/MyStoryPage';
import ProjectsPage from './pages/ProjectsPage';
import CertificatesPage from './pages/CertificatesPage';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/my-story" element={<MyStoryPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/certificates" element={<CertificatesPage />} />
      </Route>
    </Routes>
  );
}
