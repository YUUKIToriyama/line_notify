import fs from 'fs';
import path from 'path';
import axios, { AxiosRequestConfig } from 'axios';

export default class LineNotify {
	headers: AxiosRequestConfig["headers"];
	data: AxiosRequestConfig["data"];
	constructor(accessToken?: string) {
		if (accessToken === undefined) {
			const filePath = path.join(process.env["HOME"], ".irozaro");
			console.log(filePath);
			// コンストラクタにアクセストークンが与えられない場合は~/.irozaroファイルがないか確認
			if (fs.existsSync(filePath)) {
				// 存在する場合はそのファイルを読み込む
				accessToken = fs.readFileSync(filePath, {
					encoding: "utf8"
				}).trim();
			} else {
				throw Error(`Cannot find ${filePath}`);
			}
		} else {
			console.info("~/.irozaro にアクセストークンを保存しておくと便利です。");
		}
		this.headers = {
			'Content-Type': "application/x-www-form-urlencoded",
			'Authorization': `Bearer ${accessToken}`
		}
	}

	checkConnectivity = () => {
		axios.request({
			url: "https://notify-api.line.me/api/status",
			method: "POST",
			headers: this.headers
		}).then(response => {
			console.log(response);
		});
	}

	sendMessage = (message: string, imageURL?: string) => {
		const param = new URLSearchParams("");
		param.append("message", message);
		if (imageURL != undefined) {
			param.append("imageFullsize", imageURL);
			param.append("imageThumbnail", "https://example.com");
		}
		this.data = param.toString();

		axios.request({
			url: "https://notify-api.line.me/api/notify",
			method: "POST",
			headers: this.headers,
			data: this.data
		}).then(response => {
			console.log(response.data);
		}).catch(error => {
			console.error(error);
		});;
	}
}
