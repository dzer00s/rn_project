import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const HistoryScreenDetailItem = (props) => {
  return (
      <View style={styles.modalScrollInfo}>
          <View style={styles.ModalScrollInfoCol}>
            <View style={styles.ModalScrollInfoColLeft}>
              <Text style={[styles.textSecondaryBlack, styles.textSecondaryEl]}>
              {props.item.name ? props.item.name : ""}                
              </Text>
            </View>
            <View style={[styles.ModalScrollInfoColLeft, styles.marginTopFix]}>
              <Text style={styles.textSecondary}>
                {props.item.price ? props.item.price + " ₽ X 1" : ''}          
              </Text>
            </View>
          </View>
          <View style={styles.ModalScrollInfoCol}>
            <View style={styles.ModalScrollInfoColRight}>
              <Text
                style={[styles.textSecondarySumEl, styles.textSecondaryBlack]}>
                {props.item.sum ? props.item.sum + " ₽" : ''}
              </Text>
            </View>
            <View style={styles.ModalScrollInfoColRight}>{/* clear */}</View>
          </View>
        </View>
  );
};

export default HistoryScreenDetailItem;
