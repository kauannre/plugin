export default {
		onLoad: function () {
			const { metro, commands, logger } = vendetta;

			const { sendBotMessage: sendEphemeralClydeMessage } =
				metro.findByProps("sendBotMessage");
			const MessageActions = metro.findByProps("sendMessage", "receiveMessage")
			

const req = async function (msg) {
  const request = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "user",
      "content": msg
    }
  ],
  "max_tokens": 2048
})
  };

  const response = await fetch('https://api.openai.com/v1/chat/completions', request);
  const responseBody = await response.json();
  
  return responseBody
}

			this.onUnload = commands.registerCommand({
				// execute: exeCute,
				name: "gpt3.5",
				displayName: "gpt3.5",
				description: "chat with gpt-3.5",
				displayDescription: "chat with gpt-3.5",
				options: [
                {
                    name: "message",
                    description: "message to send to gpt",
                    type: 3,
                    required: true,
                    displayName: "message",
                    displayDescription: "message to send to gpt",
                }, {
        name: "clyde",
        displayName: "clyde",
        description: "use clyde to send the reply",
        displayDescription: "use clyde to send the reply",
        required: true,
        type: 5
                  }
                 ],
				applicationId: -1,
				inputType: 1,
				type: 1,
				execute: async (args, ctx) => {
        try {
            let mensagem = args.find((sla) => sla.name == "message").value;
            let clyde = args.find((sla) => sla.name == "clyde");
            
            
            
            let resposta = await req(mensagem)
            //logger.log(resposta);
           
             if(!clyde || !clyde.value) {
await MessageActions.sendMessage(ctx.channel.id, {
                content: resposta.choices[0].message.content
            });
            } else {
            await sendEphemeralClydeMessage(ctx.channel.id, resposta.choices[0].message.content)
            }
          //  await sendEphemeralClydeMessage(ctx.channel.id, "pronto")

        } catch (err) {
            logger.log(err);
            sendEphemeralClydeMessage(ctx.channel.id, "error look at the debug!")
        }
    }
			});
		},
	};
	


