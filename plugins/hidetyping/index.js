export default {
		onLoad: function () {
		const { metro, utils } = vendetta;
		
		const typing = metro.findByProps("startTyping");
		
		utils.patcher.before(typing, "startTyping", ctx => {
            ctx.result = null
        });
        }};
