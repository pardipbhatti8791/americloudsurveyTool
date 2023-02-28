import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: (): any => {
    return v2.config({
      cloud_name: 'ddsr4dovk',
      api_key: '398241375451431',
      api_secret: 'WnNYmm03s06HBDdC6uUE7JezjDM',
    });
  },
};
