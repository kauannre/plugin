import { findByProps as getByProps, findByName } from "@vendetta/metro";
import { ReactNative, constants as Constants, clipboard, React } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";
import { getAssetIDByName as getAssetId } from "@vendetta/ui/assets";
import { stylesheet } from "@vendetta/metro/common";
import { semanticColors } from "@vendetta/ui";
import { before, after } from "@vendetta/patcher";
import { Forms } from "@vendetta/ui/components";

const { ScrollView, Text, TextInput, Platform } = ReactNative;
const { OS } = Platform;
const Button = getByProps("ButtonColors", "ButtonLooks", "ButtonSizes").default as any;
const ActionSheet = getByProps("openLazy", "hideActionSheet");
const Navigation = getByProps("push", "pushLazy", "pop");
const DiscordNavigator = getByProps("getRenderCloseButton");
const { default: Navigator, getRenderCloseButton } = DiscordNavigator;
const Icon = findByName("Icon");
const { FormRow } = Forms;

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

const unpatch = before("openLazy", ActionSheet, (ctx) => {
 const [component, args, actionMessage] = ctx;
 if (args !== "MessageLongPressActionSheet") return;
 component.then(instance => {
  const unpatch = after("default", instance, (_, component) => {
React.useEffect(() => () => { unpatch() }, []); // omg!!!!!!!!!!!!!
let [msgProps, buttons] = component.props?.children?.props?.children?.props?.children;

let message = msgProps?.props?.message ?? actionMessage?.message;

if (!buttons || !message) return;

let content = JSON.stringify(component, null, 2)

const navigator = () => (
  <Navigator
    initialRouteName="RawPage"
    goBackOnBackPress
    screens={{
      RawPage: {
        title: "ViewRaw",
        headerLeft: getRenderCloseButton(() => Navigation.pop()),
        render: () => {
          const [inputValue, setInputValue] = React.useState(JSON.stringify(component, null, 2));
          return (
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
                  content = inputValue
                  // Aqui você pode enviar a nova mensagem para onde precisar
                }}
              />
              {OS == "ios" ? (
                <TextInput
                  style={styles.codeBlock}
                  onChangeText={(text) => 
                  JSON.stringify(component, null, 2) = text
                  }
                  defaultValue={JSON.stringify(component, null, 2)}
                  multiline
                />
              ) : (
                <TextInput
                  style={styles.codeBlock}
                  onChangeText={(text) => 
                  JSON.stringify(component, null, 2) = text
                  }
                  defaultValue={JSON.stringify(component, null, 2)}
                  multiline
                />
              )}
            </ScrollView>
          )
        },
      },
    }}
  />
);


buttons.push(
 <FormRow
  label="Edit Message"
  leading={<Icon source={getAssetId("ic_message_edit")} />}
  onPress={() => {
ActionSheet.hideActionSheet();
Navigation.push(navigator);
  }}
 />
);
  });
 });
});


export const onUnload = () => unpatch();
