
import react, { Component } from "react";
import { TouchableOpacity, View, Text, TextInput, StyleSheet, FlatList } from "react-native";
import { db, auth } from "../firebase/config"
import HomeMenu from "../components/HomeMenu";
import Post from "../components/Post"


class MenuHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true
        }
    }

    componentDidMount() {
        db.collection('posts').orderBy("createdAt", "desc").onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posts: posts,
                    loading: false
                })
            }
        )
    }



    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Home</Text>
                {!this.state.loading && (
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={(post) => post.id}
                        renderItem={({ item }) => <Post item={item} />}
                        style={styles.list} 
                        contentContainerStyle={styles.listContent} 
                    />
                )}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "#f5f5f5", 
        paddingHorizontal: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
    },
    list: {
        flex: 1, 
    },
    listContent: {
        paddingBottom: 20, 
    },
});

export default MenuHome;




