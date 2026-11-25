
import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

// Development and production URLs
const KIOSK_URL = __DEV__
  ? 'http://127.0.0.1:3000/'
  : 'file:///android_asset/kiosk/index.html';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <WebView
        source={{ uri: KIOSK_URL }}
        originWhitelist={
          __DEV__
            ? ['http://127.0.0.1:3000', 'file://*']
            : ['file://*']
        }
        javaScriptEnabled
        domStorageEnabled
        allowFileAccess
        allowFileAccessFromFileURLs={false}
        allowUniversalAccessFromFileURLs={false}
        cacheEnabled={!__DEV__}
        mediaPlaybackRequiresUserAction={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  webview: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
