// src/App.tsx
import { Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import { GainersPage } from './pages/GainersPage';
import { LosersPage } from './pages/LosersPage';
import { TrendingPage } from './pages/TrendingPage';
import { Layout } from './components/layout/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/gainers" element={<GainersPage />} />
        <Route path="/losers" element={<LosersPage />} />
      </Routes>
    </Layout>
  );
}

export default App;