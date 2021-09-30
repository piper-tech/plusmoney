export const loginPath = {
  post: {
    tags: ['login/logup'],
    summary: 'Rota de autenticação do usuário',
    description: 'Os tokens de autenticação gerados duram 1 hora.',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loginParams'
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
      },
      401: {
        $ref: '#/components/unauthorized'
      }
    }
  }
};
