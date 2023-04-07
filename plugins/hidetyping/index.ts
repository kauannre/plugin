import { findByProps } from 'vendetta/metro';
import { before } from "vendetta/utils/patcher";

export default {
		onLoad: function () {
			


const typing = findByProps("startTyping");

        before(typing, "startTyping", ctx => {
            ctx.result = null
        });

		},
	};
	
