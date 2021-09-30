export const accessTokenSchema = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string'
    }
  },
  example: {
    accessToken: '<jwt-token>'
  }
};
