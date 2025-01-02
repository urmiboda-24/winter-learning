import { useCallback, useMemo, useReducer, useRef, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import todoReducer from "../reducer/todoReducer";
import TodoList from "../component/list";

const Form = () => {
  const [editId, setEditId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(todoReducer, []);
  const [color, setColor] = useState<string>("#f4f6f8");
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

  const handleDelete = useCallback((title: string) => {
    dispatch({ type: "TODO_REMOVE", payload: title });
  }, []);

  const handleRead = useCallback((title: string) => {
    dispatch({ type: "TODO_READ", payload: title });
  }, []);

  const handleEdit = useCallback((title: string, id: number) => {
    if (inputRef.current) {
      inputRef.current.value = title;
    }
    setEditId(id);
  }, []);
  const handleColorChange = () => {
    const randomLightValue = () => Math.floor(Math.random() * 128) + 127; // Ensure light colors

    const r = randomLightValue();
    const g = randomLightValue();
    const b = randomLightValue();

    const randomColor = `rgba(${r}, ${g}, ${b}, 0.14)`;

    if (randomColor !== color) {
      setColor(randomColor);
    }
  };
  const memoState = useMemo(() => state, [state]);
  console.log("abc=>parent component");

  return (
    <MainWrapper style={{ backgroundColor: `${color}` }}>
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
        <TodoList
          data={memoState}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRead={handleRead}
        />
      )}
      <Button className="color-btn" onClick={handleColorChange}>
        Change Background Color
      </Button>
    </MainWrapper>
  );
};

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

export default Form;
