import { FluxDispatcher } from '@vendetta/metro/common';
import { before, after} from "@vendetta/patcher"
import { findByProps } from "@vendetta/metro"
import { logger } from "@vendetta"
const FD = FluxDispatcher._actionHandlers._orderedActionHandlers;
const MessageActions = findByProps("sendMessage", "receiveMessage")
const BotMessage = findByProps("createBotMessage");
const Avatars = findByProps("BOT_AVATARS")

const patches = [];


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

//const RowManager = findByName("RowManager");

const delayedStart = () => {
    try {
patches.push(before("actionHandler", FD.MESSAGE_UPDATE?.find(i => i.name === "MessageStore"), (args: any) => {
                try {
                let msgantiga = findByProps("getMessage", "getMessages").getMessage(args[0]?.message?.channel_id, args[0]?.message.id)?.content
                
                
                let message = args[0]?.message?.content;
                if (!message) return;
                if (!msgantiga) return;
                    args[0].message.content = msgantiga + " `[editada]`\n" + message;
            } catch (e) {}
            }));
            



patches.push(before("actionHandler", FD.MESSAGE_DELETE?.find(i => i.name === "MessageStore"), (args: any) => {
                
                //console.log(args)
                try {
                let msgantiga = findByProps("getMessage", "getMessages").getMessage(args[0].channelId, args[0].id)
                
               // let message = args[0]?.message?.content;
           //     if (!message) return;
                if (!msgantiga) return;
                if (msgantiga.author.id == "000") return;
            
let msg = BotMessage.createBotMessage({channelId: args[0].channelId, content: msgantiga.content});
msg.author = { username: msgantiga.author.username + " ANTI DELETE", avatar: msgantiga.author.id, id: "000" };
    Avatars.BOT_AVATARS[msgantiga.author.id] = 'https://cdn.discordapp.com/avatars/'+ msgantiga.author.id + '/' + msgantiga.author.avatar + '.png';

MessageActions.receiveMessage(args[0].channelId, msg);
            } catch (e) {}
            }));

return null;
    } catch (err) {}
    }




export const onLoad = () => {

        logger.log(`ativando o plugin anti delete e anti edit`);
        FluxDispatcher.dispatch({
            type: "MESSAGE_UPDATE",
            message: constructMessage('PLACEHOLDER', { id: '0' }),
        });
        FluxDispatcher.dispatch({
            type: "MESSAGE_DELETE",
            channelId: "0",
            id: "0"
        });
        setTimeout(() => delayedStart(), 300);
}


export default {
    onLoad,
    onUnload: () => {
        logger.log(`Unloading..`);
        for (let unpatch of patches) {
            unpatch();
        };
        logger.log(`unloaded.`);
    }
};

//export const onUnload = () => patches.forEach((unpatch) => unpatch());
