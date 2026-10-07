-- Petfeb: media storage bucket + upload rules (build step 2)
-- Public bucket "media". Only staff holding the matching admin section may upload,
-- replace or delete files, and only inside that section's folder.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 5242880,
        array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Which section may manage which top-level folder of the bucket.
create function public.can_manage_media_folder(folder text) returns boolean
language sql stable security definer set search_path = public as $$
  select case folder
    when 'products'     then public.has_section('products')
    when 'accessories'  then public.has_section('products')
    when 'blog'         then public.has_section('blog')
    when 'testimonials' then public.has_section('testimonials')
    when 'cms'          then public.has_section('cms')
    else false
  end;
$$;

create policy media_public_read on storage.objects for select
  using (bucket_id = 'media');
create policy media_staff_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and public.can_manage_media_folder((storage.foldername(name))[1]));
create policy media_staff_update on storage.objects for update to authenticated
  using (bucket_id = 'media' and public.can_manage_media_folder((storage.foldername(name))[1]))
  with check (bucket_id = 'media' and public.can_manage_media_folder((storage.foldername(name))[1]));
create policy media_staff_delete on storage.objects for delete to authenticated
  using (bucket_id = 'media' and public.can_manage_media_folder((storage.foldername(name))[1]));
