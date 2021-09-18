export default {
  openapi: '3.0.0',
  info: {
    title: 'Plusmoney Docs',
    description: 'Documentação da API do Plusmoney',
    version: '1.0.0'
  },
  servers: [{
    url: 'http://localhost:3000',
    description: 'Servidor local'
  }],
  tags: [{
    name: 'Login/Logup',
    description: 'Rotas de Login/Logup'
  }],
  paths: {
    '/logup': {
      post: {
        tags: ['Login/Logup'],
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
    }
  },
  schemas: {
    logupParams: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
        password: {
          type: 'string'
        }
      },
      example: {
        name: 'Mario',
        email: 'mario@email.com',
        password: '123'
      }
    },
    accessToken: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string'
        }
      },
      example: {
        accessToken: '<jwt-token>'
      }
    },
    error: {
      type: 'object',
      properties: {
        error: {
          type: 'string'
        }
      },
      example: {
        error: 'error message'
      },
      required: ['error']
    }
  },
  components: {
    badRequest: {
      description: 'Requisição inválida',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/error'
          }
        }
      }
    }
  }
};
