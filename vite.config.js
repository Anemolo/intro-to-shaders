// vite.config.js
import { defineConfig } from 'vite';

import {glslify} from 'vite-plugin-glslify'

export default defineConfig({
  plugins: [glslify()]
});
