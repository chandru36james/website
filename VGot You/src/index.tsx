import React from 'react';
import ReactDOM from 'react-dom/client';
// FIX: Using namespace import for react-router-dom to resolve "no exported member" errors
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/common/ErrorBoundary';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/common/ThemeProvider';


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <HelmetProvider>
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </HelmetProvider>
);