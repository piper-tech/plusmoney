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
  tags: [
    {
      name: 'login/logup',
      description: 'Rotas de login/logup'
    },
    {
      name: 'users',
      description: 'Rotas de usuário'
    }
  ],
  paths: {
    '/logup': {
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
    },
    '/login': {
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
    },
    '/users': {
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
    loginParams: {
      type: 'object',
      properties: {
        email: {
          type: 'string'
        },
        password: {
          type: 'string'
        }
      },
      example: {
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
    },
    user: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        email: {
          type: 'string'
        }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        name: 'authorization',
        bearerFormat: 'JWT'
      }
    },
    badRequest: {
      description: 'Requisição inválida',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/error'
          }
        }
      }
    },
    unauthorized: {
      description: 'Não autorizado',
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
