import react, { Component } from "react";
import { TouchableOpacity, View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import { db, auth } from '../firebase/config';


class Post extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            texto: '',


        };
    }

    posteos(email, texto) {
        db.collection('posts').add({
            email: email,
            texto: texto,
            likes: [],
            createdAt: Date.now(),
        }).then()
            .catch(e => console.log(e))
    }



    render() {
        return (
            <View style={styles.form}>
                <Text>Nuevo Posteo</Text>
                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder='Escribi lo que estas pensando'
                    onChangeText={text => this.setState({ texto: text })}
                    value={this.state.texto} />
                <TouchableOpacity onPress={() => this.posteos(auth.currentUser.email, this.state.texto)} style={styles.boton}>
                    <Text style={styles.botonT}>POSTEAR</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

export default Post