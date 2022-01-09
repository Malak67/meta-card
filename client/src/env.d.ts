/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ROPSTEN_NETWORK_ID: string;
  readonly VITE_CONTRACT_ADDRESS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
