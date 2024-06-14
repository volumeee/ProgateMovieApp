import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  ScrollView,
} from "react-native";
import { API_ACCESS_TOKEN } from "@env";
import { LinearGradient } from "expo-linear-gradient";
import MovieItem from "../components/MovieItem";

const MovieDetail = ({ route }: any): JSX.Element => {
  const [movie, setMovie] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const { id } = route.params;

  useEffect(() => {
    fetchMovieDetail();
    fetchRecommendations();
  }, [id]);

  const fetchMovieDetail = async (): Promise<void> => {
    const url = `https://api.themoviedb.org/3/movie/${id}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecommendations = async (): Promise<void> => {
    const url = `https://api.themoviedb.org/3/movie/${id}/recommendations`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setRecommendations(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  if (!movie) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
          }}
          style={styles.backdrop}
        >
          <LinearGradient
            colors={["#00000000", "rgba(0, 0, 0, 0.7)"]}
            locations={[0.6, 1]}
            style={styles.gradient}
          >
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.rating}>⭐ {movie.vote_average}</Text>
          </LinearGradient>
        </ImageBackground>
        <Text style={styles.overview}>{movie.overview}</Text>
        <View style={styles.flexrow}>
          <View style={styles.flex}>
            <Text style={styles.detailLabel}>Original Language: </Text>
            <Text>{movie.original_language}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.detailLabel}>Popularity: </Text>
            <Text>{movie.popularity}</Text>
          </View>
        </View>
        <View style={styles.flexrow}>
          <View style={styles.flex}>
            <Text style={styles.detailLabel}>Release date: </Text>
            <Text>{movie.release_date}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.detailLabel}>Vote Count: </Text>
            <Text>{movie.vote_count}</Text>
          </View>
        </View>
        <View style={styles.header}>
          <View style={styles.purpleLabel}></View>
          <Text style={styles.titleR}>Recommendation</Text>
        </View>
        <FlatList
          style={styles.recommendationList}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={recommendations}
          renderItem={({ item }) => (
            <MovieItem
              movie={item}
              size={{ width: 100, height: 160 }}
              coverType="poster"
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  flexrow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginVertical: 8,
  },
  purpleLabel: {
    width: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#8978A4",
    marginRight: 12,
    marginLeft: 8,
  },
  titleR: {
    fontSize: 20,
    fontWeight: "900",
  },
  backdrop: {
    width: "100%",
    height: 250,
    overflow: "hidden",
    marginBottom: 16,
  },
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  rating: {
    fontSize: 18,
    color: "#fff",
  },
  overview: {
    padding: 16,
    fontSize: 16,
    marginVertical: 8,
    color: "#000",
  },
  detailLabel: {
    fontWeight: "bold",
  },
  recommendationList: {
    paddingLeft: 8,
    marginTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flex: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default MovieDetail;
