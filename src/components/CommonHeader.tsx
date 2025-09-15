import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ResponsivePixels from "../theme/responsive";
import { CustomImage } from "./CustomImage";
import Images from "../theme/images";
import { commonStyles } from "../theme/common";
import Colors from "../theme/colors";
import { goBack } from "../navigation/navigation";

const CommonHeader = ({ screenName }: { screenName: string }) => {
  const [showBackBtn, setShowBackButton] = useState<boolean>(false);
  useEffect(() => {
    showBackArrow();
  }, [screenName]);
  const showBackArrow = () => {
    switch (screenName) {
      case "Business List":
        setShowBackButton(false);
        break;
      default:
        setShowBackButton(true);
    }
  };
  return (
    <View style={styles.container}>
      {showBackBtn ? (
        <TouchableOpacity onPress={goBack}>
          <CustomImage style={styles.backArrow} imageUrl={Images.ic_back} />
        </TouchableOpacity>
      ) : null}
      <Text style={styles.title}>{screenName}</Text>
    </View>
  );
};
export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomColor: Colors.grey_shade_9,
    borderBottomWidth: ResponsivePixels.size(1),
    paddingVertical: ResponsivePixels.size(16),
    paddingHorizontal: ResponsivePixels.size(16),
  },
  title: {
    ...commonStyles.title,
  },
  backArrow: {
    height: ResponsivePixels.size(18),
    width: ResponsivePixels.size(18),
    marginEnd: ResponsivePixels.size(8),
    top: ResponsivePixels.size(2),
  },
});
