
// File: pages/api-test.js
import { useState } from 'react';

export default function APITest() {
  const [apiResponse, setApiResponse] = useState(null);

  const testAPI = async () => {
    try {
      const response = await fetch('/api/chartdata?from=1672531200&to=1672617600&resolution=D');
      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setApiResponse({ error: 'Failed to fetch data' });
    }
  };

  return (
    <div>
      <h1>API Test Page</h1>
      <button onClick={testAPI}>Test API</button>
      {apiResponse && (
        <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
      )}
    </div>
  );
}