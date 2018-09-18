import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { styles } from './Utils';
import imagemFundo from '../../imgs/imageConst';

class TravelHealth extends Component {


	constructor(props) {
		super(props);
		this.state = { isLoading: true }

	}

	static navigationOptions = {
		title: 'Saúde do Viajante'
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

export default TravelHealth;