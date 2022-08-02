import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "src/lib/supabase";

type Inputs = {
  email: string;
  password: string;
};

export const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });

  const handleLogin = async ({ email }: { email: string }) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[700px]">
      <div>
        <h2 className="text-xl font-bold text-center">ログイン</h2>
        <div className="flex flex-col p-8 mt-10 space-y-5 w-full rounded-lg md:mx-auto md:w-[80%]">
          <form onSubmit={handleSubmit(handleLogin)}>
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
            />
            <p className="mb-5">例: sato12345@gmail.com</p>

            <div className="text-center">
              <input
                value={isLoading ? "Loading" : "Send magic link"}
                type="submit"
                className="py-2 px-12 text-lg text-white bg-blue-400 rounded border-0 hover:ring"
              />
            </div>
          </form>
        </div>
      </div>
      <Link href="/consumer/auth/signup">
        <a className="flex justify-center items-center">
          ユーザー作成がまだの方
        </a>
      </Link>
    </div>
  );
};
