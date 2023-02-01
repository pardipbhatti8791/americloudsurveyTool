import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { IamModule } from './iam/iam.module';
import { OverlayModule } from './overlay/overlay.module';

@Module({
  imports: [UserModule, IamModule, OverlayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
