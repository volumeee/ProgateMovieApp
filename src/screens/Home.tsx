import { View, Text, Button } from "react-native";
import React from "react";

const Home = ({ navigation }: any) => {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Go to movie detail"
        onPress={() => navigation.navigate("MovieDetail")}
      />
    </View>
  );
};

export default Home;
