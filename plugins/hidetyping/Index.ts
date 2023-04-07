import { getByProps } from 'vendetta/metro';
import { before } from "vendetta/utils/patcher";

export default {
		onLoad: function () {
			const { patcher } = require('vendetta/utils');
			


const typing = getByProps("startTyping");

        before(typing, "startTyping", ctx => {
            ctx.result = null
        });

		},
	};
	
