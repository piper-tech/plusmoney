export const entriesPath = {
  post: {
    tags: ['entries'],
    summary: 'Rota para cadastrar uma entrada/saída',
    security: [
      {
        bearerAuth: []
      }
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/entry'
          }
        }
      }
    },
    resopnses: {
      201: {
        description: 'Cadastrado com sucesso'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      }
    }
  },
  get: {
    tags: ['entries'],
    summary: 'Rota para buscar entradas e saídas',
    security: [
      {
        bearerAuth: []
      }
    ],
    parameters: [{
      in: 'query',
      name: 'userId',
      description: 'Id do usuário que deseja buscar as entradas',
      schema: {
        type: 'number'
      }
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/schemas/entry'
              }
            }
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
