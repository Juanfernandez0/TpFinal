import react, {Component} from "react";
import { TouchableOpacity, View, Text, TextInput, StyleSheet  } from "react-native";
import { db, auth } from "../firebase/config"








class Register extends Component{
    constructor() {
        super();
        this.state = {
            email: '',
            usuario: '',
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

    onSubmit = (usuario, email, password) => {

    

    if (!usuario || !email || !password) {
        this.setState({error:'Por favor, complete todos los campos.'});
        return
    }

    if(password.lenght < 6){
        this.setState({error : " La contraseña debe tener por lo menos 6 caracteres."})
        return
    }


    if(!email.includes("@")) {
        this.setState({error : "El email no tiene un formato válido."})
      return
    }



     auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({registred: true})
        this.props.navigation.navigate('Login');



        db.collection('users').add({
            email: email,
            usuario: usuario,
            createdAt: Date.now(),
        })
        .then()
        .catch(e => console.log(e));


      })
      .catch(error => {
        this.setState({ error: "Fallo en el registro: " + error.message });
      })


        
      };








   
    render(){

      const isDisabled = !this.state.usuario || !this.state.email || !this.state.password;

        return(
            <View style={StyleSheet.container}>
              




                <TextInput style={style.campo}
                           keyboardType = "default"
                           placeholder = "Nombre de usuario"
                           onChangeText = {UsuarioIngresado => this.setState({usuario: UsuarioIngresado})}
                           value = {this.state.username}
                     />
           
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




            <TouchableOpacity
                style={[style.boton, isDisabled && style.botonDeshabilitado]} 
                onPress={() => this.onSubmit(this.state.usuario, this.state.email, this.state.password)}
                disabled={isDisabled} 
            >
                <Text style={style.botonTexto}>Registrarse</Text>
            </TouchableOpacity>



                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate("Login")} >
                
                <Text>Ya estas logueado? Inicia Sesion</Text>


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

    botonDeshabilitado: {
      backgroundColor: "skyblue", 
  },
    campo: {
      height: 40,  
      width: "100%",
      borderColor: "#ccc",  
      borderWidth: 1,  
      marginBottom: 15,
      marginBottom:20,  
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
 




export default Register;
