const Router = require('express').Router;
const fileController = require('../controllers/file-controller');
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware'); 

//api/file

router.post('/upload', authMiddleware, fileController.uploadFile);
router.delete('/:id', authMiddleware, fileController.deleteFile);
router.get('', authMiddleware, fileController.getFiles);
router.put('/:id', authMiddleware, fileController.updateFile)
//router.get('/examples', fileController.createExamples);

module.exports = router;
