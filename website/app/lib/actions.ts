"use server";

import { prisma } from "@/app/lib/db";

export async function addWorker(formData: FormData) {
  try {
    const newWorker = await prisma.user.create({
      data: {
        username: formData.get("username") as string,
        password: formData.get("password") as string, // ⚠️ Hash passwords before storing in production!
        position: formData.get("position") as string,
        name: formData.get("name") as string,
        role: formData.get("role") as string,
        phone_number: formData.get("phone_number") as string | null,
        id_team: formData.get("id_team") ? parseInt(formData.get("id_team") as string) : null,
      },
    });

    return { success: true, worker: newWorker };
  } catch (error) {
    console.error("Error adding worker:", error);
    return { success: false};
  }
}
