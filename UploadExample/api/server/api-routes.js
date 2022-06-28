const fs = require('fs');
const path = require('path');
const multer = require('multer');

/**
 * 创建上传文件夹
 */
const uploadFolder = path.resolve(__dirname, '../../uploadfiles');

const createFolder = (folder) => {
  try {
    fs.accessSync(folder);
  } catch (error) {
    fs.mkdirSync(folder);
  }
};

createFolder(uploadFolder);

/**
 * 生成可控制上传文件存储的对象
 */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadFolder);
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}-${Date.now()}`);
  }
});

const upload = multer({ storage: storage });


/**
 *
 */
module.exports = (express, app, config) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send('Hello World!');
  });

  router.post('/upload', upload.array('logo', 2), (req, res) => {
    const file = req.files;

    console.log(`\n\x1b[32m----- file.length = ${file.length} -----\n`);
    console.log(`\n\x1b[32m----- file = ${JSON.stringify(file)} -----\n`);

    res.send({ ret_code: '0' });
  });

  app.use('/', router);
};
