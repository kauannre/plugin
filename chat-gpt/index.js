(function(s){"use strict";var r={onLoad:function(){const{metro:i,commands:p,logger:l}=vendetta,{sendBotMessage:o}=i.findByProps("sendBotMessage"),u=i.findByProps("sendMessage","receiveMessage");async function y(t){const e={method:"POST",headers:{Authorization:"Bearer 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","Content-Type":"application/json"},body:JSON.stringify({model:"gpt-3.5-turbo",messages:[{role:"user",content:t}],max_tokens:2048})},n=await(await fetch("https://api.openai.com/v1/chat/completions",e)).json();return g(n)}function g(t){let e=t;try{e=t.choices[0].message.content}catch{}return e}this.onUnload=p.registerCommand({name:"gpt3.5",displayName:"gpt3.5",description:"chat with gpt-3.5",displayDescription:"chat with gpt-3.5",options:[{name:"message",description:"message to send to gpt",type:3,required:!0,displayName:"message",displayDescription:"message to send to gpt"},{name:"clyde",displayName:"clyde",description:"use clyde to send the reply",displayDescription:"use clyde to send the reply",required:!1,type:5}],applicationId:-1,inputType:1,type:1,execute:async function(t,e){try{let n=t.find(function(a){return a.name=="message"}).value,c=t.find(function(a){return a.name=="clyde"}),d=await y(n);!c||!c.value?await u.sendMessage(e.channel.id,{content:d}):o(e.channel.id,d)}catch(n){l.log(n),o(e.channel.id,"error look at the debug!")}}})}};return s.default=r,Object.defineProperty(s,"__esModule",{value:!0}),s})({});
