import dayjs from 'dayjs';
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { TimeTemp } from '../../../constants/time';
import { statusApp, statusAppColor } from '../../../constants/status';
import styles from './styles'
import { thousands } from '../../../constants/app_env';

const HistoryEl = (props) => {

  return (
    <View style={styles.ElContainerMain}>
      <View style={styles.ElContainer}>
        <View style={styles.RowSeparatorEl}>
          <View style={styles.TopLeftEl}>
            <Image
              style={styles.img}
              source={require('../../../images/shopping-cart.png')}
            />
          </View>
          <View style={styles.TopMiddleEl}>
            <Text style={styles.textSecondaryEl}>
              {props.item.retail_name ? props.item.retail_name : 'В ожидании'}
            </Text>
          </View>
          {/* <View style={styles.TopRightEl}>
                      <Text>Right</Text>
                    </View> */}
        </View>

        <View style={styles.RowSeparatorEl}>
          <View style={styles.BottomEl}>
            <Text style={styles.textSecondary}>Сумма</Text>
            <Text style={styles.textSecondarySumEl}>{thousands(props.item.sum)} ₽</Text>
          </View>
          <View style={styles.BottomEl}>
            <Text style={styles.textSecondary}>Дата</Text>
            <Text style={styles.textSecondaryEl}>{dayjs(props.item.timestamp).format(TimeTemp)}</Text>
          </View>
          <View style={styles.BottomElStatus}>
            <Text style={styles.textSecondary}>Статус</Text>
            <Text style={{color: statusAppColor[props.item.status_app] || statusAppColor.default, fontSize: 16}}>
              {statusApp[props.item.status_app] || statusApp.default}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default HistoryEl;
