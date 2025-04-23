import {defineConfig, normalizePath} from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'

export default defineConfig({
    base: '/SU7-webgi/',
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
