
import react, { Component } from "react";
import { TouchableOpacity, View, Text, TextInput, StyleSheet, FlatList } from "react-native";
import { db, auth } from "../firebase/config"
import HomeMenu from "../components/HomeMenu";


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
                console.log(posts)
                this.setState({
                    posts: posts,
                    loading: false
                })
            }
        )
    }



    render() {
        console.log(this.state.posts)
        return (
            <View>
                <Text>Home</Text>
                {!this.state.loading && (<FlatList 
                data={this.state.posts} 
                keyExtractor={(post) => post.id} 
                renderItem={({ item }) => <View><Text>{item.data.texto} </Text>
                <Text>{item.data.email}</Text></View>} />)}

            </View>







        )
    }
}








export default MenuHome;