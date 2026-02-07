import { Body, Controller, Get, HttpCode, Param, Patch } from '@nestjs/common';
import { UserRole } from '../users/enums/user-role.enum';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('statistics')
  getStatistics() {
    return this.adminService.getStats();
  }

  @HttpCode(204)
  @Patch(':id/role')
  updateRole(@Param('id') userId: string, @Body('role') role: UserRole) {
    return this.adminService.updateRole(userId, role);
  }
}
