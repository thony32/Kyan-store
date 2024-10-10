/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_SUPABASE_URL: string
    readonly VITE_SUPABASE_KEY: string
    readonly VITE_BOT_API
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
