import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { env } from '@/env';
import { initializeTheme } from '@/hooks/use-appearance';

createInertiaApp({
  title: (title) => (title ? `${title} - ${env.viteAppName}` : env.viteAppName),
  resolve: (name) =>
    resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx'),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <StrictMode>
        <App {...props} />
      </StrictMode>,
    );
  },
  progress: {
    color: 'var(--primary)',
  },
});

// This will set light / dark mode on load...
initializeTheme();
