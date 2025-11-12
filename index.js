/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { ReaderProvider } from '@epubjs-react-native/core';

function Main() {
  return (
    <ReaderProvider>
      <App />
    </ReaderProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
