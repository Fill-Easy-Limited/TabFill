// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from 'react-redux';

//import base64 from 'react-native-base64'

import { NavigationContainer } from "@react-navigation/native";
import RequestLogin from "../Screens/Requestlogin";
import { Text, View, Linking } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Scanqrcode from "../Screens/Scanqrcode";
import Login from "../Screens/Login";
import Completation from "../Screens/Completation";
import Declaration from "../Screens/Declaration";
import Profile from "../Screens/Profile";
import Basicinformation from "../Screens/Basicinformation";
import base64 from 'react-native-base64'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Seeting from "./Setting";

const Stack = createNativeStackNavigator();
const Rootnavigation = () => {

    
    const baseUrl  = useSelector(state => state?.envInfo?.baseurl)
    const xclientid  = useSelector(state => state?.envInfo?.xclient)
    const xsecretid  = useSelector(state => state?.envInfo?.xserver)
   

    const linking = {
        prefixes: ["https://fill-easy.com/", 'fill-easy-demo://'],
    };

    const dispatch = useDispatch();

    useEffect(() => {
        Linking.addEventListener('url', (url) => {
            console.log("URL=====>", url);
            if (url.url.includes('fill-easy-demo://') && url.url.includes('eme')) {
                ObtainEmeAnonResults();
            } else if (url.url.includes('fill-easy-demo://') && url.url.includes('sign')) {
                reqSignResults();
            } else if (url.url.includes('fill-easy-demo://') && url.url.includes('auth')) {
                ObtainEmeNormResults();
            }
        });
    }, []);

    const ObtainEmeAnonResults = async () => {

        const tokenasync = await AsyncStorage.getItem('@token')
        var myHeaders = new Headers();
        myHeaders.append("x-client-id", xclientid);
        myHeaders.append("x-client-secret", xsecretid);
        myHeaders.append("Content-Type", "application/json");

        console.log("state ", tokenasync);

        var raw = JSON.stringify({
            "token": tokenasync
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://${baseUrl}/iamsmart/callback/client`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log("Form filling profile base 64", result);
                let obj = JSON.parse(result);
                if (obj.status == 200) {
                    console.log("Rightl=fully added");
                    dispatch({
                        type: "SET_PROFILE_TOKEN",
                        payload: obj.formFilling
                    });
                }
            })
            .catch(error => console.log('error', error));
    }

    const ObtainEmeNormResults = async () => {

        const tokenasync = await AsyncStorage.getItem('@authtoken')
        var myHeaders = new Headers();
        myHeaders.append("x-client-id", xclientid);
        myHeaders.append("x-client-secret", xsecretid);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        console.log("state ", tokenasync);

        var raw = JSON.stringify({
            "token": tokenasync
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://${baseUrl}/iamsmart/callback/client`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log("Form filling profile for normal base 64 with permanent token", result);
                let obj = JSON.parse(result);
                if (obj.status == 200) {
                    console.log("Rightfully added");
                    dispatch({
                        type: "SET_AUTH_TOKEN",
                        payload: obj.token
                    });
                    AsyncStorage.setItem("@authenticate_token", obj.token);
                }
            })
            .catch(error => console.log('error', error));
    }

    const reqSignResults = async () => {

        const tokenasync = await AsyncStorage.getItem('@signtoken')
        var myHeaders = new Headers();
        myHeaders.append("x-client-id", xclientid);
        myHeaders.append("x-client-secret", xsecretid);
        myHeaders.append("Content-Type", "application/json");

        console.log("state ", tokenasync);

        var raw = JSON.stringify({
            "token": tokenasync
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://${baseUrl}/iamsmart/callback/client`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log("Form filling profile base 64", result);
                let obj = JSON.parse(result);
                if (obj.status == 200) {
                    console.log("Rightfully added sign", obj);
                    dispatch({
                        type: "SET_SIGN_TOKEN",
                        payload: obj.sign
                    });
                }
            })
            .catch(error => console.log('error', error));
    }

    return (

        <NavigationContainer linking={linking}>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
             initialRouteName="Requestlogin"
            // initialRouteName="Basicinformtion"
            >
                <Stack.Screen name="Requestlogin" component={RequestLogin} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Declaration" component={Declaration} />
                <Stack.Screen name="Completation" component={Completation} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Basicinformtion" component={Basicinformation} />
                <Stack.Screen name="Seeting" component={Seeting} />
                <Stack.Screen
                    name="Scanqrcode"
                    component={Scanqrcode}
                />
            </Stack.Navigator>
        </NavigationContainer>

    );
};

export default Rootnavigation;


