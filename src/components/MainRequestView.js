import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Shimmer from 'react-native-shimmer'

import OptionItem from './OptionItem'

export default class MainRequestView extends React.Component {

	render() {
		const { mainVisit, changingStatus } = this.props

		return(
			<>
				<View style={styles.mainVisitContainer}>
					<View style={styles.mainVisitInfoContainer}> 
						<Text style={styles.formQuestionText}>Purpose of Visit</Text>
						
						<View style={styles.purposeOptionContainer}>
							{
								mainVisit.purpose.grocery ? (
									<OptionItem 
										itemStyle={[styles.optionItem]} 
										circleStyle={[styles.optionCircle, styles.optionCircleGreen]} 
										textStyle={[styles.optionText, styles.optionTextGreen]}
										text={"For purchasing required house supplies"}
										iconName={ "check-circle" } />
								): false
							}
							{
								mainVisit.purpose.medical ? (
									<OptionItem 
										itemStyle={[styles.optionItem]} 
										circleStyle={[styles.optionCircle, styles.optionCircleBlue]} 
										textStyle={[styles.optionText, styles.optionTextBlue]}
										text={"For medical emergencies/purchases"}
										iconName={ "check-circle" } />
								) : false
							}
							{
								mainVisit.purpose.other ? (
									<OptionItem 
										itemStyle={[styles.optionItem]} 
										circleStyle={[styles.optionCircle]} 
										textStyle={[styles.optionText]}
										text={"Other emergent purposes"}
										iconName={ "check-circle" } />
								) : false
							}
						</View>

						<View style={styles.questionContainer}>
							<Text style={styles.formQuestionText}>Day of visit</Text>
							<Text style={styles.dateText}>
								{mainVisit.visit_date.weekday + ", " + mainVisit.visit_date.day + " " + mainVisit.visit_date.month}
							</Text>
						</View>

						<View style={styles.questionContainer}>
							<Text style={styles.formQuestionText}>Going to</Text>
							<Text style={styles.placeText}>{mainVisit.visit_place}</Text>
						</View>

						<View style={styles.questionContainer}>
							<Text style={styles.formQuestionText}>Additional note</Text>
							<Text style={styles.noteText}>{mainVisit.note}</Text>
						</View>

						<View style={{flexDirection: 'row', marginTop: 20, marginBottom: 5}}>
							<TouchableOpacity style={[styles.actionBtn, {marginRight: 10}]} onPress={this.props.onApprove}>
								{
									changingStatus ? (
										<Shimmer style={{marginVertical: 3}}>
											<View style={styles.btnPlaceholder} />
										</Shimmer>
									) : (
										<View style={{flexDirection: 'row'}}>
											<Icon name="check-circle" style={[styles.actionBtnIcon, {color: '#43A047'}]}/>
											<Text style={[styles.actionBtnText]}>Approve</Text>
										</View>
									)
								}
							</TouchableOpacity>
							<TouchableOpacity style={[styles.actionBtn, styles.actionBtnRed]} onPress={this.props.onReject}>
								{
									changingStatus ? (
										<Shimmer style={{marginVertical: 3}}>
											<View style={styles.btnPlaceholder} />
										</Shimmer>
									) : (
										<View style={{flexDirection: 'row'}}>
											<Icon name="cancel" style={[styles.actionBtnIcon, {color: '#D50000'}]} />
											<Text style={[styles.actionBtnText, styles.actionBtnTextRed]}>Reject</Text>
										</View>
									)
								}
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</>
		)
	}

}

const styles = StyleSheet.create({
	mainVisitContainer: {
		backgroundColor: 'white',
		borderTopWidth: 1,
		borderBottomWidth: 2,
		paddingBottom: 18,
		borderTopColor: '#eee',
		borderBottomColor: '#e0e0e0'
	},
	mainVisitInfoContainer: {
		paddingHorizontal: 25,
		paddingTop: 16,
		backgroundColor: 'white',
	},
	formQuestionText: {
		fontSize: 13,
		color: '#757575',
		fontWeight: 'bold'
	},
	purposeOptionContainer: {
		marginTop: 10,
		marginRight: 15,
	},
	optionItem: {
		alignItems: 'center',
		flexDirection: 'row',
		borderRadius: 5,
		marginBottom: 4,
	},
	optionCircle: {
		fontSize: 14,
		color: '#757575'
	},
	optionText: {
		marginLeft: 6,
		fontWeight: 'bold',
		color: '#757575',
		fontSize: 14,
	},

	optionCircleGreen: {
		color: '#43A047',
	},
	optionTextGreen: {
		color: '#43A047'
	},

	optionCircleBlue: {
		color: '#1E88E5',
	},
	optionTextBlue: {
		color: '#1E88E5'
	},

	questionContainer: {
		marginTop: 16,
	},
	dateText: {
		marginTop: 2,
		color: 'black',
		fontWeight: 'bold',
		fontSize: 20,
	},
	placeText: {
		marginTop: 2,
		color: 'black',
		fontWeight: 'bold',
		fontSize: 16,
	},
	noteText: {
		marginTop: 2,
		color: '#757575',
		fontSize: 15,
	},

	statusTextContainer: {
		flexDirection: 'row',
		paddingHorizontal: 25,
		alignItems: 'center',
		paddingVertical: 8,
		backgroundColor: 'rgba(255,145,0, 0.08)',
	},
	statusIcon: {
		fontSize: 14,
		color: 'rgb(255,145,0)',
	},
	statusIconGreen: {
		color: 'rgb(0,200,83)'
	},
	statusIconRed: {
		color: 'rgb(221,44,0)'
	},
	statusText: {
		textTransform: 'uppercase',
		fontWeight: 'bold',
		fontSize: 12,
		color: 'rgb(255,145,0)',
		marginLeft: 6,
	},
	statusTextGreen: {
		color: 'rgb(0,200,83)'
	},
	statusTextRed: {
		color: 'rgb(221,44,0)'
	},
	statusTextContainerGreen: {
		backgroundColor: 'rgba(0,200,83, 0.08)',
	},
	statusTextContainerRed: {
		backgroundColor: 'rgba(221,44,0, 0.08)',
	},
	actionBtn: {
		flexDirection: 'row',
		paddingHorizontal: 16,
		paddingVertical: 8,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2,
		borderColor: '#43A047',
		borderRadius: 4,
	},
	actionBtnText: {
		fontWeight: 'bold',
		fontSize: 13,
		marginLeft: 8,
		textTransform: 'uppercase',
		color: '#43A047'
	},
	actionBtnRed: {
		borderColor: '#D50000'
	},
	actionBtnTextRed: {
		color: '#D50000'
	},
	actionBtnIcon: {
		marginTop: 1,
		fontSize: 14,
	},
	btnPlaceholder: {
		height: 12,
		width: 60,
		backgroundColor: '#e0e0e0'
	}
})