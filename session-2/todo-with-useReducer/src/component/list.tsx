// TodoList.tsx
import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import styled from "styled-components";

interface TodoItem {
  title: string;
  isRead: boolean;
  id: number;
}

interface TodoListProps {
  data: TodoItem[];
  onEdit: (title: string, id: number) => void;
  onDelete: (title: string) => void;
  onRead: (title: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  data,
  onEdit,
  onDelete,
  onRead,
}) => {
  console.log("abc=>child component");
  return (
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
            {data.map((row) => (
              <TableRow
                key={row.title}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  textDecoration: row.isRead ? "line-through" : "none",
                }}
              >
                <TableCell
                  onClick={() => onRead(row.title)}
                  component="th"
                  scope="row"
                >
                  {row.title}
                </TableCell>
                <TableCell>
                  <ActionWrapper>
                    <Edit
                      onClick={() => onEdit(row.title, row.id)}
                      color="action"
                    />
                    <Delete onClick={() => onDelete(row.title)} color="error" />
                  </ActionWrapper>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

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

export default React.memo(TodoList);
