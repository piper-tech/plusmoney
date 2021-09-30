export const logupPath = {
  post: {
    tags: ['login/logup'],
    summary: 'Rota de criação e autenticação do usuário',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/logupParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            $ref: '#/schemas/accessToken'
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      }
    }
  }
};
