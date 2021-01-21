#!/usr/bin/env node
const meow = require("meow");
const lineNotify = require("./src/lineNotify");
const accessToken = require("./src/accessToken");

const cli = meow(
	`
	Usage
		$node cli.js <input>
	Options
		--message, -m	message
		--image, -i	image url
	Examples
		$node cli.js -m "Hello, my favarite photo for you!" -i "https://upload.wikimedia.org/wikipedia/ja/thumb/6/61/Wataraseriver.jpg/300px-Wataraseriver.jpg"
	`, {
	flags: {
		message: {
			type: "string",
			alias: "m",
			default: "Hello!"
		},
		image: {
			type: "string",
			alias: "i"
		}
	}
}
);

const notify = new lineNotify(accessToken);
notify.setRequest(cli.flags.message, cli.flags.image);
notify.getResponse();