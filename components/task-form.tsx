"use client";

import { useRef } from "react";
import { addTask } from "@/app/protected/tasks/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TaskForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addTask(formData);
        formRef.current?.reset();
      }}
      className="flex gap-2"
    >
      <Input name="title" placeholder="할 일을 입력하세요" required />
      <Button type="submit">추가</Button>
    </form>
  );
}
