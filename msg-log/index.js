(function(c,d,o,t){"use strict";const r=d.FluxDispatcher._actionHandlers._orderedActionHandlers,i=t.findByProps("sendMessage","receiveMessage"),g=t.findByProps("createBotMessage"),a=[];a.push(o.before("actionHandler",r.MESSAGE_UPDATE?.find(function(e){return e.name==="MessageStore"}),function(e){try{let s=t.findByProps("getMessage","getMessages").getMessage(e[0].message.channel_id,e[0].message.id)?.content,n=e[0]?.message?.content;if(!n||!s)return;e[0].message.content=s+" `[editada]`\n"+n}catch{}})),a.push(o.before("actionHandler",r.MESSAGE_DELETE?.find(function(e){return e.name==="MessageStore"}),function(e){let s=t.findByProps("getMessage","getMessages").getMessage(e[0].channelId,e[0].id)?.content,n=g.createBotMessage({channelId:e[0].channelId,content:s+`[deleted]
`});n.author={username:"ANTI DELETE",avatar:"clyde"},i.receiveMessage(e[0].channelId,n)}));const u=function(){return a.forEach(function(e){return e()})};return c.onUnload=u,c})({},vendetta.metro.common,vendetta.patcher,vendetta.metro);