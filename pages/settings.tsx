import MainLayout from "@ui/layouts/main";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "db";
import { useSupaClient } from "@ui/hooks/useSupaClient";
import Image from "next/image";
import WAvatar from "@ui/components/Avatar";
import Button from "@ui/components/Button";
import { BiPencil, BiX } from "react-icons/bi";
import { TabsTrigger, Tabs, TabsContent, TabsList } from "@ui/components/Tabs";
import Input from "@ui/components/Input";

// export async function getServerSideProps(
//   ctx: GetServerSidePropsContext
// ): Promise<GetServerSidePropsResult<object>> {
//   const supa = createServerSupabaseClient<Database>(ctx);
//   const session = await supa.auth.getSession();
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/welcome",
//         permanent: false,
//       },
//     };
//   } else {
//     const settings = await supa
//       .from("settings")
//       .select("*")
//       .eq("id", session.data.session?.user.id);

//     const profile = await supa
//       .from("profiles")
//       .select("*")
//       .eq("id", session.data.session?.user.id);

//     return {
//       props: {
//         settings,
//         profile,
//       },
//     };
//   }
// }

type Tag = string;

function TagInput({
  initial,
  render,
}: {
  render: (
    tags: string[],
    handleTagDelete: (tag: string) => void
  ) => React.ReactNode;
  initial: Tag[];
}) {
  const [tags, setTags] = useState(initial);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim() !== "") {
        if (tags.includes(inputValue.trim())) {
          setInputValue("");
          return;
        }
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleTagDelete = (tag: string) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  return (
    <>
      <input
        className="w-fit p-2 border-none outline-none"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      {render(tags, handleTagDelete)}
    </>
  );
}
function ProfileSettings() {
  return (
    <div>
      <label htmlFor="bio" className="text-slate-400 text-xl">
        Bio
      </label>
      <textarea
        id="bio"
        className="w-full text-xl font-normal border border-slate-700 rounded p-2"
      />
      <div className="flex items-center gap-1">
        <TagInput
          initial={[]}
          render={(tags, handleDelete) => (
            <div className="flex items-center gap-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="px-2 w-fit flex text-lg items-center gap-2 space-x-1 py-0.5 rounded-full text-slate-400 border border-slate-500"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => handleDelete(tag)}
                    className="text-xs p-1 text-slate-500"
                  >
                    <BiX />
                  </button>
                </div>
              ))}
            </div>
          )}
        />
      </div>
    </div>
  );
}
function AccountSettings() {
  return (
    <div className="grid grid-cols-6 [&>*]:col-span-full sm:[&>*]:col-span-3 gap-4">
      <Input
        labelClassName="text-lg"
        isize="lg"
        className="w-full"
        label="first name"
      />
      <Input
        labelClassName="text-lg"
        isize="lg"
        className="w-full"
        label="last name"
      />
      <Input
        labelClassName="text-lg"
        isize="lg"
        type="email"
        className="w-full"
        label="Email"
      />
    </div>
  );
}
function PasswordSettings() {
  return (
    <div className="space-y-4">
      <Input type="password" isize="xl" label="Current" />
      <Input type="password" isize="xl" label="New Password" />
      <Input type="password" isize="xl" label="New Password Confirmation" />
      <div className="container flex-center">
        <Button className="w-1/2 bg-slate-600">Change</Button>
      </div>
    </div>
  );
}

function SettingsPage(props: any) {
  const { supa, session } = useSupaClient();

  return (
    <MainLayout>
      <div className="max-h-full w-full overflow-auto pb-10">
        <section className="w-full px-5 py-2 z-30 max-h-full overflow-auto sticky top-0">
          <div className="cover relative sm:max-w-screen-lg aspect-video overflow-hidden h-auto max-h-[300px] mt-2 rounded-xl container bg-slate-600 w-full mx-auto">
            <Image src={"https://picsum.photos/700/300"} fill alt="" />
            <div className="absolute top-2 left-2 overflow-hidden p-2">
              <label
                htmlFor="image_input"
                className=" bg-white p-1 rounded-full text-slate-700 flex items-center justify-center cursor-pointer"
              >
                <BiPencil size={20} />
              </label>
            </div>
          </div>
        </section>
        <section className="container max-w-screen-xl relative -mt-20 bg-white rounded-t-xl p-5 z-50">
          <div className="absolute w-full top-0 p-2 flex-center left-0">
          <div className="w-20 h-2 rounded-full bg-slate-100 " />
          </div>
          <div className="flex items-center w-full justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Settings
              </h1>
              <p className="text-sm font-normal text-slate-500 mt-0.5">
                control the application settings
              </p>
            </div>
            <div>
              <Button className="px-5" size="xl" circle>
                Save
              </Button>
            </div>
          </div>
          <div className="flex items-start lg:flex-row flex-col justify-between gap-5 p-5 lg:divide-x mt-3">
            <div className="lg:w-1/3 w-full flex items-center flex-col justify-center gap-3 rounded-lg">
              <div className="relative">
                <WAvatar size="xl" fallback={"AH"} />
                <input
                  type="file"
                  id="image_input"
                  accept="images/*"
                  className="hidden"
                />
                <label
                  htmlFor="image_input"
                  className="absolute bg-white p-1 rounded-full text-slate-700 bottom-1 right-1 flex items-center justify-center cursor-pointer"
                >
                  <BiPencil size={20} />
                </label>
              </div>
              <div>
                <h2 className="text-slate-600 font-normal text-lg">
                  Ahmad Hassan
                </h2>
              </div>
            </div>
            <div className="lg:flex-1 w-full">
              <Tabs
                defaultValue="profile"
                className="w-full flex-col flex items-start"
              >
                <TabsList className="bg-transparent justify-start border-b pb-2 w-full rounded-none">
                  <TabsTrigger value="profile" className="tabby-tabs">
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="account" className="tabby-tabs">
                    Account
                  </TabsTrigger>
                  <TabsTrigger value="password" className="tabby-tabs">
                    Password
                  </TabsTrigger>
                </TabsList>
                <div className="p-2 w-full">
                  <TabsContent value="account">
                    <AccountSettings />
                  </TabsContent>
                  <TabsContent value="profile">
                    <ProfileSettings />
                  </TabsContent>
                  <TabsContent value="password">
                    <PasswordSettings />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default SettingsPage;
