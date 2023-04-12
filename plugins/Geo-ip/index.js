export default {
		onLoad: function () {
			const { metro, commands, logger } = vendetta;

			const { sendBotMessage: sendEphemeralClydeMessage } =
				metro.findByProps("sendBotMessage");
			const MessageActions = metro.findByProps("sendMessage", "receiveMessage")
			
			async function getIpInfo(ip) {
  const url = `http://ip-api.com/json/${ip}?fields=66846719`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status === 'success') {
    const ipinfo = data;
    const resp = `IP INFO( ${ipinfo.query} )
    continent: ${ipinfo.continent}(${ipinfo.continentCode})
    country: ${ipinfo.country}(${ipinfo.countryCode})
    region: ${ipinfo.regionName}(${ipinfo.region})
    city: ${ipinfo.city}
    district: ${ipinfo.district}
    zip: ${ipinfo.zip}
    latitude: ${ipinfo.lat}
    longitude: ${ipinfo.lon}
    timezone: ${ipinfo.timezone}
    offset: ${ipinfo.offset}
    currency: ${ipinfo.currency}
    isp: ${ipinfo.isp}
    org: ${ipinfo.org}
    asname: ${ipinfo.as}
    reverse: ${ipinfo.reverse}
    mobile: ${ipinfo.mobile}
    proxy: ${ipinfo.proxy}
    hosting: ${ipinfo.hosting}`;

    return resp;
  } else {
    return 'Unable to find this IP.';
  }
}


			this.onUnload = commands.registerCommand({
				// execute: exeCute,
				name: "geoip",
				displayName: "geoip",
				description: "get information from an ip",
				displayDescription: "get information from an ip",
				options: [
                {
                    name: "ip",
                    description: "example: 8.8.8.8",
                    type: 3,
                    required: true,
                    displayName: "ip",
                    displayDescription: "example: 8.8.8.8",
                }, {
        name: "clyde",
        displayName: "clyde",
        description: "use Clyde to send the message ",
        displayDescription: "use Clyde to send the message",
        required: false,
        type: 5
                  }
                 ],
				applicationId: -1,
				inputType: 1,
				type: 1,
				execute: async (args, ctx) => {
        try {
            let ip = args.find((sla) => sla.name == "ip").value;
            let clyde = args.find((sla) => sla.name == "clyde");
            
            let geoip = await getIpInfo(ip)
            
            if(!clyde || !clyde.value) {
await MessageActions.sendMessage(ctx.channel.id, {
                content: geoip
            });
            } else {
            sendEphemeralClydeMessage(ctx.channel.id, geoip)
            }
            
        } catch (err) {
            logger.log(err);
            sendEphemeralClydeMessage(ctx.channel.id, "error, look at the debug")
        }
    }
			});
		},
	};
	


