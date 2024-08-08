import React, { useState,useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, Image, Modal } from 'react-native';
import StarRating from '../../components/StarRating'; 
import ProductDetails from '../../components/ProductDetails'; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    width: '100%',
    height: 80,
    backgroundColor: '#e21837',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
  },
  box: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 15,
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#e21837',
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: '#757575',
    marginTop: 5,
  },
});

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function HomeScreen() {
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Store Menu</Text>
      </View>
      <View style={styles.listContainer}>
        {error ? (
          <Text>{error}</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={styles.box} onTouchEnd={() => setSelectedProduct(item)}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.productInfo}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.price}>${item.price}</Text>
                  <Text style={styles.category}>{item.category}</Text>
                  <StarRating rating={item.rating.rate} />
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>

      <Modal visible={!!selectedProduct} animationType="slide" onRequestClose={() => setSelectedProduct(null)}>
        {selectedProduct && (
          <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </Modal>
    </View>
  );
}
