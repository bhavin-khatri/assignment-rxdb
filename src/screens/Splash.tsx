import {StyleSheet, View} from "react-native";
import {CustomImage} from "../components/CustomImage";
import Images from "../theme/images";
import ResponsivePixels from "../theme/responsive";
import {navigationConstants} from "../constants/navigationConstants";
import {useEffect} from "react";
import {navigate} from "../navigation/navigation";
import Colors from "../theme/colors";
import {Logger} from "../utils/logger";

const Splash = () => {
  useEffect(() => {
    init().then(() => null);
  }, []);

  const init = async () => {
    Logger("come here in splash")
    setTimeout(() => navigate(navigationConstants.BUSINESS_LIST), 1000);
  };
  return (
    <>
      <View style={styles.container}>
        <CustomImage style={styles.logo} imageUrl={Images.ic_splash} />
      </View>
    </>
  );
};
export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background_dark,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: ResponsivePixels.size(150),
    height: ResponsivePixels.size(103),
  },
});
