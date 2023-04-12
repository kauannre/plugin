(function(o){"use strict";var d={onLoad:function(){const{metro:a,commands:p,logger:l}=vendetta,{sendBotMessage:r}=a.findByProps("sendBotMessage"),u=a.findByProps("sendMessage","receiveMessage");async function y(i){const t=`http://ip-api.com/json/${i}?fields=66846719`,n=await(await fetch(t)).json();if(n.status==="success"){const e=n;return`IP INFO( ${e.query} )
    continent: ${e.continent}(${e.continentCode})
    country: ${e.country}(${e.countryCode})
    region: ${e.regionName}(${e.region})
    city: ${e.city}
    district: ${e.district}
    zip: ${e.zip}
    latitude: ${e.lat}
    longitude: ${e.lon}
    timezone: ${e.timezone}
    offset: ${e.offset}
    currency: ${e.currency}
    isp: ${e.isp}
    org: ${e.org}
    asname: ${e.as}
    reverse: ${e.reverse}
    mobile: ${e.mobile}
    proxy: ${e.proxy}
    hosting: ${e.hosting}`}else return"Unable to find this IP."}this.onUnload=p.registerCommand({name:"geoip",displayName:"geoip",description:"get information from an ip",displayDescription:"get information from an ip",options:[{name:"ip",description:"example: 8.8.8.8",type:3,required:!0,displayName:"ip",displayDescription:"example: 8.8.8.8"},{name:"clyde",displayName:"clyde",description:"use Clyde to send the message ",displayDescription:"use Clyde to send the message",required:!1,type:5}],applicationId:-1,inputType:1,type:1,execute:async function(i,t){try{let n=i.find(function(s){return s.name=="ip"}).value,e=i.find(function(s){return s.name=="clyde"}),c=await y(n);!e||!e.value?await u.sendMessage(t.channel.id,{content:c}):r(t.channel.id,c)}catch(n){l.log(n),r(t.channel.id,"error, look at the debug")}}})}};return o.default=d,Object.defineProperty(o,"__esModule",{value:!0}),o})({});
