import { redirect } from 'react-router';
import App from './App';
import RouteErrorBoundary from './components/layout/RouteErrorBoundary';
import ResourceDirectoryPage from './pages/ResourceDirectoryPage';
import AdminPage from './pages/AdminPage';
import { createBrowserRouter } from 'react-router';

const API_BASE_URL = 'http://localhost:3000';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: ResourceDirectoryPage,
        ErrorBoundary: RouteErrorBoundary,
        loader: resourceDirectoryLoader,
      },
      {
        path: 'admin',
        Component: AdminPage,
        ErrorBoundary: RouteErrorBoundary,
        loader: adminLoader,
        action: adminAction,
      },
      {
        path: 'admin/:resourceId',
        Component: AdminPage,
        ErrorBoundary: RouteErrorBoundary,
        loader: adminLoader,
        action: adminAction,
      },
    ],
  },
]);

// API Helper functions for loader data fetching
async function fetchResources() {
  const res = await fetch(`${API_BASE_URL}/resources`);

  if (!res.ok) {
    throw new Error(`Could not load resources: ${res.status}`);
  }

  return res.json();
}

async function fetchResourceById(resourceId) {
  const res = await fetch(`${API_BASE_URL}/resources/${resourceId}`);

  if (!res.ok) {
    throw new Error(`Could not load resource: ${res.status}`);
  }

  return res.json();
}

// Loader functions
export async function resourceDirectoryLoader() {
  const resources = await fetchResources();
  return { resources };
}

export async function adminLoader({ params }) {
  const resources = await fetchResources();

  if (!params.resourceId) {
    return {
      resources,
      resourceId: null,
      selectedResource: null,
    };
  }

  const selectedResource = await fetchResourceById(params.resourceId);

  return {
    resources,
    resourceId: params.resourceId,
    selectedResource,
  };
}

// Action functions
export async function adminAction({ request, params }) {
  const formData = await request.formData();

  const payload = {
    title: formData.get('title'),
    category: formData.get('category'),
    summary: formData.get('summary'),
    location: formData.get('location'),
    hours: formData.get('hours'),
    contact: formData.get('contact'),
    virtual: formData.get('virtual') === 'on',
    openNow: formData.get('openNow') === 'on',
  };

  const isEditing = Boolean(params.resourceId);
  const url = isEditing
    ? `${API_BASE_URL}/resources/${params.resourceId}`
    : `${API_BASE_URL}/resources`;
  const method = isEditing ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Could not ${isEditing ? 'update' : 'create'} resource`);
  }

  const savedResource = await res.json();

  return redirect(`/admin/${savedResource.id}`);
}
