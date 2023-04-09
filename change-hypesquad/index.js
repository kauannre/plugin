(function(s){"use strict";var i={onLoad:function(){const{metro:a,commands:t,logger:r}=vendetta,{sendBotMessage:o}=a.findByProps("sendBotMessage");a.findByProps("sendMessage","receiveMessage"),a.findByProps("getToken");const u=a.findByProps("get","post");this.onUnload=t.registerCommand({name:"hypesquad",displayName:"hypesquad",description:"change hypesquad",displayDescription:"change hypesquad",options:[{name:"new",description:"new hypesquad ",type:3,required:!0,displayName:"new",displayDescription:"new hypesquad"}],applicationId:-1,inputType:1,type:1,execute:async function(l,d){try{let e=l.find(function(p){return p.name=="new"}).value.toLowerCase(),n=null;e=="bravery"||e=="1"?n=1:e=="brilliance"||e=="2"?n=2:e=="balance"||e=="3"?n=3:n=null,n?(await u.post({url:"/hypesquad/online",body:{house_id:e}}),o(d.channel.id,`EN: done, hypesquad changed!

BR: pronto, hypesquad mudado!`)):o(d.channel.id,`EN this hypesquad does not exist, the allowed ones are:

bravery or 1
Brilliance or 2
Balance or 3

BR este hypesquad n\xE3o existe, os permitidos s\xE3o:

bravery ou 1
Brilliance ou 2
Balance ou 3`)}catch(e){r.log(e),o(d.channel.id,"error, look at the debug")}}})}};return s.default=i,Object.defineProperty(s,"__esModule",{value:!0}),s})({});
