import {
  badRequestComponent,
  bearerAuthComponent,
  unauthorizedComponent
} from './components/';

export default {
  securitySchemes: {
    bearerAuth: bearerAuthComponent
  },
  badRequest: badRequestComponent,
  unauthorized: unauthorizedComponent
};
