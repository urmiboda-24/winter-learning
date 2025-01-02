// src/components/AddTodo.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/rootStore";
import { addTodo } from "../../../store/todo/slice";
import { Box, TextField, Button, styled } from "@mui/material";

const AddTodo: React.FC = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <MainWrapper>
      <form onSubmit={handleSubmit}>
        <TextField
          label="New Task"
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
          error={error}
          helperText={error ? "Task description cannot be empty" : ""}
          fullWidth
        />
        <Button type="submit" className="save-btn">
          Save
        </Button>
      </form>
    </MainWrapper>
  );
};

export default AddTodo;

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
  "& .color-btn": {
    textTransform: "none",
    border: "1px solid #1565c0",
    color: "#fff",
    backgroundColor: "#1565c0",
    fontSize: "16px",
    fontWeight: 600,
    width: "300px",
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
