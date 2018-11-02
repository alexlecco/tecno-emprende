import React, {Component} from 'react';
import { Platform, StyleSheet, View, TouchableHighlight, } from 'react-native';
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
					<TouchableHighlight primary transparent
							onPress={() => this.props.showOrHideProjectInfo(this.props.project)} >
						<Text>
							Ver Proyecto
						</Text>
					</TouchableHighlight>
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
		marginTop: 10,
		marginBottom: 10,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: '#ffffff',
    },
    projectText: {
		color: 'grey',
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
		borderBottomColor: '#3F51B5',
		paddingLeft: 10,
		paddingRight: 10,
		width: 250,
	},
});