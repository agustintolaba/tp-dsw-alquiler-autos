import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Definir la carpeta de destino para almacenar el archivo aqui
    const path = "./images";
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: function (req, file, cb) {
    // Definir el nombre del archivo
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

export { upload };
