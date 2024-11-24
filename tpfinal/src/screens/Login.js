import react, {Component} from "react";
import { TouchableOpacity, View, Text, TextInput, StyleSheet  } from "react-native";
import { db, auth } from "../firebase/config"








class Login extends Component{
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        }
    }

    componentDidMount() {
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.props.navigation.navigate("HomeMenu");
        }
      })
    }
    

    onSubmit = (email, password) => {




        if (!email || !password) {
            alert('Por favor, complete todos los campos.');
            return
          }






     auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.setState({loggedIn: true})
        this.props.navigation.navigate('HomeMenu')
      })
      .catch(error => {
        this.setState({error: "Error al cargar credenciales"})
      })





        console.log(this.state.email)
        console.log(this.state.password)




      };


   
    render(){
        return(
            <View style={StyleSheet.container}>
              
                <TextInput style={style.campo}
                           keyboardType = "email-adress"
                           placeholder = "Correo electrónico"
                           onChangeText = {EmailIngresado => this.setState({email:EmailIngresado})}
                           value = {this.state.email}
                     />




                <TextInput style={style.campo}
                           keyboardType = "default"
                           placeholder = "Contraseña"
                           onChangeText = {passwordIngresada => this.setState({password: passwordIngresada})}
                           value = {this.state.password}
                     />




                <TouchableOpacity style={style.boton} onPress={() =>
                    this.onSubmit( this.state.email, this.state.password,)}>
                    <Text>
                        Loguearse
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate("Register")} >
                
                <Text>No tenes una cuenta? Registrate</Text>


                </TouchableOpacity>



                {this.state.error ? <Text>{this.state.error}</Text>: null}



            </View>
        )
    }
}




const style = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",  
      padding: 20,  
      backgroundColor: "#f5f5f5",  
    },
    campo: {
      height: 40,  
      width: "100%",
      borderColor: "#ccc",  
      borderWidth: 1,  
      marginBottom: 15,  
      paddingLeft: 10,
      borderRadius: 5,  
      backgroundColor: "#fff",
    },
    boton: {
      backgroundColor: "#007BFF",  
      paddingVertical: 10,  
      paddingHorizontal: 20,
      borderRadius: 5,  
      marginTop: 20,
      marginBottom: 20,
    },
    botonTexto: {
      color: "#fff",  
      fontSize: 16,  
      fontWeight: "bold",  
      textAlign: "center",  
    },
    texto: {
      fontSize: 24,  
      fontWeight: "bold",  
      marginBottom: 20,  
      color: "#333",  
    },
  });
 




export default Login;
