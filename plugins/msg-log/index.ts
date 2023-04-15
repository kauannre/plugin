import { FluxDispatcher } from '@vendetta/metro/common';
import { before, after} from "@vendetta/patcher"
import { findByProps } from "@vendetta/metro"
import { logger } from "@vendetta"
const FD = FluxDispatcher._actionHandlers._orderedActionHandlers;
const MessageActions = findByProps("sendMessage", "receiveMessage")
const BotMessage = findByProps("createBotMessage");



const patches = [];

patches.push(before(FluxDispatcher, "dispatch", ctx => {
            const [args] = ctx.args;
            
         if (args.type === "MESSAGE_UPDATE") {
         try {
                let msgantiga = findByProps("getMessage", "getMessages").getMessage(args.channelid, args.id)?.content
                
                let message = args?.content;
                if (!message) return;
                if (!msgantiga) return;
                    args.content = msgantiga + " `[edited]`\n" + message;
            } catch (e) {}
         
         
         }
            
            })



//const RowManager = findByName("RowManager");
/*
patches.push(before("actionHandler", FD.MESSAGE_UPDATE?.find(i => i.name === "MessageStore"), (args: any) => {
                try {
                let msgantiga = findByProps("getMessage", "getMessages").getMessage(args[0].message.channel_id, args[0].message.id)?.content
                
                let message = args[0]?.message?.content;
                if (!message) return;
                if (!msgantiga) return;
                    args[0].message.content = msgantiga + " `[edited]`\n" + message;
            } catch (e) {}
            }));
            



patches.push(before("actionHandler", FD.PASSIVE_UPDATE_V1, args => {
console.log(args)
/*
                try {
                
                let msgantiga = findByProps("getMessage", "getMessages").getMessage(args[0].message.channel_id, args[0].message.id)?.content
                
                let message = args[0]?.message?.content;
                if (!message) return;
                if (!msgantiga) return;
                let msg = BotMessage.createBotMessage({channelId: args[0].message.channel_id, content: msgantiga + "[deleted]\n" + message});
msg.author = { username: "/vibrate", avatar: "clyde" };

MessageActions.receiveMessage(args[0].message.channel_id, msg);
                
                
                //    args[0].message.content = msgantiga + " `[edited]`\n" + message;
                    
            } catch (e) {}
            }));*/




/*
MESSAGE_DELETE


/eval code:const { findByProps,findByName} = vendetta.metro;
const MessageActions = findByProps("sendMessage", "receiveMessage")
const BotMessage = findByProps("createBotMessage");

let msg = BotMessage.createBotMessage({channelId: "1087872026796097657", content: "hello"});
msg.author = { username: "/vibrate", avatar: "clyde" };

MessageActions.receiveMessage("1087872026796097657", msg);


*/
export const onUnload = () => patches.forEach((unpatch) => unpatch());
