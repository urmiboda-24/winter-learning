import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useReducer, useRef, useState } from "react";
import styled from "styled-components";
import todoReducer from "../reducer/todoReducer";
import { Delete, Edit } from "@mui/icons-material";

const Todo = () => {
  const [editId, setEditId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(todoReducer, []);

  const handleSubmit = () => {
    if (inputRef.current) {
      const value = inputRef.current.value.trim();
      if (editId !== null) {
        dispatch({
          type: "TODO_EDIT",
          payload: {
            title: value,
            id: editId,
          },
        });
        setEditId(null);
      } else {
        dispatch({
          type: "TODO_ADD",
          payload: {
            title: value,
            isRead: false,
          },
        });
      }
      inputRef.current.value = "";
    }
  };

  const handleDelete = (title: string) => {
    dispatch({ type: "TODO_REMOVE", payload: title });
  };

  const handleRead = (title: string) => {
    dispatch({ type: "TODO_READ", payload: title });
  };

  const handleEdit = (title: string, id: number) => {
    if (inputRef.current) {
      inputRef.current.value = title;
    }
    setEditId(id);
  };
  return (
    <MainWrapper>
      <Typography variant="h4">TODO List</Typography>
      <form>
        <TextField
          variant="outlined"
          type="text"
          placeholder="Enter Title"
          fullWidth
          inputRef={inputRef}
        />
        <Button onClick={handleSubmit} className="save-btn">
          Save
        </Button>
      </form>
      {state.length > 0 && (
        <Box className="table-box">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width={500}>Title</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.map(
                  (row: { title: string; isRead: boolean; id: number }) => (
                    <TableRow
                      key={row.title}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        textDecoration: row.isRead ? "line-through" : "none",
                      }}
                    >
                      <TableCell
                        onClick={() => handleRead(row.title)}
                        component="th"
                        scope="row"
                      >
                        {row.title}
                      </TableCell>
                      <TableCell>
                        <ActionWrapper>
                          <Edit
                            onClick={() => handleEdit(row.title, row.id)}
                            color="action"
                          />
                          <Delete
                            onClick={() => handleDelete(row.title)}
                            color="error"
                          />
                        </ActionWrapper>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </MainWrapper>
  );
};

export default Todo;

const MainWrapper = styled(Box)({
  width: 800,
  margin: "20px auto",
  padding: "20px",
  backgroundColor: "#f4f6f8",
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
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
  "& form": {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  "& .table-box": {
    marginTop: 20,
    width: "100%",
  },
});

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
