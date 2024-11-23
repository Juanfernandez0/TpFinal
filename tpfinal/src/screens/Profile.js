import React, { Component } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase/app"; 
import "firebase/firestore";

export class Profile extends Component {
  constructor() {
    super();
    this.state = {
      posts: [], 
      loading: true, 
    };
  }

  componentDidMount() {
    const postsRef = db.collection("posts");

    postsRef
      .where("email", "==", auth.currentUser.email)
      .onSnapshot((snapshot) => {
        let postArray = [];
        snapshot.forEach((doc) => {
          postArray.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        postArray.sort((a, b) => b.createdAt - a.createdAt);

        this.setState({ posts: postArray, loading: false });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Mi Perfil</Text>
        <Text>Nombre de usuario: {auth.currentUser.usuario }</Text>
        <Text>Email: {auth.currentUser.email}</Text>
        <Text>Total de posteos: {this.state.posts.length}</Text>

        {this.state.loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <FlatList
            data={this.state.posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.post}>
                <Text style={styles.postTitle}>{item.texto}</Text>
                <Text style={styles.postSubtitle}>
                  Creado el: {new Date(item.createdAt).toLocaleString()}
                </Text>
                <Text style={styles.postDescription}>Autor: {item.email}</Text>
              </View>
            )}
            ListEmptyComponent={<Text>No tienes posteos aún.</Text>}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  post: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postSubtitle: {
    fontSize: 14,
    marginTop: 5,
  },
  postDescription: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default Profile;
