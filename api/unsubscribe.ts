import { createClient } from "@supabase/supabase-js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: any, res: any) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body ?? {};
  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Thiếu email." });
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return res.status(400).json({ error: "Email không hợp lệ." });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: "Lỗi cấu hình server." });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

  const { error, count } = await supabaseAdmin
    .from("subscribers")
    .delete({ count: "exact" })
    .eq("email", normalizedEmail);

  if (error) {
    console.error("unsubscribe error:", error);
    return res.status(500).json({ error: "Có lỗi xảy ra. Vui lòng thử lại." });
  }

  if (count === 0) {
    return res.status(404).json({ error: "Email này chưa đăng ký dịch vụ của Wealbee." });
  }

  return res.status(200).json({ success: true });
}
