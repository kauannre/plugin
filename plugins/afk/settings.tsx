import { Forms, General } from "@vendetta/ui/components";
import { storage } from '@vendetta/plugin';
import { useProxy } from '@vendetta/storage';
import { getAssetIDByName } from "@vendetta/ui/assets";

const { ScrollView } = General;
const { FormSection, FormRadioRow, FormSwitchRow, FormIcon, FormInput  } = Forms;


export default () => {
    useProxy(storage);
    return (
        <ScrollView>
        <FormSection title="modo afk" titleStyleType="no_border"></FormSection>
        <FormSwitchRow
            label="ativar afk"
            subLabel="todas as mensagens que te mencionar vai responder com o texto."
            leading={<FormIcon source={getAssetIDByName("ic_warning_24px")} />}
            value={storage.modafk}
            onValueChange={(value: boolean) => storage.modafk = value}
        />
            <FormSection title="Defalt Sort" titleStyleType="no_border">
            <FormInput
					value={storage.afk?.replace}
					onChange={(v: string) => storage.afk?.replace = v}
					placeholder="bar"
					title="afk mod"
				/>
            </FormSection>
    </ScrollView>
    )

    
}
