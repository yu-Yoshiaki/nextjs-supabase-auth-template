import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useUser } from "src/hook/useUser";
import { auth } from "src/lib/firebase";

type Inputs = {
  email: string;
  password: string;
};

export const AuthForm = (props: { createNew: boolean }) => {
  //react-hook-form 初期化
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });

  const router = useRouter();
  const { setUser } = useUser();

  const onLogin = async (data: Inputs) => {
    const user = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    if (user) {
      window.alert("ログインしました。");

      setUser(user.user);
      return router.push("/");
    }

    window.alert("ログインに失敗しました。");
    return;
  };

  //firebase user作成
  const onSignup = async (data: Inputs) => {
    const user = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    if (user) {
      window.alert("ユーザー作成が完了しました。");
      return router.push("/");
    }
    window.alert("ユーザー作成に失敗しました。");
    return;
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center">
        {props.createNew ? "アカウント作成" : "ログイン"}
      </h2>
      <div className="flex flex-col p-8 mt-10 space-y-5 w-full rounded-lg md:mx-auto md:w-[80%]">
        <h3 className="text-lg font-medium">
          {props.createNew ? "Sign Up." : "Login"}
        </h3>

        <form onSubmit={handleSubmit(props.createNew ? onSignup : onLogin)}>
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
            {...(!props.createNew && { defaultValue: "test@example.com" })}
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
            {...(!props.createNew && { defaultValue: "test1234" })}
          />
          <p className="mb-5">例: Sato12345</p>

          <input
            value={props.createNew ? "アカウント作成" : "ログイン"}
            type="submit"
            className="py-2 px-12 text-lg hover:bg-blue rounded border-0 focus:outline-none"
          />
        </form>
      </div>
    </div>
  );
};
