import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const color = route.params.color;
  const name = route.params.name;
  const userID = route.params._id;

  const [messages, setMessages] = useState([]);
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  //customizes chat bubble colors
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: "#000" },
          left: { backgroundColor: "#fff" },
        }}
      />
    );
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "",
        },
      },
    ]);
  }, []);

    return (
      //sets background color to the color selected in start
      <View style={[styles.container, { backgroundColor: color }]}>
        <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          // renderInputToolbar={renderInputToolbar}
          onSend={(messages) => onSend(messages)}
          // renderActions={renderCustomActions}
          // renderCustomView={renderCustomView}
          user={{ _id: 1, name: name }}
        />

        {/* when typing, makes the keyboard not hide input or information that would be behind it */}
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    text: {
      fontSize: 40,
    },
  });

  export default Chat;