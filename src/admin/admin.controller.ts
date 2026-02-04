import { Controller, Get, Patch } from '@nestjs/common';
import { AdminService } from 'src/src/admin/admin.service';
import { UserRole } from 'src/src/users/enums/user-role.enum';
import { UsersService } from 'src/src/users/users.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UsersService,
  ) {}

  @Get('statistics')
  getStatistics() {
    return this.adminService.getStats();
  }

  @Patch(':id/role')
  updateRole(userId: string, role: UserRole) {
    return this.adminService.updateRole(userId, role);
  }
}
