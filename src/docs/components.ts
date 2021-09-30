import {
  badRequestComponent,
  bearerAuthComponent,
  unauthorizedComponent
} from './components/';

export default {
  securitySchemas: {
    bearerAuth: bearerAuthComponent
  },
  badRequest: badRequestComponent,
  unauthorized: unauthorizedComponent
};
