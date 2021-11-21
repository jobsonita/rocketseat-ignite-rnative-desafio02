import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.find((task) => task.title === newTaskTitle)) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    } else {
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  }

  function handleToggleTaskDone(id: number) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id == id) {
          return { ...task, done: !task.done };
        } else {
          return task;
        }
      })
    );
  }

  function handleEditTask(id: number, newTitle: string) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id == id) {
          return { ...task, title: newTitle };
        } else {
          return task;
        }
      })
    );
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
          },
          style: "destructive",
        },
      ],
      { cancelable: true, onDismiss: () => {} }
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
