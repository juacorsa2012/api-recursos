const mongoose = require('mongoose');
const { chai, server, should } = require("./config");

const Editorial  = require('../../models/editorial');
const editorial1 = 'Editorial 1';
const editorial2 = 'Editorial 2';
const api   = '/api/v1/editoriales';
