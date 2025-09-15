import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../theme/colors";
import ResponsivePixels from "../theme/responsive";
import { CustomImage } from "./CustomImage";
import { commonStyles } from "../theme/common";

interface IProps {
  mainButtonStyles?: any;
  buttonTitle?: string;
  buttonTitleStyle?: any;
  isDisabled?: boolean;
  buttonBackgroundColor?: any;
  buttonBorderColor?: any;
  isLoading?: boolean;
  loaderColor?: any;
  loaderSize?: string;
  onButtonClick: () => any;
  isOnlyIcon?: boolean;
  showIconWithTitle?: boolean;
  rightIcon?: any;
  rightIconStyle?: any;
  icon?: any;
  iconSize?: any;
}
export const CustomButton = (props: IProps) => {
  const {
    mainButtonStyles,
    buttonTitle,
    buttonTitleStyle,
    isDisabled,
    isLoading,
    loaderSize,
    onButtonClick,
    isOnlyIcon,
    iconSize = ResponsivePixels.size(50),
    icon,
    showIconWithTitle,
  } = props;

  return (
    <>
      {isOnlyIcon ? (
        <TouchableOpacity
          style={[styles.onlyIconContainer, mainButtonStyles]}
          onPress={() => onButtonClick()}
        >
          <CustomImage
            style={{ width: iconSize, height: iconSize }}
            imageUrl={icon}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() =>
            isDisabled || isLoading || onButtonClick == undefined
              ? null
              : onButtonClick()
          }
          style={[styles.mainContainer, mainButtonStyles]}
        >
          {isLoading ? (
            <ActivityIndicator
              size={loaderSize ? loaderSize : "small"}
              color={Colors.white}
            />
          ) : (
            <View style={styles.iconWithTitleView}>
              {showIconWithTitle ? (
                <CustomImage
                  style={{ width: iconSize, height: iconSize }}
                  imageUrl={icon}
                />
              ) : null}

              <Text
                style={[
                  commonStyles.subtitle,
                  styles.buttonText,
                  buttonTitleStyle,
                ]}
              >
                {buttonTitle}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: ResponsivePixels.size(48),
    borderColor: Colors.grey_shade_2,
    backgroundColor: Colors.grey_shade_2,
    borderWidth: ResponsivePixels.size(1),
    borderRadius: ResponsivePixels.fontSize(30),
    justifyContent: "center",
    alignItems: "center",
  },
  onlyIconContainer: {
    height: ResponsivePixels.size(100),
    width: ResponsivePixels.size(100),
    borderRadius: ResponsivePixels.size(50),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.grey_shade_2,
  },
  buttonText: {
    color: Colors.white,
    textTransform: "uppercase",
    textAlign: "center",
    flex: 1,
  },
  iconWithTitleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: ResponsivePixels.size(16),
  },
});
