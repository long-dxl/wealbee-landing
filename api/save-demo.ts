import { createClient } from "@supabase/supabase-js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, ho_ten, dien_thoai, cong_ty, loai_nha_dau_tu, loi_nhan } = req.body ?? {};

  if (!email || !ho_ten || !loi_nhan) {
    return res.status(400).json({ error: "Thiếu dữ liệu bắt buộc." });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: "Lỗi cấu hình server." });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { error } = await supabase.from("demo_requests").insert([{
    email: email.trim().toLowerCase(),
    ho_ten: ho_ten.trim(),
    dien_thoai: dien_thoai?.trim() || null,
    cong_ty: cong_ty?.trim() || null,
    loai_nha_dau_tu: loai_nha_dau_tu || null,
    loi_nhan: loi_nhan.trim(),
  }]);

  if (error) {
    console.error("save-demo error:", error);
    return res.status(500).json({ error: "Lỗi lưu dữ liệu." });
  }

  return res.status(200).json({ success: true });
}
