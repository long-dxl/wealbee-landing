create table if not exists demo_requests (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  email           text not null,
  ho_ten          text not null,
  dien_thoai      text,
  cong_ty         text,
  loai_nha_dau_tu text,
  loi_nhan        text not null
);

alter table demo_requests enable row level security;

-- Không tạo policy public: chỉ service role (qua /api/save-demo) được ghi/đọc.
