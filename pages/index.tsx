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
      <div>{t("loginbtn")}</div>
      <div dir="auto">Login</div>
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
