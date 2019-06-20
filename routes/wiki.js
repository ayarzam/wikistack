const express = require('express');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');
// ...
const wiki = express();
wiki.use('/wiki', wikiRouter);
wiki.use('/user', userRouter);
