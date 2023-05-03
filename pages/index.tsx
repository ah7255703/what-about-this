import { Button, Group } from "@mantine/core";
import MainLayout from "layouts/main";
import { GetStaticPropsContext, type NextPage } from "next";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { type Database } from "db";
import { useTranslations } from "next-intl";

const Home: NextPage = () => {
  const client = useSupabaseClient<Database>();
  const t = useTranslations("login");

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
          {t("loginbtn")}
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
export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`locales/${context.locale}.json`)).default,
    },
  };
}
export default Home;
