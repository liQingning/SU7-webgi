import {defineConfig, normalizePath} from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'

export default defineConfig({
    base: '/SU7-webgi/',
    build: {
        assetsDir: 'assets',
        rollupOptions: {
            output: {
                // 启用哈希命名，避免缓存问题
                assetFileNames: 'assets/[name]-[hash][extname]',
                entryFileNames: 'assets/[name]-[hash].js'
            }
        }
    },
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: normalizePath(path.resolve(__dirname, './assets') + '/**/*'), // 1️⃣
                    dest: './assets', // 2️⃣
                },
            ],
        }),
    ]
})
