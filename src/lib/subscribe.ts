import { supabase } from "./supabase";

interface Holding {
  symbol: string;
  quantity: number;
}

interface SubscribeResult {
  success: boolean;
  message: string;
}

export async function saveSubscriber(
  email: string,
  holdings: Holding[]
): Promise<SubscribeResult> {
  const normalizedEmail = email.trim().toLowerCase();

  const { error } = await supabase
    .from("subscribers")
    .insert([{ email: normalizedEmail, holdings, source: "onboarding" }]);

  if (error) {
    // Postgres unique violation → email đã tồn tại
    if (error.code === "23505") {
      return { success: false, message: "Email này đã được đăng ký trước đó." };
    }
    return { success: false, message: "Có lỗi xảy ra. Vui lòng thử lại." };
  }

  return { success: true, message: "Đăng ký thành công!" };
}
