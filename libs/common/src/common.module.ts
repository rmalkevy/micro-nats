import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { PrismaService } from './prisma.service';

@Module({
  providers: [CommonService, PrismaService],
  exports: [CommonService, PrismaService],
})
export class CommonModule {}
