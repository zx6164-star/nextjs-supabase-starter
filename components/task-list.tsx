import { Task } from "@/types/database";
import { TaskItem } from "@/components/task-item";

export function TaskList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        아직 할 일이 없습니다. 위에서 추가해보세요.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
