/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {StyleSheet} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";

import {GestureHandlerRootView} from "react-native-gesture-handler";
import MainRoot from "./src/navigation/MainRoot";
import SafeLayout from "./src/components/SafeLayout";

function App() {

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <SafeLayout>
          <MainRoot />
        </SafeLayout>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
