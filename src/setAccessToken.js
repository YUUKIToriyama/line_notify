/* setAccessToken.js */

const fs = require("fs");

module.exports = (token) => {
	const settingfilePath = process.env["HOME"] + "/.irozaro";
	fs.writeFile(settingfilePath, token, (error) => {
		if (error) {
			throw error;
		} else {
			console.log("You can see your access token at " + settingfilePath);
		}
	})
}