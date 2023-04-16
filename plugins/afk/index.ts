// some of the code taken from aeongdesu & original emnity plugin by spinfal (most of the code is from spinfal)
import { registerCommand } from "@vendetta/commands"
import { logger } from "@vendetta";
import { findByProps } from "@vendetta/metro"
import Settings from "./settings";
import { storage } from '@vendetta/plugin';
const MessageActions = findByProps("sendMessage", "receiveMessage")
import { FluxDispatcher } from '@vendetta/metro/common';
import { before, after} from "@vendetta/patcher"
const FD = FluxDispatcher._actionHandlers._orderedActionHandlers;
//const Channels = findByProps('getLastSelectedChannelId')
//const BotMessage = findByProps('createBotMessage')
//const Avatars = findByProps("BOT_AVATARS")
const meuid = findByProps("getCurrentUser").getCurrentUser().id

const MessageActions = findByProps("sendMessage", "receiveMessage")

let patches = []

patches.push(before("actionHandler", FD.MESSAGE_CREATE?.find(i => i.name === "MessageStore"), (args: any) => {
let message = args[0].message;
let guildId = args[0].guildId;
let channelId = args[0].channelId;
if(message.content.includes("<@" + meuid + ">")) {
MessageActions.sendMessage(channelId, {
                content: storage.afk,
                "messageReference": {
        "message_id": message.id,
        "guild_id": guildId,
        "channel_id": channelId
    }
            });

}
                
            }));
            
export const settings = Settings;

export const onLoad = () => {
    storage.modafk ??= false
    storage.afk ??= "to afk"
}

export const onUnload = () => {
    for (const unregisterCommands of patches) unregisterCommands()
}

/*
/eval code:const { findByProps,findByName} = vendetta.metro;
const CurrentUserStore = findByProps("getCurrentUser")
JSON.stringify(CurrentUserStore.getCurrentUser())

MessageActions.sendMessage(id, {
                content: mensagem.value,
                "messageReference": {
        "channel_id": "1096955219834835004",
        "guild_id": "1096955219386052628",
        "message_id": "1097010107910459522"
    },
            });
            
            
*/
