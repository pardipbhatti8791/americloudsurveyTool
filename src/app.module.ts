import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { IamModule } from './iam/iam.module';
import { ProjectModule } from './project/project.module';
import { OverlaysModule } from './overlays/overlays.module';
import { ToolsModule } from './tools/tools.module';
import { LayersModule } from './layers/layers.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { UploadFileController } from './upload-file/upload-file.controller';

@Module({
  imports: [
    UserModule,
    IamModule,
    ProjectModule,
    OverlaysModule,
    ToolsModule,
    LayersModule,
    CloudinaryModule,
  ],
  controllers: [AppController, UploadFileController],
  providers: [AppService, CloudinaryService],
})
export class AppModule {}
