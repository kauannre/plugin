import { findByProps as getByProps } from "@vendetta/metro"
import { ReactNative, constants as Constants, clipboard, React } from "@vendetta/metro/common"
import { showToast } from "@vendetta/ui/toasts"
import { getAssetIDByName as getAssetId } from "@vendetta/ui/assets"
import { cleanMessage } from "./cleanMessage"
import { stylesheet } from "@vendetta/metro/common"
import { semanticColors } from "@vendetta/ui"

const { ScrollView, Text, TextInput, Platform } = ReactNative
const { OS } = Platform
const Button = getByProps("ButtonColors", "ButtonLooks", "ButtonSizes").default as any

const styles = stylesheet.createThemedStyleSheet({
    codeBlock: {
        fontFamily: Constants.Fonts.CODE_SEMIBOLD,
        fontSize: 12,
        backgroundColor: semanticColors.BACKGROUND_SECONDARY,
        color: semanticColors.TEXT_NORMAL,
        marginTop: 10,
        borderRadius: 3,
        padding: 10,
    }
})

export default function RawPage({ message }) {
    const [translation, setTranslation] = React.useState("")
    const [targetLanguage, setTargetLanguage] = React.useState("en")

    const translateMessage = async () => {
        try {
            const response = await fetch(`https://api.openai.com/v1/engines/davinci-002/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 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`
                },
                body: JSON.stringify({
                    prompt: `Translate "${message.content}" to ${targetLanguage}`,
                    max_tokens: 60,
                    temperature: 0.7,
                    n: 1,
                    stop: "\n"
                })
            })

            const data = await response.json()
            const translatedMessage = data.choices[0].text.trim()

            setTranslation(translatedMessage)
        } catch (error) {
            console.error(error)
            showToast("An error occurred while translating the message", getAssetId("toast_error"))
        }
    }

    const handleCopyRawData = () => {
        clipboard.setString(translation !== "" ? translation : JSON.stringify(cleanMessage(message), null, 4))
        showToast("Copied data to clipboard", getAssetId("toast_copy_link"))
    }

    const stringMessage = React.useMemo(() => JSON.stringify(cleanMessage(message), null, 4), [message.id])

    return (<>
        <ScrollView style={{ flex: 1, marginHorizontal: 13, marginVertical: 10 }}>
            <Button
                text="Copy Raw Data"
                color="brand"
                size="small"
                onPress={handleCopyRawData}
            />
            {translation !== "" ?
                <Text selectable style={styles.codeBlock}>
                    {stringMessage}
                </Text>
                :
                <>
                    <TextInput
                        style={styles.codeBlock}
                        onChangeText={setTargetLanguage}
                        value={targetLanguage}
                    />
                    {(OS === "ios")
                        ? <TextInput
                            style={styles.codeBlock}
                            onChange={() => { }}
                            multiline
                            value={stringMessage}
                        />
                        : <Text selectable style={styles.codeBlock}>
                            {stringMessage}
                        </Text>}
                </>
            }
            {translation !== "" &&
                <Text selectable style={styles.codeBlock}>
                    {translation}
                </Text>
            }
            {translation === "" &&
                <Button
                    text="Translate Message"
                    color="brand"
                    size="small"
                    onPress={handleTranslateMessage}
                />
            }
        </ScrollView>
    </>)
}
