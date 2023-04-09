export default {
		onLoad: function () {
			const { metro, commands, logger } = vendetta;

			const { sendBotMessage: sendEphemeralClydeMessage } =
				metro.findByProps("sendBotMessage");
			const MessageActions = metro.findByProps("sendMessage", "receiveMessage")
			const { getToken } = metro.findByProps("getToken");
			const api = metro.findByProps("get", "post");

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
                    type: 3,
                    required: true,
                    displayName: "new",
                    displayDescription: "new hypesquad",
                }
                 ],
				applicationId: -1,
				inputType: 1,
				type: 1,
				execute: async (args, ctx) => {
        try {
            let hypesquadid = args.find((sla) => sla.name == "new").value.toLowerCase();
            let newid = null
            if(hypesquadid == "bravery" || hypesquadid == "1") {
            newid = 1
            } else if (hypesquadid == "brilliance" || hypesquadid == "2") {
            newid = 2
            } else if (hypesquadid == "balance" || hypesquadid == "3" ) {
            newid = 3
            } else{
            newid = null
            }
            
            if(newid) {
            await api.post({ url: '/hypesquad/online', body: JSON.stringify({ house_id: hypesquadid })})
            sendEphemeralClydeMessage(ctx.channel.id, `EN: done, hypesquad changed!\n\nBR: pronto, hypesquad mudado!`)
            } else {
            sendEphemeralClydeMessage(ctx.channel.id, `EN this hypesquad does not exist, the allowed ones are:\n\nbravery or 1\nBrilliance or 2\nBalance or 3\n\nBR este hypesquad não existe, os permitidos são:\n\nbravery ou 1\nBrilliance ou 2\nBalance ou 3`)
            }
            
        } catch (err) {
            logger.log(err);
            sendEphemeralClydeMessage(ctx.channel.id, "error, look at the debug")
        }
    }
			});
		},
	};
	


