const multer = require('multer');
const path = require('path');

// Multer konfiguráció
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // A képeket a Frontend/public/Képek mappába mentjük
    cb(null, path.join(__dirname, '../../../Frontend/public/Képek'));
  },
  filename: (req, file, cb) => {
    // Megtartjuk az eredeti fájlnevet, vagy egyedit generálunk ha szükséges
    // Most egyszerűség kedvéért az eredeti nevet használjuk, de érdemes lehet timestamp-et elé tenni
    // cb(null, Date.now() + '-' + file.originalname);
    cb(null, file.originalname);
  }
});

// Fájl típus szűrés (csak képek)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Csak képfájlok tölthetők fel!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

exports.uploadImage = upload.single('image'); // 'image' a mező neve a form-data-ban

exports.handleUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Nem történt fájlfeltöltés' });
  }
  // Visszaküldjük a fájl nevét, amit az adatbázisba menthetünk
  res.json({
    message: 'Fájl sikeresen feltöltve',
    filename: req.file.filename
  });
};
