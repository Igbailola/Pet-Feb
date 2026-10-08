-- Verification submission detail fields captured from the Buy Small
-- application / verification form. Existing rows get NULL until re-submitted.

alter table public.verification_submissions
  add column if not exists id_type            text,
  add column if not exists id_number          text,
  add column if not exists employment_status  text,
  add column if not exists monthly_income     text,
  add column if not exists address            text,
  add column if not exists state              text,
  add column if not exists system_name        text,
  add column if not exists down_payment       numeric,
  add column if not exists monthly_repayment  numeric;