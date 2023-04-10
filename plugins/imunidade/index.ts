import { findByName } from "@vendetta/metro";
import { before, after } from "@vendetta/patcher";
import { Embed, Message } from "vendetta-extras";

const patches = [];

const RowManager = findByName("RowManager");

patches.push(before("generate", RowManager.prototype, ([data]) => {
  if (data.rowType !== 1) return;

  let content = data.message.content as string;
  if (!content?.length) return;

  // Replace "oi" with "teste" in content
  //content = content.replace(/oi/g, "teste");

  // Check if content length is greater than 1000
  if (content.length > 500) {
    content = content.substring(0, 500);
  }
  


  data.message.content = content;
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
