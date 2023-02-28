import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
  cloud_name: 'ddsr4dovk',
  api_key: '398241375451431',
  api_secret: 'WnNYmm03s06HBDdC6uUE7JezjDM',
});

// Upload

const res = cloudinary.uploader.upload(
  'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg',
  { public_id: 'olympic_flag' },
);

res
  .then((data) => {
    console.log(data);
    console.log(data.secure_url);
  })
  .catch((err) => {
    console.log(err);
  });

// Generate
const url = cloudinary.url('olympic_flag', {
  width: 100,
  height: 150,
  Crop: 'fill',
});

// The output url
