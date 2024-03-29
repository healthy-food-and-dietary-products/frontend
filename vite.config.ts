import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@images': path.resolve(__dirname, './src/assets/images'),
			'@scss': path.resolve(__dirname, './src/scss'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@components': path.resolve(__dirname, './src/components'),
			'@ui': path.resolve(__dirname, './src/components/ui'),
			'@contexts': path.resolve(__dirname, './src/contexts'),
			'@data': path.resolve(__dirname, './src/data'),
			'@layouts': path.resolve(__dirname, './src/layouts'),
			'@services': path.resolve(__dirname, './src/services'),
			'@pages': path.resolve(__dirname, './src/pages'),
		},
	},
	plugins: [react(), svgr()],
	define: {
		VITE_BASE_URL: process.env.VITE_BASE_URL,
		VITE_API_URL: process.env.VITE_API_URL,
	},
});
