export default {
		onLoad: function () {
			
			import { Plugin } from "vendetta/entities";
import { getByProps } from 'vendetta/metro';
import { before } from "vendetta/utils/patcher";

const typing = getByProps("startTyping");

        before(typing, "startTyping", ctx => {
            ctx.result = null
        })

		},
	};
