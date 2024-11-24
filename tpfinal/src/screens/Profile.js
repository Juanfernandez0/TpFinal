import React, { Component } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
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

  deletePost = (id) => {
    db.collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Post eliminado");
      })
      .catch((error) => {
        console.error("Error eliminando el post:", error);
      });
  };

  logout = () => {
    auth.signOut()
      .then(() => {
        console.log("Usuario deslogueado exitosamente");
        this.props.navigation.navigate("Login"); // Redirige a la pantalla de login
      })
      .catch((error) => {
        console.error("Error al desloguear:", error);
      });
  };

  render() {
    console.log(auth.currentUser);

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Mi Perfil</Text>
        <TouchableOpacity
          onPress={this.logout}
          style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
        <Text style={styles.textonombres}>Email: {auth.currentUser.email}</Text>
        <Text style={styles.textonombres}>Total de posteos: {this.state.posts.length}</Text>
       
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
                <Text style={styles.postDescription}>Email del Autor: {item.email}</Text>
                <Text style={styles.postDescription}>Nombre del Autor: {item.usuario}</Text>
                <TouchableOpacity
                  onPress={() => this.deletePost(item.id)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>Eliminar</Text>
                </TouchableOpacity>
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
    textAlign: "center",
  },
  textonombres:{
    fontSize: 16,
    fontWeight: "bold",
    padding: 10
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
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#ff5252",
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#3a1fe4",
    padding: 15,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Profile;
