
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


let patches = []

patches.push(before("actionHandler", FD.MESSAGE_CREATE?.find(i => i.name === "MessageStore"), (args: any) => {
let message = args[0].message;
let guildId = args[0].guildId;
let channelId = args[0].channelId;
if(message.content.includes("<@" + meuid + ">") && storage.modafk) {
MessageActions.sendMessage(channelId, {
                content: storage.afk,
                "message_reference": {
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

