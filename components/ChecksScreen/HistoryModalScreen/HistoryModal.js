import React from 'react';
import {Modal, View} from 'react-native';
import BackButton from '../../../core/utils/BackButton/BackButton';
import HistoryScreenDetail from './HistoryScreenDetail/HistoryScreenDetail';

const HistoryModal = (props) => {
  return (
    <Modal
      animationType={'slide'}
      transparent={false}
      visible={props.isModalOpen}
      onRequestClose={() => {
        props._onPress(props.isModalOpen, true);
      }}>
      <View>
        <BackButton _onPress={props._onPress} isModal={props.isModalOpen} setOpen={true} />
      <HistoryScreenDetail
          isModalOpen={props.isModalOpen}
          _onPress={props._onPress}
          item={props.item}
        />
      </View>
    </Modal>
  );
};

export default HistoryModal;
