import { NextResponse } from "next/server";
import { STORAGE_BUCKET } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await request.formData();
  const file = form.get("file");
  const restaurant_group_id = String(form.get("restaurant_group_id") || "");
  const branch_id = String(form.get("branch_id") || "") || null;
  if (!(file instanceof File))
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  const cleanName = file.name.replace(/[^a-z0-9.\-_]/gi, "-");
  const path = `${user.id}/${Date.now()}-${cleanName}`;
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, { upsert: false, contentType: file.type });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  if (restaurant_group_id)
    await supabase
      .from("media_assets")
      .insert({
        restaurant_group_id,
        branch_id,
        uploaded_by: user.id,
        file_url: data.publicUrl,
        file_type: file.type,
        file_name: file.name,
        alt_text: String(form.get("alt_text") || ""),
      });
  return NextResponse.json({ url: data.publicUrl });
}
