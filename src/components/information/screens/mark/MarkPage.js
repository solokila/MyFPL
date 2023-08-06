import React, { useState, useEffect } from 'react';
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

//service
import { getAllTranscripts, getAllSubjects } from '../../DataService';


function MarkPage() {

  //lấy danh sách môn học
  const [subjects, setSubjects] = useState([]);



  // tìm tên môn học theo id
  const findSubject = (id) => {
    const subject = subjects.find((item) => {
      return item._id === id;
    });
    // console.log('subject:', subject);
    return subject;
  };

  useEffect(() => {
    getData();
  }, []); //get data when first render


  //data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //filter data
  const [markAvegrage, setMarkAverage] = useState(0);
  const [creditTotal, setCreditTotal] = useState(0);
  const [exemptTotal, setExemptTotal] = useState(0);
  //tổng số môn đang học
  const [studyingSubjectsTotal, setStudyingSubjectsTotal] = useState(0);
  //tổng số môn đậu
  const [passSubjectsTotal, setPassSubjectsTotal] = useState(0);
  //tổng số môn rớt
  const [failSubjectsTotal, setFailSubjectsTotal] = useState(0);

  //filter data
  const filterData = (data) => {
    setFailSubjectsTotal(0);
    setPassSubjectsTotal(0);
    setStudyingSubjectsTotal(0);
    data.forEach((item) => {
      if (item.status === 1) {
        setStudyingSubjectsTotal((prev) => prev + 1);
      } else if (item.status === 2) {
        if (item.mark >= 5) {
          setPassSubjectsTotal((prev) => prev + 1);
        } else {
          setFailSubjectsTotal((prev) => prev + 1);
        }
      }
    });
  };

  // lấy điểm trung bình
  const getMarkAverage = () => {
    let sum = 0;
    let count = 0;
    data.forEach((item) => {
      sum += item.mark;
      count += 1;
    });
    setMarkAverage((sum / count).toFixed(2));
  };

  // lấy tổng số tín chỉ
  const getCreditTotal = () => {
    let sum = 0;
    data.forEach((item) => {
      if (item.mark >= 5) {
        sum += findSubject(item.subject_id)?.credit;
      }
    });
    setCreditTotal(sum);
  };

  // lấy tổng số tín chỉ được miễn
  const getExemptTotal = () => {
    let sum = 0;
    data.forEach((item) => {
      if (item.status === 2) {
        sum += findSubject(item.subject_id)?.credit;
      }
    });
    setExemptTotal(sum);
  };




  //get data
  const getData = async () => {
    //lay danh sach diem
    const response = await getAllTranscripts();
    // console.log('response:', response);
    if (response?.status === 200) {
      setData(response?.data);
      filterData(response?.data);
      getMarkAverage();
      getCreditTotal();
      getExemptTotal();
      setLoading(false);
    };
    //lay danh sach mon hoc
    const response2 = await getAllSubjects();
    if (response2?.status === 200) {
      setSubjects(response2?.data);
    }
  };

  // State để theo dõi mục đang được mở rộng
  const [expandedItem, setExpandedItem] = useState(null);



  const renderItem = ({ item }) => {
    const isExpanded = expandedItem === item._id;
    return (
      <TouchableOpacity onPress={() => handleItemPress(item._id)}>
        <View style={styles.item}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', textAlign: 'center' }}>
            <View style={styles.leftColumn}>
              <Text style={styles.title}>{item.term}</Text>
            </View>
            <View style={styles.middleColumn}>
              <Text style={styles.title}>{findSubject(item.subject_id)?.idSubject}</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.title}>{item.mark}</Text>
            </View>

          </View>


          <Collapsible collapsed={!isExpanded}>
            <View style={[{ width: '100%', height: '1', backgroundColor: 'white' }]}></View>
            <View style={[{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }]}>
              <View style={[{
                width:"50%",
                paddingRight: 10,
                // marginRight: 10,
                }]}>
                <Text style={[{ color: '#FFFFFF', fontSize: 16, lineHeight:30 }]}>Kỳ: {item.term}</Text>
                <Text numberOfLines={1} style={[{ color: '#FFFFFF', fontSize: 16,lineHeight:30  }]}>Môn: {findSubject(item.subject_id)?.name}</Text>
              </View>
              <View style={[{
                width:"25%",
                paddingRight: 10,
                paddingLeft: 10,
              }]} >
                <Text style={[{ color: '#FFFFFF', fontSize: 16, lineHeight:30 }]}>Tín chỉ: {findSubject(item.subject_id)?.credit}</Text>
                <Text style={[{ color: '#FFFFFF', fontSize: 16, lineHeight:30 }]}>{item.mark > 5 ? "passed" : "fail"}</Text>
              </View>
              <View  style={[{
                width:"25%",
                paddingLeft: 10,
            }]} >
                <Text style={[{ color: '#FFFFFF', fontSize: 16 , lineHeight:30}]}>{item.status === 1 ? "Đang học" : "Kết thúc"}</Text>
              </View>
            </View>
          </Collapsible>
        </View>

      </TouchableOpacity>
    );
  };

  const handleItemPress = (itemID) => {
    // Xử lý hành động khi một mục được bấm vào đây
    // console.log('Pressed item:', itemID);
    setExpandedItem((prevExpandedItem) => (prevExpandedItem === itemID ? null : itemID))
  };


  return (
    <View style={styles.container} >
      <View style={{}}>
        <Text style={{
          color: '#FFFFFF',
          fontSize: 20,
          lineHeight: 30,
          letterSpacing: 0.5,
          padding: 10,

        }}>
          Điểm trung bình: {markAvegrage ? markAvegrage : "..."} {'\n'}
          Tín chỉ: {creditTotal ? creditTotal : "..."}/97{'\n'}
          Miễn giảm: 0
        </Text>

        <Text style={{
          padding: 10,
          fontSize: 30,
          fontWeight: 'bold',
          color: '#fff',
          lineHeight: 30,
          letterSpacing: 0.5,
          textAlign: 'center',
        }}>
          Thống kê
        </Text>

        <View style={[styles.table, { margin: 10 }]}>
          <View style={styles.row}>
            <Text style={[styles.cell, styles.header, { fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF', fontSize: 16 }]}>Tổng môn chưa học</Text>
            <Text style={[styles.cell, styles.header, { fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF', fontSize: 16 }]}>Tổng môn đạt</Text>
            <Text style={[styles.cell, styles.header, { fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF', fontSize: 16 }]}>Tổng môn học lại</Text>
            <Text style={[styles.cell, styles.header, { fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF', fontSize: 16 }]}>Tổng môn đang học</Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.cell, styles.number, { fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF', fontSize: 16 }]}>22</Text>
            <Text style={[styles.cell, styles.number, { fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF', fontSize: 16 }]}>{passSubjectsTotal}</Text>
            <Text style={[styles.cell, styles.number, { fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF', fontSize: 16 }]}>{failSubjectsTotal}</Text>
            <Text style={[styles.cell, styles.number, { fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF', fontSize: 16 }]}>{studyingSubjectsTotal}</Text>
          </View>
        </View>

        <View style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: '#FED36A',
          }, styles.itemTitle]}>
          <View style={styles.leftColumn}>
            <Text style={[styles.title, { fontWeight: 'bold', fontSize: 17 }]}>Học kỳ</Text>
          </View>
          <View style={styles.middleColumn}>
            <Text style={[styles.title, { fontWeight: 'bold', fontSize: 17 }]}>Mã Môn</Text>
          </View>
          <View style={styles.rightColumn}>
            <Text style={[styles.title, { fontWeight: 'bold', fontSize: 17 }]}>Điểm</Text>
          </View>

        </View>

      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          scrollEnabled={true}
          data={data}
          renderItem={renderItem}
          refreshing={loading}
          onRefresh={getData}
          keyExtractor={item => item._id}
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
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 5,
    marginTop: 12,
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  itemTitle: {
    backgroundColor: '#455A64',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    // borderRadius: 10,
    elevation: 5,
    marginTop: 12,
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  leftColumn: {
    width: "50%",
    // backgroundColor: 'red',
    alignItems: 'left',
    justifyContent: 'center',
    marginRight: 10,
  },
  middleColumn: {
    width: "25%",
    // backgroundColor: 'blue',
    alignItems: 'right',
    justifyContent: 'center',
  },
  rightColumn: {
    width: "25%",
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
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


