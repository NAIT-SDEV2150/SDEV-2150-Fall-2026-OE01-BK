import { BrowserRouter,Routes,Route } from 'react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ResourceDirectoryPage from './pages/ResourceDirectoryPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ResourceDirectoryPage />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
