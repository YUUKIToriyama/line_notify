#!/usr/bin/env node
const lineNotify = require("./src/lineNotify");
const accessToken = require("./src/accessToken");

const args = process.argv.slice(2);

const notify = new lineNotify(accessToken);
notify.setRequest(args[0], args[1]);
notify.getResponse();