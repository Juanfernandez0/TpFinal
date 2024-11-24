import React, { Component } from "react";
import { ActivityIndicator, FlatList, View, Text, TextInput, StyleSheet } from "react-native";
import { db } from '../firebase/config';

class Usuarios extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            filteredUsers: [],
            filterValue: "",
            loading: true,
        };
    }

    componentDidMount() {
        db.collection('users').onSnapshot(docs => {
            let users = [];
            docs.forEach(doc => {
                users.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            this.setState({
                users: users,
                filteredUsers: users,
                loading: false,
            });
        });
    }

    handleFilterChange = (value) => {
        this.setState({
            filterValue: value,
            filteredUsers: this.state.users.filter(user =>
                user.data.email.toLowerCase().includes(value.toLowerCase())
            ),
        });
    };

    

    render() { 
    
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar por email"
                    value={this.state.filterValue}
                    onChangeText={this.handleFilterChange}
                />
                {this.state.loading ? (
                    <ActivityIndicator />
                ) : this.state.filteredUsers.length > 0 ? (
                    <FlatList
                        data={this.state.filteredUsers}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Text style={styles.userItem}>{item.data.email}</Text>}
                    />
                ) : (
                    <Text style={styles.noexiste}>El email que estas buscando no existe.</Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    userItem: {
        fontSize: 16,
        padding: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    noexiste: {
        marginTop: 40,
        fontFamily: 'Helvetica',
        fontSize: 30,
        color: '#070707',
        textAlign: 'center',
    },
});

export default Usuarios;
