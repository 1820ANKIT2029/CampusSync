import multer, { diskStorage } from 'multer';

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Temporary storage
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
export const uploadstorage = multer({ storage: storage });