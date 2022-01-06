import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';
import { sessionThunk } from '../../actions/LoginActions';
import styles from './styles';

const LoginCheckValidationSchema = yup.object().shape({
  inn: yup
    .string()
    .min(12, ({ min }) => `Поле должно содержать ${min} символов`)
    .max(12, ({ max }) => `Поле должно содержать ${max} символов`)
    .required('Заполните поле'),
  password: yup
    .string()
    .min(6, ({ min }) => `Поле должно содержать ${min} символов`)
    .required('Заполните поле')
});

const LoginCheck = (props) => {
  const onSubmitLogin = (credentials) => {
    props.sessionThunk(credentials);
  };

  return (
    <ScrollView style={styles.loginContainer}>
      <Formik
        validationSchema={LoginCheckValidationSchema}
        initialValues={{ inn: '', password: '' }}
        onSubmit={(values, { resetForm }) => {
          onSubmitLogin(values);
          resetForm({ values: '' });
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          touched,
        }) => {

          return (
            <>
              <View>
                {props.isFetching ? (
                  <View style={{ paddingTop: 10 }}>
                    <ActivityIndicator size="large" color="#00ff00" />
                  </View>
                ) : null}
              </View>
              <View>
                <Text style={[styles.mainText, styles.alignCenter]}>
                  Укажите свой ИНН и пароль для входа в Личный кабинет налогоплательщика
                </Text>
                <Text style={[styles.subtitleText, styles.alignCenter]}>
                  Вход
                </Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  name="inn"
                  placeholder="Введите ваш ИНН"
                  style={styles.textInput}
                  onChangeText={handleChange('inn')}
                  onBlur={handleBlur('inn')}
                  value={values.inn}
                  keyboardType="number-pad"
                />
                {errors.inn && touched.inn && (
                  <Text style={styles.errorTouched}>{errors.inn}</Text>
                )}
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  name="password"
                  placeholder="Введите пароль"
                  style={styles.textInput}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <Text style={styles.errorTouched}>{errors.password}</Text>
                )}
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  style={styles.buttonSubmit}
                  onPress={handleSubmit}
                  title="Войти"
                  disabled={!isValid}
                />
              </View>
            </>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

let mapStateToProps = (state) => ({
  isFetching: state.ScanScreen.isFetching,
});

export default connect(mapStateToProps, { sessionThunk })(LoginCheck);
