import React from 'react';
import {StyleSheet, View} from 'react-native';
import TabFooter from './components/TabFooter';
import {Provider} from 'react-redux';

// const store = createStore(ScanReducer);

export default function App() {
  return (
    // <Provider store={store}>
      <View style={styles.container}>
        <View style={styles.containerFooter}>
          <TabFooter />
        </View>
      </View>
    // </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerFooter: {
    flex: 1,
  },
});
