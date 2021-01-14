import React, {useState} from 'react';
import {
  Text,
  View,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  Button,
  Alert,
} from 'react-native';
import {CameraKitCameraScreen} from 'react-native-camera-kit';
import {addScanCheckThunk} from '../../../actions/ScanActions';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import styles from './style';
import { funcSeparator, wait } from '../../../constants/app_env';

const ScanCheck = (props) => {
  const [qrvalue, setQrvalue] = useState();
  
  useFocusEffect(
    React.useCallback(() => {
      onOpenScanner(); // make check
      // wait(2000).then(() =>
      //   onBarcodeScan(
      //     't=20201102T1537&s=370.0&fn=924423&i=12133&fp=322&n=1',
      //     's=370.0&fn=92&i=12133&fp=322&n=1',
      //   ),
      // );

      return () => props.toggleIsScanner(false);
    }, []),
  );

  const onBarcodeScan = (qrvalue) => {
    setQrvalue(qrvalue);
    let dataScan = {};
    funcSeparator(qrvalue, dataScan);
    if (dataScan.t && dataScan.fp && dataScan.fn && dataScan.s && dataScan.i) {
      props.addScanCheckThunk(dataScan);
    } else { alertError() }
    props.toggleIsScanner(false);
  };

  const alertError = () =>
  Alert.alert(
    'НЕ КАССОВЫЙ ЧЕК',
    'QR код не соответствует законодательству РФ. Вы можете повторно отсканировать чек, или ввести его вручную.',
    [
      { text: 'ПОВТОРИТЬ', onPress: () => console.log('Pressed') }
    ],
    { cancelable: true }
  );

  const onOpenScanner = () => {
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Разрешение камеры',
              message: 'Приложению требуется разрешение для доступа к камере',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setQrvalue('');
            props.toggleIsScanner(true);
          } else {
            alert('Нету разрешения на открытие камеры');
          }
        } catch (err) {
          alert('Ошибка разрешения камеры', err);
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    } else {
      setQrvalue('');
      props.toggleIsScanner(true);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
      }}>
      {props.openScanner ? (
        <View style={styles.scanMainContainer}>
          <CameraKitCameraScreen
            showFrame={false}
            // Show/hide scan frame
            scanBarcode={true}
            // Can restrict for the QR Code only
            laserColor={'blue'}
            // Color can be of your choice
            frameColor={'green'}
            // If frame is visible then frame color
            colorForScannerFrame={'black'}
            // Scanner Frame color
            onReadCode={(event) =>
              onBarcodeScan(event.nativeEvent.codeStringValue)
            }
          />
        </View>
      ) : (
        <View style={styles.container}>
          {qrvalue ? (
            <View style={styles.mainMenu}>
              <View style={styles.mainContainer}>
                <Text style={styles.MainText}>Результат сканирования</Text>
                <View style={styles.separatorHr} />
                {props.isFetching ? (
                  <View style={{margin: 10}}>
                    <ActivityIndicator size="large" color="#00ff00" />
                  </View>
                ) : null}
                <Text style={styles.resultText}>{qrvalue}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <Button onPress={onOpenScanner} title="Новое Сканирование" />
              </View>
            </View>
          ) : (
            <Text></Text>
          )}
          <View style={styles.mainMenu}></View>
        </View>
      )}
    </View>
  );
};

let mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {addScanCheckThunk})(ScanCheck);
