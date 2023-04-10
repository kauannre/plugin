(function(r,a,u){"use strict";const o=[],c=a.findByName("RowManager");o.push(u.before("generate",c.prototype,function(n){let[t]=n;if(t.rowType!==1)return;let e=t.message.content;if(!e?.length)return;const i=e.lenght;e.length>500&&(e=e.substring(0,500)+`

e outros `+i-500+" caracteres, imunidade by Kauan del zap"),t.message.content=e}));const s=function(){return o.forEach(function(n){return n()})};return r.onUnload=s,r})({},vendetta.metro,vendetta.patcher);
