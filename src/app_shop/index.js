'use strict';

// const KoaCrab = require('koacrab');
const KoaCrab = require('../../koacrab/');
const config = require('./config/site.config.js');

const app = new KoaCrab();
app.init(config.port);
