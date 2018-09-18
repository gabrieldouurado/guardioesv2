import React, { Component } from 'react';
import { ImageBackground, ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import { styles } from './Utils';
import { imagemFundo, imagemUnb } from '../../imgs/imageConst';

class Dengue extends Component {


	constructor(props) {
		super(props);
		this.state = { isLoading: true }

	}

	static navigationOptions = {
		title: 'Dengue'
	}

	render() {
		const { navigation } = this.props;
		const incomePages = navigation.getParam('body', 'Sorry, nothig to show now.');
		return (
			<ImageBackground style={styles.container} source={imagemFundo} imageStyle={{ resizeMode: 'center', marginLeft: '5%', marginRight: '5%' }}>
				<ScrollView contentContainerStyle={styles.scrollViewStyle}>
					<Text>
						{incomePages}
					</Text>
					<View style={styles.imagesView}>
						<TouchableOpacity
							onPress={() => Redirect(textos[1].tituloBtnUnb, textos[1].mensagemBtnUnb, textos[1].linkBtnUnb)}
						>
							<Image source={imagemUnb} style={styles.imageOne} />
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => Redirect(textos[2].tituloBtnCenteias, textos[2].mensagemBtnCenteias, textos[2].linkBtnCenteias)}
						>
							<Image source={imagemUnb} style={styles.imageTwo} />
						</TouchableOpacity>
					</View>
				</ScrollView>
			</ImageBackground>
		);
	}
}

export default Dengue;