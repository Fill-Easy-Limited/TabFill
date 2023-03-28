/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  Dimensions,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const RequestLogin = () => {

  const navigation = useNavigation();
  const authToken = useSelector((state) => state.userInfo.authToken);

  useEffect(() => {
    if (authToken && authToken.length > 0) {
      navigation.navigate('Login');
    }
  }, [authToken]);

  function redirectToIams(url) {
    Linking.openURL(url);
  }

  const requestLoginAnon = async () => {

    var myHeaders = new Headers();
    myHeaders.append("x-client-id", "2588100d923d4af382b6c4033b086419");
    myHeaders.append("x-client-secret", "21dd677be8984d0b836ac00304803709abd7ac0cb16e4151b539b88029219356");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "scope": "eidapi_auth eidapi_formFilling eidapi_sign eidapi_fr",
      "lang": "en-US",
      "source": "PC_Browser",
      "redirect": "fill-easy-demo://auth/"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://testing.fill-easy.com/iamsmart/request/qr", requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result)
        const token = res?.token
        console.log("Response for Login token for check", token);
        const url = res?.url;
        // setUrl(url);
        AsyncStorage.setItem("@authtoken", token);

        redirectToIams(url);
      })
      .catch(error => console.log('error', error));
  }

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../assets/login.png")}
        style={{ width: "100%", height: "100%" }}
      />
      <View
        style={{
          position: "absolute",
          flex: 1,
          width: "100%",
          height: "100%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: "40%",
            padding: 75,
            paddingRight: 10,
            height: "100%",
          }}
        >
          <Image
            source={require("../assets/card.png")}
            style={{ width: 35, height: 32 }}
          />

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 58,
                fontFamily: "PTSans-Bold",
                color: "#FFFFFF",
              }}
            >
              Apply For Our Best Loan Services
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  width: "45%",
                  height: 68,

                  backgroundColor: "#8900FF",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 33,
                }}
                onPress={() => navigation.navigate("Profile", { token: '' })}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: "PTSans-Bold",
                    color: "#FFFFFF",
                  }}
                >
                  Apply now
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "45%",
                  borderWidth: 4,
                  height: 68,
                  borderColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 10,
                  borderRadius: 33,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: "PTSans-Bold",
                    color: "#FFFFFF",
                  }}
                >
                  Explore
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                height: 65,
                backgroundColor: "#2B7366",
                borderRadius: 33,
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
              }}
              onPress={() => requestLoginAnon()}
            >
              <Image source={require("../assets/ismart.png")} />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 24,
                  fontFamily: "PTSans-Bold",
                  color: "#FFFFFF",
                }}
              >
                Login with iAM Smart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: "60%" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              // paddingLeft: "25%",

              justifyContent: "flex-end",
              marginTop: "8%",
            }}
          >
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  color: "#FFFFFF",
                  fontFamily: "PTSans-Bold",
                  // fontWeight: "600",
                }}
              >
                Banking
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  color: "#FFFFFF",
                  fontFamily: "PTSans-Bold",
                  marginLeft: 35,
                }}
              >
                Creditcard
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  color: "#FFFFFF",
                  fontFamily: "PTSans-Bold",
                  marginLeft: 35,
                }}
              >
                Loans
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                borderRadius: 33,
                height: 65,
                width: 164,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 35,
                marginRight: 35,
              }}
            >
              <Text
                style={{ fontSize: 24, fontFamily: "PTSans-Bold", color: "#6E84DB" }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default RequestLogin;
