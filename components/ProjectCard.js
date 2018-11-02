import React, {Component} from 'react';
import { Platform, StyleSheet, View, TouchableOpacity, } from 'react-native';
import { Button, Text, } from 'native-base';

export default class ProjectCard extends Component {
	constructor(props) {
		super(props);
		let project = this.props.project;
	}

	render() {
		let showOrHideProjectInfo = this.props.showOrHideProjectInfo;
		let project = this.props.project;

		return(
			<View style={styles.projectCardContainer}>
				<Text style={styles.projectText}>Emprendimiento: {this.props.project.name}</Text>
				<Text style={styles.projectText}>Emprendedor: {this.props.project.author}</Text>
				<View style={styles.buttonContainer}>
					<TouchableOpacity primary transparent
							onPress={() => this.props.showOrHideProjectInfo(this.props.project)} >
						<Text style={styles.button}>
							Ver Proyecto
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
  },
  projectText: {
    color: '#FFFFFF',
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
    fontSize: 17,
  }
});