import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Formtheme from "./Component/formtheme";
import Slider from "react-native-slider";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";
import { Modals } from "./Component/ModalPop";
import { useNavigation } from "@react-navigation/native";

const Basicinformation = ({ route }) => {

  const [value, setValue] = useState(96000);
  const { token } = route?.params;
  const [minval, setMinval] = useState('96,000');
  const [maxval, setMaxval] = useState(1100000);
  const [loader, setLoader] = useState(false);

  const [cname, setCname] = useState("");
  const [ename, setEname] = useState("");
  const [education, setEducation] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [maritial, setMaritial] = useState("");
  const [email, setEmail] = useState('');
  const [resAddress, setResAddress] = useState('');
  const [billAddress, setBillAddress] = useState('');

  const [val2, setVal2] = useState();
  const [val3, setVal3] = useState();
  const [val4, setval4] = useState();

  useEffect(() => {
    // const thirdval = maxval - minval;
    // const t = thirdval / 2;
    setVal3('$610,000');

    // const secondval = t - minval;
    // const s = secondval / 2;
    setVal2('$360,000');

    // const a = t - s;
    // const f = t + a;
    // const fourthval = maxval - t;
    // // const f = fourthval /2
    setval4('$840,000');
  }, [minval]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const profileToken = useSelector((state) => state.userInfo.profileToken);
  const normProfileToken = useSelector((state) => state.userInfo.normProfileToken);
  const baseUrl  = useSelector(state => state?.envInfo?.baseurl)
  const xclientid  = useSelector(state => state?.envInfo?.xclient)
  const xsecretid  = useSelector(state => state?.envInfo?.xserver)
  const [decodedData, setDecodedData] = useState({});
  const navigation = useNavigation();

  function getStringBetween(str, start, end) {
    const result = str.match(new RegExp(start + "(.*)" + end));

    return result[1];
  }

  const dispatch = useDispatch();

  useEffect(() => {
    let interval;
    if (normProfileToken.length == 0 && profileToken.length == 0) {
      interval = setInterval(reqFromDetails, 1000);
    } else {
      console.log("Norm profile token ", normProfileToken);
      if(normProfileToken.length > 0) {
        let jwtParts = normProfileToken.split('.',);
        console.log("JWT parts", jwtParts);
        let tokenPayload = jwtParts[1];
        console.log("Token load", tokenPayload);
        let decryptedResultsString = atob1(tokenPayload);
        console.log("Decrypted results ", decryptedResultsString);
        let prof1 = JSON.parse(decryptedResultsString);
        setDecodedData(prof1.Eme);
      }



      // let data = atob1(normProfileToken);
      // let prof, prof1;
      // if (data.length > 0) {
      //   console.log("String data1", stringData);
      //   let stringData = data.slice(0, -31);
      //   console.log("String data2", stringData);
      //   console.log("String data last character", stringData[stringData.length - 1]);
      //   prof = getStringBetween(stringData, '"HS256"}', "}}}}}}");
      //   // console.log("Data from stirng between", prof);
      //   prof = prof + "}}}}}}"
      //   prof1 = JSON.parse(prof);
      //   console.log("Decoded prof data", JSON.stringify(prof1));
      //   setDecodedData(prof1.Eme);
      // }
    }
    return () => {
      clearInterval(interval);
    }
  }, [normProfileToken]);

  useEffect(() => {
    if (profileToken && profileToken.length > 0) {
      jwtParts = profileToken.split('.',);
      console.log("JWT parts", jwtParts);
      let tokenPayload = jwtParts[1];
      console.log("Token load", tokenPayload);
      let decryptedResultsString = atob1(tokenPayload);
      console.log("Decrypted results ", decryptedResultsString);
      let prof1 = JSON.parse(decryptedResultsString);
      setDecodedData(prof1.formFilling);
    }
  }, [])

  const reqFromDetails = async () => {

    var myHeaders = new Headers();
    myHeaders.append("x-client-id", xclientid);
    myHeaders.append("x-client-secret", xsecretid);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "token": token
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
        let obj = JSON.parse(result);
        if (obj.status == 200) {
          console.log("I got the prfile ", obj);
          console.log("Object norm", obj.token);

          setLoader(false);
          dispatch({
            type: "SET_NPROFILE_TOKEN",
            payload: obj.token
          });
          return true;
        }
        setLoader(true);
        return false;
      })
      .catch(error => console.log('error', error));
  }

  const birthDayConverter = (dateString) => {
    let year = dateString.substring(0, 4);
    let month = dateString.substring(4, 6);
    let day = dateString.substring(6, 8);

    let date = new Date(year, month - 1, day);
    console.log("Date length", date.toDateString());
    return date.toDateString();
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

  const residentialFormat = (home) => {
    let reformat = `${home.EngPremisesAddress.Eng3dAddress.EngUnit.UnitNo}, ${home.EngPremisesAddress.BuildingName}, ${home.EngPremisesAddress.EngDistrict.DcDistrict}, ${home.EngPremisesAddress.Region}`
    return reformat;
  }

  const mapMaritalStatus = (maritalStatus) => {
    if (maritalStatus == 'S') {
      return 'Single'
    } else if (maritalStatus == 'W') {
      return 'Widowed'
    } else if (maritalStatus == 'M') {
      return 'Married'
    }
  }

  const { enName, idNo, gender, educationLevel,
    residentialAddress, birthDate, emailAddress,
    maritalStatus, mobileNumber, postalAddress } = decodedData;

  const navToDeclare = () => {
    if (normProfileToken.length == 0) {
      navigation.navigate('Declaration', { token1: '' });
    } else {
      navigation.navigate('Declaration', { token1: token });
    }
  }


  const ModalPop = () => {
    return (
      <Modal isVisible={loader}>
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
                {/* <TouchableOpacity
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
                </TouchableOpacity> */}
                <ActivityIndicator size="large" color="#00ff00" />
              </View>
            </View>
          </View>
        </Modals.Container>
      </Modal>
    )
  }

  if (loader) {
    return (
      <ModalPop />
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Formtheme text={"User Profile"}
        bottomtext={"Next"} handlenav={navToDeclare} >
        <View style={{ flex: 1, paddingHorizontal: 50, marginTop: -50 }}>
          <ScrollView style={{ flex: 1, marginBottom: 160 }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row" }}>
                {/* Chinese name */}
                <View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>English name<Text style={{ color: '#FF0000' }}>*</Text> :</Text>
                    {enName?.UnstructuredName && enName?.UnstructuredName.length > 0 && <Image
                      source={require("../assets/icon-light-3x.png")}
                      style={styles.smartimage}
                    />}
                  </View>
                  <View style={enName?.UnstructuredName && enName?.UnstructuredName.length > 0 ? styles.inputView1 : styles.inputView}>
                    <TextInput
                      placeholder=""
                      value={enName?.UnstructuredName && enName?.UnstructuredName.length > 0 ? enName?.UnstructuredName : ename}
                      editable={!(enName?.UnstructuredName && enName?.UnstructuredName.length > 0)}
                      onChangeText={(text) => setEname(text)}
                      style={styles.inputtext}
                    />
                  </View>
                </View>
                {/* English name */}
                <View style={{ marginLeft: 20 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>Chinese name :</Text>
                    {/* <Image
                      source={require("../assets/icon-light-3x.png")}
                      style={styles.smartimage}
                    /> */}
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
              </View>
              {/* Gender  */}

              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <Text style={styles.title}>Gender<Text style={{ color: '#FF0000' }}>*</Text> : </Text>
                <Image
                  source={require("../assets/icon-light-3x.png")}
                  style={styles.smartimage}
                />
                <TouchableOpacity>
                  <Text style={gender == 'F' ? { ...styles.title, ...styles.selected, } : { ...styles.title }}> F</Text>
                </TouchableOpacity>
                <Text style={styles.title}> /</Text>
                <TouchableOpacity>
                  <Text style={gender == 'M' ? { ...styles.title, ...styles.selected, } : { ...styles.title }}> M </Text>
                </TouchableOpacity>
                <Text style={styles.title}> /</Text>
                <TouchableOpacity>
                  <Text style={gender == 'X' ? { ...styles.title, ...styles.selected, } : { ...styles.title }}> X </Text>
                </TouchableOpacity>
              </View>

              {/* Card numebr and education  */}
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                {/*Card number */}
                <View style={{ width: "40%" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>
                      Hong Kong Identity Card number<Text style={{ color: '#FF0000' }}>*</Text> :
                    </Text>
                    {idNo?.Identification && idNo?.Identification.length > 0 && <Image
                      source={require("../assets/icon-light-3x.png")}
                      style={styles.smartimage}
                    />}
                  </View>
                  <View style={idNo?.Identification && idNo?.Identification.length > 0 ? styles.inputView1 : styles.inputView}>
                    <TextInput
                      placeholder=""
                      value={idNo?.Identification && idNo?.Identification.length > 0 ? `${idNo?.Identification}` : ''}
                      editable={!(idNo?.Identification && idNo?.Identification.length > 0)}
                      // onChangeText={(text) => setCardnumber(text)}
                      style={{ ...styles.inputtext, width: 350 }}
                    />
                  </View>
                </View>
                {/* Education level */}
                <View style={{ marginLeft: 25, width: "40%" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>Education level<Text style={{ color: '#FF0000' }}>*</Text> :</Text>
                    {educationLevel && educationLevel.length > 0 && <Image
                      source={require("../assets/icon-light-3x.png")}
                      style={styles.smartimage}
                    />}
                  </View>
                  <View style={educationLevel && educationLevel.length > 0 ? styles.inputView1 : styles.inputView}>
                    <TextInput
                      placeholder=""
                      editable={!(educationLevel && educationLevel.length > 0)}
                      value={educationLevel && educationLevel.length > 0 ? educationLevel : education}
                      onChangeText={(text) => setEducation(text)}
                      style={{ ...styles.inputtext, width: 350 }}
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
                    {educationLevel && educationLevel.length > 0 && <Image
                      source={require("../assets/icon-light-3x.png")}
                      style={styles.smartimage}
                    />}
                  </View>
                  <View style={birthDate && birthDate.length > 0 ? styles.inputView1 : styles.inputView}>
                    <TextInput
                      placeholder=""
                      value={birthDate && birthDate.length > 0 ? birthDayConverter(birthDate) : birthDate}
                      editable={!(birthDate && birthDate.length > 0)}
                      onChangeText={(text) => setBirthdate(text)}
                      style={{ ...styles.inputtext, width: 350 }}
                    />
                  </View>
                </View>
                {/*  Marital status */}
                <View style={{ marginLeft: 25, width: "40%" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>Marital status<Text style={{ color: '#FF0000' }}>*</Text> :</Text>
                    {maritalStatus && maritalStatus.length > 0 && <Image
                      source={require("../assets/icon-light-3x.png")}
                      style={styles.smartimage}
                    />}
                  </View>
                  <View style={maritalStatus && maritalStatus.length > 0 ? { ...styles.inputView, backgroundColor: '#D3D3D3' } : { ...styles.inputView, }}>
                    <TextInput
                      placeholder=""
                      value={maritalStatus && maritalStatus.length > 0 ? mapMaritalStatus(maritalStatus) : maritalStatus}
                      editable={!(maritalStatus && maritalStatus.length > 0)}
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
                    {emailAddress && emailAddress.length > 0 && <Image
                      source={require("../assets/icon-light-3x.png")}
                      style={styles.smartimage}
                    />}
                  </View>
                  <View style={emailAddress && emailAddress.length > 0 ? styles.inputView1 : styles.inputView}>
                    <TextInput
                      placeholder=""
                      value={emailAddress && emailAddress.length > 0 ? emailAddress : email}
                      editable={!(emailAddress && emailAddress.length > 0)}
                      onChangeText={(text) => setEmail(text)}
                      style={{ ...styles.inputtext, width: 350 }}
                    />
                  </View>
                </View>
                {/* Residential address */}
                <View style={{ marginLeft: 25, width: "40%" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>Residential address<Text style={{ color: '#FF0000' }}>*</Text> :</Text>
                    {residentialAddress?.EngPremisesAddress?.BuildingName && residentialAddress.EngPremisesAddress.BuildingName.length > 0 && <Image
                      source={require("../assets/icon-light-3x.png")}
                      style={styles.smartimage}
                    />}
                  </View>
                  <View style={residentialAddress?.EngPremisesAddress?.BuildingName && residentialAddress.EngPremisesAddress.BuildingName.length > 0 ? styles.inputView1 : styles.inputView}>
                    <TextInput
                      placeholder=""
                      value={residentialAddress?.EngPremisesAddress?.BuildingName && residentialAddress.EngPremisesAddress.BuildingName.length > 0 ? residentialFormat(residentialAddress) : resAddress}
                      editable={!(residentialAddress?.EngPremisesAddress?.BuildingName && residentialAddress.EngPremisesAddress.BuildingName.length > 0)}
                      onChangeText={(text) => setResAddress(text)}
                      style={{ ...styles.inputtext, width: 350 }}
                    />
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: "row", marginTop: 15 }}>
                {/* Number */}
                <View style={{ width: "40%" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>Mobile phone number<Text style={{ color: '#FF0000' }}>*</Text> :</Text>
                    {mobileNumber && mobileNumber.SubscriberNumber.length > 0 && <Image
                      source={require("../assets/icon-light-3x.png")}
                      style={styles.smartimage}
                    />}
                  </View>
                  <View style={mobileNumber && mobileNumber.SubscriberNumber.length > 0 ? styles.inputView1 : styles.inputView}>
                    <TextInput
                      placeholder=""
                      editable={!(mobileNumber && mobileNumber.SubscriberNumber.length > 0)}
                      value={mobileNumber && mobileNumber.SubscriberNumber.length > 0 ? `${mobileNumber.CountryCode} - ${mobileNumber.SubscriberNumber}` : ''}
                      // onChangeText={(text) => setNumber(text)}
                      style={{ ...styles.inputtext, width: 350 }}
                    />
                  </View>
                </View>
                {/* Billing address */}
                <View style={{ marginLeft: 25, width: "40%" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>Billing address<Text style={{ color: '#FF0000' }}>*</Text> :</Text>
                    {postalAddress?.EngPremisesAddress?.BuildingName && postalAddress.EngPremisesAddress.BuildingName.length > 0 && <Image
                      source={require("../assets/icon-light-3x.png")}
                      style={styles.smartimage}
                    />}
                  </View>
                  <View style={postalAddress?.EngPremisesAddress?.BuildingName && postalAddress.EngPremisesAddress.BuildingName.length > 0 ? styles.inputView1 : styles.inputView}>
                    <TextInput
                      placeholder=""
                      editable={!(postalAddress?.EngPremisesAddress?.BuildingName && postalAddress.EngPremisesAddress.BuildingName.length > 0)}
                      value={postalAddress?.EngPremisesAddress?.BuildingName && postalAddress.EngPremisesAddress.BuildingName.length > 0 ? residentialFormat(postalAddress) : billAddress}
                      onChangeText={(text) => setBillAddress(text)}
                      style={{ ...styles.inputtext, width: 350 }}
                    />
                  </View>
                </View>
              </View>

              <Text
                style={{
                  fontSize: 58,
                  fontWeight: "bold",
                  marginTop: 25,
                  color: "#000000",
                }}
              >
                More about you...
              </Text>

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#424242",
                  marginTop: 10,
                }}
              >
                Annual Income<Text style={{ color: '#FF0000' }}>*</Text> :{" "}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 15,
                  paddingBottom: 50,
                  borderColor: "gray",
                  alignItems: "center",
                }}
              >

                <View style={{ width: "70%", }}>
                  <View style={{ marginLeft: 15 }}>
                    <Slider
                      value={value}
                      // thumbTouchSize={{ width: 50, height: 50 }}
                      step={4}
                      thumbStyle={{
                        width: 40,
                        height: 40,
                        borderRadius: 40,
                        backgroundColor: "white",
                        borderWidth: 0.5,
                        borderColor: "gray",
                      }}
                      thumbTintColor="pink"
                      maximumValue={1100000}
                      minimumValue={96000}
                      style={{ width: "100%" }}
                      trackStyle={{
                        backgroundColor: "white",
                        borderWidth: 0.5,
                        height: 3,
                        borderRadius: 5,
                        borderColor: "gray",
                      }}
                      onValueChange={(v) => {
                        console.log("Value", v), setValue(v);
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <Image source={require("../assets/down.png")} />
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        ${minval}
                      </Text>
                    </View>

                    <View style={{ alignItems: "center" }}>
                      <Image source={require("../assets/down.png")} />
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        {val2}
                      </Text>
                    </View>

                    <View style={{ alignItems: "center" }}>
                      <Image source={require("../assets/down.png")} />
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        {val3}
                      </Text>
                    </View>

                    <View style={{ alignItems: "center" }}>
                      <Image source={require("../assets/down.png")} />
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        {val4}
                      </Text>
                    </View>
                    <Text style={{ fontSize: 25 }}>more</Text>
                  </View>
                </View>

                <View
                  style={{
                    width: "25%",
                    marginLeft: "2%",
                    paddingVertical: 10,
                    justifyContent: "center",
                    borderColor: "gray",
                  }}
                >
                  <Text style={{ fontSize: 18, color: "#67A4E4" }}>
                    {" "}
                    $ <Text style={{ fontSize: 40 }}>{numberWithCommas(value)}</Text>
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginTop: 80,
                  borderColor: "gray",
                }}
              >
                <Text
                  style={{
                    fontSize: 19,
                    color: "#D3D3D3",
                    fontWeight: "bold",
                    marginTop: 15,
                    marginBottom: 5
                  }}
                >
                  <Text style={{ color: '#FF0000' }}>* </Text>Note:
                </Text>
                <Text style={{ fontSize: 17, color: "#D3D3D3" }}>
                  (a) Only application to client who does not hold any deposit
                  account, including Saving Account(s). Current Cheque
                  Account(s). Integrated Deposits Account(s) and Time Deposit
                  Account(s), with the Bank in the past 12 months from the date
                  of Online Application submission.
                </Text>
                <Text style={{ fontSize: 17, color: "#D3D3D3" }}>
                  (b) Client needs to bring along all the required documents and
                  visit any branch nearby to complete the account opening
                  process within 14 days upon application submission.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </Formtheme>
    </View>
  );
};

export default Basicinformation;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#424242",
  },
  selected: {
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  smartimage: { width: 18, height: 23, marginLeft: 5 },
  inputView: {
    height: 54,
    borderWidth: 1,
    borderColor: "#707070",
    marginTop: 20,
  },
  inputView1: {
    height: 54,
    borderWidth: 1,
    borderColor: "#707070",
    marginTop: 20,
    backgroundColor: '#D3D3D3'
  },
  inputtext: { color: "black", fontSize: 18, marginLeft: 25 },
});
