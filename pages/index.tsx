import React from "react";
import MainLayout from "layouts/main";
import { GetStaticPropsContext, type NextPage } from "next";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { type Database } from "db";
import WAvatar from "components/Avatar";
import Button from "components/Button";
import { BiPlusCircle } from "react-icons/bi";
import PollListView from "components/PollListView";



const Home: NextPage = () => {
  return (
    <MainLayout>
      <div className="overflow-auto max-h-full ">
        <div className="sm:max-w-[500px] w-full mx-auto px-2 py-10">
          <div className="space-y-3">
            <div className="w-full block bg-white p-2 rounded-full">
              <div className="flex w-full items-center gap-2">
              <WAvatar
                fallback="AH"
                size="md"
                src="https://picsum.photos/700/300"
                className="border border-salte-600"
              />
              <Button className="flex-1 p-3 rounded-full text-center flex items-center justify-center bg-slate-100 text-slate-800" size='xl' ><BiPlusCircle size={27}/></Button>
              </div>

              </div>
              <div className="w-full rounded-full h-4 block bg-slate-200">

            </div>
            <PollListView />
            <PollListView />
            <PollListView />
            <PollListView />
            <PollListView />
            <PollListView />
            <PollListView />
            <div className="w-full">
              <Button fluid intent="outline">
                Load more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  console.log(context.locale);

  return {
    props: {
      messages: (await import(`locales/${context.locale}.json`)).default,
    },
  };
}
export default Home;
