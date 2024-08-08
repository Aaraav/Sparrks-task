import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { removeItem, clearCart } from '../../redux/cartSlice';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  itemDetails: {
    flex: 1,
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e21837',
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  total: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  removeButton: {
    backgroundColor: '#e21837',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
  },
  clearCartButton: {
    backgroundColor: '#e21837',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  clearCartButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
});

export default function CartScreen() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>

<View style={styles.header}>
        <Text style={styles.headerText}>Store Menu</Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemText}>
                {item.title} x {item.quantity}
              </Text>
              <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => dispatch(removeItem(item.id))}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.total}>Total: ${totalAmount.toFixed(2)}</Text>
      <View style={styles.buttonContainer}>
        
        <TouchableOpacity
          style={styles.clearCartButton}
          onPress={() => dispatch(clearCart())}
        >
          <Text style={styles.clearCartButtonText}>Clear Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
