
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Start from "./components/Start";
import Chat from "./components/Chat";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import {
  disableNetwork,
  enableNetwork,
  getFirestore,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";

const Stack = createNativeStackNavigator();
const  App = () => {

  const firebaseConfig = {
    apiKey: "AIzaSyDGfkiQUP3cpLgocsgicieiTxT2-chWsQU",
    authDomain: "chat-app-35931.firebaseapp.com",
    databaseURL: "https://chat-app-35931-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chat-app-35931",
    storageBucket: "chat-app-35931.appspot.com",
    messagingSenderId: "122488261337",
    appId: "1:122488261337:web:3e01455c64bebe482b8cc8",
    measurementId: "G-0L8X2XZCRH"
  };


  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  // const analytics = getAnalytics(app);

  const storage = getStorage(app);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start}></Stack.Screen>
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;