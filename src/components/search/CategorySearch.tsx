// components/search/CategorySearch.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CategorySearch = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Category</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 18,
  },
});

export default CategorySearch;
