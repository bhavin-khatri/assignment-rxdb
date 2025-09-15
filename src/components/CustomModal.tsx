import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../theme/colors";
import ResponsivePixels from "../theme/responsive";
import { CustomImage } from "./CustomImage";
import Images from "../theme/images";
import { commonStyles } from "../theme/common";
import { CustomButton } from "./CustomButton";
import { CustomTextInput } from "./CustomTextInput";
import React from "react";

interface PropsModal {
  isModalVisible: boolean;
  modalType?: "coinsInfo" | string;
  onRequestClose?: () => void;
  onRequestSuccess?: () => void;
  name?: string;
  setName?: (value: string) => any;
  quantity?: string;
  setQuantity?: (value: string) => any;
  price?: string;
  setPrice?: (value: string) => any;
}

const CustomModal = ({
  isModalVisible,
  onRequestClose,
  modalType,
  name,
  setName,
  quantity,
  setQuantity,
  price,
  setPrice,
  onRequestSuccess,
}: PropsModal) => {
  const renderContent = () => {
    return (
      <View style={styles.contentContainer}>
        <CustomTextInput
          mainViewStyle={styles.input}
          shortPlaceholderColor={Colors.white}
          placeholder="Enter Article Name"
          shortPlaceholder="Article Name"
          value={name}
          onChangeText={setName}
        />
        <CustomTextInput
          mainViewStyle={styles.input}
          shortPlaceholderColor={Colors.white}
          placeholder="Enter Quantity"
          shortPlaceholder="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
        <CustomTextInput
          mainViewStyle={styles.input}
          shortPlaceholderColor={Colors.white}
          placeholder="Enter Selling Price"
          shortPlaceholder="Selling Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <CustomButton
          buttonTitle="Add Article"
          buttonTitleStyle={styles.btnTextStyle}
          onButtonClick={onRequestSuccess}
          mainButtonStyles={styles.btnStyle}
        />
      </View>
    );
  };

  return (
    <Modal
      transparent
      visible={isModalVisible}
      onRequestClose={onRequestClose}
      animationType="slide"
    >
      <View style={styles.transparentView}>
        <TouchableOpacity style={styles.closeBg} onPress={onRequestClose}>
          <CustomImage style={styles.closeLogo} imageUrl={Images.ic_close} />
        </TouchableOpacity>
        <View style={styles.innerView}>{renderContent()}</View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  transparentView: {
    flex: 1,
    backgroundColor: Colors.background_transparent,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  innerView: {
    width: "100%",
    backgroundColor: Colors.grey_shade_2,
    paddingHorizontal: ResponsivePixels.size(16),
    paddingVertical: ResponsivePixels.size(24),
    // alignItems: "center",
  },
  closeBg: {
    height: ResponsivePixels.size(48),
    width: ResponsivePixels.size(48),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: Colors.white,
    borderRadius: ResponsivePixels.size(50),
    marginVertical: ResponsivePixels.size(24),
  },
  closeLogo: {
    height: ResponsivePixels.size(24),
    width: ResponsivePixels.size(24),
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnStyle: {
    backgroundColor: Colors.white,
    marginTop: ResponsivePixels.size(30),
  },
  btnTextStyle: {
    color: Colors.grey_shade_2,
  },
  input: {
    marginTop: ResponsivePixels.size(16),
  },
});
