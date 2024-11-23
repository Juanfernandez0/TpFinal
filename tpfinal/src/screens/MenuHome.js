
import react, {Component} from "react";
import { TouchableOpacity, View, Text, TextInput, StyleSheet  } from "react-native";
import { db, auth } from "../firebase/config"








class MenuHome extends Component{
    constructor() {
        super();
        this.state = {
            email: '',
            usuario: '',
            password: '',
        }
    }




   
    render(){
        return(

                
                <Text>MenuHome</Text>


               




        )
    }
}








export default MenuHome;