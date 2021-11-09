export const entryResponseSchema = {
  type: 'object',
  properties: {
  },
  example: {
    entries: [
      {
        description: 'Aluguel',
        value: -1200,
        date: '30/09/2021',
        category: {
          id: 1,
          description: 'Gastos Residenciais'
        },
        type: 'output'
      }
    ],
    abstract: {
      total: -1200,
      total_entries: 0,
      total_outputs: -1200
    },
    abstract_by_category: [
      {
        description: 'Gastos Residenciais',
        value: -1200
      }
    ]
  }
};
