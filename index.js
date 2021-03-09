#!/usr/bin/env node
const cli = require("cac")("irozaro");
const prompts = require("prompts");
const setAccessToken = require("./src/setAccessToken");
const sendMessage = require("./src/index");

// アプリのバージョン
cli.version("1.1.0");
// ヘルプページを用意
cli.help();

// サブコマンドinit
cli.command("init", "初期設定を行なう").action(async () => {
	let question = {
		type: "text",
		name: "accessToken",
		message: "Your LINE Notify Access Token"
	};
	let answer = await prompts(question);
	setAccessToken(answer.accessToken);
	sendMessage("Hello Irozaro!", "");
});

// サブコマンドsend
cli.command("send", "対話的にメッセージを作成する").action(async () => {
	let questions = [
		{
			type: "text",
			name: "message",
			message: "メッセージを入力して下さい"
		},
		{
			type: "text",
			name: "imageUrl",
			message: "画像を追加しますか?"
		},
		{
			type: "confirm",
			name: "confirmation",
			message: "Send a message",
			initial: true

		}
	];
	let answer = await prompts(questions);
	if (answer.confirmation) {
		sendMessage(answer.message, answer.imageUrl);
	}
});

// オブションの指定でもメッセージを送信することができる
cli.option("-m, --message <string>", "送信したいメッセージ");
cli.option("-i, --image <url>", "送信したい画像のURLを指定", {
	defalt: ""
});

const parsed = cli.parse();
if (parsed.options.message !== undefined) {
	sendMessage(parsed.options.message, parsed.options.image);
}