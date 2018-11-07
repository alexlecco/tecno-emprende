import React, { Component } from 'react';
import {Platform, StyleSheet, View, TouchableOpacity, Alert, Image, BackHandler, } from 'react-native';
import {
    Container, 
    Content, 
    Footer, 
    FooterTab, 
    Button, 
    Text,
    Picker, 
    Icon, 
} from 'native-base';

import { firebaseApp } from '../firebase';

export default class ProjectInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            investmentValue: 100000,
        };
        this.project = this.props.project;
        this.investor = this.props.investor;
        this.APTI = this.props.APTI;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    
    handleBackButton() {
        return true;
    }

    investInProject() {
        let current_funds = this.investor.remaining_funds - this.state.investmentValue;
        let new_total_investment = this.project.total_investment + this.state.investmentValue;
        let new_partialInvestment_proj1 = this.investor.investments_inProjects.proj1.partial_investment + this.state.investmentValue;
        let new_partialInvestment_proj2 = this.investor.investments_inProjects.proj2.partial_investment + this.state.investmentValue;
        let new_partialInvestment_proj3 = this.investor.investments_inProjects.proj3.partial_investment + this.state.investmentValue;
        let new_invertedFunds = this.investor.invested_funds + this.state.investmentValue;
        const now = Date.now();

        if(current_funds >= 0) {
            switch(this.project.id) {
                case 'proj1':
                    firebaseApp.database()
                       .ref(`investors/${this.investor.id}`)
                       .update({
                            remaining_funds: current_funds,
                            invested_funds: new_invertedFunds,
                            investments_inProjects: {
                                proj1: {
                                    partial_investment: new_partialInvestment_proj1,
                                    last_timestamp: now
                                },
                                proj2: {
                                    partial_investment: this.investor.investments_inProjects.proj2.partial_investment,
                                    last_timestamp: this.investor.investments_inProjects.proj2.last_timestamp
                                },
                                proj3: {
                                    partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                    last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                                },
                                proj4: {
                                    partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                    last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                                },
                                proj5: {
                                    partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                    last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                                },
                                proj6: {
                                    partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                    last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                                },
                                proj7: {
                                    partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                    last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                                },
                                proj8: {
                                    partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                    last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                                },
                                proj9: {
                                    partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                    last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                                },
                                proj10: {
                                    partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                    last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                                },
                            }
                        });
                    break;
                
                case 'proj2':
                firebaseApp.database()
                    .ref(`investors/${this.investor.id}`)
                    .update({
                        remaining_funds: current_funds,
                        invested_funds: new_invertedFunds,
                        investments_inProjects: {
                            proj1: {
                                partial_investment: this.investor.investments_inProjects.proj1.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj1.last_timestamp
                            },
                            proj2: {
                                partial_investment: new_partialInvestment_proj2,
                                last_timestamp: now
                            },
                            proj3: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj4: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj5: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj6: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj7: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj8: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj9: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj10: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                        }
                    });
                break;

                case 'proj3':
                firebaseApp.database()
                    .ref(`investors/${this.investor.id}`)
                    .update({
                        remaining_funds: current_funds,
                        invested_funds: new_invertedFunds,
                        investments_inProjects: {
                            proj1: {
                                partial_investment: this.investor.investments_inProjects.proj1.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj1.last_timestamp
                            },
                            proj2: {
                                partial_investment: this.investor.investments_inProjects.proj2.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj2.last_timestamp
                            },
                            proj3: {
                                partial_investment: new_partialInvestment_proj3,
                                last_timestamp: now
                            },
                            proj4: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj5: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj6: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj7: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj8: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj9: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj10: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                        }
                    });
                break;

                case 'proj4':
                firebaseApp.database()
                    .ref(`investors/${this.investor.id}`)
                    .update({
                        remaining_funds: current_funds,
                        invested_funds: new_invertedFunds,
                        investments_inProjects: {
                            proj1: {
                                partial_investment: this.investor.investments_inProjects.proj1.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj1.last_timestamp
                            },
                            proj2: {
                                partial_investment: this.investor.investments_inProjects.proj2.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj2.last_timestamp
                            },
                            proj3: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj4: {
                                partial_investment: new_partialInvestment_proj4,
                                last_timestamp: now
                            },
                            proj5: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj6: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj7: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj8: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj9: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj10: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                        }
                    });
                break;

                case 'proj5':
                firebaseApp.database()
                    .ref(`investors/${this.investor.id}`)
                    .update({
                        remaining_funds: current_funds,
                        invested_funds: new_invertedFunds,
                        investments_inProjects: {
                            proj1: {
                                partial_investment: this.investor.investments_inProjects.proj1.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj1.last_timestamp
                            },
                            proj2: {
                                partial_investment: this.investor.investments_inProjects.proj2.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj2.last_timestamp
                            },
                            proj3: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj4: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj5: {
                                partial_investment: new_partialInvestment_proj5,
                                last_timestamp: now
                            },
                            proj6: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj7: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj8: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj9: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj10: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                        }
                    });
                break;

                case 'proj6':
                firebaseApp.database()
                    .ref(`investors/${this.investor.id}`)
                    .update({
                        remaining_funds: current_funds,
                        invested_funds: new_invertedFunds,
                        investments_inProjects: {
                            proj1: {
                                partial_investment: this.investor.investments_inProjects.proj1.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj1.last_timestamp
                            },
                            proj2: {
                                partial_investment: this.investor.investments_inProjects.proj2.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj2.last_timestamp
                            },
                            proj3: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj4: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj5: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj6: {
                                partial_investment: new_partialInvestment_proj6,
                                last_timestamp: now
                            },
                            proj7: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj8: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj9: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj10: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                        }
                    });
                break;

                case 'proj7':
                firebaseApp.database()
                    .ref(`investors/${this.investor.id}`)
                    .update({
                        remaining_funds: current_funds,
                        invested_funds: new_invertedFunds,
                        investments_inProjects: {
                            proj1: {
                                partial_investment: this.investor.investments_inProjects.proj1.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj1.last_timestamp
                            },
                            proj2: {
                                partial_investment: this.investor.investments_inProjects.proj2.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj2.last_timestamp
                            },
                            proj3: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj4: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj5: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj6: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj7: {
                                partial_investment: new_partialInvestment_proj7,
                                last_timestamp: now
                            },
                            proj8: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj9: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj10: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                        }
                    });
                break;

                case 'proj8':
                firebaseApp.database()
                    .ref(`investors/${this.investor.id}`)
                    .update({
                        remaining_funds: current_funds,
                        invested_funds: new_invertedFunds,
                        investments_inProjects: {
                            proj1: {
                                partial_investment: this.investor.investments_inProjects.proj1.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj1.last_timestamp
                            },
                            proj2: {
                                partial_investment: this.investor.investments_inProjects.proj2.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj2.last_timestamp
                            },
                            proj3: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj4: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj5: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj6: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj7: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj8: {
                                partial_investment: new_partialInvestment_proj8,
                                last_timestamp: now
                            },
                            proj9: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj10: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                        }
                    });
                break;

                case 'proj9':
                firebaseApp.database()
                    .ref(`investors/${this.investor.id}`)
                    .update({
                        remaining_funds: current_funds,
                        invested_funds: new_invertedFunds,
                        investments_inProjects: {
                            proj1: {
                                partial_investment: this.investor.investments_inProjects.proj1.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj1.last_timestamp
                            },
                            proj2: {
                                partial_investment: this.investor.investments_inProjects.proj2.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj2.last_timestamp
                            },
                            proj3: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj4: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj5: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj6: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj7: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj8: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj9: {
                                partial_investment: new_partialInvestment_proj9,
                                last_timestamp: now
                            },
                            proj10: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                        }
                    });
                break;

                case 'proj10':
                firebaseApp.database()
                    .ref(`investors/${this.investor.id}`)
                    .update({
                        remaining_funds: current_funds,
                        invested_funds: new_invertedFunds,
                        investments_inProjects: {
                            proj1: {
                                partial_investment: this.investor.investments_inProjects.proj1.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj1.last_timestamp
                            },
                            proj2: {
                                partial_investment: this.investor.investments_inProjects.proj2.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj2.last_timestamp
                            },
                            proj3: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj4: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj5: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj6: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj7: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj8: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj9: {
                                partial_investment: this.investor.investments_inProjects.proj3.partial_investment,
                                last_timestamp: this.investor.investments_inProjects.proj3.last_timestamp
                            },
                            proj10: {
                                partial_investment: new_partialInvestment_proj10,
                                last_timestamp: now
                            },
                        }
                    });
                break;
            }

            firebaseApp.database().ref().child('investments').push({
                investor: this.investor.id,
                project: this.project.id,
                money_assigned: this.state.investmentValue,
                timestamp: now,
            }).key;

            firebaseApp.database()
                       .ref(`/projects/${this.project.id}`)
                       .update({total_investment: new_total_investment});

            Alert.alert("Inversión realizada con exito");
        } else {
            Alert.alert("Fondos insuficientes");
        }

        this.props.showOrHideProjectInfo(this.props.project)
    }

    getImage(id) {
      return `https://firebasestorage.googleapis.com/v0/b/tecnoemprende-8c3a1.appspot.com/o/${id}.png?alt=media`
    }

    getInvestmentInProject(id) {
        if (id === 'proj1') return this.investor.investments_inProjects.proj1.partial_investment
        if (id === 'proj2') return this.investor.investments_inProjects.proj2.partial_investment
        if (id === 'proj3') return this.investor.investments_inProjects.proj3.partial_investment        
    }

    render() {
        let showOrHideProjectInfo = this.props.showOrHideProjectInfo;
        let project = this.props.project;
        
        return(
            <Container style={styles.containerAll}>
                <Content>
                    <View style={styles.container}>
                        <View style={styles.projectTitleContainer}>
                            <Text style={styles.projectTitle}>{project.name}</Text>
                        </View>

                        <View style={styles.ProjectAuthorContainer}>
                            <Text style={styles.ProjectAuthor}>{project.author}</Text>
                        </View>

                        <View style={styles.ProjectDescriptionContainer}>
                            <Text style={styles.projectBody}>{project.description}</Text>
                        </View>

                        <View style={styles.projectImageContainer}>
                        <Image source={{uri: this.getImage(this.props.project.id)}}
                                style={styles.projectImage} />
                        </View>

                        <View style={styles.ProjectDescriptionContainer}>
                            <Text style={styles.projectBody}>Llevás invertidos aquí: <Text style={{color: '#03F5FF'}}>${this.getInvestmentInProject(this.props.project.id)}</Text></Text>
                        </View>

                        <View style={styles.howMuchToInvest}>
                            <Text style={styles.projectBody}>¿Cuanto querés invertir?</Text>
                        </View>
                        
                        <View style={styles.projectBodyContainer}>
                            <View style={styles.projectInvestment}>
                                <Picker
                                    style={styles.pickerContainer}
                                    onValueChange={(investmentValue) => this.setState({investmentValue: investmentValue})}
                                    selectedValue={this.state.investmentValue} >
                                        <Picker.Item label="$ 100.000" value={100000} />
                                        <Picker.Item label="$ 50.000"  value={50000} />
                                        <Picker.Item label="$ 20.000"  value={20000} />
                                        <Picker.Item label="$ 10.000"  value={10000} />
                                </Picker>
                            </View>
                        </View>
                        
                        <View style={styles.buttonsContainer}>
                            {
                            this.props.button ?
                            <View style={styles.button}>
                                <TouchableOpacity full primary transparent
                                        onPress={() => this.investInProject()} >
                                    <Text style={styles.buttonInvestmetnText}>
                                        Invertir
                                    </Text>
                                </TouchableOpacity>
                            </View> :
                            <View
                                style={styles.hiddenButton}
                            />
                            }
                            <View style={styles.button}>
                                <TouchableOpacity full primary transparent
                                                    onPress={() => this.props.showOrHideProjectInfo(this.props.project)} >
                                    <Text style={styles.buttonText}>
                                        Volver
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Content>
            </Container>   
        );
    }
}

