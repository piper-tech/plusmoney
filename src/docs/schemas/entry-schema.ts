export const entrySchema = {
  type: 'object',
  properties: {
    description: {
      type: 'string'
    },
    value: {
      type: 'number'
    },
    data: {
      type: 'string'
    },
    userId: {
      type: 'number'
    }
  },
  example: {
    description: 'Aluguel',
    value: -1200,
    date: '30/09/2021',
    userId: 1,
    type: 'output'
  }
};
