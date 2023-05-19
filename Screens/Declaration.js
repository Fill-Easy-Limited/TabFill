import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, ScrollView, Linking, StyleSheet, Image, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Formtheme from "./Component/formtheme";
import { Modals } from "./Component/ModalPop";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import CryptoJS from 'crypto-js';

const Declaration = ({ route }) => {

  const dispatch = useDispatch();
  const [tick, setTick] = useState(false);
  const { token1 } = route.params;
  const [hkic, setHkic] = useState('****');
  const [url, setUrl] = useState('');
  const [hash1, setHash1] = useState('');
  const [decoded, setDecoded] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const signToken = useSelector((state) => state.userInfo.signToken);
  const normSignToken = useSelector((state) => state.userInfo.normSignToken);
  const profileToken = useSelector((state) => state.userInfo.profileToken);
  const baseUrl = useSelector(state => state?.envInfo?.baseurl)
  const xclientid = useSelector(state => state?.envInfo?.xclient)
  const xsecretid = useSelector(state => state?.envInfo?.xserver)


  function redirectToIams() {
    Linking.openURL(url);
  }

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  const atob1 = (input = '') => {
    let str = input.replace(/=+$/, '');
    let output = '';

    if (str.length % 4 == 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (let bc = 0, bs = 0, buffer, i = 0;
      buffer = str.charAt(i++);

      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  }

  useEffect(() => {
    if (profileToken && profileToken.length > 0) {
      jwtParts = profileToken.split('.',);
      console.log("JWT parts", jwtParts);
      let tokenPayload = jwtParts[1];
      console.log("Token load", tokenPayload);
      let decryptedResultsString = atob1(tokenPayload);
      console.log("Decrypted results ", decryptedResultsString);
      let prof1 = JSON.parse(decryptedResultsString);
      setDecoded(prof1.formFilling);
      console.log("idNo?.Identification", prof1.formFilling.idNo?.Identification);
      hkicHash1(prof1.formFilling.idNo?.Identification);
    }
  }, [])

  const ModalPop = () => {
    return (
      <Modal isVisible={isModalVisible}>
        <Modals.Container>
          <View style={{ height: '15%', justifyContent: 'center', backgroundColor: '#c49b33' }}>
            <Modals.Header title='Authorise "iAM Smart" to provide personal information' />
          </View>
          <View style={{ ...styles.modal, width: '100%', height: '85%' }}>
            <View style={{ marginLeft: 30, marginTop: 25, flexDirection: 'row' }}>
              <View>
                <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>Document: </Text>
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
                <Text style={{ color: '#49877c', fontSize: 22, fontWeight: 'bold' }}>{hkic} </Text>
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
            <View style={{ alignSelf: 'center', justifyContent: 'center' }} >
              <TouchableOpacity
                style={{
                  backgroundColor: "#2b7366",
                  borderRadius: 150,
                  display: url && url.length > 0 ? 'flex' : 'none',
                  width: 300,
                  height: 65,
                  marginLeft: 20,
                  marginTop: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => redirectToIams()}
              >
                <Image source={require("../assets/ismart.png")} />
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: "PTSans-Bold",
                    color: "white",
                  }}
                >
                  Open iAM SMART
                </Text>
              </TouchableOpacity>
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
    } else if (normSignToken && normSignToken.length > 0) {
      setModalVisible(false);
      setTimeout(() => {
      }, 1500);
    }
  }, [signToken]);

  const navigation = useNavigation();

  const { idNo } = decoded;

  const hkicHash1 = async (hkic) => {

    console.log("Hkic hash ", hkic);
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    // fetch("https://api.hashify.net/hash/sha256/hex?value=" + hkic, requestOptions)
    //   .then(response => response.text())
    //   .then(result => {
    //     console.log("The result for hkic hash", typeof result);
    //     // let sha = JSON.parse(result);
        let sha = CryptoJS.SHA256(hkic).toString();
        console.log("The converted data ", sha);
        setHash1(sha);
      // })
      // .catch(error => console.log('error', error));
  }

  const requestSignAnon = async () => {

    console.log("Returned hash", hash1);

    const url1 = await AsyncStorage.getItem('@url');

    if (url1.includes('testing.fill-easy.com')) {
      dispatch({
        type: "RESET_TEST",
      });
    } else {
      dispatch({
        type: "RESET_DEV",
      });
    }

    var myHeaders = new Headers();
    myHeaders.append("x-client-id", xclientid);
    myHeaders.append("x-client-secret", xsecretid);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      'lang': 'en-US',
      'scope': 'eidapi_auth eidapi_formFilling eidapi_sign eidapi_fr',
      'source': 'PC_Browser',
      'redirect': 'fill-easy-demo://sign/',
      'name': 'Loan application form',
      // 'hkicHash': '4753bd125a926815892a6551933d70d687e2bcef17b608863cd8bd4e0e709f23',
      // 'fileHash': 'af8b6f626242f214be360fa7d412e42dacb2f48bc11bb089019a912930019301', 
      // "hkicHash": "c913c226c44240d29854783a3ff33c0b2e8ed1136224fb8f537716ef003c2b70", G996963
      "hkicHash": hash1,
      "fileHash": "af8b6f626242f214be360fa7d412e42dacb2f48bc11bb089019a912930019301",
      'service': 'Digital Signing of Supplementary Card Application Form by fill-easy'
    });

    console.log("Body request ", raw);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`https://${baseUrl}/iamsmart/request/signing-anonymous`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result)
        const token = res?.token;
        const url1 = res?.url;
        setUrl(url1);
        console.log("Response for 1st sign  api", res);
        setHkic(res.hkic);
        console.log("Token data", token);
        AsyncStorage.setItem("@signtoken", token);

        // redirectToIams(url);
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    let interval;
    if (normSignToken && normSignToken.length > 0) {
      interval = setInterval(reqNormSignResults, 1000);
    }
    return () => {
      clearInterval(interval);
    }
  }, [normSignToken]);

  const requestSign = async () => {

    const tokenasync = await AsyncStorage.getItem('@authenticate_token')

    console.log("Permanent auth tpoken", tokenasync);
    var myHeaders = new Headers();
    myHeaders.append("x-client-id", xclientid);
    myHeaders.append("x-client-secret", xsecretid);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var raw = JSON.stringify({
      "token": `${tokenasync}`,
      "source": "PC_Browser",
      "name": "Loan application form",
      // "hash": hash1, 
      "hash": "c913c226c44240d29854783a3ff33c0b2e8ed1136224fb8f537716ef003c2b70", //"a642a0edd1f3f8b6f626242f214be360fa7d412e42dacb2f48bc11bb089019a9",
      "service": "Digital Signing of Supplementary Card Application Form by fill-easy"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`https://${baseUrl}/iamsmart/request/signing`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result);
        const token = res?.token;
        console.log("Response for normal singing api", res);
        setHkic(res.hkic);
        console.log("Token data", token);
        AsyncStorage.setItem("@authSigntoken", token);
        dispatch({
          type: "SET_NSIGN_TOKEN",
          payload: res.token
        });
      })
      .catch(error => console.log('error', error));
  }

  const toggleModal = () => {
    setModalVisible(true)
    setTimeout(() => {
      if (token1 && token1.length > 0) {
        requestSign();
      } else {
        requestSignAnon();
      }
    }, 3000)
  }

  const reqNormSignResults = async () => {

    const tokenasync = await AsyncStorage.getItem('@authSigntoken')
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
        console.log("Sing data from last normal login", result);
        let obj = JSON.parse(result);
        if (obj.status == 200) {
          console.log("Rightfully added normal api sign", obj);
          dispatch({
            type: "SET_NSIGN_TOKEN",
            payload: ''
          });
          setModalVisible(false);
          navigation.navigate('Completation')
        }
      })
      .catch(error => console.log('error', error));
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
