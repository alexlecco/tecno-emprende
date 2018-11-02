import React from 'react';
import { 
  StyleSheet,
  View,
  ScrollView,
  ListView,
  YellowBox,
  ImageBackground,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { Container, Text, Button, } from 'native-base';
import { firebaseApp } from './firebase';

import ProjectCard from './components/ProjectCard';
import ProjectInfo from './components/ProjectInfo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectInfoVisible: false,
      project: {
        name: '',
        author: '',
        description: '',
        id: '',
      },
      loggedInvestor: {
        id: '',
        invested_funds: 0,
        investments_inProjects: {
          proj1: {
            partial_investment: 0,
            last_timestamp: '',
          },
          proj2: {
            partial_investment: 0,
            last_timestamp: '',
          },
          proj3: {
            partial_investment: 0,
            last_timestamp: '',
          }
        },
        name: '',
        remaining_funds: 0
      },
      loggedInvestorId: '',
      button: true,
      APTI: 0,
      logged: false,
      dataSourceProjects: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
    };
    
    showOrHideProjectInfo = this.showOrHideProjectInfo.bind(this);
    this.projectsRef = firebaseApp.database().ref().child('projects');
    this.investorsRef = firebaseApp.database().ref().child('investors');
    this.buttonRef = firebaseApp.database().ref().child('button');
    this.APTIRef = firebaseApp.database().ref().child('all_projects_total_investment');

    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    YellowBox.ignoreWarnings(['Warning: ...']);
    console.ignoredYellowBox = ['Setting a timer'];
  }

  async componentWillMount() {
    this.listenForProjects(this.projectsRef);
    this.listenForButton(this.buttonRef);
    this.listenForAPTI(this.APTIRef);

    firebaseApp.auth().onAuthStateChanged((investor) => {
      if(investor != null) {
        this.setState({
          logged: true,
          loggedInvestor: {
            id: investor.uid,
            invested_funds: 0,
            investments_inProjects: {
              proj1: {
                partial_investment: 0,
                last_timestamp: '',
              },
              proj2: {
                partial_investment: 0,
                last_timestamp: '',
              },
              proj3: {
                partial_investment: 0,
                last_timestamp: '',
              }
            },
            name: investor.displayName,
            remaining_funds: 300000
          }
        })
        this.addInvestor(investor);
      }
    });
  }

  listenForProjects(projectsRef) {
    projectsRef.on('value', (snap) => {
      let projects = [];
      snap.forEach((child) => {
        projects.push({
          author: child.val().author,
          name: child.val().name,
          description: child.val().description,
          id: child.val().id,
          total_investment: child.val().total_investment,
          _key: child.key,
        });
      });

      this.setState({
        dataSourceProjects: this.state.dataSourceProjects.cloneWithRows(projects)
      })
    });
  }

  getObjectOfArray(array, index) {
    return array[index] = array[index] || {};
  }

  listenForButton(buttonRef) {
    buttonRef.on('value', (snap) => {
      let button = snap.val();
      this.setState({ button: button });
    });
  }

  listenForAPTI(APTIRef) {
    APTIRef.on('value', (snap) => {
      let APTI = snap.val();
      this.setState({ APTI: APTI });
    });
  }

  showOrHideProjectInfo(project) {
    if(!this.state.projectInfoVisible) {
      this.setState({projectInfoVisible: !this.state.projectInfoVisible,
                      project: {
                        name: project.name,
                        author: project.author,
                        description: project.description,
                        total_investment: project.total_investment,
                        id: project.id,
                      }
      });
    }
    else {
      this.setState({
          projectInfoVisible: !this.state.projectInfoVisible,
          project: {
            name: '',
            author: '',
            description: '',
            total_investment: '',
            id: '',
        }
      });
    }
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

  addInvestor(investor) {
    var ref =  firebaseApp.database().ref();
    var userRef = ref.child('investors');
    userRef.child(investor.uid).set({
      id: investor.uid,
      invested_funds: 0,
      investments_inProjects: {
        proj1: {
          partial_investment: 0,
          last_timestamp: '',
        },
        proj2: {
          partial_investment: 0,
          last_timestamp: '',
        },
        proj3: {
          partial_investment: 0,
          last_timestamp: '',
        }
      },
      name: investor.displayName,
      remaining_funds: 300000
    }).key;
  }
  
  renderProject(project) {
    return(
      <ProjectCard showOrHideProjectInfo={this.showOrHideProjectInfo.bind(this)}
                   project={project} />
    );
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

  render() {
    let showOrHideProjectInfo = this.showOrHideProjectInfo;

    if(this.state.logged) {
      if(this.state.projectInfoVisible) {
        return(
          <Container>
            <View style={styles.statusBarUnderlay} />
            <ProjectInfo showOrHideProjectInfo={this.showOrHideProjectInfo.bind(this)}
                         project={this.state.project}
                         investor={this.state.loggedInvestor}
                         button={this.state.button}
                         APTI={this.state.APTI} />
          </Container>
        );
      }

      if(!this.state.projectInfoVisible) {
        return(
          <Container>
            <View style={styles.statusBarUnderlay} />
            <Text style={styles.investorFunds}>Fondos disponibles $ {this.state.loggedInvestor.remaining_funds}</Text>
            <Text style={styles.investorName}>
              Inversor: <Text style={{color: '#3F51B5', fontSize: 18}}>{this.state.loggedInvestor.name}</Text>
            </Text>
            <ScrollView>
              <ListView
                dataSource={this.state.dataSourceProjects}
                renderRow={(project) => this.renderProject(project)}
              />
            </ScrollView>
          </Container>
        );
      }
    } else {
      return(
          <Container>
            <View style={styles.statusBarUnderlay} />
            <View style={styles.container}>

              <ImageBackground
                source={require('./assets/images/loginScreen.png')}
                style={{width: '100%', height: '100%'}}>
                  <View style={styles.loginContainer}>
                    <TouchableHighlight primary transparent block onPress={ () => this.loginWithFacebook() }>
                      <Text> Accedé con Facebook </Text>
                    </TouchableHighlight>
                  </View>
              </ImageBackground>

            </View>
          </Container>
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c1c1c1',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: '#3F51B5',
  },
  investorFunds: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  investorName: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 25,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
  },
});