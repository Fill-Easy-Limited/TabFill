/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Dimensions,
  View,
  //Dimensions,
  useWindowDimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "react-native/Libraries/NewAppScreen";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const Completation = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  resetEverything = async () => {
    // AsyncStorage.clear();
    await AsyncStorage.removeItem("@signtoken");
    await AsyncStorage.removeItem("@authSigntoken");
    await AsyncStorage.removeItem("@authenticate_token");
    await AsyncStorage.removeItem("@token");
    await AsyncStorage.removeItem("@authtoken");


    dispatch({
      type: "CLEAR_ALL",
    });
    navigation.reset({
      index: 0,
      routes: [{ name: 'Requestlogin' }],
    })
  }

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <LinearGradient
        colors={["#231220", "#100808"]}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0, 0.4]}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, width: "100%", height: "100%", flexDirection: "row" }}>
          <View style={{ width: "40%", padding: "5%" }}>
            <Image
              source={require("../assets/card.png")}
              style={{ width: 35, height: 35 }}
            />

            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{ fontSize: Platform.OS === "ios" ? 40: 58,  color: "white" }}
              >
                Application Form Sent!
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
                    width: "48%",
                    backgroundColor: "#891eff",
                    alignItems: "center",
                    justifyContent: "center",
                    height: Platform.OS === "ios" ? 55 : 65,
                    //  paddingVertical: 15,
                    borderRadius: 33,
                  }}
                >
                  <Text
                    style={{ fontSize: Platform.OS === "ios" ? 18 : 24, fontWeight: "bold", color: "white" }}
                  >
                    View Status
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "48%",
                    borderWidth: 2,
                    borderColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    height: Platform.OS === "ios" ? 55 : 65,
                    borderRadius: 33,
                  }}
                  onPress={() => resetEverything()}
                >
                  <Text
                    style={{ fontSize: Platform.OS === "ios" ? 18 : 24, fontWeight: "bold", color: "white" }}
                  >
                    Home
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ position: "absolute", bottom: -150, left: -120 }}>
                <Image
                  source={require("../assets/blue.png")}
                  style={{ width: 200, height: 200 }}
                />
              </View>

              <View style={{ position: "absolute", bottom: -100, left: "100%" }}>
                <Image
                  source={require("../assets/orrange.png")}
                  style={{ width: 100, height: 100 }}
                />
              </View>
            </View>
          </View>
          <View style={{ width: "60%" }}>
            <Image
              source={require("../assets/m.png")}
              style={{ height: hp("100%"), width: "140%" }}
            />

            <View
              style={{ position: "absolute", width: "100%", height: "100%" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  paddingLeft: "15%",
                  justifyContent: "space-evenly",
                  marginTop: "10%",
                }}
              >
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Banking
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Creditcard
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Loans
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Profile
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Image
                    source={require("../assets/user.png")}
                    style={{ width: 41, height: 41 }}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: Platform.OS === "ios" ? "4%" :"15%", alignSelf: "center" }}>
                <Image
                  source={require("../assets/complete.png")}
                  style={{ width: Platform.OS === "ios" ? 250 :  351, height: Platform.OS === "ios" ? 250 : 351 }}
                />
                <TouchableOpacity style={{ marginLeft: 70 }}>
                  {/* <Text style={{ fontSize: 18, fontFamily: "PTSans-Regular", color: "#67A4E4", textDecorationLine: "underline" }}>applicants.loanform.pdf</Text> */}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

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

export default Completation;
