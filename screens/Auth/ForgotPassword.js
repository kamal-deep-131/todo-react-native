import React, {useState} from  "react"
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity
} from "react-native";

const ForgotPassword = ()=>{
  const [loading,setLoading] = useState(false)
  
  const [email, setEmail] = useState("")
  const handleEmail = (value)=>[
        setEmail(value)
  ]

  const handleSubmit = () => {
 
  };

  return(
  <View style={styles.container}>
   <Text style={styles.title}>Forgot Password</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          value={email}
          onChangeText={(value) =>handleEmail(value) }
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
    
      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={loading}
      >
      {
        loading?<Text style={styles.buttonText}>Loading..</Text>:<Text style={styles.buttonText}>forgot Password</Text>
      }
      </TouchableOpacity>
  </View>   
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
   title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default ForgotPassword;