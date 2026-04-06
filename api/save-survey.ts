import { createClient } from "@supabase/supabase-js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, age_group, experience, referral } = req.body ?? {};

  if (!email || !age_group || !experience || !referral) {
    return res.status(400).json({ error: "Thiếu dữ liệu." });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: "Lỗi cấu hình server." });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { error } = await supabase.from("survey_responses").insert([{
    email: email.trim().toLowerCase(),
    age_group,
    experience,
    referral,
  }]);

  if (error) {
    console.error("save-survey error:", error);
    return res.status(500).json({ error: "Lỗi lưu dữ liệu." });
  }

  return res.status(200).json({ success: true });
}
