import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import dayjs from 'dayjs';
import {DateTimeTemp} from '../../../../constants/time';

const HistoryScreenDetailInfo = (props) => {
  return (
    <View style={styles.modalScrollInfo}>
      <View style={styles.ModalScrollInfoCol}>
        {props.item.inn ? (
          <View style={[styles.ModalScrollInfoColLeft, styles.marginBottomFix]}>
            <Text style={[styles.textSecondary, styles.textSecondaryEl]}>
              ИНН {props.item.inn ? props.item.inn : ''}
            </Text>
          </View>
        ) : null}
        {props.item.retail_address ? (
          <View style={styles.ModalScrollInfoColLeft}>
            <Text style={styles.textSecondaryBlack}>
              {props.item.retail_address}
            </Text>
          </View>
        ) : null}
      </View>
      <View style={styles.ModalScrollInfoCol}>
        <View style={styles.ModalScrollInfoColRight}>
          <Text style={[styles.textSecondary, styles.textSecondaryEl]}>
            {props.item.timestamp
              ? dayjs(props.item.timestamp).format(DateTimeTemp)
              : ''}
          </Text>
        </View>
        {props.item.retail_name ? (
          <View style={styles.ModalScrollInfoColRight}>
            <Text style={styles.textSecondaryBlack}>
              {props.item.retail_name}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default HistoryScreenDetailInfo;
