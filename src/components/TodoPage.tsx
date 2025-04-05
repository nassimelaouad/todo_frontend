import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch.ts";
import { Task } from "../index";

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState(""); // État pour une nouvelle tâche
  const [taskEditing, setTaskEditing] = useState<{ [id: number]: string }>({});

  // Récupérer toutes les tâches depuis le backend
  const handleFetchTasks = async () => {
    const fetchedTasks = await api.get("/tasks");
    setTasks(fetchedTasks);
  };

  // Ajouter une nouvelle tâche
  const handleSave = async () => {
    try {
      if (!newTaskName.trim()) return; // Empêcher l'ajout de tâches vides
      await api.post("/tasks", { name: newTaskName });
      setNewTaskName(""); // Réinitialiser le champ
      await handleFetchTasks(); // Rafraîchir la liste
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };
  // Mettre à jour une tâche
  const handleUpdate = async (id: number) => {
    try {
      const updatedName = taskEditing[id];
      if (!updatedName.trim()) return;

      await api.put(`/tasks/${id}`, { name: updatedName });
      setTaskEditing((prev) => {
        const { [id]: _, ...rest } = prev;
        return rest;
      });
      await handleFetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Supprimer une tâche
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleTaskNameChange = (id: number, newName: string) => {
    setTaskEditing((prev) => ({ ...prev, [id]: newName }));
  };

  useEffect(() => {
    handleFetchTasks();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      {/* Table pour afficher les tâches */}
      <Box mt={5}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tâche</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <TextField
                      size="small"
                      value={taskEditing[task.id] || task.name}
                      fullWidth
                      onChange={(e) =>
                        handleTaskNameChange(task.id, e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleUpdate(task.id)}
                      disabled={
                        !taskEditing[task.id] ||
                        taskEditing[task.id] === task.name
                      }
                      sx={{ mr: 1 }}
                    >
                      Modifier
                    </Button>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(task.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Ajouter une nouvelle tâche */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
        <TextField
          size="small"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          fullWidth
          sx={{ maxWidth: 350 }}
          placeholder="Nouvelle tâche"
        />
        <Button
          variant="outlined"
          onClick={handleSave}
          disabled={!newTaskName.trim()}
        >
          Ajouter
        </Button>
      </Box>
    </Container>
  );
};

export default TodoPage;
