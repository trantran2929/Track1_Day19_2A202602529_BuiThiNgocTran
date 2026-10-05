import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomeOverview } from './pages/HomeOverview';
import { OptionAPage } from './pages/OptionAPage';
import { OptionBPage } from './pages/OptionBPage';
import { OptionB1Page } from './pages/OptionB1Page';
import { OptionCPage } from './pages/OptionCPage';
import { AITutorProvider } from './context/AITutorContext';

export const App: React.FC = () => {
  return (
    <AITutorProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomeOverview />} />
          <Route path="/option-a" element={<OptionAPage />} />
          <Route path="/option-b" element={<OptionBPage />} />
          <Route path="/option-b1" element={<OptionB1Page />} />
          <Route path="/option-c" element={<OptionCPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AITutorProvider>
  );
};

export default App;
