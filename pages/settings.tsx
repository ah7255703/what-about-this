import MainLayout from "layouts/main";
import React from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<object>> {
  const { auth, from } = createServerSupabaseClient(ctx);
  const user = await auth.getUser();
  if (!user.data.user) {
    return {
      redirect: {
        destination: "/welcome",
        permanent: false,
      },
    };
  } else {
    const { data, error } = await from("settings")
      .select("*")
    return {
      props: {
        data,
        error,
      },
    };
  }
}

function SettingsPage(props: any) {
  console.log(props);

  return (
    <MainLayout>
      <div>SettingsPage</div>
    </MainLayout>
  );
}

export default SettingsPage;