const styles = StyleSheet.create({
    containerAll: {
        backgroundColor: '#091732',
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#091732',
  },
  projectContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  projectTitleContainer: {
    marginTop: 10,
    marginRight: 15,
    marginLeft: 15,
    marginBottom  : 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  ProjectAutorContainer: {
    marginTop: 10,
    marginRight: 15,
    marginLeft: 15,
    marginBottom  : 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  ProjectDescriptionContainer: {
    marginTop: 10,
    marginRight: 15,
    marginLeft: 15,
    marginBottom  : 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  howMuchToInvest: {
    marginTop: 25,
  },
  projectTitle: {
    fontSize: 20,
    color: '#03F5FF',
  },
  ProjectAuthroContainer: {
    marginTop: 10,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  ProjectAuthor: {
    fontSize: 17,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  projectBodyContainer: {
    marginRight: 15,
    marginLeft: 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  projectBody: {
    fontSize: 17,
    color: '#FFFFFF',
  },
  projectInvestment: {
    marginBottom: 30,
  },
  pickerContainer: {
    backgroundColor: '#091732',
    color: '#FF005E',
    width: 120,
    fontSize: 50,
},
	hiddenButton: {
    height: 45,
  },
  buttonsContainer: {
    backgroundColor: '#091732',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    padding: 10,
    fontSize: 17,
  },
  buttonInvestmetnText: {
    color: '#FF005E',
  },
  buttonText: {
    color: '#FFFFFF',
  },
  projectImageContainer: {
    width: 201,
    height: 201,
  },
  projectImage: {
    width: 200,
    height: 200,
  },
});