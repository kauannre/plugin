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
const editmsg = [];
const patches = [];

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
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
});


patches.push(before("openLazy", ActionSheet, (ctx) => {
 const [component, args, actionMessage] = ctx;
 if (args !== "MessageLongPressActionSheet") return;
 component.then(instance => {
  const unpatch = after("default", instance, (_, component) => {
React.useEffect(() => () => { unpatch() }, []); // omg!!!!!!!!!!!!!
let [msgProps, buttons] = component.props?.children?.props?.children?.props?.children;

let message = msgProps?.props?.message ?? actionMessage?.message;

if (!buttons || !message) return;

let content = message.content
let test
const navigator = () => (
  <Navigator
    initialRouteName="MessagePage"
    goBackOnBackPress
    screens={{
      MessagePage: {
        title: "EditMessage",
        headerLeft: getRenderCloseButton(() => Navigation.pop()),
        render: () => {
          const [inputValue, setInputValue] = React.useState(message.content);
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
                  //console.log(newMessage); // debug only
                  let aaaaas = editmsg.find((sla) => sla.id == message.id)
                  if(aaaaas) {
                  aaaaas.novocontent = test
                  message.content = test
                  } else {
                  let mensagemkk = {}
                  mensagemkk.novocontent = test
                  mensagemkk.id = message.id
                  editmsg.push(mensagemkk)
                  message.content = test
                  }
                  Navigation.pop();
                  //message.content = test
                  // Aqui você pode enviar a nova mensagem para onde precisar
                }}
              />
              {OS == "ios" ? (
                <TextInput
                  style={styles.codeBlock}
                  onChangeText={(text) => 
                  test = text
                  }
                  defaultValue={message.content}
                  multiline
                />
              ) : (
                <TextInput
                  style={styles.codeBlock}
                  onChangeText={(text) => 
                  test = text
                  }
                  defaultValue={message.content}
                  multiline
                />
              )}
              <Text style={styles.infoText}>
                Go to another conversation and come back to it for editing to take effect
              </Text>
            </ScrollView>
          )
        },
      },
    }}
  />
);


buttons.push(
 <FormRow
  label="Edit Message local"
  leading={<Icon source={getAssetId("ic_message_edit")} />}
  onPress={() => {
ActionSheet.hideActionSheet();
Navigation.push(navigator);
  }}
 />
);
  });
 });
}));

const RowManager = findByName("RowManager");

patches.push(after("generate", RowManager.prototype, ([data], row) => {
  if (data.rowType !== 1) return;
  
  let msg = editmsg.find((sla) => sla.id == row.message.id)
  if(msg) {
  row.message.content = msg.novocontent
  }
  
}));

export const onUnload = () => patches.forEach((unpatch) => unpatch());
