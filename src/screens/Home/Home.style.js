import { StyleSheet, Platform } from 'react-native'

export default styles = StyleSheet.create({
	body: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    fontFamily: 'SofiaPro',
    backgroundColor: 'white'
  },
  scrollView: {
    backgroundColor: '#fafafa',
  },
  contentView: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  lighterSection: {
    flex: 1,
  },
  topHeadingShort: {
    fontWeight: 'bold',
    color: '#757575',
    fontSize: 12,
    marginTop: 18,
    marginHorizontal: 21,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
})