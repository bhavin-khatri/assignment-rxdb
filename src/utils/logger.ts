import configConstants from "../constants/configConstants";
import { LogTypes } from "../constants/appConstants";

export const Logger = (message?: any, value?: any, logType?: string) => {
  let isLoggerEnabled = configConstants.isLoggerDisplay;
  if (isLoggerEnabled) {
    let logString = `${message} ${JSON.stringify(value)}`;
    switch (logType) {
      case LogTypes.error:
        console.error(logString);
        break;
      case LogTypes.warning:
        console.warn(logString);
        break;
      default:
        console.info(logString);
    }
    return logString;
  } else {
    return "";
  }
};
