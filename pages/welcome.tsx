import React, { ReactNode } from "react";
import { type ISlideConfig, SlideParallaxType } from "react-page-slides";
import dynamic from "next/dynamic";
import Button from "@ui/components/Button";
import { GiRocket } from "react-icons/gi";
import { FaBalanceScale } from "react-icons/fa";
import { DiOpensource, DiGithub } from "react-icons/di";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/components/Tabs";
import Input from "@ui/components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, registerSchema } from "utils/schemas";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "db";
import toast from "react-hot-toast";
const PageSlides = dynamic(
  () => import("react-page-slides").then((v) => v.PageSlides),
  { ssr: false }
);

function Feature({
  feture,
  icon,
  descri,
}: {
  feture: string;
  icon: ReactNode;
  descri: string;
}) {
  return (
    <div className="flex flex-col p-2">
      <div className="text-2xl text-white p-3 rounded-lg bg-gradient-to-tr from-blue-500 to-blue-400 w-fit h-fit">
        {icon}
      </div>
      <div className="">
        <h4 className="text-sm font-medium text-slate-800 my-1">{feture}</h4>
        <p className="text-xs text-slate-600">{descri}</p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section>
      <div className="container max-w-screen-md sm:px-[75px] px-10">
        <div className="sm:text-start text-center mt-20">
          <h1 className="sm:text-6xl text-3xl font-extrabold sm:leading-[1.4] text-slate-800">
            Get instant feedback on any question with 'What About This'
          </h1>
          <p className="mt-3 sm:text-xl text-lg font-medium text-slate-600">
            Create polls, share with friends, and get real-time results
          </p>
        </div>
        <div className="flex items-start gap-3 mt-10">
          <Feature
            icon={<FaBalanceScale />}
            descri="Any time, no limits"
            feture="free forwever"
          />
          <Feature
            icon={<DiOpensource />}
            descri="Fork & Edit"
            feture="open source"
          />
          <Feature
            icon={<GiRocket />}
            descri="get instant realtime results"
            feture="Realtime"
          />
        </div>
        <div className="flex items-center justify-start gap-3 mt-3">
          <Link
            className="text-xl font-semibold px-6 py-2 flex items-center justify-center gap-1 bg-black rounded-lg w-fit text-white"
            href={"https://github.com/ah7255703"}
          >
            Github
            <DiGithub size={27} />
          </Link>
          <Button intent={"primary"} className="px-6 py-2">
            Join Now
          </Button>
        </div>
      </div>
    </section>
  );
}

function LoginForm() {
  const { auth } = useSupabaseClient<Database>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(loginSchema),
  });

  return (
    <>
      <div className="">
        <h2 className="text-3xl font-semibold text-slate-900 text-center">
          Welcome again
        </h2>
        <p className="text-center my-1 text-sm font-light text-slate-500">
          ready to continue the journey?
        </p>
      </div>
      <form
        onSubmit={handleSubmit(async ({ password, email }) => {
          const { data, error } = await auth.signInWithPassword({
            email: email,
            password: password,
          });
          if (error) {
            toast.error(error.message);
          }
          if (!error && data.user) {
            toast.success("Logged in successfully");
          }
        })}
        className="w-full"
      >
        <Input
          label="Email"
          required
          aria-required
          {...register("email")}
          isize='xl'
          type="email"
          error={errors.email?.message}
          />
        <Input
          label="password"
          isize='xl'
          required
          aria-required
          {...register("password")}
          type="password"
          error={errors.password?.message}
        />
        <Button intent="primary" fluid className="mt-2 mx-auto">
          Login
        </Button>
      </form>
    </>
  );
}
function RegisterForm() {
  const { auth } = useSupabaseClient<Database>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: "", password: "", name: "" },
    resolver: yupResolver(registerSchema),
  });

  return (
    <>
      <div className="">
        <h2 className="text-3xl font-semibold text-slate-900 text-center">
          Welcome
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(async ({ email, password, name }) => {
          const { data, error } = await auth.signUp({
            email: email,
            password: password,
            options: {
              data: {
                name: name,
              },
            },
          });
          if (error) {
            toast.error(`an error occured ${error.message}`);
          }
          if (data && !error) {
            toast.success("Account Created Successfully");
          }
        })}
        className="w-full"
      >
        <Input
          label="Name"
          error={errors.name?.message}
          {...register("name")}
          type="text"
          isize='xl'

        />
        <Input
          label="Email"
          error={errors.email?.message}
          {...register("email")}
          isize='xl'
          type="email"
        />
        <Input
          label="password"
          error={errors.password?.message}
          {...register("password")}
          isize='xl'
          type="password"
        />
        <Button
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
          intent="primary"
          fluid
          className="mt-2 mx-auto"
        >
          create account
        </Button>
      </form>
    </>
  );
}

