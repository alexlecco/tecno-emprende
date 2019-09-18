import React from 'react';
import { 
  StyleSheet,
  View,
  ScrollView,
  ListView,
  YellowBox,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Container, Text, Button, } from 'native-base';
import { firebaseApp } from './firebase';
import * as Facebook from 'expo-facebook';

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
          proj01: {
            partial_investment: 0,
            last_timestamp: '',
          },
          proj02: {
            partial_investment: 0,
            last_timestamp: '',
          },
          proj03: {
            partial_investment: 0,
            last_timestamp: '',
          },
          proj04: {
            partial_investment: 0,
            last_timestamp: '',
          },
          proj05: {
            partial_investment: 0,
            last_timestamp: '',
          },
          proj06: {
            partial_investment: 0,
            last_timestamp: '',
          },
        },
        name: '',
        remaining_funds: 0
      },
      loggedInvestorId: '',
      button: true,
      APTI: 0,
      logged: false,
      isLoading: true,
      dataSourceProjects: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
    };
    
    showOrHideProjectInfo = this.showOrHideProjectInfo.bind(this);
    this.projectsRef = firebaseApp.database().ref().child('projects');
    this.buttonRef = firebaseApp.database().ref().child('button');
    this.investorsRef = firebaseApp.database().ref().child('investors');

    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    YellowBox.ignoreWarnings(['Warning: ...']);
    console.ignoredYellowBox = ['Setting a timer'];
  }

  getObjectOfArray(array, index) {
    return array[index] = array[index] || {};
  }

  async componentWillMount() {
    this.listenForProjects(this.projectsRef);
    this.listenForButton(this.buttonRef);

    firebaseApp.auth().onAuthStateChanged((investor) => {
      if(investor != null) {
        
        this.investorsRef.on('value', (snap) => {
          this.setState({isLoading: false})
          
          snap.forEach((child) => {
            if(child.val().id === investor.uid) {
              this.setState({
                logged: true,
                loggedInvestor: {
                  id: child.val().id,
                  invested_funds: child.val().invested_funds,
                  investments_inProjects: {
                    proj01: {
                      partial_investment: child.val().investments_inProjects.proj01.partial_investment,
                      last_timestamp: child.val().investments_inProjects.proj01.last_timestamp,
                    },
                    proj02: {
                      partial_investment: child.val().investments_inProjects.proj02.partial_investment,
                      last_timestamp: child.val().investments_inProjects.proj02.last_timestamp,
                    },
                    proj03: {
                      partial_investment: child.val().investments_inProjects.proj03.partial_investment,
                      last_timestamp: child.val().investments_inProjects.proj03.last_timestamp,
                    },
                    proj04: {
                      partial_investment: child.val().investments_inProjects.proj04.partial_investment,
                      last_timestamp: child.val().investments_inProjects.proj04.last_timestamp,
                    },
                    proj05: {
                      partial_investment: child.val().investments_inProjects.proj05.partial_investment,
                      last_timestamp: child.val().investments_inProjects.proj05.last_timestamp,
                    },
                    proj06: {
                      partial_investment: child.val().investments_inProjects.proj06.partial_investment,
                      last_timestamp: child.val().investments_inProjects.proj06.last_timestamp,
                    },
                  },
                  name: child.val().name,
                  remaining_funds: child.val().remaining_funds,  
                }
              })
            }
          });

        });
      }
    }, error => {
      this.setState({isLoading: false});
    }).bind(this);
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

  listenForButton(buttonRef) {
    buttonRef.on('value', (snap) => {
      let button = snap.val();
      this.setState({ button: button });
    });
  }

  showOrHideProjectInfo(project) {
    if(!this.state.projectInfoVisible) {
      this.setState({
        projectInfoVisible: !this.state.projectInfoVisible,
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

  addInvestor(investor) {
    var ref =  firebaseApp.database().ref();
    var userRef = ref.child('investors');
    userRef.child(investor.uid).set({
      id: investor.uid,
      invested_funds: 0,
      investments_inProjects: {
        proj01: {
          partial_investment: 0,
          last_timestamp: '',
        },
        proj02: {
          partial_investment: 0,
          last_timestamp: '',
        },
        proj03: {
          partial_investment: 0,
          last_timestamp: '',
        },
        proj04: {
          partial_investment: 0,
          last_timestamp: '',
        },
        proj05: {
          partial_investment: 0,
          last_timestamp: '',
        },
        proj06: {
          partial_investment: 0,
          last_timestamp: '',
        },
      },
      name: investor.displayName,
      remaining_funds: 300000,
    }).key;
  }
  
  renderProject(project) {
    return(
      <ProjectCard showOrHideProjectInfo={this.showOrHideProjectInfo.bind(this)}
                   investor={this.state.loggedInvestor}
                   project={project} />
    );
  }

  returnFacebookLogin() {
    return (
      <View style={styles.loginContainer}>
        <TouchableOpacity primary transparent block onPress={ () => this.loginWithFacebook() }>
          {
            !this.state.isLoading && <Text style={styles.loginButton}> Ingresá con Facebook </Text>
          }
        </TouchableOpacity>
      </View>
    );
  }

  async loginWithFacebook()  {
    try {
      const { type, token, } = await Facebook.logInWithReadPermissionsAsync('294465664493407', 
      { permissions: ['public_profile'], });

      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('¡Accediste!', `Hola ${(await response.json()).name}!`);
        const credential = firebaseApp.auth.FacebookAuthProvider.credential(token)
        firebaseApp.auth().signInWithCredential(credential)
          .then((user) => this.addInvestor(user))
          .catch((error) => {
            console.log(error)
        });
      console.log("Sign-in successful");
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Error al acceder: ${message}`);
    }
  }

  render() {
    let showOrHideProjectInfo = this.showOrHideProjectInfo;
    let FacebookLogin = this.returnFacebookLogin();

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
            <View style={styles.container}>
              <View style={styles.statusBarUnderlay} />
              <Text style={styles.investorFunds}>
                Fondos disponibles $ <Text style={{color: '#03F5FF', fontSize: 22}}>{this.state.loggedInvestor.remaining_funds}</Text>
              </Text>
              <Text style={styles.investorName}>
                Inversor: <Text style={{color: '#03F5FF', fontSize: 18}}>{this.state.loggedInvestor.name}</Text>
              </Text>
              <ScrollView>
                <ListView
                  dataSource={this.state.dataSourceProjects}
                  renderRow={(project) => this.renderProject(project)}
                />
              </ScrollView>
            </View>
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
                  {FacebookLogin}
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
    backgroundColor: '#091732',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: '#091732',
  },
  investorFunds: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  investorName: {
    color: '#FFFFFF',
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
  loginButton: {
    color: '#FFFFFF',
    fontSize: 17,
  },
});