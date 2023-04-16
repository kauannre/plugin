import { Forms, General } from "@vendetta/ui/components";
import { storage } from '@vendetta/plugin';
import { useProxy } from '@vendetta/storage';
import { getAssetIDByName } from "@vendetta/ui/assets";

const { ScrollView } = General;
const { FormSection, FormRadioRow, FormSwitchRow, FormIcon, FormInput  } = Forms;

let keyafk
if (storage?.afk) {
keyafk = storage.afk
} else {
keyafk = "to afk mn"
}

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
<FormInput
    value={keyafk}
    onChange={(v: string) => storage.afk = v}
    placeholder="bar"
    title="afk mod"
/>
    </ScrollView>
    )

    
}
