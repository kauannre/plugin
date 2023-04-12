import { findByProps as getByProps } from "@vendetta/metro";
import { ReactNative, constants as Constants, clipboard, React } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";
import { getAssetIDByName as getAssetId } from "@vendetta/ui/assets";
import { stylesheet } from "@vendetta/metro/common";
import { semanticColors } from "@vendetta/ui";

const { ScrollView, Text, TextInput, Platform } = ReactNative;
const { OS } = Platform;
const Button = getByProps("ButtonColors", "ButtonLooks", "ButtonSizes").default as any;

const styles = stylesheet.createThemedStyleSheet({
  codeBlock: {
    fontFamily: Constants.Fonts.CODE_SEMIBOLD,
    fontSize: 12,
    backgroundColor: semanticColors.BACKGROUND_SECONDARY,
    color: semanticColors.TEXT_NORMAL,
    marginTop: 10,
    borderRadius: 3,
    padding: 10,
  },
});

export default function Translator({ message }) {
  const [translatedMessage, setTranslatedMessage] = React.useState("");
  const stringMessage = message.content;

  const translateMessage = async (languageCode) => {
    try {
      const response = await fetch(
        `https://api.openai.com/v1/engines/davinci-codex/completions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + "your_openai_api_key",
          },
          body: JSON.stringify({
            "prompt": `translate this message to ${languageCode}:\n\n${message.content}`,
            "max_tokens": 60,
            "temperature": 0.5,
            "n": 1,
            "stop": ["\n"]
          }),
        }
      );
      const json = await response.json();
      const translated = json.choices[0].text.trim();
      setTranslatedMessage(translated);
    } catch (error) {
      console.error(error);
      setTranslatedMessage("Error translating message.");
    }
  };

  const handleCopyRawData = () => {
    clipboard.setString(translatedMessage || stringMessage);
    showToast("Copied data to clipboard", getAssetId("toast_copy_link"));
  };

  return (
    <>
      <ScrollView style={{ flex: 1, marginHorizontal: 13, marginVertical: 10 }}>
        <Button
          text="Copy Raw Data"
          color="brand"
          size="small"
          onPress={handleCopyRawData}
        />
        <TextInput
          style={styles.codeBlock}
          onChange={() => {}}
          multiline
          value={translatedMessage || stringMessage}
        />
        <Button
          text="Translate Message"
          color="brand"
          size="small"
          onPress={() => translateMessage("pt")}
        />
      </ScrollView>
    </>
  );
}
