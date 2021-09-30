import paths from '@/docs/paths';
import schemas from '@/docs/schemas';
import components from '@/docs/components';

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
    },
    {
      name: 'entries',
      description: 'Rotas de entradas e saídas'
    }
  ],
  paths,
  schemas,
  components
};
