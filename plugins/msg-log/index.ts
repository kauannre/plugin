import { FluxDispatcher } from '@vendetta/metro/common';
import { before, after} from "@vendetta/patcher"
import { findByProps } from "@vendetta/metro"
import { logger } from "@vendetta"
const FD = FluxDispatcher._actionHandlers._orderedActionHandlers;

const patches = [];

const RowManager = findByName("RowManager");

patches.push(before("actionHandler", FD.MESSAGE_UPDATE?.find(i => i.name === "MessageStore"), (args: any) => {
                try {
                let msgantiga = findByProps("getMessage", "getMessages").getMessage(args[0].message.channel_id, args[0].message.id)?.content
                
                let message = args[0]?.message?.content;
                if (!message) return;
                if (!msgantiga) return;
                    args[0].message.content = msgantiga + " `[edited]`\n" + message;
            } catch (e) {}
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
