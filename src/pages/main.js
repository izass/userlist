import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();

const Main = (props) => {
  const [usersList, setUsersList] = useState([])
  const [count, setCount] = useState(0)

  function showAlert(user) {
    Alert.alert(
      'WARNING!',
      'You really want remove this user?',
      [
        {
          text: 'Cancel',
          onPress: () => { return },
          style: 'cancel'
        },
        { text: 'OK', onPress: () => deleteUser(user.id) }
      ],
      { cancelable: false }
    );
  }

  function deleteUser(id) {
    const filter = usersList.filter(user => user.id != id)
    setUsersList(filter)
  }

  function renderBody() {
    if(usersList.length === 0) {
      return (
        <View style={styles.emptyList}>
          <Text>Você não tem usuários para mostrar...</Text>
        </View>
      )
    }

    return usersList.map(user =>
      <View key={user.id}>
        <TouchableOpacity style={styles.row}>
          <View style={styles.colId}>
            <Text>{user.id}</Text>
          </View>
          <TouchableOpacity style={styles.colEmail} onPress={()=>{props.navigation.navigate("AddUser", { user: user, list: usersList, pushUser: setUsersList })}}>
            <Text>{user.email}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.colActions} onPress={()=>showAlert(user)}>
            <Icon name="delete" size={20} color="#d11a2a"/>
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.hr}/>
      </View>
    )
  }

  return (
    <View style={styles.page}>
      {renderBody()}
      <TouchableOpacity style={styles.plusButton} onPress={()=>{props.navigation.navigate("AddUser", { pushUser: setUsersList, list: usersList, increment: setCount, count: count })}}>
        <Text style={styles.plusIcon}>+</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = {
  page: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: "#fff"
  },

  emptyList: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },

  colId: {
    flex: 0.3,
    alignItems: 'center',
  },

  colEmail: {
    flex: 2,
    paddingLeft:20
  },

  colActions: {
    flex: 0.5,
    alignItems: 'flex-end',
  },

  hr: {
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginVertical: 5
  },

  plusButton: {
    borderRadius: 60,
    backgroundColor: 'green',
    height: 60,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 70,
    right: 30
  },

  plusIcon: {
    color: '#fff',
    fontSize: 30
  }
};

Main.navigationOptions = {
  title: 'Lista de Usuários'
}

export default Main;
