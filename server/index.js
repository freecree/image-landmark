require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth.routes');
const fileRouter = require('./routes/file.routes');
const errorMiddleware = require('./middlewares/error-middleware');
const filePathMiddleware = require('./middlewares/filepath-middleware.js');


const PORT = process.env.PORT || 5000;
const app = express();
app.use(fileUpload({}));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/files', express.static(__dirname + '/files'));
app.use(filePathMiddleware(path.resolve(__dirname, 'files')));
app.use('/api', authRouter);
app.use('/api/file', fileRouter);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {console.log(`Server started on PORT = ${PORT}`);})
    } catch(e) {
        console.log(e);
    }
}

start();