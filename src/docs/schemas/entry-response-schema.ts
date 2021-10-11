export const entryResponseSchema = {
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
    category: {
      id: {
        type: 'number'
      },
      description: {
        type: 'string'
      }
    }
  },
  example: {
    description: 'Aluguel',
    value: -1200,
    date: '30/09/2021',
    category: {
      id: 1,
      description: 'Gastos Residenciais'
    },
    type: 'output'
  }
};
