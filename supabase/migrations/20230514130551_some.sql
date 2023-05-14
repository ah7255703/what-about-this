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

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();


create extension if not exists "moddatetime" with schema "extensions";


create sequence "public"."options_id_seq";

create sequence "public"."polls_id_seq";

create sequence "public"."votes_id_seq";

create table "public"."options" (
    "id" integer not null default nextval('options_id_seq'::regclass),
    "label" character varying(255) not null,
    "image_url" character varying(255),
    "poll_id" integer
);


alter table "public"."options" enable row level security;

create table "public"."polls" (
    "id" integer not null default nextval('polls_id_seq'::regclass),
    "title" character varying(255) not null,
    "description" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "published" boolean not null default false,
    "is_active" boolean not null default true,
    "max_votes" integer not null default 20,
    "total_votes" bigint not null default '0'::bigint
);


alter table "public"."polls" enable row level security;

create table "public"."profiles" (
    "id" uuid not null,
    "name" text,
    "avatar" text,
    "bio" text,
    "website" character varying(255),
    "twitter_handle" character varying(255),
    "linkedin_profile" character varying(255),
    "favorite_topics" text[]
);


alter table "public"."profiles" enable row level security;

create table "public"."settings" (
    "id" uuid not null,
    "email_notifications" boolean default true,
    "dark_mode" boolean default false
);


alter table "public"."settings" enable row level security;

create table "public"."votes" (
    "id" integer not null default nextval('votes_id_seq'::regclass),
    "option_id" integer,
    "user_id" uuid not null,
    "voted_at" timestamp without time zone,
    "device_info" text,
    "user_agent" text
);


alter table "public"."votes" enable row level security;

alter sequence "public"."options_id_seq" owned by "public"."options"."id";

alter sequence "public"."polls_id_seq" owned by "public"."polls"."id";

alter sequence "public"."votes_id_seq" owned by "public"."votes"."id";

CREATE UNIQUE INDEX options_pkey ON public.options USING btree (id);

CREATE UNIQUE INDEX polls_pkey ON public.polls USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX settings_pkey ON public.settings USING btree (id);

CREATE UNIQUE INDEX votes_pkey ON public.votes USING btree (id);

alter table "public"."options" add constraint "options_pkey" PRIMARY KEY using index "options_pkey";

alter table "public"."polls" add constraint "polls_pkey" PRIMARY KEY using index "polls_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."settings" add constraint "settings_pkey" PRIMARY KEY using index "settings_pkey";

alter table "public"."votes" add constraint "votes_pkey" PRIMARY KEY using index "votes_pkey";

alter table "public"."options" add constraint "options_poll_id_fkey" FOREIGN KEY (poll_id) REFERENCES polls(id) not valid;

alter table "public"."options" validate constraint "options_poll_id_fkey";

alter table "public"."polls" add constraint "polls_max_votes_check" CHECK ((max_votes > 10)) not valid;

alter table "public"."polls" validate constraint "polls_max_votes_check";

alter table "public"."polls" add constraint "polls_total_votes_check" CHECK ((total_votes >= 0)) not valid;

alter table "public"."polls" validate constraint "polls_total_votes_check";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."settings" add constraint "settings_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."settings" validate constraint "settings_id_fkey";

alter table "public"."votes" add constraint "votes_option_id_fkey" FOREIGN KEY (option_id) REFERENCES options(id) not valid;

alter table "public"."votes" validate constraint "votes_option_id_fkey";

alter table "public"."votes" add constraint "votes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."votes" validate constraint "votes_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  -- Insert a new row into the profiles table
  insert into public.profiles (id)
  values (new.id);

  -- Insert a new row into the settings table
  insert into public.settings (id)
  values (new.id);

  return new;
end;
$function$
;

create policy "only_the_creator_can_edit_but_anyone_can_create"
on "public"."options"
as permissive
for insert
to anon
with check (true);



