import React, {useState} from  "react"
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity
} from "react-native";

const Register = ()=>{
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:""
  });
  const [loading,setLoading] = useState(true)
  
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
 
  };

  return(
  <View style={styles.container}>
   <Text style={styles.title}>Register</Text>
   <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Kamaldeep"
          value={formData.name}
          onChangeText={(value) => handleChange("name", value)}
          keyboardType="text"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          value={formData.email}
          onChangeText={(value) => handleChange("email", value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          value={formData.password}
          onChangeText={(value) => handleChange("password", value)}
          keyboardType="password"
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={loading}
      >
      {
        loading?<Text style={styles.buttonText}>Loading..</Text>:<Text style={styles.buttonText}>Hello</Text>
      }
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginLink}>
          Already have an account? <Text style={styles.loginText}>Login</Text>
        </Text>
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
  link: {
    textAlign: "center",
    color: "#007BFF",
    marginVertical: 10,
  },
  loginLink: {
    textAlign: "center",
    color: "#555",
    marginTop: 10,
  },
  loginText: {
    color: "#007BFF",
    fontWeight: "bold",
  },

})

export default Register;