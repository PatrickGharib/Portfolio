/// <reference types="vite/client" />

// Ensure TypeScript recognizes Vue files as modules
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Declare Vuetify module to avoid bare specifier errors
declare module 'vuetify/directives' {
  const directives: any
  export default directives
  export const Touch: any
  export const Ripple: any
  export const Scroll: any
}

// Declare environment variables
interface ImportMetaEnv {
  readonly VITE_FORCE_BUNDLE_ALL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
