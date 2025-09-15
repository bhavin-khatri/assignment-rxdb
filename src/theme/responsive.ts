import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const BASE_WIDTH = 360; // Your design's width

const scaleSize = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;

const scaleFont = (size: number) =>
  PixelRatio.roundToNearestPixel(scaleSize(size));

const ResponsivePixels = {
  fontSize: scaleFont,
  size: scaleSize,
};

export default ResponsivePixels;
