import { createServerFn } from "@tanstack/react-start";
import { getSupabaseServerClient } from "./supabase";
import { type Category } from "#/data/types";

export const getuserdata = createServerFn({method : 'GET'})
.inputValidator(
    (data: {
      userid : string
    }) => data
  )
.handler(
  async ({data}) => {
      const db = getSupabaseServerClient()
      
      const { data: authUser } = await db.auth.getUser()
      if (!authUser.user) return null

      const { data: profile } = await db
        .from('users')
        .select('name, year, contact, email')
        .eq('id', data.userid)
        .single()

      return profile 
  }
)

export const getallpostsFn = createServerFn({method : 'GET'}).handler(
  async () => {
    const db = getSupabaseServerClient();
    const { data:Posts }= await db
      .from('items')
      .select('user_id,title,description,price,image_url,category,created_at');
    return Posts ?? [];
  }
)

export const insertItemFn = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      title: string;
      description: string;
      price: number | null;
      category: Category;
      image_url: string;
    }) => data
  )
  .handler(async ({ data }) => {
    const db = getSupabaseServerClient();

    const { data: authUser } = await db.auth.getUser();
    if (!authUser.user) throw new Error("Not authenticated");

    const { error } = await db.from("items").insert({
      user_id: authUser.user.id,
      title: data.title,
      description: data.description || null,
      price: data.price,
      category: data.category,
      image_url: data.image_url,
      is_available: true,
    });

    if (error) throw new Error(error.message);
    return { success: true };
  });

// cant be a Serverfn, because of File API
export async function uploadToCloudinary(file: File): Promise<string> {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME!;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET!;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
  
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData }
    );
  
    if (!res.ok) throw new Error("Cloudinary upload failed");
    const json = await res.json();
    return json.secure_url as string;
}