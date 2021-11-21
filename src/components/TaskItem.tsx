import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import pencilIcon from "../assets/icons/pencil/pencil.png";
import trashIcon from "../assets/icons/trash/trash.png";

import { Task } from "./TasksList";

interface TasksItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
  removeTask: (id: number) => void;
}

export function TaskItem({
  task,
  index,
  toggleTaskDone,
  editTask,
  removeTask,
}: TasksItemProps) {
  const [isBeingEditted, setIsBeingEditted] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsBeingEditted(true);
  }

  function handleCancelEditing() {
    setNewTitle(task.title);
    setIsBeingEditted(false);
  }

  function handleSubmitEditing() {
    if (newTitle.trim().length > 0) {
      editTask(task.id, newTitle);
      setIsBeingEditted(false);
    } else {
      handleCancelEditing();
    }
  }

  useEffect(() => {
    if (isBeingEditted) {
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  }, [isBeingEditted]);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={[styles.taskMarker, task.done && styles.taskMarkerDone]}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={newTitle}
            onChangeText={setNewTitle}
            editable={isBeingEditted}
            onSubmitEditing={handleSubmitEditing}
            style={[styles.taskText, task.done && styles.taskTextDone]}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isBeingEditted ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={pencilIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider}>
          <Text />
        </View>

        <TouchableOpacity
          disabled={isBeingEditted}
          onPress={() => removeTask(task.id)}
        >
          <Image
            source={trashIcon}
            style={{ opacity: isBeingEditted ? 0.2 : 1 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "25%",
    padding: 16,
  },
  iconsDivider: {
    width: 2,
    height: "100%",
    backgroundColor: "#b2b2b2",
    marginHorizontal: 8,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
