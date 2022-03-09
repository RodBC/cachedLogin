import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import logo from '../assets';
import { NavigationContainer } from '@react-navigation/native';
/*

  ------------------------TO-DO-----------------------------------
  dentro da página lista:
  ->> o primeiro item deve vir como selecionado dentro da pagina Lista
  ->> item selecionado deve alterar o estado do Redux
  ->> Deletar item? (fazer um slice do array, passando o index do item
    que retornou do Cache GetItem() e depois fazer update do cache com o novo
    array sem o item deletado)
  
-------------------------------------------------------------------------
*/
export const Register = ( { navigation } ) => {

  
  const [nameUrl, setNameUrl] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [baseImageUrl, setBaseImageUrl] = useState('');
  



  async function handleAsyncStorage() {
    //armazenar valor no cache
    let newUrlEntrie = {
      nome: nameUrl,
      baseUrl: baseUrl,
      baseImage: baseImageUrl,
    }

    let validInput = true
    Object.values(newUrlEntrie).map((value) =>{
      if (value == ""){
        validInput = false
      }
    })
    
    await AsyncStorage.getItem('@Settings').then(data => {
      if (data !== null && validInput && data !== 'fistState') {
        const settingsArray = JSON.parse(data);
        settingsArray.push(newUrlEntrie);
        AsyncStorage.setItem('@Settings', JSON.stringify(settingsArray))
        .then(() => {
          alert('servidor registrado com sucesso!')
        })
        .then(() => {
          navigation.navigate('ViewServers')
        });

        // ->> fazer um .then(), passando msg quando adicionado com sucesso e
        // depois outro pra navegar pra outra pagina(login).

      } else {
        alert('epa, nao pode haver input vazio!')
        const settingsArray = [];
      }
    })
    .then(() => getSettings()) //opcional, pois apenas retorna console do get()

  }

  // ->> fazer um .then(), passando msg quando adicionado com sucesso e
  // depois outro pra navegar pra outra pagina(login).

  const getSettings = async () => {
    try {
      const getSettings = await AsyncStorage.getItem('@Settings');
      console.log(JSON.parse(getSettings), 'atualizado');
      // if (getSettings !== null) {
      //   // let parsedSettings = JSON.parse(getSettings);
      //   console.log(getSettings, '<----')
      // return getSettings
      // }
    } catch (e) {
      console.log(`erro ao setar as settings previas ${e}`);
    }
  };

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === 'ios'}
      behavior="padding"
      style={styles.container}>
      <View>
        <View style={styles.form}>
          <Text style={styles.label}>Nome do Servidor *</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do Servidor"
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
            value={nameUrl}
            onChangeText={e => setNameUrl(e)}
          />
          <Text style={styles.label}>Sua URL *</Text>
          <TextInput
            style={styles.input}
            placeholder="Sua URL"
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
            value={baseUrl}
            onChangeText={e => setBaseUrl(e)}
          />
          <Text style={styles.label}>Sua ImagemURL *</Text>
          <TextInput
            style={styles.input}
            placeholder="URL da sua Imagem"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={baseImageUrl}
            onChangeText={e => setBaseImageUrl(e)}
          />
          <TouchableOpacity
            onPress={() => handleAsyncStorage()}
            style={styles.button}>
            <Text style={styles.buttonText}>Salvar Credenciais</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },

  button: {
    height: 42,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
