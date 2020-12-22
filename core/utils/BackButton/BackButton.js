import React from 'react';
import {Image, Pressable, View, Text, StyleSheet} from 'react-native';
import { colorHeader } from '../../../constants/app_env';

const styles = StyleSheet.create({
  modalBackContainer: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 55,
    backgroundColor: colorHeader,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 3,
  },
  modalBackButton: {
    flex: 1,
    flexDirection: 'column',
  },
  modalTitleContainer: {
    flex: 6,
    flexDirection: 'column',
  },
  modalTitle: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 15,
  },
  modalTitleText: {
    fontSize: 20,
  },
  img: {
    width: 25,
    height: 25,
  },
  marginFix: {
    margin: 15,
  },
});

const BackButton = (props) => {
  return (
    <View style={styles.modalBackContainer}>
      <View style={styles.modalBackButton}>
        <Pressable onPress={() => props._onPress(props.isModal, props.setOpen)}>
          <View style={styles.marginFix}>
            <Image
              style={styles.img}
              source={require('../../../images/back.png')}
            />
          </View>
        </Pressable>
      </View>
      <View style={styles.modalTitleContainer}>
        <View style={styles.modalTitle}>
  <Text style={styles.modalTitleText}>{props.mainText || ''}</Text>
        </View>
      </View>
    </View>
  );
};

export default BackButton;
