//
"use client";

import { useState, useEffect, useTransition } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setFilter, setSearch } from "@/store/filterSlice";
import styled from "styled-components";
import { useActionState } from "react";
import { addTask, toggleTask, deleteTask, getTasks } from "./actions";

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
`;

const Card = styled.div`
  background: ${(props) => props.theme.card};
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 8px 16px;
  margin: 0 4px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #0070f3;
  color: white;
`;

const DeleteButton = styled(Button)`
  background: #ff4444;
  float: right;
`;

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [isPending, startTransition] = useTransition();

  const filter = useSelector((state: RootState) => state.filter.filter);
  const search = useSelector((state: RootState) => state.filter.search);
  const dispatch = useDispatch();

  const [addState, addFormAction] = useActionState(addTask, {
    success: false,
    error: "",
  });

  // Shared refresh function
  const refreshTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  // Initial load + refresh after add
  useEffect(() => {
    refreshTasks();
  }, [addState.success]);

  // Handle toggle & delete with smooth refresh
  const handleToggle = (id: string, completed: boolean) => {
    startTransition(async () => {
      await toggleTask(id, completed);
      await refreshTasks();
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteTask(id);
      await refreshTasks();
    });
  };

  const filteredTasks = tasks
    .filter((t) =>
      filter === "active"
        ? !t.completed
        : filter === "completed"
          ? t.completed
          : true,
    )
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <Container>
      <h1>Tasks Demo</h1>

      <form action={addFormAction}>
        <input
          name="title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New task..."
          required
          style={{ padding: "10px", width: "70%", marginRight: "8px" }}
        />
        <Button type="submit">Add Task</Button>
        {addState.error && <p style={{ color: "red" }}>{addState.error}</p>}
      </form>

      <div style={{ margin: "20px 0" }}>
        <Button onClick={() => dispatch(setFilter("all"))}>All</Button>
        <Button onClick={() => dispatch(setFilter("active"))}>Active</Button>
        <Button onClick={() => dispatch(setFilter("completed"))}>
          Completed
        </Button>
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          style={{ marginLeft: "12px", padding: "8px" }}
        />
      </div>

      {filteredTasks.map((task) => (
        <Card key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleToggle(task.id, task.completed)}
          />
          <span
            style={{
              marginLeft: "10px",
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.title}
          </span>
          <DeleteButton onClick={() => handleDelete(task.id)}>
            Delete
          </DeleteButton>
        </Card>
      ))}
      <span style={{ marginLeft: "12px", fontSize: "20px", color: "#666", fontWeight:"bold" }}>
        {filteredTasks.length} tasks in total
      </span>
    </Container>
  );
}
