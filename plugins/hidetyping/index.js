export default {
		onLoad: function () {
			
			import { Plugin } from "vendetta/entities";
import { findByProps } from 'vendetta/metro';
import { before } from "vendetta/utils/patcher";

const typing = findByProps("startTyping");

        before(typing, "startTyping", ctx => {
            ctx.result = null
        })

		},
	};
