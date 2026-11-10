const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Railway and other hosts use this endpoint for readiness checks.
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', service: 'mini-mishu', version: '2.0.1' });
});

const pairRouter = require('./main');
app.use('/', pairRouter);

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});

module.exports = app;
