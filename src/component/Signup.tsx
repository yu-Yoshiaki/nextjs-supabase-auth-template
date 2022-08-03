import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "src/lib/firebase";

type Inputs = {
  email: string;
  password: string;
};

export const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Success!");
      router.push("/");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10 bg-white md:w-[500px]">
      <h2 className="text-2xl font-bold">新規登録</h2>
      <div className="flex flex-col space-y-5">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="grid grid-cols-2">
            <label>
              Email <span className="font-semibold text-red-400">必須</span>
            </label>
            <p>{errors?.email && <p>{errors.email.message}</p>}</p>

            <input
              className="col-span-2 p-2 w-[60%] rounded border"
              {...register("email", {
                required: { value: true, message: "" },
                pattern: {
                  value:
                    /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/,
                  message: "メールアドレスの形式が不正です",
                },
              })}
            />
            <p>例: sato12345@gmail.com</p>
          </div>

          <div className="grid grid-cols-2">
            <label>
              Password <span className="font-semibold text-red-400">必須</span>
            </label>
            <p>{errors?.password && <p>{errors.password.message}</p>}</p>

            <input
              className="col-span-2 p-2 w-[60%] rounded border"
              {...register("password", {
                required: { value: true, message: "" },
              })}
            />
            <p>例: Test0000</p>
          </div>

          <input
            value={isLoading ? "Loading" : "新規登録"}
            type="submit"
            className="py-2 px-12 text-lg text-white bg-blue-400 rounded border-0 hover:ring"
          />
        </form>
        <Link href="/signin">
          <a>ログイン</a>
        </Link>
      </div>
    </div>
  );
};
