import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const HistoryScreenDetailItems = (props) => {
  return (
    <>
      {props.item.items.length ? (
        <View style={styles.modalScrollInfo}>
          <View style={styles.ModalScrollInfoCol}>
            <View style={styles.ModalScrollInfoColLeft}>
              <Text style={[styles.textSecondaryBlack, styles.textSecondaryEl]}>
                {props.item.items[0].name ? props.item.items[0].name : ''}
              </Text>
            </View>
            <View style={[styles.ModalScrollInfoColLeft, styles.marginTopFix]}>
              <Text style={styles.textSecondary}>
                {props.item.items[0].price ? props.item.items[0].price + "₽ X 1" : ''}
              </Text>
            </View>
          </View>
          <View style={styles.ModalScrollInfoCol}>
            <View style={styles.ModalScrollInfoColRight}>
              <Text
                style={[styles.textSecondarySumEl, styles.textSecondaryBlack]}>
                {props.item.items[0].sum ? props.item.items[0].sum + "₽" : ''}
              </Text>
            </View>
            <View style={styles.ModalScrollInfoColRight}>{/* clear */}</View>
          </View>
        </View>
      ) : null}
    </>
  );
};

export default HistoryScreenDetailItems;
