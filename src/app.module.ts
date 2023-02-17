import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { IamModule } from './iam/iam.module';
import { ProjectModule } from './project/project.module';
import { OverlaysModule } from './overlays/overlays.module';
import { ToolsModule } from './tools/tools.module';
import { LayersModule } from './layers/layers.module';

@Module({
  imports: [
    UserModule,
    IamModule,
    ProjectModule,
    OverlaysModule,
    ToolsModule,
    LayersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
