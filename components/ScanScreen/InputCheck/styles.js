import {StyleSheet} from 'react-native';
import { colorBodySec } from '../../../constants/app_env';

export default styles = StyleSheet.create({
  loginContainer: {
    height: '100%',
    elevation: 10,
    backgroundColor: colorBodySec,
  },
  textInputContainer: {
    minHeight: 90,
    flex: 1,
  },
  textInput: {
    minHeight: 35,
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  textInputTimeInfo: {
    flex: 3,
    flexDirection: 'column',
  },
  textInputTimeButton: {
    flex: 1,
    flexDirection: 'column',

  },
  alignCenter: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  mainText: {
    marginBottom: 15,
    fontSize: 18,

  },
  errorTouched: {
    fontSize: 12,
    color: 'red',
    marginLeft: 15,
  },
  buttonContainer: {
    minHeight: 35,
    margin: 10,
  },
  buttonSubmit: {
    backgroundColor: 'blue',
  },
});
