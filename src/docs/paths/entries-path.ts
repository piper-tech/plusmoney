export const entriesPath = {
  post: {
    tags: ['entries'],
    summary: 'Rota para cadastrar uma entrada/saída',
    description: 'Todos os parametros do exemplo de request são obrigatórios, com excessão do "categoryId"',
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
      required: true,
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
            $ref: '#/schemas/entryResponse'
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
  },
  put: {
    tags: ['entries'],
    summary: 'Rota para editar entradas e saídas',
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
    parameters: [{
      in: 'path',
      required: true,
      name: 'id',
      description: 'Id da entrada que deseja editar',
      schema: {
        type: 'number'
      }
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
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
  },
  delete: {
    tags: ['entries'],
    summary: 'Rota para deletar entradas e saídas',
    security: [
      {
        bearerAuth: []
      }
    ],
    parameters: [{
      in: 'path',
      required: true,
      name: 'id',
      description: 'Id da entrada que deseja editar',
      schema: {
        type: 'number'
      }
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
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
