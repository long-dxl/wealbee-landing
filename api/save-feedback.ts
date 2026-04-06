import { createClient } from "@supabase/supabase-js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { type, rating, name, email, subject, message } = req.body ?? {};

  if (!type || !name || !email || !subject || !message) {
    return res.status(400).json({ error: "Thiếu dữ liệu." });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: "Lỗi cấu hình server." });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { error } = await supabase.from("feedback").insert([{
    type,
    rating: rating ?? null,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: subject.trim(),
    message: message.trim(),
  }]);

  if (error) {
    console.error("save-feedback error:", error);
    return res.status(500).json({ error: "Lỗi lưu dữ liệu." });
  }

  return res.status(200).json({ success: true });
}
