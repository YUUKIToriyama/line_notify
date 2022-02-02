#!/usr/bin/env node
import cac from 'cac';
import prompts from 'prompts';
import config from '@toriyama/config';
import path from 'path';
import LineNotify from './LineNotify.js';

const cli = cac("irozaro");
// アプリのバージョン
cli.version("1.1.0");
// ヘルプページを用意
cli.help();

// サブコマンドinit
cli.command("init", "初期設定を行なう").action(async () => {
	// 設定ファイルを作成
	await config.init({
		message: "Your LINE Notify Access Token",
		filePath: path.join(process.env["HOME"], ".irozaro")
	});
	// 疎通確認
	const notify = new LineNotify();
	notify.checkConnectivity();
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
	let answer = await prompts.prompt(questions);
	const notify = new LineNotify();
	if (answer.confirmation) {
		notify.sendMessage(answer.message, answer.imageUrl);
	}
});

// オブションの指定でもメッセージを送信することができる
cli.option("-m, --message <string>", "送信したいメッセージ");
cli.option("-i, --image <url>", "送信したい画像のURLを指定", {
	default: ""
});

const parsed = cli.parse();
if (parsed.options.message !== undefined) {
	const notify = new LineNotify();
	notify.sendMessage(parsed.options.message, parsed.options.image);
}