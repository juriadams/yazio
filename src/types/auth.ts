import { z } from "zod";

export const TokenSchema = z.object({
  token_type: z.string(),
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.number(),
  expires_at: z.number(),
});

export type Token = z.infer<typeof TokenSchema>;

export const TokenResolverSchema = z.union([
  TokenSchema,
  z
    .function()
    .returns(
      z.union([
        TokenSchema,
        z.promise(z.union([TokenSchema, z.null()])),
        z.null(),
      ])
    ),
]);

export type TokenResolver = z.infer<typeof TokenResolverSchema>;

export const CredentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type Credentials = z.infer<typeof CredentialsSchema>;

export const CredentialsResolverSchema = z.union([
  CredentialsSchema,
  z.promise(CredentialsSchema),
  z
    .function()
    .returns(
      z.union([
        CredentialsSchema,
        z.promise(z.union([CredentialsSchema, z.null()])),
        z.null(),
      ])
    ),
  z.promise(CredentialsSchema),
]);

export type CredentialsResolver = z.infer<typeof CredentialsResolverSchema>;

export const RefreshHandlerSchema = z
  .function()
  .args(z.object({ token: TokenSchema }))
  .returns(z.any());

export type RefreshHandler = z.infer<typeof RefreshHandlerSchema>;

export const YazioAuthInitSchema = z.union([
  z.object({
    credentials: CredentialsResolverSchema,
    token: z.undefined(),
    onRefresh: RefreshHandlerSchema.optional(),
  }),
  z.object({
    credentials: z.undefined(),
    token: TokenResolverSchema,
    onRefresh: RefreshHandlerSchema.optional(),
  }),
  z.object({
    credentials: CredentialsResolverSchema,
    token: TokenResolverSchema,
    onRefresh: RefreshHandlerSchema.optional(),
  }),
]);

export type YazioAuthInit = z.infer<typeof YazioAuthInitSchema>;
