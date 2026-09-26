import { defineConfig, type Plugin } from 'vite'
import fs from 'fs'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

// Preloads the first Home hero slide from the HTML, so it downloads in parallel
// with the JS bundle instead of after React renders. The <link> is added by an
// inline script only on "/", so other routes don't fetch an image they never
// show. imagesrcset/imagesizes must match the <img> in Home.tsx exactly.
const HERO_PRELOAD = /^hero-1-(\d+)\.webp$/

function homeHeroPreload(): Plugin {
  return {
    name: 'home-hero-preload',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        let candidates: string[]
        if (ctx.bundle) {
          candidates = Object.values(ctx.bundle).flatMap((out) => {
            if (out.type !== 'asset') return []
            const match = out.names.map((n) => HERO_PRELOAD.exec(n)).find(Boolean)
            return match ? [`/${out.fileName} ${match[1]}w`] : []
          })
        } else {
          const dir = path.resolve(__dirname, 'src/imports')
          candidates = fs.readdirSync(dir).flatMap((n) => {
            const match = HERO_PRELOAD.exec(n)
            return match ? [`/src/imports/${n} ${match[1]}w`] : []
          })
        }
        if (candidates.length === 0) return
        const srcset = JSON.stringify(candidates.join(', '))
        return [
          {
            tag: 'script',
            injectTo: 'head',
            children:
              `if(location.pathname==="/"){var l=document.createElement("link");` +
              `l.rel="preload";l.as="image";l.setAttribute("imagesrcset",${srcset});` +
              `l.setAttribute("imagesizes","100vw");l.setAttribute("fetchpriority","high");` +
              `document.head.appendChild(l)}`,
          },
        ]
      },
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    homeHeroPreload(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
