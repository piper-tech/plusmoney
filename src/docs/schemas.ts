import {
  logupParamsSchema,
  loginParamsSchema,
  accessTokenSchema,
  errorSchema,
  userSchema,
  entrySchema,
  entryResponseSchema,
  categorySchema
} from './schemas/';

export default {
  logupParams: logupParamsSchema,
  loginParams: loginParamsSchema,
  accessToken: accessTokenSchema,
  error: errorSchema,
  user: userSchema,
  entry: entrySchema,
  entryResponse: entryResponseSchema,
  category: categorySchema
};
