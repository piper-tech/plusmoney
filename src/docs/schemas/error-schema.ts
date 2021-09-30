export const errorSchema = {
  type: 'object',
  properties: {
    error: {
      type: 'string'
    }
  },
  example: {
    error: 'error message'
  },
  required: ['error']
};
