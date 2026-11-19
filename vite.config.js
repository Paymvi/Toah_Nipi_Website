import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// `npm run dev` only: runs the Vercel functions in api/ (Vercel runs them in
// production). Server-only variables from .env.local reach them through
// process.env and are never bundled into the site.
function apiFunctionsInDev() {
  return {
    name: 'api-functions-in-dev',
    apply: 'serve',
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ''))

      server.middlewares.use(async (req, res, next) => {
        const name = /^\/api\/([\w-]+)$/.exec(req.url.split('?')[0])?.[1]
        if (!name) return next()

        try {
          const handler = (await server.ssrLoadModule(`/api/${name}.js`))[req.method]
          if (!handler) {
            res.statusCode = 405
            return res.end()
          }

          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          const headers = {}
          for (const key of ['authorization', 'content-type']) {
            if (req.headers[key]) headers[key] = req.headers[key]
          }

          const response = await handler(new Request(new URL(req.url, 'http://localhost'), {
            method: req.method,
            headers,
            body: chunks.length ? Buffer.concat(chunks) : undefined,
          }))
          res.statusCode = response.status
          response.headers.forEach((value, key) => res.setHeader(key, value))
          res.end(Buffer.from(await response.arrayBuffer()))
        } catch (error) {
          next(error)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    apiFunctionsInDev(),
  ],
})
