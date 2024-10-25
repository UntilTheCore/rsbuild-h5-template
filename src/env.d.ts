/// <reference types="@rsbuild/core/types" />
/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    BASE_URL: string;
    BASE_API: string;
    APP_NAME: string;
  }
}

// 扩展 env.meta 常量类型
interface ImportMetaEnv {
  readonly BASE_URL: string;
  readonly BASE_API: string;
  readonly APP_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  // biome-ignore lint/complexity/noBannedTypes: reason
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
