"use server";

import { redirect } from "next/navigation";

export const login = async (formData: FormData) => {
  const formdata = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  redirect("/home");
};
