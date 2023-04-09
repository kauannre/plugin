export default {
		onLoad: function () {
			const { metro, commands, logger } = vendetta;

			const { sendBotMessage: sendEphemeralClydeMessage } =
				metro.findByProps("sendBotMessage");
			const MessageActions = metro.findByProps("sendMessage", "receiveMessage")
			const { getToken } = metro.findByProps("getToken");

const changehype = async function (id) {
      const response = await fetch("https://discord.com/api/v9/hypesquad/online", {
  method: "POST",
  headers: {
    accept: "*/*",
    "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    authorization: getToken(),
    "content-type": "application/json",
    "sec-ch-ua":
      '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-debug-options": "bugReporterEnabled",
    "x-discord-locale": "pt-BR",
    cookie:
      "__dcfduid=591526a0cffc11ed8785d308fd96588a; __sdcfduid=591526a1cffc11ed8785d308fd96588a9257e41b4ea9be56711f45d16d700a86182aba55c6e7e33a5fb6d1bb0cb90d14; __cfruid=33c331dfd6aea57a4551921bb67c0773334d689b-1680291825; locale=pt-BR; OptanonConsent=isIABGlobal=false&datestamp=Fri+Mar+31+2023+16%3A48%3A44+GMT-0300+(Hor%C3%A1rio+Padr%C3%A3o+de+Bras%C3%ADlia)&version=6.33.0&hosts=&consentId=7907770a-5908-4465-ab6e-9a1ca987900c&interactionCount=1&landingPath=https%3A%2F%2Fdiscord.com%2F&groups=C0001%3A1%2CC0002%3A0%2CC0003%3A0; __cf_bm=lswT0dpaJ_CozM2DQ9A0W2dCbDTT5LNFOb2.fFVyyOY-1680292126-0-AeUX1oGMGEViZiUoI5/oy3L5O/7mGsKq0FwrbZ13ETrKC1wl4Fw7LVlj1LkkRnYfbyNmkY/3J1A/u82p17GzJSzcGySq/mAG3UfNkvTGeBxCAoz5CoaVItURpw7cqENAsQ==",
    Referer: "https://discord.com/channels/@me",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  body: JSON.stringify({ house_id: id })
});

      const resp = await response.json();
      return resp;
    }

			this.onUnload = commands.registerCommand({
				// execute: exeCute,
				name: "hypesquad",
				displayName: "hypesquad",
				description: "change hypesquad",
				displayDescription: "change hypesquad",
				options: [
                {
                    name: "new",
                    description: "new hypesquad ",
                    type: 2,
                    required: true,
                    displayName: "new",
                    displayDescription: "new hypesquad",
                    choices: [ 
                 { 
                   name: "bravery", 
                   value: 1
                 }, 
                 { 
                   name: "Brilliance", 
                   value: 2
                 }, 
                 { 
                   name: "Balance", 
                   value: 3
                 } 
           ]
                }
                 ],
				applicationId: -1,
				inputType: 1,
				type: 1,
				execute: async (args, ctx) => {
        try {
            let hypesquadid = args.find((sla) => sla.name == "new").value;
            
            await changehype(hypesquadid)
        
            sendEphemeralClydeMessage(ctx.channel.id, `done, hypesquad changed!`)
            

        } catch (err) {
            logger.log(err);
            sendEphemeralClydeMessage(ctx.channel.id, "error, look at the debug")
        }
    }
			});
		},
	};
	
