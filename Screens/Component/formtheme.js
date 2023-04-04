import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Keyboard } from "react-native";
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
            style={{ fontSize: 58, color: "black", fontFamily: "PTSans-Bold" }}
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
              width: 1150,
              height: 995,
              // marginTop: -750,
              // right: -300,
              marginTop: -720,
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
              width: "70%",
              marginTop: 50,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
              >
                Banking
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
              >
                Credit Card
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
              >
                Loans
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
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
            height: 130,
            bottom: 0,
            backgroundColor: "white",
          }}
        >
          <View style={{ bottom: -30, left: -135 }}>
            <Image
              source={require("../../assets/blue.png")}
              style={{ width: 300, height: 300 }}
            />
          </View>

          <View style={{ bottom: -75, left: "100%" }}>
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
                width: bottomtext == 'Next' ? 180 : 442,
                height: 65,
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
              {bottomtext == 'Next' ? <></> : <Image source={require("../../assets/ismart.png")} />}
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: "PTSans-Bold",
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
                width: 166,
                height: 65,
                marginTop: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 15,
              }}
              onPress={() => {text == 'Basic Informations' ? resetEverything() : navigation.goBack()}}
            >
              <Text
                style={{ fontSize: 24, fontWeight: "bold", color: "black" }}
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
