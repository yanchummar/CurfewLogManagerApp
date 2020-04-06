import React, { Component } from 'react'
import { SafeAreaView, View, Text, StatusBar, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './RequestView.style'

import { MainRequestView, VisitRequestItem, PlaceholderVisitItem } from '../../components'
import { API_URL } from '../../constants/urls'

export default class RequestView extends Component {

	constructor(props) {
		super(props)
		this.state = {
			mainVisit: undefined,
			recentVisits: [],
			isLoading: false,
			changingStatus: false,
		}
	}

	navigateBack = () => {
		this.props.navigation.navigate('Home')
	}

	updateRequestStatus = (isApprove) => {
		let status_text = 'approved'
		if (!isApprove) {
			status_text = 'rejected'
		}
		// showing loading shimmer
		this.setState({changingStatus: true})
		fetch((API_URL + '/update-request'), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				request_id: this.state.mainVisit.request_id,
				status: status_text
			}),
		})
		.then((response) => response.json())
		.then((json) => {
			if (json.status === "success") {
				// navigating to home
				this.props.navigation.navigate('Home', { isHardRefresh: true })

			} else {
				this.setState({changingStatus: false})
			}
		})
		.catch((error) => {
			console.error(error);
			this.setState({changingStatus: false})
		});
	}

	// sending the API request
	componentDidMount() {
		this.setState({isLoading: true})
		let userEmail = this.props.route.params.userEmail
		console.log('email: ' + userEmail)
		fetch((API_URL + '/get-user-requests'), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache'
			},
			body: JSON.stringify({
				email: userEmail
			}),
		})
		.then((response) => response.json())
		.then((json) => {
			console.log(json)
			if (json.status === "success") {
				// getting pending requests
				this.setState({mainVisit: json.active_request, recentVisits: json.past_requests, isLoading: false})
			} else {
				this.setState({isLoading: false, mainVisit: undefined, recentVisits: []})
			}
		})
		.catch((error) => {
			console.error(error);
			this.setState({isLoading: false, mainVisit: undefined, recentVisits: []})
		});
	}

	render() {
		const { mainVisit, recentVisits, isLoading, changingStatus } = this.state

		// getting loading view if necessary
		let request_view_element = (
			<View>
				<PlaceholderVisitItem /><PlaceholderVisitItem /><PlaceholderVisitItem />
			</View>
		)

		if (!isLoading) {
			request_view_element = (
				<View>
					{ 
						(mainVisit !== undefined) ? (
							<View>
								<MainRequestView 
									mainVisit={mainVisit}
									changingStatus={changingStatus}
									onApprove={() => this.updateRequestStatus(true)}
									onReject={() => this.updateRequestStatus(false)} />
							</View>
						) : false
					}
					
					{
						(recentVisits.length > 0) ? (
							<View>
								<View>
									<Text style={[styles.recentVisitsTitle, {marginTop: 28}]}>Person's Recent Visits</Text>

									<View style={{paddingBottom: 35}}>
										{
											recentVisits.map((visit, index) => {
												return (
													<VisitRequestItem visit={visit} index={index} listLength={recentVisits.length}/>
												)
											})
										}
									</View>
								</View>
							</View>
						) : false
					}
				</View>
			)
		}

		return (
			<>
				<StatusBar />
				<SafeAreaView style={styles.body}>

					<TouchableOpacity style={styles.backNavContainer} onPress={this.navigateBack.bind(this)}>
						<Icon name="arrow-back" style={styles.backNavIcon} />
						<Text style={styles.backNavText}>Back</Text>
					</TouchableOpacity>

					<ScrollView>

						{ request_view_element }

					</ScrollView>

				</SafeAreaView>
			</>
		)
	}
}