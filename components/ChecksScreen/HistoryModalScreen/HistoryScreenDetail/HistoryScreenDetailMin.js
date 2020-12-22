import dayjs from 'dayjs';
import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import { DateTimeTemp } from '../../../../constants/time';
import HistoryEl from '../../HistoryCard/HistoryEl';
import styles from './styles';

const HistoryScreenDetail = (props) => {

  return (
    <View style={styles.modal}>
      {/* Card with Info */}
      <View style={styles.modalScreenDetail}>
        <HistoryEl item={props.item} />
      </View>

      {/* Scroll Info */}
      <View style={styles.modalScroll}>
        <ScrollView>
          {/* 1 Row */}
          <View style={styles.modalScrollInfo}>
            <View style={styles.ModalScrollInfoCol}>
              <View style={styles.ModalScrollInfoColRight}>
                <Text style={[styles.textSecondary, styles.textSecondaryEl]}>
                  {props.item.timestamp ? dayjs(props.item.timestamp).format(DateTimeTemp) : ''}
                </Text>
              </View>
            </View>
          </View>
          {/* 1 Row */}

          <View style={styles.separatorHr} />

          {/* 4 Row */}

          <View style={styles.modalScrollInfoList}>
            <View style={styles.ModalScrollInfoCol}>
              <View style={styles.ModalScrollInfoColLeft}>
                <Text
                  style={[styles.textSecondaryBlack, styles.textSecondaryEl]}>
                  {props.item.fn}
                </Text>
              </View>
              <View style={styles.ModalScrollInfoColLeft}>
                <Text style={styles.textSecondary}>ФН №</Text>
              </View>
            </View>
          </View>

          <View style={styles.modalScrollInfoList}>
            <View style={styles.ModalScrollInfoCol}>
              <View style={styles.ModalScrollInfoColLeft}>
                <Text
                  style={[styles.textSecondaryBlack, styles.textSecondaryEl]}>
                  {props.item.fd}
                </Text>
              </View>
              <View style={styles.ModalScrollInfoColLeft}>
                <Text style={styles.textSecondary}>ФД №</Text>
              </View>
            </View>
          </View>

          <View style={styles.modalScrollInfoList}>
            <View style={styles.ModalScrollInfoCol}>
              <View style={styles.ModalScrollInfoColLeft}>
                <Text
                  style={[styles.textSecondaryBlack, styles.textSecondaryEl]}>
                  {props.item.fp}
                </Text>
              </View>
              <View style={styles.ModalScrollInfoColLeft}>
                <Text style={styles.textSecondary}>ФП №</Text>
              </View>
            </View>
          </View>
          {/* 4 Row */}
          {/* <View style={styles.separatorHr} /> */}
        </ScrollView>
      </View>
    </View>
  );
};
export default HistoryScreenDetail;
