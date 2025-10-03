import {AppRegistry} from 'react-native';
import App from '../src/app/App';

// Register the app
AppRegistry.registerComponent('App', () => App);

// Run the app
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root'),
});
