import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Picker, Button } from 'react-native';

const PokemonApp = () => {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [limit, setLimit] = useState(10);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemons(data.results);
        setFilteredPokemons(data.results);
      })
      .catch((error) => console.error(error));

    fetch('https://pokeapi.co/api/v2/type')
      .then((response) => response.json())
      .then((data) => setTypes(data.results))
      .catch((error) => console.error(error));
  }, [limit]);

  const filterPokemonsByType = () => {
    if (selectedType === '') {
      setFilteredPokemons(pokemons);
    } else {
      fetch(`https://pokeapi.co/api/v2/type/${selectedType}`)
        .then((response) => response.json())
        .then((data) => {
          const filtered = pokemons.filter((pokemon) =>
            data.pokemon.some((p) => p.pokemon.name === pokemon.name)
          );
          setFilteredPokemons(filtered);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Pokémons</Text>

      <Picker
        selectedValue={selectedType}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedType(itemValue)}
      >
        <Picker.Item label="Todos os Tipos" value="" />
        {types.map((type) => (
          <Picker.Item key={type.name} label={type.name} value={type.name} />
        ))}
      </Picker>

      <Button title="Filtrar" onPress={filterPokemonsByType} />

      <FlatList
        data={filteredPokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />

      <View style={styles.buttonContainer}>
        <Button title="Mostrar Mais" onPress={() => setLimit((prev) => prev + 10)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default PokemonApp;
