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
    navigation.setOptions({ title: name });

    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else {
      loadCachedMessages();

      // Clean up code
      return () => {
        if (unsubShoppinglists) unsubShoppinglists();
      };
    }

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

    return (
      //sets background color to the color selected in start
      <View style={[styles.container, { backgroundColor: color }]}>
        <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          onSend={(messages) => onSend(messages)}
          renderActions={renderCustomActions}
          renderCustomView={renderCustomView}
          user={{ _id: 1, name: name }}
        />

        {/* when typing, makes the keyboard not hide imput or information that would be behind it */}
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