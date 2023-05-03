import { Button, Group } from "@mantine/core";
import MainLayout from "layouts/main";
import { GetServerSidePropsContext, type NextPage } from "next";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { type Database } from "db";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const supa = createServerSupabaseClient(ctx);
  console.log(await supa.auth.getSession().then((d) => d.data));

  return {
    props: {},
  };
}

const Home: NextPage = () => {
  const client = useSupabaseClient<Database>();
  return (
    <MainLayout>
      <Group>
        <Button
          onClick={() => {
            client.auth.signInWithPassword({
              email: "ah7255703@gmail.com",
              password: "123465798",
            });
          }}
        >
          login
        </Button>
        <Button
          onClick={() => {
            client.auth.signUp({
              email: "ah7255703@gmail.com",
              password: "123465798",
            });
          }}
        >
          signup
        </Button>
      </Group>
    </MainLayout>
  );
};

export default Home;
