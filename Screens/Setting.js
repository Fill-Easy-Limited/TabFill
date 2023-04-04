import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet, ScrollView, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const basic = {
  base: 'dev.fill-easy.com',
  client: 'cd89d333a7ec42d288421971dfb02d1d',
  secret: '9b7a597d7a574d439566b259c5d67281a9829404e9024b20b1f42d5e99bb0673',
}

const Setting = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const base = useSelector((state) => state?.envInfo);

  const [base1, setBase1] = useState(basic.base);
  const [client, setClient] = useState(basic.client);
  const [secret, setSecret] = useState(basic.secret);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    if(base.baseurl.includes('testing')) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  }, [])


  // const handledev = () => {
  //   dispatch({
  //     type: "SET_BASE_URL",
  //     payload: "dev.fill-easy.com",
  //   });

  //   dispatch({
  //     type: "SET_XCLIENT",
  //     payload: "cd89d333a7ec42d288421971dfb02d1d",
  //   });

  //   dispatch({
  //     type: "SET_XSERVER",
  //     payload:
  //       "9b7a597d7a574d439566b259c5d67281a9829404e9024b20b1f42d5e99bb0673",
  //   });
  // };

  // const handletest = () => {
  //   dispatch({
  //     type: "SET_BASE_URL",
  //     payload: "testing.fill-easy.com",
  //   });

  //   dispatch({
  //     type: "SET_XCLIENT",
  //     payload: "2588100d923d4af382b6c4033b086419",
  //   });

  //   dispatch({
  //     type: "SET_XSERVER",
  //     payload:
  //       "21dd677be8984d0b836ac00304803709abd7ac0cb16e4151b539b88029219356",
  //   });
  // };

  useEffect(() => {
    if (isEnabled) {
      setBase1('testing.fill-easy.com');
      setClient('2588100d923d4af382b6c4033b086419');
      setSecret('21dd677be8984d0b836ac00304803709abd7ac0cb16e4151b539b88029219356');
    } else {
      setBase1(basic.base);
      setClient(basic.client);
      setSecret(basic.secret);
    }
  }, [isEnabled]);

  const submit = () => {
    console.log("Tellow");
    let obj = { base: base1, client: client, secret: secret, }
    dispatch({
      type: "SET_BASE",
      payload: obj,
    });
    navigation.goBack();
  }

  return (
    // <View style={{ padding: 10 }}>
    //   <View style={{ flexDirection: "row" }}>
    //     <Text style={{ fontSize: 25 }}>Server mode : </Text>
    //     <Switch
    //       trackColor={{ false: "#767577", true: "#81b0ff" }}
    //       thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
    //       ios_backgroundColor="#3e3e3e"
    //       onValueChange={toggleSwitch}
    //       value={isEnabled}
    //     />
    //     <TouchableOpacity
    //       onPress={() => handledev()}
    //       style={{ marginLeft: 15 }}
    //     >
    //       <Text style={{ fontSize: 25 }}>
    //         {" "}
    //         {isEnabled ? "Dev" : "Testing"}
    //       </Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, marginTop: '4%', alignItems: 'center', backgroundColor: '#F5F5F5' }}>
        <View>
          <Text style={styles.title}>Registration Form</Text>
        </View>
        <View style={{ width: '100%', marginTop: '4%', alignItems: 'center' }}>
          <View style={{ width: '80%', marginBottom: 30 }}>
            <Text style={{ color: '#000', fontSize: 20 }} >Base url : </Text>
            <View style={{ marginTop: 10 }}>
              <TextInput value={base1} onChangeText={(text) => setBase1(text)} style={{ height: 50, borderWidth: 0.5 }} />
            </View>
          </View>
          <View style={{ width: '80%', marginBottom: 30 }}>
            <Text style={{ color: '#000', fontSize: 20 }} >X-Client-id : </Text>
            <View style={{ marginTop: 10 }}>
              <TextInput value={client} onChangeText={(text) => setClient(text)} style={{ height: 50, borderWidth: 0.5 }} />
            </View>
          </View>
          <View style={{ width: '80%', marginBottom: 30 }}>
            <Text style={{ color: '#000', fontSize: 20 }} >X-client-secret : </Text>
            <View style={{ marginTop: 10 }}>
              <TextInput value={secret} onChangeText={(text) => setSecret(text)} style={{ height: 50, borderWidth: 0.5 }} />
            </View>
          </View>
          <TouchableOpacity style={styles.formbtn} onPress={() => submit()}>
            <Text style={styles.formtext}>SUBMIT</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>
              Cancel
            </Text>
          </TouchableOpacity>
          <View style={{ marginTop: 40, flexDirection: 'row' }}>
            <Text style={styles.formtext1}>Dev env</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={styles.formtext1} >Testing env</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 35, color: "#3B3E51", fontWeight: "bold", letterSpacing: 0.77
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
    textDecorationLine: "underline",
    color: "#2F363D",
  },
  formbtn: {
    flexDirection: "row",
    backgroundColor: "#642B99",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 50,
    width: 100,
    borderRadius: 16,
    marginBottom: 20
  },
  formtext: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
  },
  formtext1: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
    marginRight: 5
  },
});

export default Setting;
