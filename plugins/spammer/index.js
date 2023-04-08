export default {
		onLoad: function () {
			const { metro, commands, logger } = vendetta;

			const { sendBotMessage: sendEphemeralClydeMessage } =
				metro.findByProps("sendBotMessage");
			const MessageActions = metro.findByProps("sendMessage", "receiveMessage")
			//const { getToken } = metro.findByProps("getToken");
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
/*
[
  {
    "type": 3,
    "name": "mensagem",
    "value": "a"
  },
  {
    "type": 3,
    "name": "id",
    "value": "b"
  },
  {
    "type": 3,
    "name": "quantidade",
    "value": "c"
  }
]
*/


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
                    displayDescription: "mensagem pra mandar",
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
            let mensagem = args.find((sla) => sla.name == "mensagem");
            let quantidade = args.find((sla) => sla.name == "quantidade");
            
            let id = args.find((sla) => sla.name == "id");
            if(id) {
            id = id.value
            } else {
            id = ctx.channel.id
            }
           
             for(let i = 0; i < quantidade.value; i++) {
await MessageActions.sendMessage(id, {
                content: mensagem.value
            });
};

        
            sendEphemeralClydeMessage(ctx.channel.id, `${JSON.stringify(args, null, 2)}`)
            

        } catch (err) {
            logger.log(err);
            sendEphemeralClydeMessage(ctx.channel.id, err)
        }
    }
			});
		},
	};
	


