import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router';

import App from './App.jsx';
import ResourceDirectoryPage from './pages/ResourceDirectoryPage';
import AdminPage from './pages/AdminPage';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ResourceDirectoryPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="admin/:resourceId" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
