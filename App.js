import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, YellowBox, } from 'react-native';
import { firebaseApp } from './firebase';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginScreen: true,
      loggedUser: {
        name: ''
      },
    };

    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    YellowBox.ignoreWarnings(['Warning: ...']);
    console.ignoredYellowBox = ['Setting a timer'];
  }

  async componentWillMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if(user != null) {
        this.setState({
          loginScreen: false,
          loggedUser: {
            name: user.displayName
          }
        })
        this.addUser(user);
      }
    });
  }

  async loginWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('294465664493407',
      { permissions: ['public_profile'] })

    if(type === 'success') {
      const credential = firebaseApp.auth.FacebookAuthProvider.credential(token)
      firebaseApp.auth().signInWithCredential(credential).catch((error) => {
        console.log(error)
      });
      console.log("Sign-in successful");
    }
  }

  addUser(loggedUser) {
    var ref =  firebaseApp.database().ref();
    var userRef = ref.child('mobileUsers');
    userRef.child(loggedUser.uid).set({
      name: loggedUser.displayName,
      userId: loggedUser.uid,
    }).key;
  }

  render() {
    if(this.state.loginScreen) {
      return (
        <View style={styles.container}>
          <TouchableHighlight onPress={() => this.loginWithFacebook()}>
            <Text>login with facebook</Text>
          </TouchableHighlight>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>Hi {this.state.loggedUser.name}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
