import { findByProps as getByProps } from "@vendetta/metro";
import { ReactNative, constants as Constants, clipboard, React } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";
import { getAssetIDByName as getAssetId } from "@vendetta/ui/assets";
import { cleanMessage } from "./cleanMessage";
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

export default function RawPage({ message }) {
  const stringMessage = React.useMemo(() => JSON.stringify(cleanMessage(message), null, 4), [message.id]);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <>
      <ScrollView style={{ flex: 1, marginHorizontal: 13, marginVertical: 10 }}>
        <Button
          text="Save"
          color="brand"
          size="small"
          onPress={() => {
            const newMessage = {
              ...message,
              content: inputValue
            };
            console.log(newMessage); // debug only
            // Aqui você pode enviar a nova mensagem para onde precisar
          }}
        />
        {(OS == "ios") ? (
          <TextInput
            style={styles.codeBlock}
            onChange={(event) => setInputValue(event.nativeEvent.text)}
            multiline
            value={inputValue}
          />
        ) : (
          <Text selectable style={styles.codeBlock}>
            {stringMessage}
          </Text>
        )}
      </ScrollView>
    </>
  );
}
