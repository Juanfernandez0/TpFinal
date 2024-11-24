import react, { Component } from "react";
import { TouchableOpacity, View, Text, StyleSheet, TextInput } from "react-native";
import { db, auth } from '../firebase/config';


class Post extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            texto: '',


        };
    }

    Posteo(email, texto) {
        db.collection('posts').add({
            email: email,
            texto: texto,
            likes: [],
            createdAt: Date.now(),
        })
            .then(() => {
                this.props.navigation.navigate('HomeMenu')
            })
            .catch(e => console.log(e));
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

    render() {


        return (

            <View style={styles.form}>
                <Text style={styles.title}>Nuevo Posteo</Text>
                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder='Escribi lo que estas pensando...'
                    onChangeText={text => this.setState({ texto: text })}
                    value={this.state.texto} />
                <TouchableOpacity onPress={() => this.Posteo(auth.currentUser.email, this.state.texto)} style={styles.Boton}>
                    <Text style={styles.BotonDePosteo}>POSTEAR</Text>

                </TouchableOpacity>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 30
    },
    field: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingLeft: 10,
        fontSize: 16,
    },
    Boton: {
        backgroundColor: '#007BFF', // Azul
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    BotonDePosteo: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Post