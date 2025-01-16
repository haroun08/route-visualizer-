import React, { useState } from 'react';
import axios from 'axios';
import Map from './map';
import Footer from './footer';

const App = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [directions, setDirections] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDirections = async () => {
    if (!origin || !destination) {
      setError('Please enter both origin and destination.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://127.0.0.1:5000/directions', {
        params: {
          origin,
          destination,
        },
      });

      if (response.data.status === 'ZERO_RESULTS') {
        setError('No routes found. Please check the locations and try again.');
      } else {
        setDirections(response.data);
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
      setError('Failed to fetch directions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Route Visualizer</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          style={{ marginRight: '10px', padding: '8px', width: '200px' }}
        />
        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{ marginRight: '10px', padding: '8px', width: '200px' }}
        />
        <button onClick={fetchDirections} disabled={loading}>
          {loading ? 'Loading...' : 'Get Directions'}
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {directions ? (
        <Map directions={directions} />
      ) : (
        <p>Enter locations and click "Get Directions" to see the route.</p>
      )}
      <Footer></Footer>
    </div>
  );
};

export default App;