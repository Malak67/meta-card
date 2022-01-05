/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPPORTED_NETWORK_IDS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
