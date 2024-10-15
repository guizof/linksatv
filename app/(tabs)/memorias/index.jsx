import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {SafeAreaView,StyleSheet,View,TextInput,Button,FlatList,Image,Text,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const Stack = createStackNavigator();

const App = () => {
  const [memories, setMemories] = useState([]);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const loadMemories = async () => {
    try {
      const storedMemories = await AsyncStorage.getItem('memories');
      if (storedMemories) {
        setMemories(JSON.parse(storedMemories));
      }
    } catch (error) {
      console.error('Failed to load memories:', error);
    }
  };

  const saveMemories = async (newMemories) => {
    try {
      await AsyncStorage.setItem('memories', JSON.stringify(newMemories));
    } catch (error) {
      console.error('Failed to save memories:', error);
    }
  };

  const addMemory = () => {
    if (text && image) {
      const newMemory = { text, image };
      const updatedMemories = [...memories, newMemory];
      setMemories(updatedMemories);
      saveMemories(updatedMemories);
      setText('');
      setImage(null);
    }
  };

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    loadMemories();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.memoryListContainer}>
        <FlatList
          data={memories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.memoryItem}>
              <Text>{item.text}</Text>
              {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
            </View>
          )}
        />
        <Button title="Adicionar Memória" onPress={addMemory} />
      </View>
      <View style={styles.memoryFormContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua memória"
          value={text}
          onChangeText={setText}
        />
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <Button title="Selecionar Imagem" onPress={selectImage} />
        <Button title="Tirar Foto" onPress={takePhoto} />
        <Button title="Adicionar Memória" onPress={addMemory} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memoryListContainer: {
    flex: 1,
    padding: 20,
  },
  memoryItem: {
    marginBottom: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  memoryFormContainer: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default App;
