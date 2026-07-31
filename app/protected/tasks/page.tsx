import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TaskForm } from "@/components/task-form";
import { TaskList } from "@/components/task-list";
import { Task } from "@/types/database";

async function TasksContent() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  return <TaskList tasks={(tasks ?? []) as Task[]} />;
}

export default function TasksPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl">
      <h1 className="font-bold text-2xl">할 일 목록</h1>
      <TaskForm />
      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">불러오는 중...</p>
        }
      >
        <TasksContent />
      </Suspense>
    </div>
  );
}
