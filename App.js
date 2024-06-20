// import { StyleSheet } from 'react-native';
// import { initializeApp } from '@react-native-firebase/app'; // Import Firebase initialization function
// import AppNavigation from './navigation/AppNavigation';
// import { Provider } from 'react-redux';
// import rootReducer from './redux/rootReducer';
// import store from './redux/store';
// // import { auth } from 'expo-firebase-auth';
// // import { firestore } from 'expo-firebase-firestore';

// // Initialize Firebase
// initializeApp();

// export default function App() {
//   return (
//     <Provider store={store}>
//       <AppNavigation/>
//     </Provider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     marginTop: 30,
//   },
// });






import { StyleSheet } from 'react-native';
import AppNavigation from './navigation/AppNavigation';
import { Provider } from 'react-redux';
import rootReducer from './redux/rootReducer';
import store from './redux/store';



export default function App() {
  return (
    <Provider style={styles.container} store={store}>
      <AppNavigation/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
  },
});


// import { createStore } from 'redux';
// const store = createStore(rootReducer);




// <View style={styles.container}>
//   <AppNavigation />
//   <StatusBar style="auto" />
// </View>