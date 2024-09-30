import React, { useState, useContext, useEffect, createContext } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, FlatList } from 'react-native';
import Header from '../components/header';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

  return (
    <AppContext.Provider value={{ carrinho, setCarrinho }}>
      {children}
    </AppContext.Provider>
  );
};

const Item = ({ nome, local, preco }) => (
  <View style={styles.item}>
    <View>
      <Text style={styles.info}>{nome}</Text>
      <Text style={styles.info}>{local}</Text>
      <Text style={styles.preco}>R$ {preco}</Text>
    </View>
  </View>
);

const App = () => {
  const { carrinho, setCarrinho } = useContext(AppContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    setTotal(total.toFixed(2));
  }, [carrinho]);

  const excluir = (index) => {
    const novoCarrinho = carrinho.filter((_, i) => i !== index);
    setCarrinho(novoCarrinho);
  };

  return (
    <ScrollView style={styles.container}>
      <Header link='../' header='Seu carrinho' />
      <View style={styles.list}>
        <FlatList
          data={carrinho}
          renderItem={({ item, index }) => (
            <View style={styles.content}>
              <Item {...item} />
              <Pressable onPress={() => excluir(index)} style={styles.removeBtn}>
                <Text style={styles.removeTxt}>X</Text>
              </Pressable>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.final}>
        <Text style={styles.total}>Total: R$ {total}</Text>
        <View style={styles.end}>
          <Pressable onPress={() => setCarrinho([])} style={styles.press}>
            <Text style={styles.pressTxt}>Limpar carrinho</Text>
          </Pressable>
          <Pressable style={styles.press}>
            <Text style={styles.pressTxt}>Finalizar compra</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const Main = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 10
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  removeBtn: {
    justifyContent: 'center',
  },
  removeTxt: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  preco: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderColor: '#000',
    borderRadius: 10,
    marginBottom: 20,
  },
  info: {
    fontSize: 21,
  },
  final: {
    padding: 15,
    alignItems: 'center',
  },
  total: {
    fontSize: 30,
    fontWeight: '700',
  },
  end: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  press: {
    backgroundColor: '#ff0000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    width: 170,
  },
  pressTxt: {
    color: 'white',
  },
});

export default Main;
