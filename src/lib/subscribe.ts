import { supabase } from "./supabase";

export type SubscribeSource = "hero" | "footer";

export interface SubscribeResult {
  success: boolean;
  message: string;
}

/**
 * Lưu email đăng ký vào bảng `subscribers` trên Supabase.
 *
 * Schema bảng `subscribers`:
 *   id          - uuid, primary key, default gen_random_uuid()
 *   email       - text, not null, unique
 *   source      - text ('hero' | 'footer')
 *   created_at  - timestamptz, default now()
 */
export async function subscribeEmail(
  email: string,
  source: SubscribeSource = "hero"
): Promise<SubscribeResult> {
  const trimmed = email.trim().toLowerCase();

  if (!trimmed) {
    return { success: false, message: "Vui lòng nhập email." };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { success: false, message: "Email không hợp lệ." };
  }

  try {
    const { error } = await supabase
      .from("subscribers")
      .insert([{ email: trimmed, source }]);

    if (error) {
      // Unique constraint violation → already subscribed
      if (error.code === "23505") {
        return {
          success: false,
          message: "Email này đã được đăng ký trước đó.",
        };
      }
      console.error("Supabase insert error:", error);
      return {
        success: false,
        message: "Có lỗi xảy ra. Vui lòng thử lại sau.",
      };
    }

    return {
      success: true,
      message: "Đăng ký thành công! Cảm ơn bạn.",
    };
  } catch (err) {
    console.error("Unexpected error:", err);
    return {
      success: false,
      message: "Không thể kết nối. Vui lòng thử lại sau.",
    };
  }
}
