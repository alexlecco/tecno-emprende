import React, {Component} from 'react';
import { Platform, StyleSheet, View, TouchableOpacity, } from 'react-native';
import { Button, Text, } from 'native-base';

export default class ProjectCard extends Component {
	constructor(props) {
		super(props);
		let project = this.props.project;
	}

	getInvestmentInProject(id) {
		if (id === 'proj1') return this.props.investor.investments_inProjects.proj1.partial_investment
		if (id === 'proj2') return this.props.investor.investments_inProjects.proj2.partial_investment
		if (id === 'proj3') return this.props.investor.investments_inProjects.proj3.partial_investment        
	}

	render() {
		let showOrHideProjectInfo = this.props.showOrHideProjectInfo;
		let project = this.props.project;

		return(
			<View style={styles.projectCardContainer}>
				<Text style={styles.projectTextName}>{this.props.project.name}</Text>
				<Text style={styles.projectTextAuthor}>{this.props.project.author}</Text>
				<Text style={styles.projectText}>Llevás invertido aqui: <Text style={{color: '#03F5FF'}}>${this.getInvestmentInProject(this.props.project.id)}</Text></Text>
				<View style={styles.buttonContainer}>
					<TouchableOpacity primary transparent
							onPress={() => this.props.showOrHideProjectInfo(this.props.project)} >
						<Text style={styles.button}>
							Ver emprendimiento
						</Text>
					</TouchableOpacity>
				</View>
				<View
					style={styles.lineDivider}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  projectCardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
		backgroundColor: '#091732',
		width: 400
  },
  projectText: {
    color: '#FFFFFF',
	},
  projectTextName: {
		color: '#FFFFFF',
		fontSize: 20,
	},
  projectTextAuthor: {
		color: '#FFFFFF',
		fontSize: 18,
	},
	buttonContainer: {
		flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
		marginTop: 5,
	},
	lineDivider: {
		borderBottomWidth: 1,
		borderBottomColor: '#FF005E',
		paddingLeft: 10,
		paddingRight: 10,
		width: 250,
  },
  button: {
    color: '#FF005E',
    fontSize: 20,
  }
});