const axios = require("axios");

class lineNotify {
	constructor(_accessToken) {
		this.accessToken = _accessToken;
		this.headers = {
			'Content-Type': "application/x-www-form-urlencoded",
			'Authorization': "Bearer " + this.accessToken
		}
	}

	options = {
		url: "https://notify-api.line.me/api/notify",
		method: "POST",
		headers: {},
		json: true,
		data: ""
	}

	setRequest = (_message, _imageURL) => {
		this.options.headers = this.headers;
		const param = new URLSearchParams("");
		param.append("message", _message);
		if (_imageURL != undefined) {
			data["imageFullsize"] = _imageURL;
			data["imageThumbnail"] = "https://example.com";
		}
		this.options.data = param.toString();
	}

	getResponse = async () => {
		axios.request(this.options).then(res => {
			console.log(res.data);
		}).catch(err => {
			console.error(err);
		});
	}
}

module.exports = lineNotify;