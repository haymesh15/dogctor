import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './styles/globals.css'
import LoginPage from './pages/LoginPage'
import DogProfilePage from './pages/DogProfilePage'
import DashboardPage from './pages/DashboardPage'
import DailyLogPage from './pages/DailyLogPage'
import InsightsPage from './pages/InsightsPage'
import SettingsPage from './pages/SettingsPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/setup" element={<DogProfilePage />} />
        <Route path="/profile" element={<DogProfilePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/log" element={<DailyLogPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App