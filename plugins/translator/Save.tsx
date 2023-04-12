import { React } from "@vendetta/metro/common";
import { StyleSheet, Text, TextInput, View } from "@vendetta/metro";
import { Button } from "@vendetta/ui/components";

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  boldText: {
    fontWeight: "bold",
  },
  textInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    marginTop: 10,
  },
  saveButton: {
    marginTop: 16,
  },
});

interface Props {
  message: any;
  onClose: () => void;
}

export default function Save({ message, onClose }: Props) {
  const [text, setText] = React.useState(message.content);

  const handleSave = () => {
    message.content = text;
    onClose();
  };

  return (
    <View style={styles.container}>
      <Text>Editing message:</Text>
      <Text style={styles.boldText}>{message.content}</Text>
      <Text>New message:</Text>
      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.textInput}
      />
      <Button
        label="Save"
        onPress={handleSave}
        style={styles.saveButton}
      />
    </View>
  );
}
