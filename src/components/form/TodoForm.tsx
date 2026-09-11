import { useState } from "react";
import styles from "./todoform.module.css";

interface TodoFormProps {
  addTodo: (todo: string) => void;
}

function TodoForm({ addTodo }: TodoFormProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTodo(value);

    setValue("");
  };

  return (
    <form className={styles.TodoForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.TodoInput}
        placeholder="What is your grocery item?"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />

      <button type="submit" className={styles.TodoBtn}>
        Add Item
      </button>
    </form>
  );
}

export default TodoForm;
