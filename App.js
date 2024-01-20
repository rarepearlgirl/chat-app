
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Start from "./components/Start";
import Chat from "./components/Chat";
import CustomActions from "./components/CustomActions";
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
import { useNetInfo } from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  //connection status
  const connectionStatus = useNetInfo();
  
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);


  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  const storage = getStorage(app);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start}></Stack.Screen>
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              db={db}
              isConnected={connectionStatus.isConnected}
              storage={storage}
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