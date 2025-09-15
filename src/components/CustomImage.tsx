import React from "react";
import { SvgUri } from "react-native-svg";
import { Image, ImageStyle, StyleProp } from "react-native";

interface IProps {
  isLocalImage?: boolean;
  isSvg?: boolean;
  style: StyleProp<ImageStyle>;
  imageUrl: any;
}

export const CustomImage = (props: IProps) => {
  const { isLocalImage = true, isSvg = false, style, imageUrl } = props;

  const ICONS_AWS_URL = `S3_BUCKET_URL/`;

  const width =
    style && typeof style === "object" && "width" in style
      ? (style as any).width
      : 0;
  const height =
    style && typeof style === "object" && "height" in style
      ? (style as any).height
      : width;
  if (isSvg) {
    return (
      <SvgUri
        width={width}
        height={height}
        uri={`${ICONS_AWS_URL}${imageUrl}.svg`}
        style={style}
      />
    );
  }
  return (
    <>
      {isLocalImage ? (
        <Image source={imageUrl} style={style} />
      ) : (
        <Image source={{ uri: imageUrl }} style={style} />
      )}
    </>
  );
};
