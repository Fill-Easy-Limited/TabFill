import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Keyboard, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

const Formtheme = ({ children, text, bottomtext, handlenav, disabled = false }) => {
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  resetEverything = async () => {
    // AsyncStorage.clear();
    await AsyncStorage.removeItem("@signtoken", token);
    await AsyncStorage.removeItem("@authSigntoken", token);
    await AsyncStorage.removeItem("@authenticate_token", obj.token);
    await AsyncStorage.removeItem("@token", token);
    await AsyncStorage.removeItem("@authtoken", token);
    dispatch({
      type: "CLEAR_ALL",
    });
    navigation.reset({
      index: 0,
      routes: [{ name: 'Requestlogin' }],
    })
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
      console.log("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
      console.log("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1, height: "100%" }}>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <View
          style={{
            width: "40%",
            // alignItems: "center",
            justifyContent: "center",
            paddingLeft: 50,
          }}
        >
          <Text
            style={{ fontSize: Platform.OS === "ios" ? 40 : 58, color: "black",  }}
          >
            {text}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            marginRight: 0,
          }}
        >
          <Image
            source={require("../../assets/m2.png")}
            style={{
              width: Platform.OS === "ios" ? 700 : 1150,
              height: Platform.OS === "ios" ? 900 :  995,
              // marginTop: -750,
              // right: -300,
              marginTop:   -720,
              right: -280,
              resizeMode: "stretch",
              transform: [{ rotate: "25deg" }],
            }}
          />

          <View
            style={{
              position: "absolute",
              justifyContent: "space-evenly",
              alignItems: "center",
              width:  Platform.OS === "ios" ? "80%" : "70%",
              marginTop: 50,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity>
              <Text
                style={{ fontSize: Platform.OS === "ios" ? 14 : 18, fontWeight: "bold", color: "white" }}
              >
                Banking
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{ fontSize: Platform.OS === "ios" ? 14 : 18, fontWeight: "bold", color: "white" }}
              >
                Credit Card
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{ fontSize: Platform.OS === "ios" ? 14 : 18, fontWeight: "bold", color: "white" }}
              >
                Loans
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{ fontSize: Platform.OS === "ios" ? 14 : 18, fontWeight: "bold", color: "white" }}
              >
                Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../assets/user.png")}
                style={{ width: 41, height: 41 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {children}

      {keyboardStatus == false && (
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            width: "100%",
            height: Platform.OS === "ios" ? 100:  130,
            bottom: 0,
            
            backgroundColor: "white",
          }}
        >
          <View style={{ bottom: Platform.OS === "ios" ? -40 : -30, left: -135 }}>
            <Image
              source={require("../../assets/blue.png")}
              style={{ width:Platform.OS === "ios" ? 250 : 300, height:Platform.OS === "ios" ? 250 : 300 }}
            />
          </View>

          <View style={{ bottom: Platform.OS === "ios" ? -80 : -75, left: "100%" }}>
            <Image
              source={require("../../assets/orrange.png")}
              style={{ width: 124, height: 124 }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "flex-end",
              paddingRight: 50,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: bottomtext == 'Next' ? '#000' : "#2b7366",
                borderRadius: 150,
                width: bottomtext == 'Next' ? Platform.OS === 'ios' ? 160 : 180 : Platform.OS === "ios" ? 300 : 442,
                height: Platform.OS === "ios" ? 50 : 65,
                marginTop: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              disabled={disabled}
              onPress={() => {
                if (bottomtext == "Auto with iAM Smart") {

                  navigation.navigate("Completation");
                } else {
                  handlenav()
                  // navigation.navigate("Declaration");
                }
              }}
            >
              {bottomtext == 'Next' ? <></> : <Image source={require("../../assets/ismart.png")} style={{width : 25,height:25 , resizeMode:"contain"}} />}
              <Text
                style={{
                  fontSize: Platform.OS === "ios" ? 18 : 22,
                  
                  color: "white",
                }}
              >
                {bottomtext}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                borderWidth: 4,
                borderColor: "black",
                borderRadius: 150,
                width: Platform.OS === "ios" ? 150 : 166,
                height: Platform.OS === "ios" ? 45 : 65,
                marginTop: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 15,
              }}
              onPress={() => {text == 'Basic Informations' ? resetEverything() : navigation.goBack()}}
            >
              <Text
                style={{ fontSize: Platform.OS === 'ios' ? 20 : 24, fontWeight: "bold", color: "black" }}
              >
                {text == 'User Profile' ? 'Cancel' : 'Back'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Formtheme;
