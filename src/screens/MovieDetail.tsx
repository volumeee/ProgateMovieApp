import { View, Text, Button } from "react-native";
import React from "react";

const MovieDetail = ({ navigation }: any) => {
  return (
    <View>
      <Text>MovieDetail</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default MovieDetail;
