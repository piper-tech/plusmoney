export const usersPath = {
  get: {
    tags: ['users'],
    summary: 'Rota para retornar usuário',
    security: [
      {
        bearerAuth: []
      }
    ],
    parameters: [{
      in: 'query',
      name: 'email',
      description: 'Email do usuário',
      schema: {
        type: 'string'
      }
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            $ref: '#/schemas/user'
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      }
    }
  }
};
