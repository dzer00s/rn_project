import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const HistoryScreenDetailTotal = (props) => {
  return (
    <>
      {props.item.items.length ? (
        <View style={styles.modalScrollInfo}>
          <View style={styles.ModalScrollInfoCol}>
            <View style={styles.ModalScrollInfoColLeft}>
              <Text
                style={[styles.textSecondaryBlack, styles.textSecondarySumEl]}>
                {props.item.items[0].sum ? "Итого" : ''}
              </Text>
            </View>
            <View style={styles.ModalScrollInfoColLeft}>{/* clear */}</View>
          </View>
          <View style={styles.ModalScrollInfoCol}>
            <View style={styles.ModalScrollInfoColRight}>
              <Text
                style={[styles.textSecondarySumEl, styles.textSecondaryBlack]}>
                {props.item.items[0].sum ? props.item.items[0].sum + '₽' : ''}
              </Text>
            </View>
            <View style={styles.ModalScrollInfoColRight}>{/* clear */}</View>
          </View>
        </View>
      ) : null}
    </>
  );
};

export default HistoryScreenDetailTotal;
