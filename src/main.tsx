import { APIProvider } from '@vis.gl/react-google-maps';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { GOOGLE_MAPS_API_KEY } from './utils/config';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <App />
    </APIProvider>
  </React.StrictMode>,
);
