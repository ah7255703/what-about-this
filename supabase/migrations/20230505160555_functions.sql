set check_function_bodies = off;

CREATE OR REPLACE FUNCTION auth.handle_created_user()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN 
  INSERT INTO profiles (user_id, name)
  VALUES (new.id, new.user_metadata.name);
  RETURN new;
END;$function$
;

CREATE OR REPLACE FUNCTION auth.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  INSERT INTO profiles (user_id, name)
  VALUES (new.id, new.email);
  RETURN NEW;
END;$function$
;

CREATE TRIGGER on_created_user AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION auth.handle_new_user();


create extension if not exists "moddatetime" with schema "extensions";


create table "public"."profiles" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "name" text,
    "avatar_url" text
);


alter table "public"."profiles" enable row level security;

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

create policy "only authenticated and profile owner can update"
on "public"."profiles"
as permissive
for update
to authenticated
using ((auth.uid() = id));


CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');


