//eu usei alguns plugins como base pra criar esse mas eu fiz tudo sozinho antes que alguém fale que kibei de gringo.

export default {
		onLoad: function () {
			const { metro, commands, logger } = vendetta;

			const { sendBotMessage: sendEphemeralClydeMessage } =
				metro.findByProps("sendBotMessage");
			const MessageActions = metro.findByProps("sendMessage", "receiveMessage")
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
				name: "spam",
				displayName: "spam",
				description: "spammar mensages no chat",
				displayDescription: "spamar msg no chat(usando sua acc e clyde)",
				options: [
                {
                    name: "mensagem",
                    description: "mensagem pra spammar",
                    type: 3,
                    required: true,
                    displayName: "mensagem",
                    displayDescription: "mensagem pra spammar",
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
                }, {
        name: "clyde",
        displayName: "clyde",
        description: "usar o clyde pra enviar as mensagens",
        displayDescription: "usar o clyde pra enviar as mensagens",
        required: false,
        type: 5
                  }
                 ],
				applicationId: -1,
				inputType: 1,
				type: 1,
				execute: async (args, ctx) => {
        try {
            let mensagem = args.find((sla) => sla.name == "mensagem");
            let quantidade = args.find((sla) => sla.name == "quantidade");
            let clyde = args.find((sla) => sla.name == "clyde");
            
            let id = args.find((sla) => sla.name == "id");
            if(id) {
            id = id.value
            } else {
            id = ctx.channel.id
            }
           
             for(let i = 0; i < quantidade.value; i++) {
             if(!clyde || !clyde.value) {
await MessageActions.sendMessage(id, {
                content: mensagem.value
            });
            } else {
            sendEphemeralClydeMessage(id, mensagem.value)
            }
};

        
            sendEphemeralClydeMessage(ctx.channel.id, `pronto!`)
            

        } catch (err) {
            logger.log(err);
            sendEphemeralClydeMessage(ctx.channel.id, err)
        }
    }
			});
		},
	};
	


