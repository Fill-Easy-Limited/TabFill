// // /**
// //  * Sample React Native App
// //  * https://github.com/facebook/react-native
// //  *
// //  * @format
// //  * @flow strict-local
// //  */

// import React, { useEffect } from "react";
// // import { Provider } from "react-redux";
// // import configureStore from "./Screens/redux/store";
// // import { store, persistor } from "./Screens/redux/store";

// // import { NavigationContainer } from "@react-navigation/native";
// // import RequestLogin from "./Screens/Requestlogin";
// // import { Text, View, Linking } from "react-native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// // import Scanqrcode from "./Screens/Scanqrcode";
// // import Login from "./Screens/Login";
// // import Completation from "./Screens/Completation";
// // import Declaration from "./Screens/Declaration";
// // import Profile from "./Screens/Profile";
// // import Basicinformation from "./Screens/Basicinformation";
// // import base64 from "react-native-base64";
// import Rootnavigation from "./Screens/navigation";
// // import {PersistGate} from 'redux-persist/integration/react';

// const Stack = createNativeStackNavigator();


// const App = () => {
//   return (
//     <Rootnavigation />
//     // <Provider store={store}>
//     //   {/* <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}> */}
//     //     <Rootnavigation />
//     //   {/* </PersistGate> */}
//     // </Provider>
//   );
// };

// export default App;

import React from 'react'
import { View ,Text} from 'react-native'
import { Provider } from 'react-redux'
import Rootnavigation from './Screens/navigation'
import { store , persistor } from './Screens/redux/store'
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return(
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
      <Rootnavigation />
      </PersistGate>
      </Provider>
  )
}

export default App
