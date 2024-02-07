import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

/*
* This is a temporary implementation to add a system of ownership.
* This should be replaced by a JWT token verification inside HttpOnly cookies.
*/

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {

    canActivate (context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        request.user = {
            id: 'd85c417b-b31e-4fbe-80ea-40df182105ff'
        };

        return true;
    }
}
