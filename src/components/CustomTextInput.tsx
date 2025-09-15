import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";

import { CustomImage } from "./CustomImage";
import Colors from "../theme/colors";
import ResponsivePixels from "../theme/responsive";
import { FontFamily } from "../theme/typography";
import { isEmpty } from "../utils/formators";
import Images from "../theme/images";
import { commonStyles } from "../theme/common";

type CapitalizationType = "characters" | "words" | "sentences" | "none";
type InputMode =
  | "none"
  | "text"
  | "decimal"
  | "numeric"
  | "tel"
  | "search"
  | "email"
  | "url";

interface CustomTextInputProps {
  value: string;
  isDropDown?: boolean;
  onChangeText: (value: string) => any;
  errorText?: string;
  textInputStyle?: any;
  inputMode?: InputMode;
  editable?: boolean;
  maxLength?: number;
  multiline?: boolean;
  autoCapitalize?: CapitalizationType;
  placeholder?: string;
  shortPlaceholder?: string;
  onBlur?: any;
  onFocus?: any;
  mainViewStyle?: any;
  isSecurityText?: boolean;
  showRightButton?: boolean;
  rightButtonTitle?: string;
  rightButtonClick?: () => any;
  showForgotPassword?: boolean;
  forgotPasswordClick?: () => any;
  keyboardType?: any;
  isSuccess?: boolean;
  onClick?: () => any;
  shortPlaceholderColor?: any;
}
export const CustomTextInput = (props: CustomTextInputProps) => {
  const inputRef = useRef<TextInput | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const {
    value,
    onChangeText,
    shortPlaceholder,
    shortPlaceholderColor,
    errorText,
    textInputStyle,
    mainViewStyle,
    inputMode = "none", //default value
    editable = true, //default value
    maxLength,
    multiline,
    autoCapitalize = "none", //default value
    placeholder = "",
    onBlur,
    onFocus,
    isSecurityText = false,
    showRightButton = true,
    rightButtonTitle = "",
    rightButtonClick,
    showForgotPassword = false,
    keyboardType = "default",
    isSuccess = false,
    forgotPasswordClick,
    isDropDown = false,
    onClick,
  } = props;

  const [hideValue, setHideValue] = useState<boolean>(isSecurityText);

  useEffect(() => {
    if (isSecurityText !== undefined) {
      setHideValue(isSecurityText);
    }
  }, [isSecurityText]);
  const toggleHideValue = () => {
    setHideValue(!hideValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }

    setIsFocused(false);
  };

  return (
    <TouchableOpacity
      onPress={() => (onClick ? onClick() : null)}
      style={[styles.mainContainer, mainViewStyle]}
    >
      <Text
        style={[
          commonStyles.subtitle,
          styles.shortPlaceholder,
          {
            color: shortPlaceholderColor,
          },
        ]}
      >
        {shortPlaceholder ? shortPlaceholder : placeholder}
      </Text>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(text: string) => onChangeText(text)}
        editable={editable}
        maxLength={maxLength}
        multiline={multiline}
        autoCapitalize={autoCapitalize}
        style={[styles.textInput]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={hideValue}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray}
      />

      {isSecurityText && !isEmpty(value) ? (
        <TouchableOpacity
          onPress={toggleHideValue}
          style={styles.securityIconView}
        >
          <CustomImage
            style={styles.securityIcon}
            imageUrl={hideValue ? Images.ic_eye_off : Images.ic_eye_on}
          />
        </TouchableOpacity>
      ) : null}

      <View style={styles.errorForgotPasswordView}>
        {errorText && !isEmpty(errorText) ? (
          <Text
            style={[
              styles.errorText,
              {
                width: showForgotPassword ? "65%" : "100%",
              },
            ]}
          >
            {errorText}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  textInput: {
    width: "100%",
    height: ResponsivePixels.size(45),
    paddingHorizontal: ResponsivePixels.size(20),
    borderColor: Colors.grey_shade_1,
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    color: Colors.text,
    fontSize: ResponsivePixels.fontSize(14),
    fontFamily: FontFamily.TEXT_SEMI_BOLD,
    lineHeight: ResponsivePixels.size(20),
    position: "relative",
  },
  shortPlaceholder: {
    marginBottom: ResponsivePixels.size(8),
    textTransform: "uppercase",
  },
  errorText: {
    width: "65%",
    fontSize: ResponsivePixels.fontSize(12),
    fontFamily: FontFamily.TEXT_MEDIUM,
    color: Colors.error,
    alignSelf: "flex-start",
    marginTop: ResponsivePixels.size(8),
  },
  securityIcon: {
    height: ResponsivePixels.size(16),
    width: ResponsivePixels.size(18),
  },
  securityIconView: {
    position: "absolute",
    right: ResponsivePixels.fontSize(16),
    top: ResponsivePixels.size(40),
    height: ResponsivePixels.size(15),
    width: ResponsivePixels.size(15),
    alignItems: "center",
    justifyContent: "center",
  },
  rightButtonView: {
    position: "absolute",
    top: ResponsivePixels.fontSize(10),
    right: ResponsivePixels.fontSize(8),
    paddingHorizontal: ResponsivePixels.size(8),
    paddingVertical: ResponsivePixels.size(2),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: ResponsivePixels.fontSize(8),
  },
  rightButtonTitle: {
    fontSize: ResponsivePixels.fontSize(12),
    color: Colors.primary,
    fontFamily: FontFamily.TEXT_SEMI_BOLD,
  },
  errorForgotPasswordView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    position: "relative",
  },
});
