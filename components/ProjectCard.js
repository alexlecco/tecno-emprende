import React, {Component} from 'react';
import { Platform, StyleSheet, View, TouchableOpacity, Dimensions, } from 'react-native';
import { Button, Text, } from 'native-base';

export default class ProjectCard extends Component {
	constructor(props) {
		super(props);
		let project = this.props.project;
	}

	getInvestmentInProject(id) {
		if (id === 'proj01') return this.props.investor.investments_inProjects.proj01.partial_investment
		if (id === 'proj02') return this.props.investor.investments_inProjects.proj02.partial_investment
		if (id === 'proj03') return this.props.investor.investments_inProjects.proj03.partial_investment
		if (id === 'proj04') return this.props.investor.investments_inProjects.proj04.partial_investment
		if (id === 'proj05') return this.props.investor.investments_inProjects.proj05.partial_investment
		if (id === 'proj06') return this.props.investor.investments_inProjects.proj06.partial_investment
	}

	render() {
		let showOrHideProjectInfo = this.props.showOrHideProjectInfo;
		let project = this.props.project;

		return(
			<View style={styles.projectCardContainer}>
				<Text style={styles.projectTextName}>{this.props.project.name}</Text>
				<Text style={styles.projectTextAuthor}>{this.props.project.author}</Text>
				<Text style={styles.projectText}>Llevás invertido aqui: <Text style={{color: '#D2ED22'}}>$ {this.getInvestmentInProject(this.props.project.id)}</Text></Text>
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
		backgroundColor: '#4D3D95',
		width: Dimensions.get('window').width - 40,
  },
  projectText: {
    color: '#FFFFFF',
	},
  projectTextName: {
		color: '#FFFFFF',
		fontSize: 20,
		textAlign: 'center',
		fontWeight: 'bold',
	},
  projectTextAuthor: {
		color: '#FFFFFF',
		fontSize: 18,
		textAlign: 'center',
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
		borderBottomColor: '#F92672',
		paddingLeft: 10,
		paddingRight: 10,
		width: 250,
  },
  button: {
    color: '#F92672',
    fontSize: 20,
  }
});