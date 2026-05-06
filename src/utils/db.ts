import { createServerFn } from "@tanstack/react-start";
import { getSupabaseServerClient } from "./supabase";
import { type Category } from "#/data/types";
import { useAppSession } from "./session";

export const getuserdata = createServerFn({method : 'GET'})
.inputValidator(
    (data: {
      userid : string
    }) => data
  )
.handler(
  async ({data}) => {
      const db = getSupabaseServerClient()
      
      const session = await useAppSession()
      const userId = session.data.userId
      if (!userId) return null

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

export const getuserpostsFn = createServerFn({method : 'GET'})
.handler(
  async () => {
      const db = getSupabaseServerClient()
      
      const session = await useAppSession()
      const userId = session.data.userId
      if (!userId) return null

      const { data: posts } = await db
        .from('items')
        .select('title, description, price, image_url, category,created_at,id')
        .eq('user_id', userId)

      return posts ?? [];
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

    const session = await useAppSession()
    const userId = session.data.userId
    if (!userId) return null

    const { error } = await db.from("items").insert({
      user_id: userId,
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

export const removepostFn = createServerFn({method:'GET'})
  .inputValidator(
      (data: { id: string }) => data
  )
  .handler(async ({ data }) => {
    const db = getSupabaseServerClient();
    
    const session = await useAppSession()
    const userId = session.data.userId
    if (!userId) return null

    const { data : res } = await db
      .from('items')
      .delete()
      .eq('id', data.id)

      return res;
  }
)


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

export const reportadFn = createServerFn({method : 'GET'}).inputValidator(
  (data : {
    id : string
  }) => data
  )
  .handler(
    async ({data})=> {
      
      const db = getSupabaseServerClient();

      const session = await useAppSession()
      const userId = session.data.userId
      if (!userId) return null
      
      const { error } = await db.from("reports").insert({
        user_id : data.id
      });

      if (error) throw new Error(error.message);
      return { success: true };
    }
  )