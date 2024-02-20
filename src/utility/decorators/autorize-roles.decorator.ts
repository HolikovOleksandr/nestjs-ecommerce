import { SetMetadata } from '@nestjs/common';

export const AutorizeRoles = (...roles: string[]) => {
  return SetMetadata('allowedRoles', [roles]);
};
