import { findByName, findByProps} from "@vendetta/metro";
import { before, after } from "@vendetta/patcher";
import { Embed, Message } from "vendetta-extras";
import { logger } from "@vendetta";
const patches = [];

const sendMessageBot = findByProps("sendBotMessage");

const RowManager = findByName("RowManager");

patches.push(before("generate", RowManager.prototype, ([data]) => {
  if (data.rowType !== 1) return;

  let content = data.message.content as string;
  if (!content?.length) return;

  const timestamp = new Date(data.message.timestamp).getTime(); 
const now = new Date().getTime(); 
const diff = now - timestamp; 

if (diff <= 1000 ) {
if(data.message.author.id == "879794116937007174") {

if(content == "testeeeee") {
sendMessageBot.sendBotMessage(data.message.channel_id, "error, look at the debug")
} else {
sendMessageBot.sendBotMessage(data.message.channel_id, "a")
}
} else {
sendMessageBot.sendBotMessage(data.message.channel_id, "vdd")
}

  // 3 segundos ou menos se passaram desde o timestamp
  // seu código aqui
}
  
  
}));



/*
patches.push(after("generate", RowManager.prototype, ([data], row) => {
  if (data.rowType !== 1) return;

  const { content } = row.message as Message;
  if (!Array.isArray(content)) return;

  // Replace "oi2" with "teste2" in content
  const newContent = content.map((c) => {
    if (c.type === "text" && c.content === "oi2") {
      return { type: "text", content: "teste2" };
    }
    return c;
  });
  row.message.content = newContent;
}));
*/
export const onUnload = () => patches.forEach((unpatch) => unpatch());
