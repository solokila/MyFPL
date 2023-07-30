import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const TuitionStack = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={require('../../../.././media/img/ic_back.png')} />
      </TouchableOpacity>
      <Text style={styles.text}>THÔNG BÁO NHẬN BẰNG TỐT NGHIỆP</Text>
    </View>
  );
};

export default TuitionStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212832',
    paddingTop: 12,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
