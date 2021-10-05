export const mePath = {
  get: {
    tags: ['users'],
    summary: 'Rota para retornar usuário logado',
    security: [
      {
        bearerAuth: []
      }
    ],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            $ref: '#/schemas/user'
          }
        }
      },
      404: {
        $ref: '#/components/notFound'
      },
      401: {
        $ref: '#/components/unauthorized'
      }
    }
  }
};
