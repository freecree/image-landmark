const Router = require('express').Router;
const fileController = require('../controllers/file-controller');
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware'); 



router.post('/upload', authMiddleware, fileController.uploadFile);
router.delete('/', authMiddleware, fileController.deleteFile);
router.get('/:id', authMiddleware, fileController.getFile)
router.get('', authMiddleware, fileController.getFiles)
router.get('/markings', authMiddleware, fileController.getFilesMarkings)
//router.get('/mark', authMiddleware, fileController.getFilesMarkings)

module.exports = router;