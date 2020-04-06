import React  from 'react'
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Option(props) {
	return (
		<>
			<View style={props.itemStyle}>
				<Icon name={props.iconName} style={props.circleStyle} />
				<Text style={props.textStyle}>{props.text}</Text>
			</View>
		</>
	)
}