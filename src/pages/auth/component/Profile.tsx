import type { Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "src/lib/supabase";
import type { definitions } from "src/type/supabase";

type Props = {
  session: Session;
};

export const Profile = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fullName, setFullName] = useState<string>();

  useEffect(() => {
    getProfile();
  }, [props.session]);
  const {
    register,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const getProfile = async () => {
    try {
      setIsLoading(true);
      const user = supabase.auth.user() as User;

      const { data, error, status } = await supabase
        .from<definitions["users"]>("users")
        .select(`*`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullName(data.full_name);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[700px]">
      <div>
        <h2 className="text-xl font-bold text-center">ログイン</h2>
        <div className="flex relative flex-col p-8 mt-10 space-y-5 w-full rounded-lg md:mx-auto md:w-[80%]">
          <form className="space-y-2">
            <h3>プロフィール</h3>
            <div>
              <div className="flex space-x-4">
                <label>お名前</label>
                <p>{errors?.fullName?.message}</p>
              </div>
              <input
                className="py-1 px-3 w-full text-base leading-8 rounded border focus:border-blue-200 focus:ring-2 transition-colors duration-200 ease-in-out"
                {...register("fullName", {
                  required: { value: true, message: "" },
                })}
                defaultValue={fullName}
              />
            </div>

            <div>
              <div className="flex space-x-4">
                <label>メールアドレス</label>
                <p>{errors?.email?.message}</p>
              </div>
              <input
                className="py-1 px-3 w-full text-base leading-8 rounded border focus:border-blue-200 focus:ring-2 transition-colors duration-200 ease-in-out"
                {...register("email", {
                  required: { value: true, message: "" },
                })}
                defaultValue={props.session.user?.email}
              />
            </div>

            <button
              type="submit"
              className="py-2 px-4 text-sm text-white bg-blue-300 hover:bg-blue-200 rounded-full"
            >
              更新
            </button>

            {isLoading && (
              <div className="absolute inset-0 z-50 bg-gray-100 opacity-40"></div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
