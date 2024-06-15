import {
  View,
  Text,
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import React from "react";
import type { MovieListProps } from "../types/app";
import MovieList from "../components/MovieList";

const movieLists: MovieListProps[] = [
  {
    title: "Now Playing in Theater",
    path: "movie/now_playing?language=en-US&page=1",
    coverType: "backdrop",
  },
  {
    title: "Upcoming Movies",
    path: "movie/upcoming?language=en-US&page=1",
    coverType: "poster",
  },
  {
    title: "Top Rated Movies",
    path: "movie/top_rated?language=en-US&page=1",
    coverType: "poster",
  },
  {
    title: "Popular Movies",
    path: "movie/popular?language=en-US&page=1",
    coverType: "poster",
  },
];
const Home = (): JSX.Element => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {movieLists.map((movieList) => (
          <MovieList
            title={movieList.title}
            path={movieList.path}
            coverType={movieList.coverType}
            key={movieList.title}
          />
        ))}
        <StatusBar translucent={false} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight ?? 32,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 16,
  },
});

export default Home;
