import React, { Component } from 'react';
import { FlatList, ImageBackground, ScrollView, Platform, StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

import * as Imagem from '../../imgs/imageConst';

class Prevencao extends Component {


	constructor(props) {
		super(props);
		this.state = { isLoading: true }

	}

	componentDidMount() {
		return fetch('https://guardianes.centeias.net/household/')
			.then((response) => response.json())
			.then((responseJson) => {

				this.setState({
					isLoading: false,
					dataSource: responseJson.data,
				}, function () {

				});

			})
			.catch((error) => {
				console.error(error);
			});
	}



	static navigationOptions = {
		title: 'Prevenção'
	}

	render() {
		if (this.state.isLoading) {
			return (
				<View style={{ flex: 1, padding: 20 }}>
					<ActivityIndicator />
				</View>
			)
		}


		return (
			// let data = (this.state.dataSource)
			<View style={styles.container} >
				<ImageBackground style={styles.container} source={Imagem.imagemFundo} imageStyle={{ resizeMode: 'stretch' }}>
					<FlatList
						data={this.state.dataSource}
						renderItem={({ item }) => <Text style={styles.titulo}>{item.firstname}</Text>}
						keyExtractor={(item, index) => index}
					/>
				</ImageBackground>
			</View>
		);
	}
}

//Defining our styles
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
export default Prevencao;