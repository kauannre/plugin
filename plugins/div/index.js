export default {
		onLoad: function () {
			const { metro, commands, logger } = vendetta;

			const { sendBotMessage: sendEphemeralClydeMessage } =
				metro.findByProps("sendBotMessage");
			const MessageActions = metro.findByProps("sendMessage", "receiveMessage")
			



			this.onUnload = commands.registerCommand({
				// execute: exeCute,
				name: "div",
				displayName: "div",
				description: "divulgação global(tem chances de ban)",
				displayDescription: "divulgação global(tem chances de ban)",
				options: [
                {
                    name: "mensagem",
                    description: "mensagem pra divulgação",
                    type: 3,
                    required: true,
                    displayName: "mensagem",
                    displayDescription: "mensagem pra divulgação",
                }, {
        name: "delay",
        displayName: "delay",
        description: "delay de cada mensagem",
        displayDescription: "delay de cada mensagem",
        required: true,
        type: 3
                  }
                 ],
				applicationId: -1,
				inputType: 1,
				type: 1,
				execute: async (args, ctx) => {
        try {
       // logger.log(args);
    //    logger.log(ctx);
        let mensagem = args.find((sla) => sla.name == "mensagem").value;
        let delay = args.find((sla) => sla.name == "delay").value;
        let membros = await vendetta.metro.findByProps("getMembers").getMembers(ctx.guild.id)
        let meuid = await vendetta.metro.findByProps("getCurrentUser").getCurrentUser().id
       // logger.log(membros)
        for (let membro of membros) {
        logger.log(membro.userId)
        
        let iguau = meuid == membro.userId
        if(!iguau) {
         let apirequi = await vendetta.metro.findByProps("get", "post").post({ url: '/users/@me/channels', body: {"recipients":[membro.userId]}})
         const resp = apirequi.body
         logger.log(apirequi.body.id)
         logger.log("id do chat:" + apirequi.body.id)
    await vendetta.metro.findByProps("sendMessage", "receiveMessage").sendMessage(`${apirequi.body.id}`, {
            content: mensagem
        })
    await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
        /*
            let mensagem = args.find((sla) => sla.name == "ip").value;
            let clyde = args.find((sla) => sla.name == "clyde");
            
            let geoip = await getIpInfo(ip)
            
            if(!clyde || !clyde.value) {
await MessageActions.sendMessage(ctx.channel.id, {
                content: geoip
            });
            } else {
            sendEphemeralClydeMessage(ctx.channel.id, geoip)
            }
            */
        } catch (err) {
            logger.log(err);
            sendEphemeralClydeMessage(ctx.channel.id, "error, look at the debug")
        }
    }
			});
		},
	};
