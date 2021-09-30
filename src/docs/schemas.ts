import {
  logupParamsSchema,
  loginParamsSchema,
  accessTokenSchema,
  errorSchema,
  userSchema,
  entrySchema
} from './schemas/';

export default {
  logupParams: logupParamsSchema,
  loginParams: loginParamsSchema,
  accessToken: accessTokenSchema,
  error: errorSchema,
  user: userSchema,
  entry: entrySchema
};
