import { z } from "zod";

export const TokenSchema = z.object({
  token_type: z.string(),
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.number(),
  expires_at: z.number(),
});

export type Token = z.infer<typeof TokenSchema>;

export const CredentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type Credentials = z.infer<typeof CredentialsSchema>;
