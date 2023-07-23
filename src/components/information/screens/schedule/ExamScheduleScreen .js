import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback } from 'react-native';

const ExamScreen = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('1 next day'); // Default selection
  const [examData, setExamData] = useState(DATA);

  const [selectedItem, setSelectedItem] = useState(null);

  const menuOptions = ['1 next day', '7 next days', '30 next days', '2 months next days', '3 months next days'];

//text cho menu
const [text, setText] = useState('1 next day');

  const handleMenuItemPress = (option) => {
    setSelectedMenuItem(option);
    setShowMenu(false);
    // Fetch new data based on the selected option here if required
    // For simplicity, we're using dummy data.
    setText(option);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => setSelectedItem(item)}>
        <Text style={styles.itemText}>Ngày: {item.date}</Text>
        <Text style={styles.itemText}>Ca: {item.Shift}</Text>
        <Text style={styles.itemText}>Phòng thi: {item.RoomNumber}</Text>
      </TouchableOpacity>
    );
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  const renderMoreInfoPopup = () => {
    if (!selectedItem) return null;

    return (
      <TouchableWithoutFeedback onPress={closePopup}>
        <Modal visible={true} animationType="slide" transparent>
          <View style={styles.popupContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.popup}>
                <Text style={styles.popupTitle}>Lịch thi chi tiết</Text>
                <View style={styles.popupRow}>
                  <Text style={styles.popupLabel}>Ngày:</Text>
                  <Text style={styles.popupValue}>{selectedItem.date}</Text>
                </View>
                <View style={styles.popupRow}>
                  <Text style={styles.popupLabel}>Ca:</Text>
                  <Text style={styles.popupValue}>{selectedItem.Shift}</Text>
                </View>
                <View style={styles.popupRow}>
                  <Text style={styles.popupLabel}>Phòng thi:</Text>
                  <Text style={styles.popupValue}>{selectedItem.RoomNumber}</Text>
                </View>
                <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
                  <Text style={styles.closeButtonText}>Đóng</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={() => setShowMenu(!showMenu)}>
        <Text style = {styles.menuText}>{text}</Text>
      </TouchableOpacity>

      <Modal visible={showMenu} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
          <View style={styles.menuModal}>
            {menuOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.menuOption}
                onPress={() => handleMenuItemPress(option)}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <FlatList
        data={examData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
        //bỏ thanh cuộn
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />

      {renderMoreInfoPopup()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#212832',
  },
  menuButton: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#455A64',
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#FED36A',
    borderWidth: 2,
  },
  menuText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuModal: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 50,
  },
  menuOption: {
    paddingVertical: 5,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    backgroundColor: '#455A64',
    borderRadius: 10,
    elevation: 3,
    padding: 10,
    marginBottom: 10,
  },
  itemText: {
    color: '#FFFFFF',
    // fontWeight: 'bold',
    fontSize: 14,
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: '#FED36A',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    maxWidth: '80%',
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
    color: '#000000',
  },
  popupRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  popupLabel: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#000000',
  },
  popupValue: {
    flex: 1,
    color: '#000000',
  },
  closeButton: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
  },
  closeButtonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default ExamScreen;

const DATA =
[{"id":1,"RoomNumber":"967","date":"10/18/2022","Shift":"11:34 AM"},
{"id":2,"RoomNumber":"48","date":"12/4/2022","Shift":"1:14 AM"},
{"id":3,"RoomNumber":"82","date":"4/17/2023","Shift":"9:20 PM"},
{"id":4,"RoomNumber":"4260","date":"9/1/2022","Shift":"8:49 AM"},
{"id":5,"RoomNumber":"692","date":"1/4/2023","Shift":"6:39 PM"},
{"id":6,"RoomNumber":"1194","date":"8/1/2022","Shift":"5:26 PM"},
{"id":7,"RoomNumber":null,"date":"10/10/2022","Shift":"5:07 AM"},
{"id":8,"RoomNumber":"544","date":"11/29/2022","Shift":"1:49 AM"},
{"id":9,"RoomNumber":"4776","date":"9/13/2022","Shift":"6:35 AM"},
{"id":10,"RoomNumber":"545","date":"3/24/2023","Shift":"7:54 AM"},
{"id":11,"RoomNumber":"261","date":"7/4/2023","Shift":"12:43 AM"}]

