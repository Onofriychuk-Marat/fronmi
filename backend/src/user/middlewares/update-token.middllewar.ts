import { Injectable, NestMiddleware } from '@nestjs/common';
import { ServerResponse } from 'http';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UpdateTokenMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: any, res: ServerResponse) {
    if (res.statusCode < 300 && req.user) {
      const token = 'Bearer ' + this.authService.generateJwt(req.user);
      res.writeHead(res.statusCode, { Authorization: token });
    }
    res.end();
  }
}
