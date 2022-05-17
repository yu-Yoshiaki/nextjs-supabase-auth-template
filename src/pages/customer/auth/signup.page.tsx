import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import type { CustomNextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Layout } from "src/layout";
import { app } from "src/lib/firebase";

const auth = getAuth(app);
type Inputs = {
  email: string;
  password: string;
};

const Signup: CustomNextPage = () => {
  const router = useRouter();
  //react-hook-form 初期化
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });

  //firebase user作成
  const onSignup = async ({ email, password }: Inputs) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) {
        window.alert("ユーザー作成が完了しました。");
        return router.push("/");
      }
    } catch (e: any) {
      window.alert("ユーザー作成に失敗しました。");
    }

    return;
  };

  return (
    <div className="mx-auto max-w-[700px]">
      <div>
        <h2 className="text-xl font-bold text-center">アカウント作成</h2>
        <div className="flex flex-col p-8 mt-10 space-y-5 w-full rounded-lg md:mx-auto md:w-[80%]">
          <form onSubmit={handleSubmit(onSignup)}>
            <div className="flex space-x-4">
              <label>
                Email <span className="">必須</span>
              </label>
              <div className="">
                {errors?.email && <p>{errors.email.message}</p>}
              </div>
            </div>
            <input
              className="py-1 px-3 w-full text-base leading-8 rounded border focus:border-blue focus:ring-2 focus:ring-blue transition-colors duration-200 ease-in-out"
              {...register("email", {
                required: { value: true, message: "" },
                pattern: {
                  value:
                    /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/,
                  message: "メールアドレスの形式が不正です",
                },
              })}
            />
            <p className="mb-5">例: sato12345@gmail.com</p>

            <div className="flex space-x-4">
              <label>
                Password <span className="">必須</span>
              </label>
              <div className="">
                {errors?.password?.types?.required && (
                  <p>{errors?.password?.message}</p>
                )}
                {errors?.password?.types?.pattern && (
                  <p>{errors?.password?.message}</p>
                )}
              </div>
            </div>
            <input
              className="py-1 px-3 w-full text-base leading-8 rounded border focus:border-blue focus:ring-2 transition-colors duration-200 ease-in-out"
              {...register("password", {
                required: { value: true, message: "" },
                minLength: { value: 8, message: "8文字以上入力してください。" },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]/,
                  message:
                    "大文字、小文字、数字をそれぞれ1つ以上含めてください。",
                },
              })}
            />
            <p className="mb-5">例: Sato12345</p>

            <div className="text-center ">
              <input
                value="アカウント作成"
                type="submit"
                className="py-2 px-12 text-lg bg-green-400 rounded border-0 hover:ring"
              />
            </div>
          </form>
        </div>
      </div>
      <Link href="/customer/auth/login">
        <a className="flex justify-center items-center">ユーザー作成済みの方</a>
      </Link>
    </div>
  );
};

Signup.getLayout = Layout;

export default Signup;
