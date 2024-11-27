import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: { todo: { id: string; title: string } }) {
  const dispatch = useDispatch();
  return (
    <li key={todo.id} className="list-group-item d-flex align-items-center gap-2">
      {todo.title}
      <div className="ms-auto d-flex gap-2">
        <button
          className="btn btn-primary "
          onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click"
        >
          {" "}
          Edit{" "}
        </button>
        <button
          className="btn btn-danger"
          onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click"
        >
          {" "}
          Delete{" "}
        </button>
      </div>
    </li>
  );
}
