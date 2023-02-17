import { PartialType } from '@nestjs/swagger';
import { CreateOverlayDto } from './create-overlay.dto';

export class UpdateOverlayDto extends PartialType(CreateOverlayDto) {}
