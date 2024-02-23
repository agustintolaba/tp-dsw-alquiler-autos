import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Definir la carpeta de destino para almacenar el archivo aqui
        cb(null, './images');
    },
    filename: function (req, file, cb) {
        // Definir el nombre del archivo
        cb(null, file.fieldname + '-' + Date.now());
    }
});
const upload = multer({ storage: storage });
export { upload };
//# sourceMappingURL=multerConfig.js.map