export const categorySchema = {
  type: 'object',
  properties: {
    userId: {
      type: 'number'
    },
    description: {
      type: 'string'
    }
  },
  example: {
    userId: 1,
    description: 'Educação'
  }
};
