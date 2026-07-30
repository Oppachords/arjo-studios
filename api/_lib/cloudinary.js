import { v2 as cloudinary } from 'cloudinary';

let configured = false;

export function getCloudinary() {
  if (!configured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    configured = true;
  }
  return cloudinary;
}

export async function uploadImage(base64Data, folder = 'arjo-studios') {
  const cl = getCloudinary();
  const result = await cl.uploader.upload(base64Data, {
    folder,
    resource_type: 'auto',
  });
  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

export async function deleteImage(publicId) {
  if (!publicId) return;
  const cl = getCloudinary();
  await cl.uploader.destroy(publicId);
}

export async function replaceImage(publicId, base64Data, folder = 'arjo-studios') {
  if (publicId) {
    await deleteImage(publicId);
  }
  return uploadImage(base64Data, folder);
}
