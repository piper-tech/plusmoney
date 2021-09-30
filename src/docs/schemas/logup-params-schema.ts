export const logupParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  example: {
    name: 'Mario',
    email: 'mario@email.com',
    password: '123'
  }
};
