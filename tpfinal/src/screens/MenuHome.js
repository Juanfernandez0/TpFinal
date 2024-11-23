
import react, {Component} from "react";
import { TouchableOpacity, View, Text, TextInput, StyleSheet, FlatList  } from "react-native";
import { db, auth } from "../firebase/config"
import HomeMenu from "../components/HomeMenu";


class MenuHome extends Component{
    constructor() {
        super();
        this.state = {
            posts: [],
            loading: true
        }
    }

componentDidMount(){
    this.setState({
        loading: true
    })
    db.collection('posts').onSnapshot(
        docs => {
            let posts = []
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


   
    render(){
        return(
            <View>
                <Text>Home</Text>
                    <HomeMenu/>                
            </View>


               




        )
    }
}








export default MenuHome;