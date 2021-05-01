import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#e36397",
  secondary: "#E776A3",

  white: "#ffffff",
  black: "#000000",
  green: "#37e39f",
  red: "#f9a8ba",
  grey: "#6a6a6a",
  lightGrey: "#dbdbdb",
  lightGrey1: "#f5f6fa",
};

export const SIZES = {
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,

  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  width,
  height,
};

export const FONTS = {
  h1: { fontSize: SIZES.h1, lineHeight: 36, fontWeight: "700" },
  h2: { fontSize: SIZES.h2, lineHeight: 30, fontWeight: "700" },
  h3: { fontSize: SIZES.h3, lineHeight: 22, fontWeight: "700" },
  h4: { fontSize: SIZES.h4, lineHeight: 22, fontWeight: "700" },
  body1: { fontSize: SIZES.body1 },
  body2: { fontSize: SIZES.body2 },
  body3: { fontSize: SIZES.body3 },
  body4: { fontSize: SIZES.body4 },
  body5: { fontSize: SIZES.body5 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
