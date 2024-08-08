import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 2,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#757575',
  },
});

interface StarRatingProps {
  rating: number;
}

export default function StarRating({ rating }: StarRatingProps) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FontAwesome
        key={i}
        name={i <= Math.floor(rating) ? 'star' : 'star-o'}
        size={16}
        color="#FFD700"
        style={styles.star}
      />
    );
  }

  return (
    <View style={styles.starContainer}>
      {stars}
      <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
    </View>
  );
}
