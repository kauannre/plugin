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
<FormInput
    value={storage.afk}
    onChange={(v: string) => storage.caracteres = v}
    placeholder="bar"
    title="quantidade de caracteres que o dc vai ler"
/>
    </ScrollView>
    )

    
}
