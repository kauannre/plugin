import { findByName } from "@vendetta/metro";
import { before, after } from "@vendetta/patcher";
import { Embed, Message } from "vendetta-extras";
import { storage } from '@vendetta/plugin';
import Settings from "./settings";
const patches = [];

const RowManager = findByName("RowManager");

patches.push(before("generate", RowManager.prototype, ([data]) => {
  if (data.rowType !== 1) return;

  let content = data.message.content as string;
  if (!content?.length) return;

  if (content.length > storage.caracteres) {
    content = content.substring(0, storage.caracteres) + "\n e outros " + (content - storage.caracteres) + " caracteres, imunidade by kauan del zap"
  }


  data.message.content = content;
}));

export const settings = Settings;
export const onLoad = () => {
    storage.caracteres ??= "500"
}

export const onUnload = () => patches.forEach((unpatch) => unpatch());
