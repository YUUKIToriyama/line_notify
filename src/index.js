#!/usr/bin/env node
const fs = require("fs");
const lineNotify = require("./lineNotify");

module.exports = (message, image) => {
	const accessToken = fs.readFileSync(process.env["HOME"] + "/.irozaro");

	const notify = new lineNotify(accessToken);
	notify.setRequest(message, image);
	notify.getResponse();
}