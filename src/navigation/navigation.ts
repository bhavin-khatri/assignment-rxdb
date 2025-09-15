import {
  createNavigationContainerRef,
  StackActions,
} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef<any>();

/**
 * Navigate to a screen
 * @param name Screen name
 * @param params Params object
 */
export function navigate(name: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

/**
 * Push a new screen onto the stack
 * @param name Screen name
 * @param params Params object
 */
export function push(name: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name as never, params as never));
  }
}

/**
 * Replace current screen with a new one
 * @param name Screen name
 * @param params Params object
 */
export function replace(name: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      StackActions.replace(name as never, params as never)
    );
  }
}

/**
 * Go back to previous screen
 */
export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

/**
 * Reset navigation stack to a screen
 * @param name Screen name
 * @param params Params object
 */
export function reset(name: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: name as never, params: params as never }],
    });
  }
}
