const configTwit = require("./configTwitter")
const Twitter = require("twitter")
const T = new Twitter(configTwit)
const discu = require("./commands/twitterDiscussion")
const dicof = require("./commands/dicoTwitter.js")
const config = require("./config.json")


let lastid
let dico = dicof.dico
let channelTw;


var stream = T.stream("statuses/filter", { track: config.track })
stream.on('data', (tweet) => {

	if (lastid !== tweet.id_str && tweet.user.screen_name !== config.twitterBotName.substring(1) && !JSON.stringify(tweet).includes("retweeted_status") && validate(tweet.text)) {//if not a already traited tweet, not a bot's tweet, not a retweet 
		try {
			let args = tweet.text.split(" ")
			let commandFile = require(`./twitter/${args[1]}.js`)

			commandFile.run((answer) => {
				let param = {
					status: "@" + tweet.user.screen_name + " " + answer,
					in_reply_to_status_id: tweet.id_str
				}
				T.post("statuses/update", param, (err, data, response) => {
					if (err) {
						console.log(err)
					}
					lastid = tweet.id_str

				})
				return
			});

		} catch (error) {
			discu.run(tweet.text.substring(10), (answer) => {
				if (validate(answer)) {
					let param = {
						status: "@" + tweet.user.screen_name + " " + answer,
						in_reply_to_status_id: tweet.id_str,
					}
					T.post("statuses/update", param, (_err, data) => {
						lastid = tweet.id_str

						let embed = {
							"description": tweet.text,
							"color": 3318440,
							"thumbnail": {
								"url": tweet.user.profile_image_url
							},
							"author": {
								"name": "@" + tweet.user.screen_name,
								"url": "https://twitter.com/" + tweet.user.screen_name,
								"icon_url": tweet.user.profile_image_url
							}
						};
						channelTw.send("Un nouveau tweet !!", { embed });
					})
				} else {
					console.log("This answer was not friendly dud'")
				}
			})

		}
	} else if (lastid !== tweet.id_str && !JSON.stringify(tweet).includes("retweeted_status") && validate(tweet.text)) {
		let embed = {
			"description": tweet.text,
			"color": 3318440,
			"thumbnail": {
				"url": tweet.user.profile_image_url
			},
			"author": {
				"name": "@" + tweet.user.screen_name,
				"url": "https://twitter.com/" + tweet.user.screen_name,
				"icon_url": tweet.user.profile_image_url
			}
		};
		console.log("https://twitter.com/" + tweet.screen_name)
	}
})

function validate(text) {//check by dictionary if the string is acceptable
	text = text.toLowerCase()
	for (let i in dico) {
		if (text.includes(dico[i])) {
			console.log("pb ->" + dico[i] + " " + text)
			return false;
		}
	}
	return true
}