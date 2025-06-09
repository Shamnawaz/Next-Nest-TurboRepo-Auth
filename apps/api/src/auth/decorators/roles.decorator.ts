import { SetMetadata } from "@nestjs/common";
import { Role } from "generated/prisma";

export const ROLES_KEY = 'roles'

// au moins un rôle (Role) et éventuellement plusieurs autres
export const Roles = (...roles: [Role, ...Role[]]) => SetMetadata(ROLES_KEY, roles);