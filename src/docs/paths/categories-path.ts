export const categoriesPath = {
  post: {
    tags: ['categories'],
    summary: 'Rota para cadastrar uma categoria',
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
            $ref: '#/schemas/category'
          }
        }
      }
    },
    responses: {
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
    tags: ['categories'],
    summary: 'Rota para buscar categorias',
    security: [
      {
        bearerAuth: []
      }
    ],
    parameters: [
      {
        in: 'query',
        name: 'userId',
        required: true,
        description: 'Id do usuário que deseja buscar as entradas',
        schema: {
          type: 'number'
        }
      },
      {
        in: 'query',
        name: 'description',
        required: false,
        description: 'Descrição da entrada',
        schema: {
          type: 'string'
        }
      }
    ],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/schemas/category'
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
  },
  put: {
    tags: ['categories'],
    summary: 'Rota para editar uma categoria',
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
            $ref: '#/schemas/category'
          }
        }
      }
    },
    parameters: [{
      in: 'path',
      required: true,
      name: 'id',
      description: 'Id da categoria que deseja editar',
      schema: {
        type: 'number'
      }
    }],
    responses: {
      201: {
        description: 'Sucesso'
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
    tags: ['categories'],
    summary: 'Rota para deletar uma categoria',
    security: [
      {
        bearerAuth: []
      }
    ],
    parameters: [{
      in: 'path',
      required: true,
      name: 'id',
      description: 'Id da categoria que deseja deletar',
      schema: {
        type: 'number'
      }
    }],
    responses: {
      201: {
        description: 'Sucesso'
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
