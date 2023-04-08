import { registerCommand } from "@vendetta/commands";
import { findByProps,findByName} from "vendetta/metro";
let command;

const ClydeUtils = findByProps("sendBotMessage")

export default {
    onLoad: () => {
        command = registerCommand({ 
            name: "spam",
            displayName: "spam",
            displayDescription: "spammar sua mensagem no chat",
            description: "spam no chat.",

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

            execute: async (args, ctx) => {
                ClydeUtils.sendBotMessage(ctx.channel.id, args)

            },
             // @ts-ignore
            applicationId: -1,
            inputType: 1,
            type: 1,
        });

        


    },

    onUnload: () => {
        command();

    },
}
