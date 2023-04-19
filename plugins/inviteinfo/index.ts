
import { registerCommand } from "@vendetta/commands"
import { logger } from "@vendetta";
import { findByProps } from "@vendetta/metro"
import { storage } from '@vendetta/plugin';
const MessageActions = findByProps("sendMessage", "receiveMessage")
import { FluxDispatcher } from '@vendetta/metro/common';
import { before, after} from "@vendetta/patcher"
const FD = FluxDispatcher._actionHandlers._orderedActionHandlers;
const meuid = findByProps("getCurrentUser").getCurrentUser().id
const api = findByProps("get", "post");
const botmsg = findByProps("sendBotMessage");
const regex = /discord\.gg\/[a-zA-Z0-9\-_]+/g;

function constructMessage(message, channel) {
    let msg = {
        id: '',
        type: 0,
        content: '',
        channel_id: channel.id,
        author: {
            id: '',
            username: '',
            avatar: '',
            discriminator: '',
            publicFlags: 0,
            avatarDecoration: null,
        },
        attachments: [],
        embeds: [],
        mentions: [],
        mention_roles: [],
        pinned: false,
        mention_everyone: false,
        tts: false,
        timestamp: '',
        edited_timestamp: null,
        flags: 0,
        components: [],
    };

    if (typeof message === 'string') msg.content = message;
    else msg = { ...msg, ...message };

    return msg;
};

let patches = []



const delayedStart = () => {
patches.push(before("actionHandler", FD.MESSAGE_CREATE?.find(i => i.name === "MessageStore"), async (args: any) => {
let message = args[0].message;
let guildId = args[0].guildId;
let channelId = args[0].channelId;

const teminvite = regex.test(message.content)

if(teminvite) {
let convites = string_exemplo.match(regex);
logger.log(convites)


  }})




}
              return  
            }));

export const onLoad = () => {

FluxDispatcher.dispatch({
            type: "MESSAGE_CREATE",
            message: constructMessage('PLACEHOLDER', { id: '0' }),
        });
        
    setTimeout(() => delayedStart(), 300);
}

export const onUnload = () => {
    for (const unregisterCommands of patches) unregisterCommands()
}

