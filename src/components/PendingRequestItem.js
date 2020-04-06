import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function PendingRequestItem(props) {

  const request = props.request
  
  return (
    <>
      <View style={styles.pendingRequestItem}>
        <Text style={styles.requestItemShortHeading}>Visit for</Text>
        <Text style={styles.requestItemDateText}>
          {request.visit_date.weekday + ", " + request.visit_date.day + " " + request.visit_date.month}
        </Text>

        <Text style={[styles.requestItemShortHeading, {marginTop: 10, marginLeft: 2}]}>Purpose of Visit</Text>
        <View style={styles.purposeItemContainer}>
          {
            request.purpose.grocery ? <Text style={[styles.purposeTextItem, styles.purposeTextItemGreen]}>House Supplies</Text> : false
          }
          {
            request.purpose.medical ? <Text style={[styles.purposeTextItem, styles.purposeTextItemBlue]}>Medical Needs</Text> : false
          }
          {
            request.purpose.other ? <Text style={styles.purposeTextItem}>Other</Text> : false
          }
        </View>

        <Text style={[styles.requestItemShortHeading, {marginTop: 12, marginLeft: 2}]}>Requested by</Text>
        <Text style={styles.requestItemPlaceText}>{request.user.name}</Text>

        <TouchableOpacity style={styles.viewRequestButton} onPress={props.onPress}>
          <Text style={styles.viewReqText}>Review Request</Text>
        </TouchableOpacity>
      </View>
    </>
  )

}

const styles = StyleSheet.create({
  pendingRequestItem: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  requestItemDateText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    marginLeft: 2
  },
  requestItemShortHeading: {
    fontWeight: 'bold',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    fontSize: 10,
    marginLeft: 2
  },
  purposeTextItem: {
    color: 'white',
    borderWidth: 2,
    borderColor: 'rgba(117,117,117, 0.2)',
    fontWeight: 'bold',
    fontSize: 12,
    paddingLeft: 10,
    paddingRight: Platform.select({ios: 10, android: 6}),
    paddingTop: 3,
    paddingBottom: Platform.select({ios: 2, android: 0}),
    borderRadius: 12,
    color: '#757575',
    marginRight: 6,
  },
  purposeTextItemGreen: {
    borderColor: 'rgba(67,160,71, 0.2)',
    color: '#43A047',
  },
  purposeTextItemBlue: {
    borderColor: 'rgba(30,136,229, 0.2)',
    color: '#1E88E5',
  },
  purposeItemContainer: {
    flexDirection: 'row', 
    marginTop: 6,
  },
  requestItemPlaceText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 2
  },
  viewRequestButton: {
    borderWidth: 2,
    borderColor: '#424242',
    borderRadius: 5, 
    marginTop: 16,
    marginBottom: 4,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
  }, 
  viewReqText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 12,
    textTransform: 'uppercase',
  }
})