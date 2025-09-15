import { StyleSheet } from "react-native";
import Colors from "./colors";
import ResponsivePixels from "./responsive";
import { FontFamily } from "./typography";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ResponsivePixels.fontSize(24),
    paddingVertical: "15%",
    alignItems: "center",
    backgroundColor: Colors.background_light,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: ResponsivePixels.fontSize(20),
    fontFamily: FontFamily.TEXT_SEMI_BOLD,
    color: Colors.grey_shade_2,
  },
  subtitle: {
    fontSize: ResponsivePixels.fontSize(12),
    fontFamily: FontFamily.TEXT_SEMI_BOLD,
    color: Colors.grey_shade_2,
    letterSpacing: 0.4,
  },
  description: {
    fontSize: ResponsivePixels.fontSize(14),
    fontFamily: FontFamily.TEXT_REGULAR,
    color: Colors.grey_shade_6,
    textAlign: "center",
  },
});
