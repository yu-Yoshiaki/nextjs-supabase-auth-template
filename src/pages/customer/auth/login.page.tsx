import { signInWithEmailAndPassword } from "firebase/auth";
import type { CustomNextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Layout } from "src/layout";
import { auth } from "src/lib/firebase";

type Inputs = {
  email: string;
  password: string;
};

const Login: CustomNextPage = () => {
  //react-hook-form 初期化
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });

  const router = useRouter();

  const onLogin = async ({ email, password }: Inputs) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        window.alert("ログインしました。");

        router.push("/");
        return;
      }
    } catch (e: any) {
      window.alert("ログインに失敗しました。");
    }

    return;
  };

  return (
    <div className="mx-auto max-w-[700px]">
      <div>
        <h2 className="text-xl font-bold text-center">ログイン</h2>
        <div className="flex flex-col p-8 mt-10 space-y-5 w-full rounded-lg md:mx-auto md:w-[80%]">
          <form onSubmit={handleSubmit(onLogin)}>
            <div className="flex space-x-4">
              <label>
                Email <span className="">必須</span>
              </label>
              <div className="">
                {errors?.email && <p>{errors.email.message}</p>}
              </div>
            </div>
            <input
              className="py-1 px-3 w-full text-base leading-8 rounded border focus:border-blue-200 focus:ring-2 transition-colors duration-200 ease-in-out"
              {...register("email", {
                required: { value: true, message: "" },
                pattern: {
                  value:
                    /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/,
                  message: "メールアドレスの形式が不正です",
                },
              })}
              defaultValue="test@example.com"
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
              className="py-1 px-3 w-full text-base leading-8 rounded border focus:border-blue-100 focus:ring-2 transition-colors duration-200 ease-in-out"
              {...register("password", {
                required: { value: true, message: "" },
                minLength: { value: 8, message: "8文字以上入力してください。" },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]/,
                  message:
                    "大文字、小文字、数字をそれぞれ1つ以上含めてください。",
                },
              })}
              defaultValue="Test1234"
            />
            <p className="mb-5">例: Sato12345</p>

            <div className="text-center">
              <input
                value="ログイン"
                type="submit"
                className="py-2 px-12 text-lg text-white bg-blue-400 rounded border-0 hover:ring"
              />
            </div>
          </form>
        </div>
      </div>
      <Link href="/customer/auth/signup">
        <a className="flex justify-center items-center">
          ユーザー作成がまだの方
        </a>
      </Link>
    </div>
  );
};

Login.getLayout = Layout;

export default Login;
