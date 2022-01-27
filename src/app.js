const express = require('express');
require('./db/mongoose');
const billingRequestRouter = require('./routers/billings');

const app = express();

app.use(express.json());
app.use(billingRequestRouter);

module.exports = app;
