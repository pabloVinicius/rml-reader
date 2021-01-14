import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from './App';
import './static/styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

Sentry.init({
  dsn: "https://6cb34312abaa465e8c65babf715120e9@o322920.ingest.sentry.io/5592749",
  autoSessionTracking: true,
  integrations: [
    new Integrations.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
