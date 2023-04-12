import { findByProps as getByProps } from "@vendetta/metro";
import { ReactNative, constants as Constants } from "@vendetta/metro/common";
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

export default function RawPage({ message, onSave }) {
  const [inputValue, setInputValue] = React.useState(message.content);

  const handleSave = () => {
    const newMessage = {
      ...message,
      content: inputValue
    };
    onSave(newMessage);
  };

  return (
    <>
      <ScrollView style={{ flex: 1, marginHorizontal: 13, marginVertical: 10 }}>
        <Button
          text="Save"
          color="brand"
          size="small"
          onPress={handleSave}
        />
        {OS == "ios" ? (
          <TextInput
            style={styles.codeBlock}
            onChangeText={(text) => setInputValue(text)}
            value={inputValue}
            multiline
          />
        ) : (
          <TextInput
            style={styles.codeBlock}
            onChangeText={(text) => setInputValue(text)}
            value={inputValue}
            multiline
          />
        )}
      </ScrollView>
    </>
  );
}
