"use client";
import { useState, useEffect } from "react";
import Widget from "./Widget";

interface Todo {
  text: string;
  done: boolean;
  priority: "red" | "yellow" | "green" | "blue";
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/todos")
      .then((r) => r.json())
      .then((data) => { setTodos(data.todos || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const priorityDot = (p: string) => {
    const colors: Record<string, string> = { red: "bg-[var(--danger)]", yellow: "bg-[var(--warning)]", green: "bg-[var(--success)]", blue: "bg-[var(--info)]" };
    return colors[p] || colors.blue;
  };

  return (
    <Widget title="Tasks" icon="📋">
      {loading ? (
        <div className="text-[var(--text-muted)] text-sm">Loading...</div>
      ) : (
        <div className="space-y-1.5 max-h-72 overflow-y-auto">
          {todos.map((t, i) => (
            <div key={i} className={`flex items-start gap-2 text-sm py-1 ${t.done ? "opacity-40" : ""}`}>
              <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${priorityDot(t.priority)}`} />
              <span className={t.done ? "line-through" : ""}>{t.text}</span>
            </div>
          ))}
        </div>
      )}
    </Widget>
  );
}
