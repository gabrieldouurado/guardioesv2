import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { scale } from '../scallingUtils';

export const styles = StyleSheet.create({
  container: {
		flex: 1,
		height: 550,
		justifyContent: 'center',
		alignItems: 'center'
	},
	scrollViewStyle: {
		marginHorizontal: 25,
		paddingTop: 15
	},
	imagesView: {
		flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
		padding: 30
    },
    text: {
        fontFamily: 'myriadpro',
        fontSize: 18,
        fontWeight: '300'
    },
    imageOne: {
        height: scale(100),
        width: scale(100)
    },
    imageTwo: {
        height: scale(100),
        width: scale(100)
    }
})
