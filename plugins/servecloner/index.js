



export default {
  onLoad: function () {
    const { metro, commands, logger } = vendetta;

    const { sendBotMessage: sendEphemeralClydeMessage } =
      metro.findByProps("sendBotMessage");
    const MessageActions = metro.findByProps("sendMessage", "receiveMessage")
    const { getToken } = metro.findByProps("getToken");
    
    const headersprincipal = {
      'user-agent': 'Discord-Android/126021',
  'authorization': getToken(),
  'x-fingerprint': '1090148022261915688.3l02euwN_G30bkZ-3LOixHptgSY',
  'x-discord-locale': 'pt-BR',
  'accept-language': 'pt-BR',
  'x-super-properties': 'eyJicm93c2VyIjoiRGlzY29yZCBBbmRyb2lkIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiRGlzY29yZC1BbmRyb2lkLzEyNjAyMSIsImNsaWVudF9idWlsZF9udW1iZXIiOjEyNjAyMSwiY2xpZW50X3ZlcnNpb24iOiIxMjYuMjEgLSBTdGFibGUiLCJkZXZpY2UiOiJtb3Rvcm9sYSBvbmUsIGRlZW4iLCJvcyI6IkFuZHJvaWQiLCJvc19zZGtfdmVyc2lvbiI6IjI5Iiwib3NfdmVyc2lvbiI6IjEwIiwic3lzdGVtX2xvY2FsZSI6InB0LUJSIiwiY2xpZW50X3BlcmZvcm1hbmNlX2NwdSI6MCwiY2xpZW50X3BlcmZvcm1hbmNlX21lbW9yeSI6MjkzODg0LCJjcHVfY29yZV9jb3VudCI6OCwiYWNjZXNzaWJpbGl0eV9zdXBwb3J0X2VuYWJsZWQiOmZhbHNlLCJhY2Nlc3NpYmlsaXR5X2ZlYXR1cmVzIjoyNTZ9',
  'content-type': 'application/json; charset=UTF-8',
  'accept-encoding': 'gzip, utf-8',
  'cookie': '__sdcfduid=28cf6322cd2a11eda32afa05ee9c977acecdd052fa2ff9243c2ef7fff44b8f23e80421f014c65eedc694ca7fd5df5585; __cfruid=beb024e923d1064b07f8693f0806bb3d8a099186-1679982546; __dcfduid=28cf6322cd2a11eda32afa05ee9c977a'
    };

    const pegarcanais = async function (serverId) {
      const response = await fetch(`https://discord.com/api/v9/guilds/${serverId}/channels`, {
        headers: headersprincipal
      });
      const channels = await response.json();
      return channels;
    }

    const criarcanal = async function (
      serverId,
      parent_id = null,
      type,
      name,
      permission_overwrites
    ) {
      try {
        const response = await fetch(`https://discord.com/api/v9/guilds/${serverId}/channels`, {
          method: 'POST',
          headers: headersprincipal,
          body: JSON.stringify({
            type,
            name,
            permission_overwrites,
            parent_id
          })
        });
        const data = await response.json();
        return data;
      } catch (e) {
        console.log(e);
      }
    }

    this.onUnload = commands.registerCommand({
      name: "clonarserver",
      displayName: "clonarserver",
      description: "clonar servidores(em teste)",
      displayDescription: "clonar servidores(em teste)",
      options: [
                {
          name: "idfrom",
          description: "idfrom",
          type: 3,
          required: true,
          displayName: "id of server que voce quer clonar",
          displayDescription: "id of server que voce quer clonar",
        }, {
          name: "idto",
          description: "idto",
          type: 3,
          required: true,
          displayName: "id to server que voce vai colar o clone",
          displayDescription: "id to server que voce vai colar o clone",
        }
      ],
      applicationId: -1,
      inputType: 1,
      type: 1,
      execute: async (args, ctx) => {
        try {
          let idfrom = args.find((sla) => sla.name == "idfrom").value;
          let idto = args.find((sla) => sla.name == "idto").value;
          
          const sleep = (t) => new Promise((s) => setTimeout(s, t));
          const channels = await pegarcanais(idfrom);
          let parentChannels = channels
            .filter((channel) => channel.type === 4)
            .map((parent) => [parent]);
          parentChannels = [...parentChannels].sort((a, b) => a.position - b.position);

          parentChannels.map((parent) =>
            channels.forEach(
              (channel) => channel.parent_id === parent[0].id && parent.push(channel)
            )
          );
          const parentsAndChannels = parentChannels;

          for (let group of parentsAndChannels) {
            if (group.length > 1) {
              let parentId = null;
              for (let [index, item] of group.entries()) {
                let canalcriado1 = await criarcanal(
                  idto,
                  parentId,
                  item.type,
                  item.name,
                  item.permission_overwrites
                );
                if (index === 0) parentId = canalcriado1.id;
                sendEphemeralClydeMessage(ctx.channel.id ,`Created channel ${item.name}`);
              }
            } else {
              canalcriado1 = await criarcanal(
                idto,
                group?.parent_id,
                group.type,
                group.name,
                group.permission_overwrites
              );
              sendEphemeralClydeMessage(ctx.channel.id, `Created group ${group.name}`);
            }

            await sleep(2500);
          }

          //await sendEphemeralClydeMessage(ctx.channel.id, "Server clonado");

          sendEphemeralClydeMessage(ctx.channel.id, `Pronto!`);
        } catch (err) {
          logger.log(err);
          sendEphemeralClydeMessage(ctx.channel.id, err);
        }
      }
    });
  },
};
