import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert
} from 'react-native';

const AddUser = (props) => {
  const [user, setUser] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    if(props.navigation.state.params.user) {
      setUser(props.navigation.state.params.user)
    } else {
      setUser({ name: '', email: '', password: '' })
    }
  }, []);

  function saveUser() {
    const { email, password, id } = user
    const { list, pushUser, increment, count } = props.navigation.state.params

    // email and password are required
    if(!email || !password) {
      setErrors("field is required")
      return
    }

    // if already had a id means that user exists and is being edited
    if (id) {
      const filter = list.filter(user => user.id != id)
      pushUser([user, ...filter])
      props.navigation.navigate("Main")
      return
    }

    // in case is being a new user, don't allow create if there's a equal email on the list
    const hasUser =  list.find(item => item.email === user.email)

    if (hasUser) {
      Alert.alert(
        'WARNING!',
        'Already exist a user with this email',
        [
          { text: 'OK', onPress: () => { return }}
        ],
        { cancelable: false }
      );
      return
    }

    // when create a new user, generate a id
    const newUser = {...user, id: count}
    pushUser([...list, newUser])
    increment(count+1)
    setUser({ name: '', email: '', password: '' })
    props.navigation.navigate("Main")
  }

  return (
    <View style={styles.page}>
      <Text style={styles.title}>{user.id || user.id === 0 ? 'Editar usuário' : 'Adicionar novo usuário'}</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        name="email"
        value={user.email}
        autoCapitalize="none"
        onChangeText={text => setUser({ ...user, email: text })}
      />
      {errors ? <Text style={styles.errorMessage}>{errors}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="nome"
        name="name"
        value={user.name}
        autoCapitalize="words"
        onChangeText={text => setUser({ ...user, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="senha"
        name="password"
        value={user.password}
        secureTextEntry
        onChangeText={text => setUser({ ...user, password: text })}
      />
      {errors ? <Text style={styles.errorMessage}>{errors}</Text> : null}
      <View style={styles.addButton}>
        <Button title="Salvar" onPress={()=>saveUser()}/>
      </View>
    </View>
  );
};

const styles = {
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: '10%'
  },

  title: {
    fontSize: 20,
    paddingBottom: 20
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: "100%",
    marginBottom: 10
  },

  errorMessage: {
    alignSelf: 'flex-start',
    color: '#d11a2a'
  },

  addButton: {
    width: "100%",
    height: 50
  }
};

AddUser.navigationOptions = {
  title: 'Usuário'
}

export default AddUser;
