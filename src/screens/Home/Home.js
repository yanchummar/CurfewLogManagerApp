import React, { Component } from 'react'
import { SafeAreaView, View, Text, StatusBar, ScrollView, PermissionsAndroid, RefreshControl, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './Home.style'
import Geolocation from '@react-native-community/geolocation'
import Shimmer from 'react-native-shimmer'
import { API_URL } from '../../constants/urls'

import { SummarySection, PendingRequestItem, PlaceholderVisitItem } from '../../components/'

export default class Home extends Component {

	constructor(props) {
		super(props)
		this.state = {
			pendingRequests:  undefined,
			isLoading: true,
			date: {day:'-', month:'-', year:'-', weekday:'-'},
			covid_cases: {active:'---', recovered: '---', deceased: '---'}
		}
	}

	navigateToRequestView = (userEmail) => {
		this.props.navigation.navigate('Request View', { userEmail: userEmail })
	}

	// gets nearby requests
	getNearbyRequests = () => {
		this.setState({isLoading: true, pendingRequests: undefined})
		// getting current location
		Geolocation.getCurrentPosition(info => {
			console.log(info)
			let latlong = [info.coords.latitude, info.coords.longitude]
			console.log(latlong)
			this.setState({isLoading: false})

			// sending API request

			fetch((API_URL + '/get-city-requests'), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'no-cache'
				},
				body: JSON.stringify({
					coordinates: latlong
				}),
			})
			.then((response) => response.json())
			.then((json) => {
				if (json.status === "success") {
					// getting pending requests
					this.setState({pendingRequests: json.active_requests})
					this.setState({isLoading: false})
				} else {
					this.setState({isLoading: false, pendingRequests: undefined})
				}
			})
			.catch((error) => {
				console.log(error)
				this.setState({isLoading: false, pendingRequests: undefined})
			});

		}).catch(err => {
			console.log(err)
			this.setState({isLoading: false, pendingRequests: undefined})
		})
	}
	// requesting location permission and navigating to request creation
	requestLocationPermission = async () => {
		if (Platform.OS === 'android') {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
					{
						title: "Curfew Log Location Permission",
						message:
							"Curfew Log needs to access your location " +
							"to send the request to the correct people",
						buttonNegative: "Cancel",
						buttonPositive: "OK"
					}
				);
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					// getting current location
					this.getNearbyRequests()
				} else {
					console.log("Location permission denied")
					ToastAndroid.show("Please enable location permissions to continue", ToastAndroid.LONG)
				}
			} catch (err) {
				console.warn(err);
			}
		} else {
			// getting current location
			this.getNearbyRequests()
		}
	}

	componentDidMount() {
		this.setState({ isLoading: true })
		// getting summary
		fetch((API_URL + '/get-summary'), {
			method: 'GET',
			headers: {
				'Cache-Control': 'no-cache'
			}
		})
		.then((response) => response.json())
		.then((json) => {
			console.log((API_URL + '/get-summary'))
			this.setState({
				date: json.date,
				covid_cases: json.covid_cases
			})
		})
		.catch((error) => {
			console.log(error);
		});
		this.requestLocationPermission()

	}

	render() {
		const { pendingRequests, isLoading, date, covid_cases } = this.state

		if (this.props.route.params !== undefined) {
			if (this.props.route.params.isHardRefresh === true) {
				this.props.route.params.isHardRefresh = false
				this.componentDidMount()
			}
		}

		// getting loading views if necessary
		let visit_list_element = (
			<View>
				<Shimmer style={{marginTop: 21, marginHorizontal: 21, width: 200}}>
					<View style={{height: 15, backgroundColor: '#bdbdbd'}}/>
				</Shimmer>
				<PlaceholderVisitItem /><PlaceholderVisitItem /><PlaceholderVisitItem />
			</View>
		)

		if (!isLoading && pendingRequests !== undefined) {
			visit_list_element = (
				<View>
					<View style={styles.contentView}>
						<Text style={styles.topHeadingShort}>{ pendingRequests.length + " Pending Requests Nearby"}</Text>
					</View>

					{
						(pendingRequests.length > 0) ? (
							<View style={{marginBottom: 30, borderBottomWidth: 1, borderBottomColor: '#e0e0e0'}}>
								{ 
									pendingRequests.map((request) => {
										return (
											<PendingRequestItem request={request} onPress={() => this.navigateToRequestView(request.user.email)} />
										)
									})
								}
							</View>
						) : false
					}
					
				</View>
			)
		}

		return (
			<>
				<StatusBar barStyle="dark-content" />
				<SafeAreaView style={styles.body}>
					<ScrollView 
						style={styles.scrollView}
						refreshControl={
							<RefreshControl refreshing={false} onRefresh={this.componentDidMount.bind(this)} />
						}>

						<SummarySection date={date} covid_cases={covid_cases}/>

						{ visit_list_element }

					</ScrollView>

				</SafeAreaView>
			</>
		)
	}
}
