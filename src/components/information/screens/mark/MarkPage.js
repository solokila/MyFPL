import React, { useState } from 'react';
import {
  ScrollView,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Collapsible from 'react-native-collapsible';


function MarkPage() {

  const [data, setData] = useState([
    {
      id: '1',
      term: 'Học kì: ' + 4,
      credit: 'số tín chỉ: ' + 3,
      idSubject: 'Mã môn: MOB401',
      semester: 'Spring 2023',
      subject: 'Xay dung trang web',
      mark: '9',
      status: 'Trạng thái: đang học',
      isCollapse: true,
    },
    {
      id: '2',
      term: 'Học kì: ' + 4,
      credit: 'số tín chỉ: ' + 3,
      idSubject: 'Mã môn: MOB401',
      semester: 'Spring 2023',
      subject: 'Xay dung trang web',
      mark: '8',
      status: 'Trạng thái: đang học',
      isCollapse: true,
    },
    {
      id: '3',
      term: 'Học kì: ' + 4,
      credit: 'số tín chỉ: ' + 3,
      idSubject: 'Mã môn: MOB401',
      semester: 'Spring 2023',
      subject: 'Xay dung trang web',
      mark: '9',
      status: 'Trạng thái: đang học',
      isCollapse: true,
    },
    {
      id: '4',
      term: 'Học kì: ' + 4,
      credit: 'số tín chỉ: ' + 3,
      idSubject: 'Mã môn: MOB401',
      semester: 'Spring 2023',
      subject: 'Xay dung trang web',
      mark: '9',
      status: 'Trạng thái: đang học',
      isCollapse: true,
    },
    {
      id: '5',
      term: 'Học kì: ' + 4,
      credit: 'số tín chỉ: ' + 3,
      idSubject: 'Mã môn: MOB401',
      semester: 'Spring 2023',
      subject: 'Xay dung trang web',
      mark: '9',
      status: 'Trạng thái: đang học',
      isCollapse: true,
    },
    {
      id: '6',
      term: 'Học kì: ' + 4,
      credit: 'số tín chỉ: ' + 3,
      idSubject: 'Mã môn: MOB401',
      semester: 'Spring 2023',
      subject: 'Xay dung trang web',
      mark: '9',
      status: 'Trạng thái: đang học',
      isCollapse: true,
    },
    {
      id: '7',
      term: 'Học kì: ' + 4,
      credit: 'số tín chỉ: ' + 3,
      idSubject: 'Mã môn: MOB401',
      semester: 'Spring 2023',
      subject: 'Xay dung trang web',
      mark: '9',
      status: 'Trạng thái: đang học',
      isCollapse: true,
    },
    {
      id: '8',
      term: 'Học kì: ' + 4,
      credit: 'số tín chỉ: ' + 3,
      idSubject: 'Mã môn: MOB401',
      semester: 'Spring 2023',
      subject: 'Xay dung trang web',
      mark: '9',
      status: 'Trạng thái: đang học',
      isCollapse: true,
    },
  ]);

  const Item = ({ item, onPress }) => (

    <TouchableOpacity onPress={onPress}>
      <View style={[styles.item, {}]}>
        <View style={[, {flexDirection: 'row', justifyContent: 'space-between', textAlign: 'center'}]}>
          <Text style={styles.title}>{item.semester}</Text>
          <Text style={styles.title}>{item.subject}</Text>
          <Text style={styles.title}>{item.mark}</Text>
        </View>
        

        <Collapsible collapsed={item.isCollapse}>
          <View style={[{width: '100%', height:'1', backgroundColor: 'white'}]}></View>
          <View style={[{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10}]}>
          <View style={[{}]}>
              <Text style={[{ color: '#FFFFFF', fontSize: 16 }]}>{item.term}</Text>
              <Text style={[{ color: '#FFFFFF', fontSize: 16 }]}>{item.idSubject}</Text>
            </View>
            <View>
              <Text style={[{ color: '#FFFFFF', fontSize: 16 }]}>{item.credit}</Text>
              <Text style={[{ color: '#FFFFFF', fontSize: 16 }]}>{item.status}</Text>
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

  // info
  return (
    <View style={styles.container} >
      <View style={{}}>
        <Text style={{
          color: '#FFFFFF',
          fontSize: 24,
          lineHeight: 30,
          letterSpacing: 0.5,
          padding: 10
        }}>
          điểm trung bình: 9.18 {'\n'}
          tín chỉ: 27/97 -
          6 miễn giảm
        </Text>

        <Text style={{
          padding: 10,
          fontSize: 30,
          fontWeight: 'bold',
          color: '#fff',
          lineHeight: 34,
          letterSpacing: 0.5
        }}>
          Thống kê
        </Text>

        <View style={[styles.table, { margin: 10 }]}>
          <View style={styles.row}>
            <Text style={[styles.cell, styles.header, { fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF' }]}>Tổng môn chưa học</Text>
            <Text style={[styles.cell, styles.header, { fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF' }]}>Tổng môn đạt</Text>
            <Text style={[styles.cell, styles.header, { fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF' }]}>Tổng môn học lại</Text>
            <Text style={[styles.cell, styles.header, { fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF' }]}>Tổng môn đang học</Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.cell, styles.number]}>22</Text>
            <Text style={[styles.cell, styles.number]}>11</Text>
            <Text style={[styles.cell, styles.number]}>0</Text>
            <Text style={[styles.cell, styles.number]}>0</Text>
          </View>
        </View>

        <View style={[styles.item, {flexDirection: 'row', justifyContent:'space-between'}]}>
          <Text style={[styles.title, { fontWeight: 'bold' }]}>Học kỳ</Text>
          <Text style={[styles.title, { fontWeight: 'bold' }]}>Môn</Text>
          <Text style={[styles.title, { fontWeight: 'bold' }]}>Điểm</Text>
        </View>

      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          scrollEnabled={true}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#212832',
    width: '100%',
    height: '100%',
  },

  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#455A64',
  },
  cell: {
    padding: 10,
    flex: 1,
    color: '#FFFFFF'
  },
  number: {
    textAlign: 'center',
    color: '#FFFFFF'
  },

  item: {
    backgroundColor: '#455A64',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 5,
    marginTop: 12,
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },

});
export default MarkPage;

//data
// Data phai co rieng phan tu de xac dinh Collapsible co collapse hay khong
//khong the chi su dung 1 useState vi no se mo va dong het tat ca cung 1 luc
// thay vao do cho mang data vào useState va dung set de cap nhat gia tri


