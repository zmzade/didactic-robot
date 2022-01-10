import React, { ChangeEvent } from "react";

export default function Todos() {
  const [newTodo, setNewTodo] = React.useState("");
  const [todos, setTodos] = React.useState(["hello there", "general kenobi"]);
  const [deadline, setDeadline] = React.useState({ date: "", time: "" });
  const [status, setStatus] = React.useState("Todo");
  const statuses = ["Todo", "Doing", "Done"];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTodo) return;

    const allTodos = [newTodo, ...todos];
    setTodos(allTodos);
    setNewTodo("");
  };

  const removeTodo = (removeIndex: number) => {
    const filteredTodos = todos.filter((_, index) => index !== removeIndex);
    setTodos(filteredTodos);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    todo: string
  ): void => {
    todos.forEach((x) => {
      if (x === todo) {
        setDeadline({ ...deadline, [e.target.name]: e.target.value });
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 500,
        margin: "0 auto",
        padding: 8,
      }}
    >
      <h2 style={{ textAlign: "center" }}>Todo</h2>
      <form onSubmit={onSubmit} style={{ display: "flex", marginBottom: 8 }}>
        <input
          type="text"
          name="newTodo"
          id="newTodo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Fix the thing.."
          style={{
            display: "inline-flex",
            flex: 1,
            padding: 4,
            border: "1px solid #eaeaea",
            marginRight: 4,
          }}
        />
        <button
          type="submit"
          style={{ borderColor: "#eaeaea", backgroundColor: "#fff" }}
        >
          Add
        </button>
      </form>
      <div>
        {todos.length === 0 && (
          <div style={{ textAlign: "center" }}>Add some todos</div>
        )}
        {todos.map((todo, i) => (
          <div
            key={`${todo}-${i}`}
            style={{
              padding: 4,
              borderBottom: "1px solid #ccc",
              display: "flex",
            }}
          >
            <span style={{ flex: 1 }}>{todo}</span>
            <div className="optionsBox">
              <div className="dateBox">
                <div className="left">
                  <div style={{ marginBottom: "5px" }}>
                    <span>Date deadline</span>
                  </div>

                  <div>
                    <span>Time deadline</span>
                  </div>
                </div>
                <div>
                  <div>
                    <input
                      type="date"
                      value={deadline.date}
                      name="date"
                      onChange={(e) => handleChange(e, todo)}
                    />
                  </div>

                  <div>
                    <input
                      type="time"
                      value={deadline.time}
                      name="time"
                      onChange={(e) => handleChange(e, todo)}
                    />
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="statusesBox">
                  {statuses.map((x) => (
                    <li style={{ listStyle: "none" }} key={x}>
                      <input
                        type="checkbox"
                        id={x}
                        name="statuses"
                        value={status}
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                      />
                      <label htmlFor={x}>{x}</label>
                    </li>
                  ))}
                </div>
                <div className="btn">
                  <button
                    style={{ cursor: "pointer" }}
                    onClick={() => removeTodo(i)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
