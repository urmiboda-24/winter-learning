import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTodos } from "../../../store/todo/selectore";
import { AppDispatch } from "../../../store/rootStore";
import { deleteTodo, editTodo, toggleTodo } from "../../../store/todo/slice";
import {
  Checkbox,
  Box,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { fetchTodo } from "../../../store/todo/thunk";

const TodoList: React.FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const [editData, setEditData] = useState<{ text: string; id: number | null }>(
    { text: "", id: null }
  );
  const todoList = useSelector(selectTodos);
  const dispatch = useDispatch<AppDispatch>();
  const onEdit = (text: string, id: number) => {
    setIsEdit(true);
    setEditData({ text, id });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editData.text.trim() && editData.id !== null) {
      dispatch(
        editTodo({
          text: editData.text,
          id: editData.id,
          completed: false,
        })
      );
      setError(false);
      setIsEdit(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  return (
    <Box className="table-box">
      {todoList.isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell width={500}>Title</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todoList.list.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    textDecoration: row.completed ? "line-through" : "none",
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Checkbox
                      checked={row.completed}
                      onChange={() => dispatch(toggleTodo(row.id))}
                      color="primary"
                    />
                    {row.text}
                  </TableCell>
                  <TableCell>
                    <ActionWrapper>
                      <Edit
                        onClick={() => onEdit(row.text, row.id)}
                        color="action"
                      />
                      <Delete
                        onClick={() => dispatch(deleteTodo(row.id))}
                        color="error"
                      />
                    </ActionWrapper>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={isEdit} fullWidth maxWidth="md">
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              value={editData.text}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  text: e.target.value,
                }))
              }
              error={error}
              helperText={error ? "Task description cannot be empty" : ""}
              fullWidth
            />
            <DialogActionBox>
              <Button type="submit" className="save-btn">
                Save
              </Button>
            </DialogActionBox>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TodoList;

const ActionWrapper = styled(Box)({
  display: "flex",
  gap: "10px",
  cursor: "pointer",
  justifyContent: "center",
  "& svg": {
    transition: "transform 0.2s ease-in-out",
  },
  "& svg:hover": {
    transform: "scale(1.2)",
  },
});
const DialogActionBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 20,
  width: "100%",
  "& .save-btn": {
    textTransform: "none",
    border: "1px solid #1565c0",
    color: "#fff",
    backgroundColor: "#1565c0",
    fontSize: "16px",
    fontWeight: 600,
    width: "140px",
    marginTop: 10,
    borderRadius: "4px",
    padding: "10px 20px",
    "&:hover": {
      backgroundColor: "#003c8f",
    },
  },
});
