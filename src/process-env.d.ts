declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      SECRET_KEY: string
    }
  }
}

export {}
