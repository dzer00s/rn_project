import React from 'react';
import { View, StyleSheet } from 'react-native';
import BackButton from '../../../core/utils/BackButton/BackButton';
import InputCheck from './InputCheck';

const styles = StyleSheet.create({
});

const InputCheckMain = (props) => {
  return (
    <View>
      <BackButton _onPress={props.toggleIsModalInput} isModal={props.InputCheckIsModalOpen} setOpen={true} mainText="Ввод чека вручную" />
      <InputCheck/>
    </View>
  );
};

export default InputCheckMain;
