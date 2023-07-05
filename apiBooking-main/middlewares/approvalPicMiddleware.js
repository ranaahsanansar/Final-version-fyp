import multer from "multer";

const approvalFiles = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `public/uploads/approvalRequests`);
    },
    filename: function (req, file, cb) {
      cb(null, `${req.user.email}-${Date.now()}-${file.originalname}`);
    },
  }),
});

export default approvalFiles;