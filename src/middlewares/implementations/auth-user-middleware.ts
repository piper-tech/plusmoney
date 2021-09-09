import { HttpResponse } from '@/controllers';
import { Middleware } from '../middleware';
import { HttpHelper } from '@/controllers/helpers';
import { AuthenticationJwt } from '@/providers/implementations';

interface AuthMiddlewareData {
  accessToken: string;
}

export class AuthUserMiddleware implements Middleware {
  private authenticationProvider = new AuthenticationJwt();

  async handler(request: AuthMiddlewareData): Promise<HttpResponse> {
    const { accessToken } = request;
    if (!accessToken) {
      return HttpHelper.unauthorized(new Error('unauthorized'));
    }
    const authenticated = await this.authenticationProvider.verify(accessToken);

    if (!authenticated) {
      return HttpHelper.unauthorized(new Error('unauthorized'));
    }

    return HttpHelper.ok({ message: 'ok' });
  }
}
