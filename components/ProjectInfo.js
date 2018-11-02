import React, { Component } from 'react';
import {Platform, StyleSheet, View, TouchableOpacity, Alert, TouchableHighlight, } from 'react-native';
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
                                }
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

    render() {
        let showOrHideProjectInfo = this.props.showOrHideProjectInfo;
        let project = this.props.project;
        
        return(
            <Container>
                <Content>
                    <View style={styles.projectContainer}>
                        <View style={styles.projectTitleContainer}>
                            <Text style={styles.projectTitle}>{project.name}</Text>
                        </View>

                        <View style={styles.ProjectAuthorContainer}>
                            <Text style={styles.ProjectAuthor}>{project.author}</Text>
                        </View>
                        
                        <View style={styles.projectBodyContainer}>
                            <Text style={styles.projectBody}>{project.description}</Text>
                            <View style={styles.projectInvestment}>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"                                    
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
                    </View>
                </Content>
                <View style={styles.buttonsContainer}>
                  {
                    this.props.button ?
                    <TouchableHighlight full primary transparent
                            onPress={() => this.investInProject()} >
                        <Text>
                            Invertir
                        </Text>
                    </TouchableHighlight> :
                    <View
                        style={styles.hiddenButton}
                    />
                  }
                  <TouchableHighlight full primary transparent
                                      onPress={() => this.props.showOrHideProjectInfo(this.props.project)} >
                    <Text>
                        Volver
                    </Text>
                  </TouchableHighlight>
                </View>

            </Container>   
        );
    }
}

const styles = StyleSheet.create({
  projectContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
  },
  projectTitleContainer: {
      marginTop: 10,
  marginRight: 15,
  marginLeft: 15,
      marginTop: 10,
  flexWrap: 'wrap',
      flexDirection: 'row',
  },
  projectTitle: {
      fontSize: 20,
      color: '#3F51B5',
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
      color: '#000000',
      textAlign: 'center',
  },
  projectBodyContainer: {
  marginTop: 10,
  marginRight: 15,
  marginLeft: 15,
      marginTop: 10,
  flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'center',
  },
  projectBody: {
  fontSize: 17,
      color: '#4f4f4f',
  },
  projectInvestment: {
      marginTop: 50,
      marginBottom: 50,
  },
  pickerContainer: {
      width: 120,
      color: '#3F51B5',
  },
	hiddenButton: {
		height: 45,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
  },
});