import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const MonthMenu = ({ menuOptions, selectedOption, onOptionPress }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuItemPress = (option) => {
    onOptionPress(option);
    setShowMenu(false);
  };

  const renderMenu = () => {
    return (
      <Modal
        visible={showMenu}
        animationType="slide"
        transparent
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
          <View style={styles.menuModalContainer}>
            <View style={styles.menuModal}>
              <FlatList
                data={menuOptions}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.menuOption,
                      selectedOption === item && styles.selectedMenuOption,
                    ]}
                    onPress={() => handleMenuItemPress(item)}
                  >
                    <Text
                      style={[
                        styles.menuOptionText,
                        selectedOption === item && styles.selectedMenuOptionText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                style={styles.flatList}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={() => setShowMenu(true)}>
        <Text style={styles.menuButtonText}>{selectedOption} 2023</Text>
        <Icon name={showMenu ? 'up' : 'down'} size={18} color="#ffffff" />
      </TouchableOpacity>

      {renderMenu()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Center the menu horizontally
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#FED36A',
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
  },
  menuButtonText: {
    color: '#263238',
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 10,
  },
  menuModalContainer: {
    flex: 1,
    justifyContent: 'center', // Center the modal vertically
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 20, // Add some margin for the modal
  },
  menuOption: {
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  menuOptionText: {
    fontSize: 18,
    color: '#263238',
    fontWeight: 'normal',
  },
  selectedMenuOption: {
    backgroundColor: '#FED36A',
  },
  selectedMenuOptionText: {
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  flatList: {
    flexGrow: 0,
    maxHeight: 500,
    // maxWidth: 200,
  },
});

export default MonthMenu;
