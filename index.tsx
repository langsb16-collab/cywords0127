import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LocaleProvider } from './i18n.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </React.StrictMode>
);
