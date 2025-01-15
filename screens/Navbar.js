import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Navbar = () => {
  const isLoggedIn = true
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: logout, style: "destructive" },
      ]
    );
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.brandText}>daisyUI</Text>
      </TouchableOpacity>
      {isLoggedIn ? (
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.avatar}>
            <Image
              source={{
                uri: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
              }}
              style={styles.avatarImage}
            />
          </TouchableOpacity>
          <View style={styles.dropdown}>
            <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")}>
              <Text style={styles.dropdownItem}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={styles.dropdownItem}>Forgot Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("AddTask")}>
              <Text style={styles.dropdownItem}>Add Task</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={[styles.dropdownItem, styles.logout]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  brandText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 10,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  dropdown: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#333",
  },
  logout: {
    color: "red",
  },
  loginButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Navbar;
