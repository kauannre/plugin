
import { registerCommand } from "@vendetta/commands"
import { logger } from "@vendetta";
import { findByProps } from "@vendetta/metro"
//import Settings from "./settings";
import { storage } from '@vendetta/plugin';
const MessageActions = findByProps("sendMessage", "receiveMessage")
import { FluxDispatcher } from '@vendetta/metro/common';
import { before, after} from "@vendetta/patcher"
const FD = FluxDispatcher._actionHandlers._orderedActionHandlers;
const meuid = findByProps("getCurrentUser").getCurrentUser().id
const api = findByProps("get", "post");


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

const makeAsyncEval = (code: string) => {
    return `
    var __async = (generator) => {
        return new Promise((resolve, reject) => {
            var fulfilled = (value) => {
                try {
                    step(generator.next(value))
                } catch (e) {
                    reject(e)
                }
            }
            var rejected = (value) => {
                try {
                    step(generator.throw(value))
                } catch (e) {
                    reject(e)
                }
            }
            var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected)
            step((generator = generator()).next())
        })
    }
    __async(function*() {
        ${code.replace(/\bawait\b/g, "yield")}
    })
    `
}

// Defina uma função para construir o switch com base na lista de comandos
function buildSwitch(commands) {
  let code = 'switch (arg[0]) {\n';
  commands.forEach(({ name, eval }) => {
    code += `  case "${name}":\n`;
    if (eval.includes("await")) {
      code += `    let result = await (0, eval)(makeAsyncEval("${eval}"));\n`;
    } else {
      code += `    let result = (0, eval)("${eval}");\n`;
    }
    code += `    console.log(result);\n`;
    code += `    break;\n`;
  });
  code += '}';
  return code;
}

// Inicialize a lista de comandos
/*let commands = [
  { name: "oi", eval: `"oioi"` },
  { name: "soma", eval: `"2 + 2"` }
];*/

// Construa o switch inicial
//let switchCode = buildSwitch(commands);

// Imprima o switch inicial
//console.log(switchCode);

// Adicione um novo comando
//commands.push({ name: "subtrai", eval: "10 - 5" });

// Atualize o switch
//switchCode = buildSwitch(commands);

// Imprima o switch atualizado
//console.log(switchCode);




let patches = []



const delayedStart = () => {
    try {
patches.push(before("actionHandler", FD.MESSAGE_CREATE?.find(i => i.name === "MessageStore"), async (args: any) => {
let message = args[0].message;
let guildId = args[0].guildId;
let channelId = args[0].channelId;
const arg = args[0].message.content.split(" ")
const content = args[0].message.content
if(message.content.includes("<@" + meuid + ">")) {
buildSwitch(storage.comandos);


/*
await api.post({ url: '/channels/' + channelId + '/messages', body: { content: storage.afk + "\n[MENSAGEM AUTOMÁTICA]", "message_reference": {
    "channel_id": channelId,
    "message_id": message.id
  }}})*/

/*
MessageActions.sendMessage(channelId, {
                content: "<@" + message.author.id + "> " + storage.afk + "\n[MENSAGEM AUTOMÁTICA]"
            });*/

}
              return  
            }));

return null;
    } catch (err) {}
    }

//export const settings = Settings;

export const onLoad = () => {

FluxDispatcher.dispatch({
            type: "MESSAGE_CREATE",
            message: constructMessage('PLACEHOLDER', { id: '0' }),
        });
        
    storage.comandos ??= [ { name: "oi", eval: `MessageActions.sendMessage(channelId, {content: "<@" + message.author.id + "> " + "\n[MENSAGEM AUTOMÁTICA]"})` } ]
    storage.prefixo ??= "zz!"
    setTimeout(() => delayedStart(), 300);
}

export const onUnload = () => {
    for (const unregisterCommands of patches) unregisterCommands()
}

