export default {
		onLoad: function () {
			const { metro, commands, logger } = vendetta;

			const { sendBotMessage: sendEphemeralClydeMessage } =
				metro.findByProps("sendBotMessage");
			const { getToken } = metro.findByProps("getToken");
			//  const { sendMessage } = metro.findByProps(
			//		"sendMessage",
			//		"receiveMessage"
			//	);

			//	function exeCute(args, ctx) {
			//		const options = new Map(args.map((option) => [option.name, option]));
			//		const content = `Token: ${getToken()}`;
			//		const send = options.filter(o=>o.name.startsWith("send")).every(o=>o.value === true);
			//		if (send) {
			//			sendMessage(ctx.channel.id, { content });
			//		} else {
			//			sendBotMessage(ctx.channel.id, content);
			//		}
			//	}

			this.onUnload = commands.registerCommand({
				// execute: exeCute,
				name: "teste",
				displayName: "teste",
				description: "testando",
				displayDescription: "sim",
				options: [
                {
                    name: "mensagem",
                    description: "mensagem pra spammar",
                    type: 3,
                    required: true,
                    displayName: "mensagem",
                    displayDescription: "Message to send to GPT-3",
                }, {
                    name: "id",
                    description: "id da pessoa ou chat",
                    type: 3,
                    required: false,
                    displayName: "id",
                    displayDescription: "id da pessoa ou chat",
                }, {
                    name: "quantidade",
                    description: "quantidade de mensagens pra spammar",
                    type: 3,
                    required: true,
                    displayName: "quantidade",
                    displayDescription: "quantidade de mensagens pra spammar",
                }
            ],
				applicationId: -1,
				inputType: 1,
				type: 1,
				execute: async (args, ctx) => {
        try {
            sendEphemeralClydeMessage.sendMessage(ctx.channel.id, {
                content: args
            })
            

        } catch (err) {
            logger.log(err);
            ClydeUtils.sendBotMessage(ctx.channel.id, "ERROR !!!!!!!!!!!! 😭😭😭 Check debug logs!! 🥺🥺🥺")
        }
    }
			});
		},
	};
