import React, {Component} from 'react';
import { StyleSheet, View, ImageBackground, } from 'react-native';
import { Container } from 'native-base';

export default class Loading extends Component {
  
  render() {
    return(
      <Container>
        <View style={styles.statusBarUnderlay} />
        <View style={styles.container}>

          <ImageBackground
            source={require('../assets/images/loginScreen.png')}
            style={{width: '100%', height: '100%'}}>
          </ImageBackground>

        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#091732',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: '#091732',
  },
});