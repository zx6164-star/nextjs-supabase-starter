"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addTask(formData: FormData) {
  const title = formData.get("title")?.toString().trim();
  if (!title) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("tasks").insert({ user_id: user.id, title });
  revalidatePath("/protected/tasks");
}

export async function toggleTask(id: string, isCompleted: boolean) {
  const supabase = await createClient();
  await supabase.from("tasks").update({ is_completed: isCompleted }).eq("id", id);
  revalidatePath("/protected/tasks");
}

export async function deleteTask(id: string) {
  const supabase = await createClient();
  await supabase.from("tasks").delete().eq("id", id);
  revalidatePath("/protected/tasks");
}
