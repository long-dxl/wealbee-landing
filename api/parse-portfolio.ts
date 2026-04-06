const ALLOWED_MIME_TYPES = ["application/pdf", "image/png", "image/jpeg"];

const PROMPT = `Bạn là trợ lý phân tích tài chính chuyên về thị trường chứng khoán Việt Nam.

Từ tài liệu này (sao kê tài khoản chứng khoán, ảnh chụp màn hình danh mục, hoặc bảng Excel/PDF từ các công ty chứng khoán như SSI, VPS, VCBS, MBS, HSC...), hãy trích xuất danh sách mã cổ phiếu và số lượng cổ phiếu đang nắm giữ.

Quy tắc:
- symbol: mã cổ phiếu viết HOA (VD: VNM, VCB, HPG, FPT, MSN)
- quantity: số lượng cổ phiếu đang nắm giữ (số nguyên dương, không tính cổ phiếu đã bán)
- Chỉ lấy những mã có số lượng > 0
- Bỏ qua tiền mặt, trái phiếu, chứng chỉ quỹ
- Tối đa 10 mã

Trả về JSON và CHỈ JSON, không có text khác:
{"holdings": [{"symbol": "VNM", "quantity": 100}, {"symbol": "VCB", "quantity": 50}]}

Nếu không tìm thấy danh mục cổ phiếu nào, trả về: {"holdings": []}`;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fileBase64, mimeType } = req.body ?? {};

  if (!fileBase64 || !mimeType) {
    return res.status(400).json({ error: "Thiếu dữ liệu file." });
  }

  if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
    return res.status(400).json({ error: "Định dạng file không được hỗ trợ." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Lỗi cấu hình server." });
  }

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: PROMPT },
                { inlineData: { mimeType, data: fileBase64 } },
              ],
            },
          ],
          generationConfig: {
            temperature: 0,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errBody = await geminiRes.text();
      console.error("Gemini API error:", geminiRes.status, errBody);
      return res.status(502).json({ error: "Không thể kết nối AI. Vui lòng thử lại." });
    }

    const data = await geminiRes.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";

    let parsed: { holdings?: { symbol: string; quantity: number }[] };
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { holdings: [] };
    }

    // Sanitize output
    const holdings = (parsed.holdings ?? [])
      .filter(
        (h) =>
          typeof h.symbol === "string" &&
          h.symbol.length > 0 &&
          typeof h.quantity === "number" &&
          h.quantity > 0
      )
      .map((h) => ({ symbol: h.symbol.toUpperCase().trim(), quantity: Math.floor(h.quantity) }))
      .slice(0, 10);

    return res.status(200).json({ holdings });
  } catch (err) {
    console.error("parse-portfolio error:", err);
    return res.status(500).json({ error: "Lỗi xử lý file. Vui lòng thử lại." });
  }
}
