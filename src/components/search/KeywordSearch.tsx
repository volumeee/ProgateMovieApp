import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import MovieItem from "../MovieItem"; // Ensure this component exists or create it
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
import { API_ACCESS_TOKEN } from "@env";
import { Movie } from "../../types/app";

const ITEM_WIDTH = 100; // Adjust according to your design

const KeywordSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Movie[]>([]);
  const navigation = useNavigation();

  const getMovieList = (query: string): void => {
    const path = `search/movie?query=${query}&page=1`;
    const url = `https://api.themoviedb.org/3/${path}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => setResults(data.results))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (query.length > 0) {
      getMovieList(query);
    }
  }, [query]);

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Search for a keyword..."
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={results}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
              console.log("Navigating to MovieDetail with ID:", item.id);
              navigation.dispatch(
                StackActions.push("MovieDetail", { id: item.id })
              );
            }}
          >
            <MovieItem
              movie={item}
              size={{ width: ITEM_WIDTH, height: 160 }}
              coverType="poster"
              onPress={() => item}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => `${item.id}`}
        numColumns={3}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  searchTab: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#EDEDED",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 5,
  },
  searchTabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5A5A5A",
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: "#ccc",
    borderWidth: 3,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  itemContainer: {
    margin: 8,
    alignItems: "center",
  },
  list: {
    paddingBottom: 16,
  },
  movieTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  movieRating: {
    fontSize: 12,
    color: "#777",
  },
});

export default KeywordSearch;
