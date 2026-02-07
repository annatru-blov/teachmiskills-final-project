import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { ExecutionContext } from '@nestjs/common';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  it('should allow access if no roles are defined on the route', () => {
    jest.spyOn(reflector, 'get').mockReturnValueOnce(undefined);

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: 'user' } }),
      }),
      getHandler: () => ({}),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should allow access if user role matches route roles', () => {
    jest.spyOn(reflector, 'get').mockReturnValueOnce(['admin', 'user']);

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: 'user' } }),
      }),
      getHandler: () => ({}),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should deny access if user role does not match route roles', () => {
    jest.spyOn(reflector, 'get').mockReturnValue(['admin']);

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: 'user' } }),
      }),
      getHandler: () => ({}),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(context)).toBe(false);
  });
});
