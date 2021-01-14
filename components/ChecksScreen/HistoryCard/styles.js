import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  img: {
    width: 35,
    height: 35,
  },
  ElContainerMain: {
    flex: 1,
    flexDirection: 'row',
  },
  ElContainer: {
    width: '90%',
    minHeight: 95,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  RowSeparatorEl: {
    flex: 1,
    flexDirection: 'row',
  },
  TopLeftEl: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TopMiddleEl: {
    flex: 4,
    justifyContent: 'center',
  },
  TopRightEl: {
    flex: 2,
  },
  BottomEl: {
    flex: 2,
    marginRight: 5,
    marginLeft: 5,
  },
  BottomElStatus: {
    flex: 3,
  },
  textSecondary: {
    color: '#9e9c9b',
  },
  textSecondarySumEl: {
    fontSize: 16,
    padding: 3,
    fontWeight: 'bold',
  },
  textSecondaryEl: {
    fontSize: 16,
  },
});
