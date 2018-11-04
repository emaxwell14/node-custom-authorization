/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const passport = require('passport');
const api = require('./src/route');


const app = express();
const router = express.Router();
const { config } = require('./src/util');

const port = config.getServerPort();

// Define middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./src/middleware/authentication');

// Define routes
// router.use(api.getRouter());

// Error handler
// router.use((err, req, res, next) => {
//     console.log(chalk.red('Error handler: '), err);
//     res.status(500).send('Server Error');
// });

// Add route in app
const loginRoute = require('./src/route/loginRoute');
app.use('/auth', loginRoute);
// app.use('/login', loginRoute.getRouter());
// app.use('/', passport.authenticate('jwt', { session: false }), router);

// Start server
app.listen(port, (err) => {
    if (err) {
        console.log(chalk.red('Server Error: '), err);
    }
    console.log(chalk.blue(`Server is listening on ${port}`));
});
