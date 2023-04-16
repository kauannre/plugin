export default {
		onLoad: function () {
			const { metro, commands, logger } = vendetta;

			const { sendBotMessage: sendEphemeralClydeMessage } =
				metro.findByProps("sendBotMessage");
			const MessageActions = metro.findByProps("sendMessage", "receiveMessage")

function googleTranslate(text, sourceLang, targetLang) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to translate text: ${response.status} ${response.statusText}`);
      }

      return response.json();
    })
    .then(data => {
      const translations = data[0].map(x => x[0]);

      return translations.join('');
    });
}
/*
googleTranslate('Hello world!', '', 'fr').then(translation => {
  vendetta.metro.findByProps("sendMessage", "receiveMessage").sendMessage(`1096955219834835004`, {
            content: translation
        })
});*/

			this.onUnload = commands.registerCommand({
				// execute: exeCute,
				name: "translate",
				displayName: "translate",
				description: "translate your message",
				displayDescription: "translate your message",
				options: [
                {
                    name: "text",
                    description: "text to translate",
                    type: 3,
                    required: true,
                    displayName: "text",
                    displayDescription: "text to translate",
                }, {
                    name: "fromLang",
                    description: "language that the text is(use like this: en, fr, pt...)",
                    type: 3,
                    required: false,
                    displayName: "fromLang",
                    displayDescription: "language that the text is(use like this: en, fr, pt...)",
                }, {
                    name: "toLang",
                    description: "what language are you going to translate to (use like this: en, FR, pt...)",
                    type: 3,
                    required: true,
                    displayName: "toLang",
                    displayDescription: "what language are you going to translate to (use like this: en, fr, pt...)",
                }, {
        name: "send",
        displayName: "send",
        description: "send the message? (if you have deactivated it will appear only for you)",
        displayDescription: "send the message? (if you have deactivated it will appear only for you)",
        required: false,
        type: 5
                  }
                 ],
				applicationId: -1,
				inputType: 1,
				type: 1,
				execute: async (args, ctx) => {
        try {
            let mensagem = args.find((sla) => sla.name == "text");
            let from = args.find((sla) => sla.name == "fromLang");
            let send = args.find((sla) => sla.name == "send");
            
            let to = args.find((sla) => sla.name == "toLang");
            if(from) {
            from = id.value
            } else {
            from = "pt"
            }
            
             let traduzir = await googleTranslate(mensagem, from, to)
             
             if(send && send.value) {
await MessageActions.sendMessage(ctx.channel.id, {
                content: traduzir
            });
            } else {
            sendEphemeralClydeMessage(ctx.channel.id, traduzir)
            }


        
        //    sendEphemeralClydeMessage(ctx.channel.id, `pronto!`)
            

        } catch (err) {
            logger.log(err);
            sendEphemeralClydeMessage(ctx.channel.id, err)
        }
    }
			});
		},
	};
	


