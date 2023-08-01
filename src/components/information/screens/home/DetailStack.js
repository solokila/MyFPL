import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
// import {useNavigation} from '@react-navigation/native';

const Detail = (props) => {
  const {navigation, route} = props;
  const {data} = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={require('../../../.././media/img/ic_back.png')} />
      </TouchableOpacity>
      <Text style={styles.text}>{data.title}</Text>
      <Text style={styles.textContent}>{data.content}</Text>
      <Text style={styles.textAuthor}>{data.author}</Text>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212832',
    padding: 20,
    width: '100%',
    height: '100%',
  },
  text: {
    color: '#FF9900',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  textContent: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 10,
  },
  textAuthor: {
    color: '#BCCFD8',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'right',
  },

});
