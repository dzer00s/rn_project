import {StyleSheet} from 'react-native';
import { colorHeader } from '../../../constants/app_env';

export default styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // width: '100%',
  },
  container: {
    //   flex: 1,
    flexDirection: 'row',
    //   alignItems: "center",
    //   justifyContent: 'center',
  },
  containerTop: {
    backgroundColor: colorHeader,
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    elevation: 4,
  },
  containerTopBox: {
    marginRight: 15,
    marginLeft: 15,
  },
  containerTopText: {
    fontSize: 26,
  },
  containerTopTextSecond: {
    fontSize: 14,
    color: 'grey',
  },
  containerMiddle: {
    backgroundColor: 'black',
    flex: 5,
    flexDirection: 'column',
    width: '100%',
    // alignItems: 'center',
    // justifyContent: "center",
  },
  containerBottom: {
    backgroundColor: colorHeader,
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  containerBottomBox: {
    marginLeft: 40,
    flex: 1,
    flexDirection: 'row',
  },
  BottomLeft: {
    flex: 4,
    flexDirection: 'column',
  },
  BottomRight: {
    flex: 1,
    flexDirection: 'column',
    // padding: 10,
  },
  containerBottomText: {
    color: 'blue',
    fontSize: 18,
  },
  img: {
    width: 35,
    height: 35,
  },
});
