// src/screens/AddBusiness.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { CustomButton } from "../components/CustomButton";
import { navigationConstants } from "../constants/navigationConstants";
import { CustomTextInput } from "../components/CustomTextInput";
import ResponsivePixels from "../theme/responsive";
import CommonHeader from "../components/CommonHeader";

export default function AddBusiness({ navigation, route }) {
  const { dbHelpers } = route.params;
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Validation", "Business name is required");
      return;
    }
    setIsLoading(true);
    await dbHelpers.createBusiness(name);
    setIsLoading(false);
    setName("");
    navigation.goBack();
  };

  return (
    <>
      <CommonHeader screenName={"Add Business"} />
      <View style={styles.container}>
        <CustomTextInput
          placeholder={"Enter business name"}
          shortPlaceholder={"Business Name"}
          value={name}
          onChangeText={(value: string) => setName(value)}
          mainViewStyle={styles.input}
        />
        <CustomButton
          mainButtonStyles={styles.button}
          buttonTitle="Save"
          onButtonClick={handleSave}
          isLoading={isLoading}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: ResponsivePixels.size(16),
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  input: {
    marginTop: ResponsivePixels.size(24),
  },
  button: {
    marginTop: ResponsivePixels.size(16),
  },
});
