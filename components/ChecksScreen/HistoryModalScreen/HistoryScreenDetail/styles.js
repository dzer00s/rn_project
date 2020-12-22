import {
    StyleSheet
  } from 'react-native';
import { colorBody } from '../../../../constants/app_env';

  export default styles = StyleSheet.create({
    modal: {
      flex: 1,
      minHeight: '100%',
      backgroundColor: colorBody,
    },
    modalScreenDetail: {
      flex: 3,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 15,
    },
    modalScroll: {
      flex: 12,
      flexDirection: 'row',
    },
    modalScrollInfo: {
      flex: 1,
      flexDirection: 'row',
      margin: 20,
      backgroundColor: colorBody,
    },
    modalScrollInfoList: {
      flex: 1,
      flexDirection: 'row',
      marginTop: 15,
      marginRight: 20,
      marginLeft: 20,
      backgroundColor: colorBody,
    },
    ModalScrollInfoCol: {
      flex: 1,
      flexDirection: 'column',
    },
    ModalScrollInfoColRight: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    ModalScrollInfoColLeft: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    textSecondary: {
      color: '#9e9c9b',
    },
    textSecondaryBlack: {
      color: 'black',
    },
    textSecondaryEl: {
      fontSize: 16,
    },
    textSecondarySumEl: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    separatorHr: {
      flex: 1,
      flexDirection: 'row',
      borderBottomColor: 'silver',
      borderBottomWidth: 1,
      width: '90%',
      marginLeft: 20,
      marginRight: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    img: {
      width: 25,
      height: 25,
    },
    marginTopFix: {
      marginTop: 10,
    },
    marginBottomFix: {
      marginBottom: 10,
    },
  });