const multer = require("multer");
const path = require("path");

const ALLOWED_EXTENSIONS = new Set([".csv", ".xlsx", ".xls"]);

const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, callback) => {
    const extension = path.extname(file.originalname || "").toLowerCase();

    if (!ALLOWED_EXTENSIONS.has(extension)) {
      callback(new Error("Only CSV, XLSX, and XLS files are supported"));
      return;
    }

    callback(null, true);
  },
});

module.exports = upload;
