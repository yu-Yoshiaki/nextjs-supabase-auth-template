import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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
  const { createUser } = useUser();

  const onLogin = (data: Inputs) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        window.alert("ログインしました。");
        return router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        window.alert({ errorCode, errorMessage });
        return;
      });
    // eslint-disable-next-line no-console
    return;
  };

  //firebase user作成
  const onSignup = (data: Inputs) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(({ user }) => {
        createUser(user.uid);
        window.alert("ユーザー作成が完了しました。");
        return router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        window.alert({ errorCode, errorMessage });
        return;
      });
    // eslint-disable-next-line no-console
    return;
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center">{props.createNew ? "アカウント作成" : "ログイン"}</h2>
      <div className="flex flex-col p-8 mt-10 space-y-5 w-full bg-gray-100 rounded-lg md:mx-auto md:w-[80%]">
        <h3 className="text-lg font-medium text-gray-900">{props.createNew ? "Sign Up." : "Login"}</h3>

        <form onSubmit={handleSubmit(props.createNew ? onSignup : onLogin)}>
          <div className="flex space-x-4">
            <label>
              Email <span className="text-red-600">必須</span>
            </label>
            <div className="text-red-500">{errors?.email && <p>{errors.email.message}</p>}</div>
          </div>
          <input
            className="py-1 px-3 w-full text-base leading-8 text-gray-700 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200 ease-in-out outline-none"
            {...register("email", {
              required: { value: true, message: "" },
              pattern: {
                value: /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/,
                message: "メールアドレスの形式が不正です",
              },
            })}
            {...(!props.createNew && { defaultValue: "test@example.com" })}
          />
          <p className="mb-5">例: sato12345@gmail.com</p>

          <div className="flex space-x-4">
            <label>
              Password <span className="text-red-600">必須</span>
            </label>
            <div className="text-red-500">
              {errors?.password?.types?.required && <p>{errors?.password?.message}</p>}
              {errors?.password?.types?.pattern && <p>{errors?.password?.message}</p>}
            </div>
          </div>
          <input
            className="py-1 px-3 w-full text-base leading-8 text-gray-700 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200 ease-in-out outline-none"
            {...register("password", {
              required: { value: true, message: "" },
              minLength: { value: 8, message: "8文字以上入力してください。" },
              pattern: {
                value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]/,
                message: "大文字、小文字、数字をそれぞれ1つ以上含めてください。",
              },
            })}
            {...(!props.createNew && { defaultValue: "test1234" })}
          />
          <p className="mb-5">例: Sato12345</p>

          <input
            value={props.createNew ? "アカウント作成" : "ログイン"}
            type="submit"
            className="py-2 px-12 text-lg text-white bg-indigo-500 hover:bg-indigo-600 rounded border-0 focus:outline-none"
          />
        </form>
      </div>
    </div>
  );
};
