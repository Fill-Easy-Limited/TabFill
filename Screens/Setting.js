import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Seeting = () => {
  const base = useSelector((state) => state?.envInfo);
  console.log("seetingn", base);
  const dispatch = useDispatch();

  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = () => {
    console.log("AAAAA", isEnabled);

    if (isEnabled) {
      handledev();
      setIsEnabled(false)
    } else {
      handletest();
      setIsEnabled(true)
    }
  };
  const handledev = () => {
    dispatch({
      type: "SET_BASE_URL",
      payload: "dev.fill-easy.com",
    });

    dispatch({
      type: "SET_XCLIENT",
      payload: "cd89d333a7ec42d288421971dfb02d1d",
    });

    dispatch({
      type: "SET_XSERVER",
      payload:
        "9b7a597d7a574d439566b259c5d67281a9829404e9024b20b1f42d5e99bb0673",
    });

    console.log("HEllo click");
  };

  const handletest = () => {
    dispatch({
      type: "SET_BASE_URL",
      payload: "testing.fill-easy.com",
    });

    dispatch({
      type: "SET_XCLIENT",
      payload: "2588100d923d4af382b6c4033b086419",
    });

    dispatch({
      type: "SET_XSERVER",
      payload:
        "21dd677be8984d0b836ac00304803709abd7ac0cb16e4151b539b88029219356",
    });
  };
  return (
    <View style={{ padding: 10 }}>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 25 }}>Server mode : </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <TouchableOpacity
          onPress={() => handledev()}
          style={{ marginLeft: 15 }}
        >
          <Text style={{ fontSize: 25 }}>
            {" "}
            {isEnabled ? "Dev" : "Testing"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Seeting;
