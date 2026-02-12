// "use server";

// import { createClient } from "@/utils/supabase/server";
// import { revalidatePath } from "next/cache";

// // Return type for consistency
// type ActionState = { success: boolean; error?: string };

// export async function getTasks() {
//   const supabase = await createClient();
//   const { data, error } = await supabase
//     .from("tasks")
//     .select("*")
//     .order("created_at", { ascending: false });

//   if (error) {
//     console.error("getTasks error:", error);
//     return [];
//   }
//   return data || [];
// }

// export async function addTask(
//   prevState: ActionState, // ← no | null here
//   formData: FormData,
// ): Promise<ActionState> {
//   const supabase = await createClient();
//   const title = formData.get("title") as string;

//   if (!title?.trim()) {
//     return { success: false, error: "Title is required" };
//   }

//   const { error } = await supabase.from("tasks").insert({
//     title: title.trim(),
//     completed: false,
//   });

//   if (error) {
//     console.error("addTask error:", error);
//     return { success: false, error: error.message || "Failed to add task" };
//   }

//   revalidatePath("/");
//   return { success: true };
// }

// export async function toggleTask(id: string, completed: boolean) {
//   const supabase = await createClient();
//   const { error } = await supabase
//     .from("tasks")
//     .update({ completed: !completed })
//     .eq("id", id);

//   if (error) {
//     console.error("toggleTask error:", error);
//   } else {
//     revalidatePath("/");
//   }
// }

// export async function deleteTask(id: string) {
//   const supabase = await createClient();
//   const { error } = await supabase.from("tasks").delete().eq("id", id);

//   if (error) {
//     console.error("deleteTask error:", error);
//   } else {
//     revalidatePath("/");
//   }
// }

"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getTasks() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });
  return data || [];
}

export async function addTask(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;

  if (!title?.trim()) return { success: false, error: "Title required" };

  const { error } = await supabase
    .from("tasks")
    .insert({ title: title.trim(), completed: false });

  if (error) return { success: false, error: error.message };

  revalidatePath("/");
  return { success: true, error: "" };
}

export async function toggleTask(id: string, completed: boolean) {
  const supabase = await createClient();
  await supabase.from("tasks").update({ completed: !completed }).eq("id", id);
  revalidatePath("/");
}

export async function deleteTask(id: string) {
  const supabase = await createClient();
  await supabase.from("tasks").delete().eq("id", id);
  revalidatePath("/");
}
