import { useEffect, useState } from 'react';

const API_BASE_URL = 'http://localhost:3000';

export function useResources() {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchResources(signal) {
    setIsLoading(true);
    setError(null);
    
    // delay for demo purposes
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    try {
      const res = await fetch(`${API_BASE_URL}/resources`, { signal });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setResources(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchResources(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  function refetch() {
    const controller = new AbortController();
    fetchResources(controller.signal);
  }

  return { resources, isLoading, error, refetch };
}