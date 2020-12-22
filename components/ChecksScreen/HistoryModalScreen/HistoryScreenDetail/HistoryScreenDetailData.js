import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const HistoryScreenDetailData = (props) => {
  return (
    <>
      {props.item.kkt ? (
        <View style={styles.modalScrollInfoList}>
          <View style={styles.ModalScrollInfoCol}>
            <View style={styles.ModalScrollInfoColLeft}>
              <Text style={[styles.textSecondaryBlack, styles.textSecondaryEl]}>
                {props.item.kkt}
              </Text>
            </View>
            <View style={styles.ModalScrollInfoColLeft}>
              <Text style={styles.textSecondary}>Рег.номер ККТ</Text>
            </View>
          </View>
        </View>
      ) : null}
      {props.item.fn ? (
        <View style={styles.modalScrollInfoList}>
          <View style={styles.ModalScrollInfoCol}>
            <View style={styles.ModalScrollInfoColLeft}>
              <Text style={[styles.textSecondaryBlack, styles.textSecondaryEl]}>
                {props.item.fn}
              </Text>
            </View>
            <View style={styles.ModalScrollInfoColLeft}>
              <Text style={styles.textSecondary}>ФН №</Text>
            </View>
          </View>
        </View>
      ) : null}
      {props.item.fd ? (
        <View style={styles.modalScrollInfoList}>
          <View style={styles.ModalScrollInfoCol}>
            <View style={styles.ModalScrollInfoColLeft}>
              <Text style={[styles.textSecondaryBlack, styles.textSecondaryEl]}>
                {props.item.fd}
              </Text>
            </View>
            <View style={styles.ModalScrollInfoColLeft}>
              <Text style={styles.textSecondary}>ФД №</Text>
            </View>
          </View>
        </View>
      ) : null}
      {props.item.fp ? (
        <View style={styles.modalScrollInfoList}>
          <View style={styles.ModalScrollInfoCol}>
            <View style={styles.ModalScrollInfoColLeft}>
              <Text style={[styles.textSecondaryBlack, styles.textSecondaryEl]}>
                {props.item.fp}
              </Text>
            </View>
            <View style={styles.ModalScrollInfoColLeft}>
              <Text style={styles.textSecondary}>ФП №</Text>
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
};

export default HistoryScreenDetailData;
