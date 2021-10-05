export const notFoundComponent = {
  description: 'Dados não encontrados',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
};
