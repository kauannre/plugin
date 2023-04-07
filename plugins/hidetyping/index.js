export default {
		onLoad: function () {
		const { metro, utils, patcher } = vendetta;
		
		const { startTyping } = metro.findByProps("startTyping");
		
		patcher.before(typing, "startTyping", ctx => {
            ctx.result = null
        });
        }};
