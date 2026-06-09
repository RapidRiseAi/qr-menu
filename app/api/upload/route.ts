import { createClient } from "@/lib/supabase/server";
import { APP_CONFIG } from "@/lib/constants";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File))
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  const path = `${user.id}/${Date.now()}-${file.name.replace(/[^a-z0-9.\-_]/gi, "-")}`;
  const { error } = await supabase.storage
    .from(APP_CONFIG.storageBucket)
    .upload(path, file, { upsert: false, contentType: file.type });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  const { data } = supabase.storage
    .from(APP_CONFIG.storageBucket)
    .getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
