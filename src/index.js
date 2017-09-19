'use strict';

const path = require('path');
const rootPath = path.dirname(__dirname);
const server = require('../core/app');

const app = new server(__dirname);
app.run();