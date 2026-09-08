import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import dotenv from 'dotenv';

dotenv.config();

function makeWebhookPlugin() {
  const handler = async (req: any, res: any) => {
    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }

    let body = '';
    req.on('data', (chunk: any) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const webhookUrl = process.env.MAKE_WEBHOOK_URL || process.env.VITE_MAKE_WEBHOOK_URL;
        if (!webhookUrl) {
          // Webhook URL not provided yet - respond gracefully
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify({
            success: true,
            configured: false,
            message: 'Make.com webhook URL is not configured yet. Store MAKE_WEBHOOK_URL in environment variable.'
          }));
          return;
        }

        const data = body ? JSON.parse(body) : {};
        const payload = {
          name: data.name || '',
          contactNumber: data.contactNumber || '',
          email: data.email || '',
          message: data.message || '',
          createdAt: data.createdAt || new Date().toISOString()
        };

        const makeRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify({
          success: makeRes.ok,
          status: makeRes.status
        }));
      } catch (err: any) {
        console.warn('Make.com webhook forward error:', err?.message);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify({
          success: false,
          error: err?.message || 'Error forwarding to Make.com webhook'
        }));
      }
    });
  };

  return {
    name: 'make-webhook-proxy',
    configureServer(server: any) {
      server.middlewares.use('/api/make-webhook', handler);
    },
    configurePreviewServer(server: any) {
      server.middlewares.use('/api/make-webhook', handler);
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), makeWebhookPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