function SignInSection() {
  return (
    <section className="w-full h-full">
      <div className="mt-[50px] h-full w-full flex items-center">
        <div className="video h-full w-1/2 bg-blue-700 sm:inline hidden">
          <div className="relative w-full max-w-full h-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              width="869"
              height="520"
              viewBox="0 0 869 520"
              className="absolute max-w-full bottom-0 left-0 aspect-square pt-5 mx-auto"
            >
              <path
                d="M831.09242,704.18737c-11.13833-9.4118-17.90393-24.27967-16.12965-38.75366s12.76358-27.78,27.01831-30.85364,30.50415,5.43465,34.83378,19.3594c2.3828-26.84637,5.12854-54.81757,19.40179-77.67976,12.92407-20.70115,35.3088-35.51364,59.5688-38.16357s49.80265,7.35859,64.93272,26.50671,18.83461,46.98549,8.2379,68.96911c-7.80623,16.19456-22.188,28.24676-37.2566,38.05184a240.45181,240.45181,0,0,1-164.45376,35.97709Z"
                transform="translate(-165.00003 -189.93073)"
                fill="#f2f2f2"
              />
              <path
                d="M996.72788,546.00953a393.41394,393.41394,0,0,0-54.82622,54.44229,394.561,394.561,0,0,0-61.752,103.194c-1.112,2.72484,3.31272,3.911,4.4123,1.21642A392.34209,392.34209,0,0,1,999.96343,549.24507c2.28437-1.86015-.97-5.08035-3.23555-3.23554Z"
                transform="translate(-165.00003 -189.93073)"
                fill="#fff"
              />
              <path
                d="M445.06712,701.63014c15.2985-12.92712,24.591-33.34815,22.15408-53.22817s-17.53079-38.15588-37.10966-42.37749-41.89745,7.46449-47.8442,26.59014c-3.27278-36.87349-7.04406-75.29195-26.64837-106.69317-17.75122-28.433-48.49666-48.778-81.81777-52.41768s-68.40395,10.107-89.18511,36.407-25.86934,64.53459-11.31476,94.72909c10.72185,22.24324,30.47528,38.79693,51.17195,52.26422,66.02954,42.9653,147.93912,60.88443,225.8773,49.41454"
                transform="translate(-165.00003 -189.93073)"
                fill="#f2f2f2"
              />
              <path
                d="M217.56676,484.37281a540.35491,540.35491,0,0,1,75.30383,74.77651A548.0761,548.0761,0,0,1,352.25665,647.04a545.835,545.835,0,0,1,25.43041,53.8463c1.52726,3.74257-4.55,5.37169-6.06031,1.67075a536.35952,536.35952,0,0,0-49.009-92.727A539.73411,539.73411,0,0,0,256.889,528.63168a538.44066,538.44066,0,0,0-43.76626-39.81484c-3.13759-2.55492,1.33232-6.97788,4.444-4.444Z"
                transform="translate(-165.00003 -189.93073)"
                fill="#fff"
              />
              <path
                d="M789.5,708.93073h-365v-374.5c0-79.67773,64.82227-144.5,144.49976-144.5h76.00049c79.67749,0,144.49975,64.82227,144.49975,144.5Z"
                transform="translate(-165.00003 -189.93073)"
                fill="#f2f2f2"
              />
              <path
                d="M713.5,708.93073h-289v-374.5a143.38177,143.38177,0,0,1,27.59571-84.94434c.66381-.90478,1.32592-1.79785,2.00878-2.68115a144.46633,144.46633,0,0,1,30.75415-29.85058c.65967-.48,1.322-.95166,1.99415-1.42334a144.15958,144.15958,0,0,1,31.47216-16.459c.66089-.25049,1.33374-.50146,2.00659-.74219a144.01979,144.01979,0,0,1,31.1084-7.33593c.65772-.08985,1.333-.16016,2.0083-.23047a146.28769,146.28769,0,0,1,31.10547,0c.67334.07031,1.34864.14062,2.01416.23144a143.995,143.995,0,0,1,31.10034,7.335c.6731.24073,1.346.4917,2.00879.74268a143.79947,143.79947,0,0,1,31.10645,16.21582c.67163.46143,1.344.93311,2.00635,1.40478a145.987,145.987,0,0,1,18.38354,15.564,144.305,144.305,0,0,1,12.72437,14.55078c.68066.88037,1.34277,1.77344,2.00537,2.67676A143.38227,143.38227,0,0,1,713.5,334.43073Z"
                transform="translate(-165.00003 -189.93073)"
                fill="#ccc"
              />
              <circle cx="524.99994" cy="335.5" r="16" fill="#6c63ff" />
              <polygon
                points="594.599 507.783 582.339 507.783 576.506 460.495 594.601 460.496 594.599 507.783"
                fill="#ffb8b8"
              />
              <path
                d="M573.58165,504.27982h23.64384a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H558.69478a0,0,0,0,1,0,0v0a14.88688,14.88688,0,0,1,14.88688-14.88688Z"
                fill="#2f2e41"
              />
              <polygon
                points="655.599 507.783 643.339 507.783 637.506 460.495 655.601 460.496 655.599 507.783"
                fill="#ffb8b8"
              />
              <path
                d="M634.58165,504.27982h23.64384a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H619.69478a0,0,0,0,1,0,0v0a14.88688,14.88688,0,0,1,14.88688-14.88688Z"
                fill="#2f2e41"
              />
              <path
                d="M698.09758,528.60035a10.74272,10.74272,0,0,1,4.51052-15.84307l41.67577-114.86667L764.791,409.082,717.20624,518.85271a10.80091,10.80091,0,0,1-19.10866,9.74764Z"
                transform="translate(-165.00003 -189.93073)"
                fill="#ffb8b8"
              />
              <path
                d="M814.33644,550.1843a10.74269,10.74269,0,0,1-2.89305-16.21659L798.53263,412.4583l23.33776,1.06622L827.23606,533.045a10.80091,10.80091,0,0,1-12.89962,17.13934Z"
                transform="translate(-165.00003 -189.93073)"
                fill="#ffb8b8"
              />
              <circle
                cx="612.1058"
                cy="162.12254"
                r="24.56103"
                fill="#ffb8b8"
              />
              <path
                d="M814.17958,522.54937H740.13271l.08911-.57617c.13306-.86133,13.19678-86.439,3.56177-114.436a11.813,11.813,0,0,1,6.06933-14.5835h.00025c13.77173-6.48535,40.20752-14.47119,62.52,4.90918a28.23448,28.23448,0,0,1,9.45947,23.396Z"
                transform="translate(-165.00003 -189.93073)"
                fill="#6c63ff"
              />
              <path
                d="M754.35439,448.1812,721.01772,441.418l15.62622-37.02978a13.99723,13.99723,0,0,1,27.10571,6.99755Z"
                transform="translate(-165.00003 -189.93073)"
                fill="#6c63ff"
              />
              <path
                d="M797.05043,460.73882l-2.00415-45.94141c-1.51977-8.63623,3.42408-16.80029,11.02735-18.13476,7.60547-1.32959,15.03174,4.66016,16.55835,13.35986l7.533,42.92774Z"
                transform="translate(-165.00003 -189.93073)"
                fill="#6c63ff"
              />
              <path
                d="M811.71606,517.04933c11.91455,45.37671,13.21436,103.0694,10,166l-16-2-29-120-16,122-18-1c-5.37744-66.02972-10.61328-122.71527-2-160Z"
                transform="translate(-165.00003 -189.93073)"
                fill="#2f2e41"
              />
              <path
                d="M793.2891,371.03474c-4.582,4.88079-13.09131,2.26067-13.68835-4.40717a8.05467,8.05467,0,0,1,.01014-1.55569c.30826-2.95357,2.01461-5.63506,1.60587-8.7536a4.59046,4.59046,0,0,0-.84011-2.14892c-3.65124-4.88933-12.22227,2.18687-15.6682-2.23929-2.113-2.714.3708-6.98713-1.25065-10.02051-2.14006-4.00358-8.47881-2.0286-12.45388-4.22116-4.42275-2.43948-4.15822-9.22524-1.24686-13.35269,3.55052-5.03359,9.77572-7.71951,15.92336-8.10661s12.25292,1.27475,17.99229,3.51145c6.52109,2.54134,12.98768,6.05351,17.00067,11.78753,4.88021,6.97317,5.34986,16.34793,2.90917,24.50174C802.09785,360.98987,797.03077,367.04906,793.2891,371.03474Z"
                transform="translate(-165.00003 -189.93073)"
                fill="#2f2e41"
              />
              <path
                d="M1004.98163,709.57417h-738.294a1.19069,1.19069,0,0,1,0-2.38137h738.294a1.19069,1.19069,0,0,1,0,2.38137Z"
                transform="translate(-165.00003 -189.93073)"
                fill="#3f3d56"
              />
              <path
                d="M634,600.43073H504a6.46539,6.46539,0,0,1-6.5-6.41531V303.846a6.46539,6.46539,0,0,1,6.5-6.41531H634a6.46539,6.46539,0,0,1,6.5,6.41531V594.01542A6.46539,6.46539,0,0,1,634,600.43073Z"
                transform="translate(-165.00003 -189.93073)"
                fill="#fff"
              />
              <rect
                x="332.49994"
                y="201.38965"
                width="143"
                height="2"
                fill="#ccc"
              />
              <rect
                x="332.99994"
                y="315.5"
                width="143"
                height="2"
                fill="#ccc"
              />
              <rect
                x="377.49994"
                y="107.5"
                width="2"
                height="304"
                fill="#ccc"
              />
              <rect
                x="427.49994"
                y="107.5"
                width="2"
                height="304"
                fill="#ccc"
              />
            </svg>
          </div>
        </div>
        <div className="actual flex-1 h-full">
          <div className="mb-3 mt-5">
            <div className="flex w-full items-center justify-center">
              <span className="font-bold text-slate-950 text-5xl">WAT</span>
            </div>
          </div>

          <Tabs
            defaultValue="login"
            className="w-full flex-col flex items-center"
          >
            <TabsList className="p-2 bg-transparent">
              <TabsTrigger value="login" className="text-xl">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="text-xl">
                Register
              </TabsTrigger>
            </TabsList>
            <div className="p-3 max-w-full min-w-fit w-3/4">
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm />
              </TabsContent>
            </div>
          </Tabs>
          <div></div>
        </div>
      </div>
    </section>
  );
}

const slides: ISlideConfig[] = [
  {
    content: <Hero />,
    style: {},
  },
  {
    content: <SignInSection />,
    style: {},
  },
];
const MainPage = () => {
  return (
    <PageSlides
      enableAutoScroll={true}
      transitionSpeed={1000}
      slides={slides}
      parallax={{
        offset: 0.6,
        type: SlideParallaxType.cover,
      }}
    />
  );
};
import {
  type GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<unknown>> {
  const { auth } = createServerSupabaseClient(ctx);
  const session = await auth.getSession();
  if (session.data.session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Page() {
  return (
    <div className="w-screen h-screen bg-slate-50">
      <header className="w-full h-[50px] shadow fixed top-0 left-0 bg-white z-50">
        <div className="container h-full p-3 flex items-center flex-row justify-between">
          <div className="">
            <h2 className="text-xl font-bold">WAT</h2>
          </div>
          <div className="">
            <button className="text-sm font-normal bg-slate-600 text-white rounded-full px-5 py-1.5">
              join us
            </button>
          </div>
        </div>
      </header>
      <MainPage />
    </div>
  );
}
