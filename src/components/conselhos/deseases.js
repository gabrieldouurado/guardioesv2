import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import imagemFundo from '../../imgs/imageConst';

class Deseases extends Component {


	constructor(props) {
		super(props);
		this.state = { isLoading: true }

	}

	static navigationOptions = {
		title: 'Enfermidades Imunopreviniveis'
	}

	render() {
		const { navigation } = this.props;
		const incomePages = navigation.getParam('body', 'Sorry, nothig to show now.');
		return (
			<View style={styles.container} >
				<ImageBackground style={styles.container} source={imagemFundo} imageStyle={{ resizeMode: 'stretch' }}>
					<Text>
						{incomePages}
					</Text>
				</ImageBackground>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	margTop: {
		flexDirection: 'row',
		backgroundColor: '#0084b4',
		height: 50,
		justifyContent: 'space-between'
	},
	titulo: {
		color: '#CD853F',
		justifyContent: 'center',
		margin: 10,
		fontWeight: 'bold',
		fontSize: 30,
		alignSelf: 'center',
		marginRight: 70,
	},
	texto: {
		margin: 5,
		textAlign: 'justify',
		fontSize: 18,
		fontWeight: 'bold',
		color: 'black',
		letterSpacing: 1,

	},
	logo: {
		flex: 1,
		width: 120,
		height: 120,
		alignSelf: 'center',
	},
	backButton: {
		alignSelf: 'center',
		marginLeft: 10,
	},
});

//make this component available to the app
export default Deseases;