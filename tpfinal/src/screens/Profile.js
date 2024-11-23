import React, { Component } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { auth, db } from "../firebase/config";
import Post from "../components/Post"; // Componente Post para renderizar cada posteo
import { collection, query, where, onSnapshot } from "firebase/firestore";

export class Profile extends Component {
  constructor() {
    super();
    this.state = {
      posts: [], // Lista de posteos del usuario
      loading: true, // Indicador de carga
    };
  }

  componentDidMount() {
    // Obtener posteos del usuario actual
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("email", "==", auth.currentUser.email));

    this.unsubscribe = onSnapshot(q, (snapshot) => {
      let postArray = [];
      snapshot.docs.forEach((doc) => {
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
        <Text>Nombre de usuario: {auth.currentUser.usuario}</Text>
        <Text>Email: {auth.currentUser.email}</Text>
        <Text>Total de posteos: {this.state.posts.length}</Text>

        {this.state.loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <FlatList
            data={this.state.posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Post
                title={item.texto}
                subtitle={`Creado el: ${new Date(item.createdAt).toLocaleString()}`}
                description={`Autor: ${item.email}`}
              />
            )}
            ListEmptyComponent={<Text>No tienes posteos aún.</Text>}
          />
        )}
      </View>
    );
  }
}

export default Profile;
