import { useState } from "react";
import styles from "./edittodoform.module.css";

interface Todo {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
}

interface EditTodoFormProps {
  editTodo: (task: string, id: string) => void;
  task: Todo;
}

function EditTodoForm({ editTodo, task }: EditTodoFormProps) {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    editTodo(value, task.id);

    setValue("");
  };

  return (
    <form className={styles.TodoForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.TodoInput}
        placeholder="Update task"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />

      <button type="submit" className={styles.TodoBtn}>
        Update Item
      </button>
    </form>
  );
}

export default EditTodoForm;
