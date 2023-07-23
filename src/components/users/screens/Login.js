import {
  StyleSheet, Text,
  View, TextInput, Pressable, Image,
  TouchableOpacity, Modal, FlatList,
  TouchableHighlight, ScrollView, KeyboardAvoidingView, Alert, Dimensions
} from 'react-native'
import React, { useState, useContext } from 'react'
import AppLoader from '../../../utils/AppLoader';

const data = [
  { id: '1', name: 'Mục 1111111111' },
  { id: '2', name: 'Mục 2' },
  { id: '3', name: 'Mục 3' },
  { id: '4', name: 'Mục 4' },
  { id: '5', name: 'Mục 5' },
  { id: '6', name: 'Mục 6' },
  { id: '7', name: 'Mục 7' },
  { id: '8', name: 'Mục 8' },
  { id: '9', name: 'Mục 9' },
  // Thêm các mục khác nếu cần
];

const Login = (props) => {

  const { navigation } = props;

  const [isLoading, setIsLoading] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemPress = (item) => {
    setSelectedItem(item);
  };

  return (
    // dung de day man hinh len khi typing (keyboardAvoidingView)
    <>
      <View style={loginstyles.body}>
        {isModalVisible && <View style={loginstyles.overlay} />}
        <View style={loginstyles.logo}>
          <Image
            style={loginstyles.logo_image}
            //resizeMode='contain' de hinh anh khong bi cat
            //cover: hinh anh se bi cat
            resizeMode='contain'
            source={require('../../../media/img/polytechnic.png')}
          />
        </View>
        <View style={loginstyles.background}>
          <Image
            style={loginstyles.background_image}
            //resizeMode='contain' de hinh anh khong bi cat
            resizeMode='contain'
            source={require('../../../media/img/pana.png')}
          />
        </View>

        <TouchableOpacity onPress={() => setModalVisible(true)} style={loginstyles.button}>
          <Text style={loginstyles.buttonText}>Chọn cơ sở đào tạo</Text>
        </TouchableOpacity>

        {/* Dòng "Or continue with" */}
        <View style={loginstyles.orContainer}>
          <View style={loginstyles.line} />
          <Text style={loginstyles.orText}>Or continue with</Text>
          <View style={loginstyles.line} />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('InforNavigation')}>
          <View style={loginstyles.googleButton}>
            <Image source={require('../../../media/img/google.png')} style={loginstyles.buttonLogo} />
            <Text style={loginstyles.googleButtonText}>Google</Text>
          </View>
        </TouchableOpacity>

        {/* Dòng "Don’t have an account? Sign Up" */}
        <View style={loginstyles.signUpContainer}>
          <Text style={loginstyles.accountText}>Don’t have an account?</Text>
          <Text style={loginstyles.signUpText}>Sign Up</Text>
        </View>

        {/*phan modal*/}
        <Modal visible={isModalVisible}
          animationType="fade" //fade: hieu ung mo dan
          transparent //de modal trong suot
        >
          <View style={loginstyles.modalContainer}>
            <TouchableOpacity onPress={() => setModalVisible(false)}
              style={loginstyles.closeButton}>
              <Text style={loginstyles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>

            <FlatList
              data={data}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    loginstyles.listItem,
                    selectedItem?.id === item.id && loginstyles.highlightedItem,
                  ]}
                  onPress={() => handleItemPress(item)}
                >
                  <Text
                    style={[
                      loginstyles.listItemText,
                      selectedItem?.id === item.id && loginstyles.highlightedItemText,
                    ]}
                  >{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </Modal>
        {isLoading ? <AppLoader /> : null}
      </View>
    </>
  )
}

export default Login

const loginstyles = StyleSheet.create({

  // Styles cho phần nền
  body: {
    width: '100%',
    height: '100%',
    // height: Dimensions.get('window').height,
    backgroundColor: '#212832',
    // backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  hello: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
  },
  welcom: {
    fontSize: 20,
    color: '#000',
    marginTop: 10,
  },

  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'gray',
  },
  logo_image: {
    width: 150,
    height: 50,
    // backgroundColor: 'gray',
  },
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    //mau nen sang hon
    backgroundColor: '#fff',
    borderRadius: 10, // Bo tròn góc của ảnh

  },
  background_image: {
    width: 300,
    height: 300,
    // borderRadius: 10, // Bo tròn góc của ảnh
    backgroundColor: 'gray',
  },

  // Styles cho nút bấm thứ nhất
  button: {
    backgroundColor: '#FED36A', // Màu nền của nút
    paddingHorizontal: 20,
    paddingVertical: 12,
    // borderRadius: 5,
    marginTop: 50, // Khoảng cách giữa ảnh và nút

  },
  buttonText: {
    color: '#000000', // Màu chữ của nút
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    width: 320, // Kích thước chiều rộng của modal
    height: 400, // Kích thước chiều cao của modal
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212832', // Màu nền của modal với độ mờ
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: "50%", // Khoảng cách giữa modal và ảnh
  },
  closeButton: {
    backgroundColor: '#FED36A', // Màu nền của nút "Đóng"
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 20, // Khoảng cách giữa danh sách và nút "Đóng"
  },
  closeButtonText: {
    color: '#000000', // Màu chữ của nút "Đóng"
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItem: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: 'gray', // Màu viền của danh sách
  },
  listItemText: {
    fontSize: 18,
    color: '#FF9900', // Màu chữ của danh sách
    marginHorizontal: 50,
  },
  highlightedItem: {
    backgroundColor: '#FED36A', // Màu highlight khi chọn
    borderRadius: 50,
  },
  highlightedItemText: {
    color: '#000000', // Màu chữ của highlight khi chọn
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Mở rộng phần tử để chiếm toàn bộ không gian của màn hình
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền overlay với độ mờ
  },

  // Styles cho dòng "Or continue with"
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20, // Khoảng cách giữa dòng và nút bấm thứ nhất
  },
  orText: {
    fontSize: 16,
    color: '#8CAAB9', // Màu chữ của dòng
    marginHorizontal: 8, // Khoảng cách giữa dòng và các dòng kẻ
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#8CAAB9', // Màu dòng kẻ
  },

  //nut dang nhap
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#212832', // Màu nền của nút
    paddingVertical: 12,
    // borderRadius: 10,
    marginTop: 20, // Khoảng cách giữa nút và hình ảnh quảng cáo
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'white', // Màu viền trắng cho nút
    //mở rộng nút
    width: "100%",
    justifyContent: 'center',
  },
  googleButtonText: {
    color: 'white', // Màu chữ của nút
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonLogo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },

  // Styles cho dòng "Don’t have an account? Sign Up"
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20, // Khoảng cách giữa dòng và nút bấm thứ hai
    alignSelf: 'center',
  },
  accountText: {
    fontSize: 16,
    color: '#8CAAB9', // Màu chữ của dòng
  },
  signUpText: {
    fontSize: 16,
    color: '#FED36A', // Màu chữ của dòng
    fontWeight: 'bold',
    marginLeft: 5, // Khoảng cách giữa 2 dòng chữ
  },
})