import path from 'path'

import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    let base = '/'
    if (command === 'build') {
        base = env.VITE_BASE_URL
    }

    return {
        base: base,
        plugins: [],
        resolve: {
            alias: {
                app: path.resolve(__dirname, './src/app'),
                game: path.resolve(__dirname, './src/game'),
                '@': path.resolve(__dirname, './src'),
                '~': path.resolve(__dirname, './'),
            },
        },
        server: {
            port: 8080,
            host: true,
        },
        css: {
            modules: {
                localsConvention: 'camelCaseOnly',
                scopeBehaviour: 'local',
            },
        },
        build: {
            assetsInlineLimit: 0,
            rollupOptions: {
                output: {
                    manualChunks: {
                        phaser: ['phaser'],
                        react: ['react', 'react-dom'],
                    },
                },
            },
            optimizeDeps: {
                include: ['phaser'],
            },
        },
    }
})
