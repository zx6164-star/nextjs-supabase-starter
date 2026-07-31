"use client";

import { Task } from "@/types/database";
import { toggleTask, deleteTask } from "@/app/protected/tasks/actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export function TaskItem({ task }: { task: Task }) {
  return (
    <li className="flex items-center gap-3 rounded-md border p-3">
      <Checkbox
        checked={task.is_completed}
        onCheckedChange={(checked) => toggleTask(task.id, checked === true)}
      />
      <span
        className={`flex-1 text-sm ${task.is_completed ? "text-muted-foreground line-through" : ""}`}
      >
        {task.title}
      </span>
      <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)}>
        삭제
      </Button>
    </li>
  );
}
