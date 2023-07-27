import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';


function History() {
  //data
  const [data, setData] = useState([
    {
      id: '1',
      semester: 'SUMMER 2023',
      idSubject: 'Mã môn: MOB305',
      class: 'Lớp: MD18101',
      averageMark: 'Điểm trung bình: '+7.8,
      lesson: 'Số buổi: '+17,
      subject: 'CSDL',
      status: 'Passed',
      isCollapse: true,
    },
    {
      id: '2',
      semester: 'SUMMER 2023',
      idSubject: 'Mã môn: MOB305',
      class: 'Lớp: MD18101',
      averageMark: 'Điểm trung bình: '+7.8,
      lesson: 'Số buổi: '+17,
      subject: 'CSDL',
      status: 'Passed',
      isCollapse: true,
    },
    {
      id: '3',
      semester: 'SUMMER 2023',
      idSubject: 'Mã môn: MOB305',
      class: 'Lớp: MD18101',
      averageMark: 'Điểm trung bình: '+7.8,
      lesson: 'Số buổi: '+17,
      subject: 'CSDL',
      status: 'Passed',
      isCollapse: true,
    },
    {
      id: '4',
      semester: 'SUMMER 2023',
      idSubject: 'Mã môn: MOB305',
      class: 'Lớp: MD18101',
      averageMark: 'Điểm trung bình: '+7.8,
      lesson: 'Số buổi: '+17,
      subject: 'CSDL',
      status: 'Passed',
      isCollapse: true,
    },
    {
      id: '5',
      semester: 'SUMMER 2023',
      idSubject: 'Mã môn: MOB305',
      class: 'Lớp: MD18101',
      averageMark: 'Điểm trung bình: '+7.8,
      lesson: 'Số buổi: '+17,
      subject: 'CSDL',
      status: 'Passed',
      isCollapse: true,
    },
    {
      id: '6',
      semester: 'SUMMER 2023',
      idSubject: 'Mã môn: MOB305',
      class: 'Lớp: MD18101',
      averageMark: 'Điểm trung bình: '+7.8,
      lesson: 'Số buổi: '+17,
      subject: 'CSDL',
      status: 'Passed',
      isCollapse: true,
    },
    {
      id: '7',
      semester: 'SUMMER 2023',
      idSubject: 'Mã môn: MOB305',
      class: 'Lớp: MD18101',
      averageMark: 'Điểm trung bình: '+7.8,
      lesson: 'Số buổi: '+17,
      subject: 'CSDL',
      status: 'Passed',
      isCollapse: true,
    },
    {
      id: '8',
      semester: 'SUMMER 2023',
      idSubject: 'Mã môn: MOB305',
      class: 'Lớp: MD18101',
      averageMark: 'Điểm trung bình: '+7.8,
      lesson: 'Số buổi: '+17,
      subject: 'CSDL',
      status: 'Passed',
      isCollapse: true,
    },
  ]);
  const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.item, {}]}>
        <View style={[, { flexDirection: 'row', justifyContent: 'space-between', textAlign: 'center' }]}>
          <Text style={styles.title}>{item.semester}</Text>
          <Text style={styles.title}>{item.subject}</Text>
          <Text style={styles.title}>{item.status}</Text>
        </View>


        <Collapsible collapsed={item.isCollapse}>
          <View style={[{ width: '100%', height: '1', backgroundColor: 'white' }]}></View>
          <View style={[{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }]}>
            <View style={[{}]}>
              <Text style={[{ color: '#FFFFFF', fontSize: 16 }]}>{item.idSubject}</Text>
              <Text style={[{ color: '#FFFFFF', fontSize: 16 }]}>{item.averageMark}</Text>
            </View>
            <View>
              <Text style={[{ color: '#FFFFFF', fontSize: 16 }]}>{item.class}</Text>
              <Text style={[{ color: '#FFFFFF', fontSize: 16 }]}>{item.lesson}</Text>
            </View>
          </View>


        </Collapsible>
      </View>
    </TouchableOpacity>
  );


  const renderItem = ({ item }) => (
    <Item item={item} onPress={() => toggleCollapse(item.id)} />
  );
  const handleItemPress = item => {
    // Xử lý hành động khi một mục được bấm vào
    // console.log('Pressed item:', item.semester);
    item.isCollapse = !item.isCollapse;
  };

  const toggleCollapse = (itemId) => {
    setData((prevData) => {
      return prevData.map((item) => {
        if (item.id === itemId) {
          return { ...item, isCollapse: !item.isCollapse };
        }
        return item;
      });
    });
  };

  return (
    <View style={styles.container}>

      <View style={[styles.item, {flexDirection: 'row', justifyContent:'space-between'}]}>
        <Text style={[styles.title, { fontWeight: 'bold' }]}>Học kỳ</Text>
        <Text style={[styles.title, { fontWeight: 'bold' }]}>Môn</Text>
        <Text style={[styles.title, { fontWeight: 'bold' }]}>Điểm</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212832',
    paddingTop: 16,
  },
  item: {
    backgroundColor: '#455A64',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 5,
    marginTop: 12,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    flexDirection: 'row'
  },
  name: {
    fontSize: 16,
    color: '#B8B8B8',
    marginTop: 6,
  },
  time: {
    fontSize: 16,
    color: '#B8B8B8',
    marginTop: 10,
  },

});

export default History;



