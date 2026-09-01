import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localFilepath) => {
  try {
    if (!localFilepath) {
      console.error('INVALID FILE PATH');
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilepath, {
      resource_type: 'auto',
    });
    fs.unlinkSync(localFilepath);
    return response;
  } catch (error) {
    console.log('CLOUDINARY UPLOAD FAILED');
    fs.unlinkSync(localFilepath);
    console.log('ERROR', error);
  }
};

export{uploadToCloudinary}
