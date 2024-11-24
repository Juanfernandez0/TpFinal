import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { db, auth } from "../firebase/config";
import firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      cantidad: this.props.item.data.likes.length, 
    };
  }

  componentDidMount() {
    if (this.props.item.data.likes.includes(auth.currentUser.email)) {
      this.setState({
        like: true,
      });
    }
  }

  handleLike = () => {
    db.collection("posts").doc(this.props.item.id).update({
      likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
    })
      .then(() => this.setState((prevState) => ({
        like: true,
        cantidad: this.props.item.data.likes.length
      })))
      .catch((error) => console.log(error));
  };

  handleUnLike = () => {
    db.collection("posts").doc(this.props.item.id).update({
      likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
    })
      .then(() => this.setState((prevState) => ({
        like: false,
        cantidad: this.props.item.data.likes.length
      })))
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.texto}>{this.props.item.data.texto}</Text>
        <Text style={styles.email}>{this.props.item.data.email}</Text>

        {this.state.like ? (
          <TouchableOpacity style={styles} onPress={this.handleUnLike}>
                         <AntDesign name="heart" size={20} color="red" />

          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles} onPress={this.handleLike}>
              <AntDesign name="hearto" size={20} color="black" />
              </TouchableOpacity>
        )}

        <Text style={styles.likes}>{this.state.cantidad} likes</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  texto: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },

  
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  likes: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
  },
});
