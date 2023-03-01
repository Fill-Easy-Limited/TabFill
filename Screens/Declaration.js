import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, ScrollView, Linking, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Formtheme from "./Component/formtheme";
import { Modals } from "./Component/ModalPop";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

const Declaration = () => {

  // const dispatch = useDispatch();
  const [tick, setTick] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const signToken = useSelector((state) => state.userInfo.signToken);

  function redirectToIams(url) {
    Linking.openURL(url);
  }

  const ModalPop = () => {
    return (
      <Modal isVisible={isModalVisible}>
        <Modals.Container>
          <View style={{ height: '15%', justifyContent: 'center', backgroundColor: '#c49b33' }}>
            <Modals.Header title='Sign your application with "iAM SMART"' />
          </View>
          <View style={{ ...styles.modal, width: '100%', height: '70%' }}>
            <View style={{ marginLeft: 30, marginTop: 25, flexDirection: 'row' }}>
              <View>
                <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>Service name: </Text>
              </View>
              <View>
                <Text style={{ color: '#000', fontSize: 20, }}>Loan application form </Text>
              </View>
            </View>
            <View style={{ marginLeft: 30, marginTop: 20, flexDirection: 'row' }}>
              <View>
                <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>Document: </Text>
              </View>
              <View>
                <Text style={{ color: '#000', fontSize: 20, }}>From 198B </Text>
              </View>
            </View>
            <View style={{ marginLeft: 30, marginTop: 20, flexDirection: 'row' }}>
              <View>
                <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>Identification code: </Text>
              </View>
              <View>
                <Text style={{ color: '#49877c', fontSize: 22, fontWeight: 'bold' }}>5415 </Text>
              </View>
            </View>
            <View style={{ marginLeft: 30, marginTop: 20, }}>
              <View>
                <Text style={{ color: '#000', fontSize: 18, }}>Please follow the steps below: </Text>
              </View>
            </View>
            <View style={{ marginLeft: 30, marginTop: 25, }}>
              <View>
                <Text style={{ color: '#49877c', fontSize: 18, }}>1. Open "iAM Smart" app in your mobile device </Text>
              </View>
              <View style={{ marginTop: 10, marginLeft: 20 }}>
              <Image source={require("../assets/clickapp.png")}
                      style={{ width: 35, height: 35, resizeMode: 'contain' }} />
              </View>
            </View>
            <View style={{ marginLeft: 30, marginTop: 25, }}>
              <View>
                <Text style={{ color: '#000', fontSize: 18, }}>2. Tap on "To Sign" </Text>
              </View>
            </View>
            <View style={{ marginLeft: 30, marginTop: 25, }}>
              <View>
                <Text style={{ color: '#000', fontSize: 18, }}>3. Make sure the identification code shown in "iAM Smart" is the same and tap on "Sign to complete the digital signing" </Text>
              </View>
            </View>
          </View>
        </Modals.Container>
      </Modal>
    )
  }

  useEffect(() => {
    if (signToken && signToken.length > 0) {
      setModalVisible(false);
      setTimeout(() => {
        navigation.navigate('Completation');
      }, 1500);
    }
  }, [signToken]);

  const navigation = useNavigation();

  const requestSignAnon = async () => {

    var myHeaders = new Headers();
    myHeaders.append("x-client-id", "cd89d333a7ec42d288421971dfb02d1d");
    myHeaders.append("x-client-secret", "9b7a597d7a574d439566b259c5d67281a9829404e9024b20b1f42d5e99bb0673");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      'lang': 'en-US',
      'scope': 'eidapi_auth eidapi_formFilling eidapi_sign eidapi_fr',
      'source': 'PC_Browser',
      'redirect': 'fill-easy-demo://sign/',
      'name': 'Credit Card Application Form',
      'hkicHash': '4753bd125a926815892a6551933d70d687e2bcef17b608863cd8bd4e0e709f23',
      'fileHash': 'af8b6f626242f214be360fa7d412e42dacb2f48bc11bb089019a912930019301',
      'service': 'Digital Signing of Supplementary Card Application Form by fill-easy'
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://dev.fill-easy.com/iamsmart/request/signing-anonymous", requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result)
        const token = res?.token;
        const url = res?.url;
        console.log("Response for 1st api", res);
        console.log("Token data", token);
        AsyncStorage.setItem("@signtoken", token);

        redirectToIams(url);
      })
      .catch(error => console.log('error', error));
  }

  const toggleModal = () => {
    setModalVisible(true)
    setTimeout(() => {
      requestSignAnon();
    }, 10000)
  }

  if (isModalVisible) {
    return (
      <ModalPop />
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Formtheme text={"Declaration"}
        bottomtext={"Sign with iAM Smart"} handlenav={toggleModal} disabled={!tick} >

        <View style={{ paddingHorizontal: 50 }}>
          {/* <Text>Please click the<TouchableOpacity><Text>Personal Loan Application Declaration</Text></TouchableOpacity></Text> */}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              flexWrap: "wrap",
              alignContent: "center",

              alignItems: "center",
              marginTop: 25,
            }}
          >
            <Text style={{ fontSize: 18, color: "black" }}>Please click the</Text>
            <TouchableOpacity style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 18, color: "blue" }}>
                {" "}
                Personal Loan Application Declaration
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 18, color: "black" }}>
              {" "}
              before application submission. You may refer{" "}
            </Text>
            <TouchableOpacity style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 18, color: "blue" }}> here</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 18, color: "black" }}>
              {" "}
              to the related terms and conditions you that have agreed to at the
              beginning of the application proess.
            </Text>
          </View>

          <Text
            style={{
              marginTop: 15,
              fontWeight: "bold",
              color: "black",
              fontSize: 20,
            }}
          >
            Responsible Lending Reminder :{" "}
            <Text style={{ fontSize: 18, fontWeight: "normal" }}>
              To borrow or not borrow? Borrow only if you can repay!
            </Text>
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontWeight: "bold",
              color: "black",
              fontSize: 20,
            }}
          >
            Smart tips :{" "}
            <Text style={{ fontSize: 18, fontWeight: "normal" }}>
              You may access the repayment ability first to avoid any
              over-borrowing and have a clear understanding of your financial
              condition, daily expenses, actual borrowing needs, Also please repay
              the load on time to avoid late payment charges and additional
              overdue interest.
            </Text>
          </Text>

          <View
            style={{
              width: "100%",
              backgroundColor: "#fcf1f1",
              marginTop: 15,
              padding: 15,
            }}
          >
            <Text style={{ color: "red", fontSize: 13, marginLeft: 38 }}>
              Please tick the box after click and read the Personal Loan
              Application Declaration
            </Text>
            <View style={{ flexDirection: "row", marginTop: 15, alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 25,
                  borderWidth: 1,
                  borderColor: "gray",
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={() => setTick(!tick)}
              >
                {tick && <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: "black",
                    backgroundColor: '#000'
                  }}
                />}
              </TouchableOpacity>

              <Text style={{ fontSize: 20, color: "black", marginLeft: 15 }}>I confirm that I have read and agreed to be bound by the above declaration, terms and confirm my understanding to the responsible lending reminder and summary page details before submitting my application.</Text>
            </View>
          </View>
        </View>
      </Formtheme>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  modal: {
    height: "60%",
  },
});

export default Declaration;
