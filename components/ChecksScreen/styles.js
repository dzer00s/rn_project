import {StyleSheet} from 'react-native';
import { colorBody, colorDelete, colorHeader } from '../../constants/app_env';

export default styles = StyleSheet.create({
  containerEl: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 15,
    minHeight: 110,
  },
  containerMain: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colorBody,
    // alignItems: 'center',
  },
  containerHeader: {
    minHeight: 30,
    flexDirection: 'row',
    margin: 15,
  },
  containerHeaderBackground: {
    backgroundColor: colorHeader,
    elevation: 3,
    // shadowColor: '#000',
  },
  containerHeaderText: {
    // color: 'white',
    fontSize: 24,
    // padding: 3,
    fontWeight: 'bold',
  },
  containerElSwipe: {
    backgroundColor: colorDelete,
    marginTop: 15,
    borderRadius: 5,
    marginBottom: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  deleteEl: {
    fontSize: 20,
    color: 'white',
  }
});
