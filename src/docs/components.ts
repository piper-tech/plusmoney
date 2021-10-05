import {
  badRequestComponent,
  bearerAuthComponent,
  unauthorizedComponent,
  notFoundComponent
} from './components/';

export default {
  securitySchemes: {
    bearerAuth: bearerAuthComponent
  },
  badRequest: badRequestComponent,
  unauthorized: unauthorizedComponent,
  notFound: notFoundComponent
};
