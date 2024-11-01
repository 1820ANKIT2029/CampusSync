import path from 'path';

export const getResourceType = (file) => {
  const mimeType = file.mimetype;
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (mimeType.startsWith('image/')) {
    return 'image';
  } else if (mimeType.startsWith('video/') || ['.mp4', '.avi', '.mov'].includes(fileExtension)) {
    return 'video';
  } else {
    return 'raw'; // Default to 'raw' for PDFs, docs, zip files, etc.
  }
};