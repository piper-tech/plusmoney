import { HttpResponse } from '@/controllers';
import { Middleware } from '../middleware';
import { HttpHelper } from '@/controllers/helpers';
import { AuthenticationJwt } from '@/providers/implementations';
import { Unauthorized } from '@/controllers/errors';

interface AuthMiddlewareData {
  accessToken: string;
}

export class AuthUserMiddleware implements Middleware {
  private authenticationProvider = new AuthenticationJwt();

  async handler(request: AuthMiddlewareData): Promise<HttpResponse> {
    const { accessToken } = request;
    if (!accessToken) {
      return HttpHelper.unauthorized(new Unauthorized('unauthorized'));
    }
    const [bearer, token] = accessToken.split(' ');
    if (!bearer || bearer.toLowerCase() !== 'bearer') {
      return HttpHelper.unauthorized(new Unauthorized('unauthorized'));
    }
    if (!token) {
      return HttpHelper.unauthorized(new Unauthorized('unauthorized'));
    }
    const authenticated = await this.authenticationProvider.verify(token);

    if (!authenticated) {
      return HttpHelper.unauthorized(new Unauthorized('unauthorized'));
    }

    return HttpHelper.ok({ message: 'ok' });
  }
}
