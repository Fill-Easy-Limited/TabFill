import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Formtheme from "./Component/formtheme";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import { Modals } from "./Component/ModalPop";

const Profile = ({ route }) => {
  const [cname, setCname] = useState("");
  const [ename, setEname] = useState("");
  const [cardnumber, setCardnumber] = useState("");
  const [education, setEducation] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [maritial, setMaritial] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [billadd, setBilladd] = useState("");

  const { token1 } = route.params;
  const data = useSelector(state => state);

  const dispatch = useDispatch();

  const profileToken = useSelector((state) => state.userInfo.profileToken);
  const nprofileToken = useSelector((state) => state.userInfo.normProfileToken);
  const authToken = useSelector((state) => state.userInfo.authToken);

  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (profileToken && profileToken.length > 0) {
      navToBasic1()
      // navigation.navigate('Basicinformtion', { token: '' });
    }
  }, [profileToken]);

  function redirectToIams() {
    Linking.openURL(url);
  }

  const ModalPop = () => {
    return (
      <Modal isVisible={isModalVisible}>
        <Modals.Container>
          <View style={{ height: '15%', justifyContent: 'center', backgroundColor: '#c49b33' }}>
            <Modals.Header title='Authorise "iAM Smart" to provide personal information' />
          </View>
          <View style={{ ...styles.modal, width: '100%', height: '60%' }}>
            <View style={{ marginLeft: 30, marginTop: 25, }}>
              <View>
                <Text style={{ color: '#000', fontSize: 18, }}>Please follow the steps below: </Text>
              </View>
            </View>
            <View style={{ marginLeft: 30, marginTop: 25, }}>
              <View>
                <Text style={{ color: '#49877c', fontSize: 18, }}>1. Open "iAM Smart" app in your mobile device </Text>
              </View>
            </View>
            <View style={{ marginLeft: 30, marginTop: 25, }}>
              <View>
                <Text style={{ color: '#000', fontSize: 18, }}>2. Tap on "To fill" </Text>
              </View>
            </View>
            <View style={{ marginLeft: 30, marginTop: 25, }}>
              <View>
                <Text style={{ color: '#000', fontSize: 18, }}>3. Tap on "Agree to use" to authorise</Text>
              </View>
              <View style={{ marginTop: '5%', marginLeft: 30, alignSelf: 'center', justifyContent: 'center' }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#2b7366",
                    borderRadius: 150,
                    width: 300,
                    height: 65,
                    marginTop: 15,
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
          </View>
        </Modals.Container>
      </Modal>
    )
  }

  const requestEmeAnon = async () => {

    var myHeaders = new Headers();
    myHeaders.append("x-client-id", "cd89d333a7ec42d288421971dfb02d1d");
    myHeaders.append("x-client-secret", "9b7a597d7a574d439566b259c5d67281a9829404e9024b20b1f42d5e99bb0673");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "scope": "eidapi_auth eidapi_formFilling",
      "lang": "en-US",
      "source": "PC_Browser",
      "redirect": "fill-easy-demo://eme/",
      "profileFields": [
        "idNo",
        "enName",
        "chName",
        "birthDate",
        "gender"
      ],
      "formData": {
        "formName": "Loan Application Form",
        "formNum": "SC_001",
        "formDesc": "Application for Loan",
        "formFields": [
          "prefix",
          "maritalStatus",
          "homeTelNumber",
          "officeTelNumber",
          "mobileNumber",
          "emailAddress",
          "residentialAddress",
          "postalAddress",
          "educationLevel",
          "addressDocInfo",
          "addressDocFile"
        ]
      }
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://dev.fill-easy.com/iamsmart/request/eme-anonymous", requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result)
        const token = res?.token
        const url1 = res?.url;
        console.log("Response for 1st api", res);
        console.log("Token data", token);
        AsyncStorage.setItem("@token", token);
        setUrl(url1);
        setModalVisible(true);
        // redirectToIams(url);
      })
      .catch(error => console.log('error', error));
  }

  const navToBasic1 = () => {
    setModalVisible(false);
    navigation.navigate('Basicinformtion', { token: '' })
  }

  const requestEme = async () => {

    var myHeaders = new Headers();
    myHeaders.append("x-client-id", "cd89d333a7ec42d288421971dfb02d1d");
    myHeaders.append("x-client-secret", "9b7a597d7a574d439566b259c5d67281a9829404e9024b20b1f42d5e99bb0673");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "token": `${authToken}`,
      "source": "PC_Browser",
      "profileFields": [
        "idNo",
        "enName",
        "chName",
        "birthDate",
        "gender"
      ],
      "formData": {
        "formName": "Loan Application Form",
        "formDesc": "Application for Loan",
        "formNum": "SC_001",
        "formFields": [
          "prefix",
          "maritalStatus",
          "homeTelNumber",
          "officeTelNumber",
          "mobileNumber",
          "emailAddress",
          "residentialAddress",
          "postalAddress",
          "educationLevel",
          "addressDocInfo"
        ]
      }
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://dev.fill-easy.com/iamsmart/request/eme", requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result)
        console.log("Response for Profile norm api", res);
        // console.log("Token data", token);
        const token = res?.token;
        // setLoader(true);
        // redirectToIams(url);
        if (res.status) {
          navigation.navigate('Basicinformtion', { token: token })
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
      <Formtheme text={"User Profile"}
        handlenav={route.params.token1 ? requestEme : requestEmeAnon}
        bottomtext={"Personal data with iAM Smart"}>
        <View style={{ flex: 1, zIndex: -999, paddingHorizontal: 50, marginTop: -50 }}>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row" }}>
                {/* Chinese name */}
                <View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>English name<Text style={{ color: '#FF0000' }}>*</Text> :</Text>
                    <Image
                      source={require("../assets/smart.png")}
                      style={styles.smartimage}
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      placeholder=""
                      value={cname}
                      onChangeText={(text) => setCname(text)}
                      style={styles.inputtext}
                    />
                  </View>
                </View>
                {/* English name */}
                <View style={{ marginLeft: 20 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>Chinese name :</Text>
                    <Image
                      source={require("../assets/smart.png")}
                      style={styles.smartimage}
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      placeholder=""
                      value={ename}
                      onChangeText={(text) => setEname(text)}
                      style={styles.inputtext}
                    />
                  </View>
                </View>
              </View>
              {/* Gender  */}

              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <Text style={styles.title}>Gender<Text style={{ color: '#FF0000' }}>*</Text> : </Text>
                <Image
                  source={require("../assets/smart.png")}
                  style={styles.smartimage}
                />
                <TouchableOpacity>
                  <Text style={styles.title}> F</Text>
                </TouchableOpacity>
                <Text style={styles.title}> /</Text>
                <TouchableOpacity>
                  <Text style={styles.title}> M </Text>
                </TouchableOpacity>
                <Text style={styles.title}> /</Text>
                <TouchableOpacity>
                  <Text style={styles.title}> X </Text>
                </TouchableOpacity>
              </View>

              {/* Card numebr and education  */}
              <View style={{ flexDirection: "row", marginTop: 15, }}>
                {/*Card number */}
                <View style={{ width: "40%" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>
                      Hong Kong Identity Card number<Text style={{ color: '#FF0000' }}>*</Text> :
                    </Text>
                    <Image
                      source={require("../assets/smart.png")}
                      style={styles.smartimage}
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      placeholder=""
                      value={cardnumber}
                      onChangeText={(text) => setCardnumber(text)}
                      style={{ ...styles.inputtext }}
                    />
                  </View>
                </View>
                {/* Education level */}
                <View style={{ marginLeft: 25, width: "40%" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>Education level<Text style={{ color: '#FF0000' }}>*</Text> :</Text>
                    <Image
                      source={require("../assets/smart.png")}
                      style={styles.smartimage}
                    />
                  </View>
                  <View style={{ ...styles.inputView }}>
                    <TextInput
                      placeholder=""
                      value={education}
                      onChangeText={(text) => setEducation(text)}
                      style={{ ...styles.inputtext }}
                    />
                  </View>
                </View>
              </View>

              {/* DOB and status */}

              <View style={{ flexDirection: "row", marginTop: 15 }}>
                {/* DOB */}
                <View style={{ width: "40%" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>Date of birth<Text style={{ color: '#FF0000' }}>*</Text> :</Text>
                    <Image
                      source={require("../assets/smart.png")}
                      style={styles.smartimage}
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      placeholder=""
                      value={birthdate}
                      onChangeText={(text) => setBirthdate(text)}
                      style={{ ...styles.inputtext, width: 350 }}
                    />
                  </View>
                </View>
                {/*  Marital status */}
                <View style={{ marginLeft: 25, width: "40%" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>Marital status<Text style={{ color: '#FF0000' }}>*</Text> :</Text>
                    <Image
                      source={require("../assets/smart.png")}
                      style={styles.smartimage}
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      placeholder=""
                      value={maritial}
                      onChangeText={(text) => setMaritial(text)}
                      style={{ ...styles.inputtext, width: 350 }}
                    />
                  </View>
                </View>
              </View>
              {/* Email and address */}
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                {/* Email */}
                <View style={{ width: "40%" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>Email<Text style={{ color: '#FF0000' }}>*</Text> :</Text>
                    <Image
                      source={require("../assets/smart.png")}
                      style={styles.smartimage}
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      placeholder=""
                      value={email}
                      onChangeText={(text) => setEmail(text)}
                      style={{ ...styles.inputtext, width: 350 }}
                    />
                  </View>
                </View>
                {/* Residential address */}
                <View style={{ marginLeft: 25, width: "40%" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>Residential address<Text style={{ color: '#FF0000' }}>*</Text> :</Text>
                    <Image
                      source={require("../assets/smart.png")}
                      style={styles.smartimage}
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      placeholder=""
                      value={address}
                      onChangeText={(text) => setAddress(text)}
                      style={{ ...styles.inputtext, width: 350 }}
                    />
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 160 }}>
                {/* Number */}
                <View style={{ width: "40%" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>
                      Mobile phone number<Text style={{ color: '#FF0000' }}>*</Text>  :
                    </Text>
                    <Image
                      source={require("../assets/smart.png")}
                      style={styles.smartimage}
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      placeholder=""
                      value={number}
                      onChangeText={(text) => setNumber(text)}
                      style={{ ...styles.inputtext, width: 350 }}
                    />
                  </View>
                </View>
                {/* Billing address */}
                <View style={{ marginLeft: 25, width: "40%" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>Billing address<Text style={{ color: '#FF0000' }}>*</Text> :</Text>
                    <Image
                      source={require("../assets/smart.png")}
                      style={styles.smartimage}
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      placeholder=""
                      value={billadd}
                      onChangeText={(text) => setBilladd(text)}
                      style={{ ...styles.inputtext, width: 350 }}
                    />
                  </View>
                </View>
              </View>

            </View>
          </ScrollView>
        </View>
      </Formtheme>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: "PTSans-Bold",
    color: "#424242",
  },
  smartimage: { width: 18, height: 23, marginLeft: 5 },
  inputView: {
    height: 54,
    borderWidth: 1,
    borderColor: "#707070",
    marginTop: 20,
  },
  inputtext: { color: "black", fontSize: 20, marginLeft: 15 },
});
