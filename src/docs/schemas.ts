import {
  logupParamsSchema,
  loginParamsSchema,
  accessTokenSchema,
  errorSchema,
  userSchema
} from './schemas/';

export default {
  logupParams: logupParamsSchema,
  loginParams: loginParamsSchema,
  accessToken: accessTokenSchema,
  error: errorSchema,
  user: userSchema
};
