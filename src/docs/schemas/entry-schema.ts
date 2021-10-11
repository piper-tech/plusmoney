export const entrySchema = {
  type: 'object',
  properties: {
    description: {
      type: 'string'
    },
    value: {
      type: 'number'
    },
    date: {
      type: 'string'
    },
    userId: {
      type: 'number'
    },
    categoryId: {
      type: 'string',
      required: false
    }
  },
  example: {
    description: 'Aluguel',
    value: -1200,
    date: '30/09/2021',
    userId: 1,
    categoryId: 1
  }
};
