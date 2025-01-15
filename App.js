import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  Alert 
} from "react-native";
import axios from "axios";
// import Navbar from "./screens/Navbar"
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Home = ({ navigation }) => {
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL
  // const baseUrl = "Hello"

  const [tasks, setTasks] = useState([
   { id: "1", title: "Learn React Native", completed: false },
    { id: "2", title: "Build a Todo App", completed: true },
    { id: "3", title: "Test the app on a device", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  const token = "your-jwt-token"; 

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/todo`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data.todos);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) {
      Alert.alert("Error", "Task cannot be empty!");
      return;
    }
    try {
      const response = await axios.post(
        `${baseUrl}/todo/create`,
        { title: newTask },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, response.data.todo]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleTaskCompletion = async (taskId, completed) => {
    try {
      //error can happen because my api verify complete data 
      const response = await axios.put(
        `${baseUrl}/todo/update/${taskId}`,
        { completed: !completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedTask = response.data.todo;
      setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)));
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const deleteTask = async (taskId) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          // try {
          //   await axios.delete(`${baseUrl}/todo/delete/${taskId}`, {
          //     headers: { Authorization: `Bearer ${token}` },
          //   });
          //   setTasks(tasks.filter((task) => task._id !== taskId));
          // } catch (error) {
          //   console.error("Error deleting task:", error);
          // }
        },
      },
    ]);
  };
const updateTask = async (taskId) => {
  Alert.alert(
    "Update Task",
    "Are you sure you want to update this task?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Update",
        onPress: () => {
          console.log(`Task ${taskId} is being updated!`);
        },
        style: "default",
      },
    ],
    { cancelable: true }
  );
};


  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity
        style={[styles.checkbox, item.completed && styles.checkboxCompleted]}
        onPress={() => toggleTaskCompletion(item._id, item.completed)}
      >
        {item.completed && <Ionicons name="checkmark" size={16} color="#fff" />}
      </TouchableOpacity>
      <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
        {item.title}
      </Text>
      <TouchableOpacity onPress={() => deleteTask(item._id)}>
        <Ionicons name="trash" size={20} color="red" />
      </TouchableOpacity>
      <TouchableOpacity onPress ={()=>{updateTask(item._id)}}>
      <FontAwesome name="pencil" size={20} color="orange" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Text style={styles.loadingText}>Loading tasks...</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id}
          renderItem={renderTask}
          contentContainerStyle={styles.taskList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#333",
    marginTop: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
  },
  taskList: {
    paddingBottom: 60,
    border:2,
    borderColor:"#ddd",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    gap:"10",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxCompleted: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
  },
});

export default Home;
