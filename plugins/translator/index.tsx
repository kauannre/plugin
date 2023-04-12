import { before, after } from "@vendetta/patcher"
import { getAssetIDByName as getAssetId } from "@vendetta/ui/assets"
import { findByProps as getByProps, findByName } from "@vendetta/metro"
import { ReactNative, constants as Constants, clipboard, React } from "@vendetta/metro/common"
import { showToast } from "@vendetta/ui/toasts"
import { Forms, stylesheet } from "@vendetta/metro/common"
import { semanticColors } from "@vendetta/ui"
import { cleanMessage } from "./cleanMessage"

const { ScrollView, Text, TextInput, Platform } = ReactNative
const { OS } = Platform
const ActionSheet = getByProps("openLazy", "hideActionSheet")
const Navigation = getByProps("push", "pushLazy", "pop")
const DiscordNavigator = getByProps("getRenderCloseButton")
const { default: Navigator, getRenderCloseButton } = DiscordNavigator
const Icon = findByName("Icon")
const { FormRow } = Forms

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

const unpatch = before("openLazy", ActionSheet, (ctx) => {
    const [component, args, actionMessage] = ctx
    if (args !== "MessageLongPressActionSheet") return
    component.then(instance => {
        const unpatch = after("default", instance, (_, component) => {
            React.useEffect(() => () => { unpatch() }, []) // omg!!!!!!!!!!!!!
            let [msgProps, buttons] = component.props?.children?.props?.children?.props?.children

            const message = msgProps?.props?.message ?? actionMessage?.message

            if (!buttons || !message) return

            const navigator = () => (
                <Navigator
                    initialRouteName="RawPage"
                    goBackOnBackPress
                    screens={{
                        RawPage: {
                            title: "ViewRaw",
                            headerLeft: getRenderCloseButton(() => Navigation.pop()),
                            render: () => (
                                <>
                                    <ScrollView style={{ flex: 1, marginHorizontal: 13, marginVertical: 10 }}>
                                        <Button
                                            text="Copy Raw Data"
                                            color="brand"
                                            size="small"
                                            onPress={() => {
                                                clipboard.setString(stringMessage)
                                                showToast("Copied data to clipboard", getAssetId("toast_copy_link"))
                                            }}
                                        />
                                        {(OS == "ios")
                                            ? <TextInput
                                                style={styles.codeBlock}
                                                onChange={() => { }}
                                                multiline
                                                value={stringMessage}
                                            />
                                            : <Text selectable style={styles.codeBlock}>
                                                {stringMessage}
                                            </Text>}
                                    </ScrollView>
                                </>
                            ),
                        },
                    }}
                />
            )

            buttons.push(
                <FormRow
                    label="View Raw"
                    leading={<Icon source={getAssetId("ic_chat_bubble_16px")} />}
                    onPress={() => {
                        ActionSheet.hideActionSheet()
                        Navigation.push(navigator)
                    }}
                />
            )
        })
    })
})

export const onUnload = () => unpatch() 
