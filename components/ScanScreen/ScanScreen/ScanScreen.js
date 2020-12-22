import React, {useState} from 'react';
import {Image, Modal, Pressable, Text, View} from 'react-native';
import {connect} from 'react-redux';
import ScanCheck from '../ScanCheck/ScanCheck';
import {toggleIsModalInput, toggleIsScanner} from '../../../redux/Actions/InputActions';
import styles from './styles';
import InputCheckMain from '../InputCheck/InputCheckMain';

const ScanScreen = (props) => {

  const _onOpenModal = (InputCheckIsModalOpen, openScanner) => (
    props.toggleIsModalInput(InputCheckIsModalOpen),
    props.toggleIsScanner(openScanner),
    console.log(openScanner)
    // console.log(InputCheckIsModalOpen)
  );

  return (
    <View style={styles.containerMain}>
      {/* HEADER */}
      <View style={styles.containerTop}>
        <View style={styles.containerTopBox}>
          <Text style={styles.containerTopText}>Сканер</Text>
          <Text style={styles.containerTopTextSecond}>
            Наведите на qr-code для действия
          </Text>
        </View>
      </View>

      {/* SCAN */}
      <View style={styles.containerMiddle}>
          <ScanCheck toggleIsScanner={props.toggleIsScanner} openScanner={props.openScanner} isFetching={props.isFetching} />
      </View>

      {/* INPUT */}
      <View style={styles.containerBottom}>
        <View style={styles.containerBottomBox}>
          <View style={styles.BottomLeft}>
            <Pressable
              onPress={() => _onOpenModal(props.InputCheckIsModalOpen, false)}>
              <View>
                <Text style={styles.containerBottomText}>Ввести вручную</Text>

                <Text style={styles.containerTopTextSecond}>
                  Нажмите для открытия ручного ввода
                </Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.BottomRight}>
            <Image
              style={styles.img}
              source={require('../../../images/data.png')}
            />
          </View>
        </View>
      </View>

      <Modal
        animationType={'slide'}
        transparent={false}
        visible={props.InputCheckIsModalOpen}
        onRequestClose={() => {
          _onOpenModal(props.InputCheckIsModalOpen, true);
        }}>
        <View>
          <InputCheckMain
            toggleIsModalInput={_onOpenModal}
            InputCheckIsModalOpen={props.InputCheckIsModalOpen}
          />
        </View>
      </Modal>

      {/* </View> */}
    </View>
  );
};

let mapStateToProps = (state) => ({
  InputCheckIsModalOpen: state.InputScreen.InputCheckIsModalOpen,
  openScanner: state.InputScreen.openScanner,
  isFetching: state.InputScreen.isFetching,
});

export default connect(mapStateToProps, {toggleIsModalInput, toggleIsScanner })(ScanScreen);
