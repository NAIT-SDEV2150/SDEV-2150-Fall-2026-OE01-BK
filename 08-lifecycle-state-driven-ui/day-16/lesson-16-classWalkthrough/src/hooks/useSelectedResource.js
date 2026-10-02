import { useState } from 'react';

const STORAGE_KEY = 'selectedResource';

export function useSelectedResource() {
  const [selectedResource, setSelectedResource] = useState(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    
    return null;
  });

  function updateSelectedResource(resource) {
    setSelectedResource(resource);

    if (resource === null) {
      sessionStorage.removeItem(STORAGE_KEY);
    } else {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(resource));
    }
  }

  return [selectedResource, updateSelectedResource];
}
