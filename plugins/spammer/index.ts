// some of the code taken from aeongdesu & original emnity plugin by spinfal (most of the code is from spinfal)
import { registerCommand } from "@vendetta/commands"
import { logger } from "@vendetta";
import { findByProps } from "@vendetta/metro"
import Settings from "./settings";
import { storage } from '@vendetta/plugin';

const MessageActions = findByProps("sendMessage", "receiveMessage")

let commands = []
const ClydeUtils = findByProps("sendBotMessage")
const Locale = findByProps("Messages")

commands.push(registerCommand({
    name: "spam",
    displayName: "spamk",
    description: "spammar no chat",
    displayDescription: "spam no chat",
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
    applicationId: "-1",
    inputType: 1,
    type: 1,
    execute: async (args, ctx) => {
        try {
            MessageActions.sendMessage(ctx.channel.id, {
                content: args
            })
            

        } catch (err) {
            logger.log(err);
            ClydeUtils.sendBotMessage(ctx.channel.id, "ERROR !!!!!!!!!!!! 😭😭😭 Check debug logs!! 🥺🥺🥺")
        }
    }
}))

export const settings = Settings;

export const onLoad = () => {
}
 
export const onUnload = () => {
    for (const unregisterCommands of commands) unregisterCommands()
}
