import {defineConfig, presetUno, presetWind} from "unocss";

export default defineConfig({
  content: {
    filesystem: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  },
  presets: [
    presetWind(),
  ],
})
