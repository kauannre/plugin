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

let patches = []

patches.push(before("actionHandler", FD.MESSAGE_CREATE?.find(i => i.name === "MessageStore"), (args: any) => {
console.log(storage.afk)
                
            }));
            
export const settings = Settings;

export const onLoad = () => {
    storage.modafk ??= false
    storage.afk ??= "to afk"
}

export const onUnload = () => {
    for (const unregisterCommands of patches) unregisterCommands()
}
