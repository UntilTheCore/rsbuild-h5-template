import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import AutoImport from "unplugin-auto-import/rspack";
import Components from "unplugin-vue-components/rspack";
import { VantResolver } from "@vant/auto-import-resolver";
import { pluginSass } from '@rsbuild/plugin-sass';

export default defineConfig({
  html: {
    title: process.env.APP_NAME,
    meta: {
      viewport: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover',
    }
  },
  plugins: [pluginVue(), pluginSass() ],
  source: {
    alias: {
      "@": "src",
    }
  },
  tools: {
    rspack: {
      plugins: [
        AutoImport({
          resolvers: [VantResolver()],
        }),
        Components({
          resolvers: [VantResolver()],
        }),
      ],
    },
  },
});
