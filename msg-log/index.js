(function(s,i,o,n){"use strict";const a=i.FluxDispatcher._actionHandlers._orderedActionHandlers;n.findByProps("sendMessage","receiveMessage"),n.findByProps("createBotMessage");const t=[];t.push(o.before("actionHandler",a.MESSAGE_UPDATE?.find(function(e){return e.name==="MessageStore"}),function(e){try{let r=n.findByProps("getMessage","getMessages").getMessage(e[0].message.channel_id,e[0].message.id)?.content,c=e[0]?.message?.content;if(!c||!r)return;e[0].message.content=r+" `[editada]`\n"+c}catch{}})),t.push(o.before("actionHandler",a.MESSAGE_DELETE?.find(function(e){return e.name==="MessageStore"}),function(e){console.log(e)}));const d=function(){return t.forEach(function(e){return e()})};return s.onUnload=d,s})({},vendetta.metro.common,vendetta.patcher,vendetta.metro);
