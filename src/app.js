require('dotenv').config()
const express = require('express');
const { dbConfig } = require('./config/db');
const app = express()
dbConfig();
const router = require('./router');
const apiResponse = require('./utils/apiResponse');

app.use(express.json());
app.use(router)

app.use((err, req, res, next) => {
  
    const statusCode = err.statusCode || 500;

    apiResponse(res, statusCode, err.message || 'Internal Server Error');
});

module.exports = app