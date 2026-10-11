import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://bazar-ghor.vercel.app",
});

export const { signIn, signUp, useSession, signOut } = authClient;