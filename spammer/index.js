(function(i){"use strict";var m={onLoad:function(){const{metro:r,commands:p,logger:o}=vendetta,{sendBotMessage:d}=r.findByProps("sendBotMessage"),c=r.findByProps("sendMessage","receiveMessage");this.onUnload=p.registerCommand({name:"spam",displayName:"spam",description:"spammar mensages no chat",displayDescription:"spamar msg no chat(usando sua acc)",options:[{name:"mensagem",description:"mensagem pra spammar",type:3,required:!0,displayName:"mensagem",displayDescription:"mensagem pra spammar"},{name:"id",description:"id da pessoa ou chat",type:3,required:!1,displayName:"id",displayDescription:"id da pessoa ou chat"},{name:"quantidade",description:"quantidade de mensagens pra spammar",type:3,required:!0,displayName:"quantidade",displayDescription:"quantidade de mensagens pra spammar"},{name:"clyde",displayName:"clyde",description:"usar o clyde pra enviar as mensagens",displayDescription:"usar o clyde pra enviar as mensagens",required:!1,type:5}],applicationId:-1,inputType:1,type:1,execute:async function(n,t){try{let s=n.find(function(e){return e.name=="mensagem"}),u=n.find(function(e){return e.name=="quantidade"}),l=n.find(function(e){return e.name=="clyde"}),a=n.find(function(e){return e.name=="id"});a?a=a.value:a=t.channel.id;for(let e=0;e<u.value;e++)l?d(a,s.value):await c.sendMessage(a,{content:s.value});d(t.channel.id,`${JSON.stringify(n,null,2)}`)}catch(s){o.log(s),d(t.channel.id,s)}}})}};return i.default=m,Object.defineProperty(i,"__esModule",{value:!0}),i})({});
