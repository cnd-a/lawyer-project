/* TODO:
 * Implement a way to compress image into JPG
 * Encrypt image
*/
const path = require('path');
const multer = require('multer');

// This function uses multer library to parse image as a request object. The current user image is saved normally in the filesystem. TODO: Encrypt the images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');},
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    const formatted = `${hours}_${minutes}_${seconds}-${day}-${month}-${year}${ext}`;
    cb(null, formatted);  
  }
})

const fileFilter = (req, file, cb) => {
  //Checks if the user uploads .jpg .png
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    return cb(new Error("File type invalid"), false);
  }
  cb(null, true);
}

const upload = multer({ 
  storage,
  limits: {
    fileSize: 3 * 1024 * 1024, // Limits file upload to 3MB
  },
  fileFilter
});

module.exports = upload;
