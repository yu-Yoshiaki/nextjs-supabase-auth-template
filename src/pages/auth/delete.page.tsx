/* eslint-disable react/jsx-handler-names */
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import type { CustomNextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUser } from "src/hook/useUser";
import { Layout } from "src/layout";

const Setting: CustomNextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const auth = getAuth();

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleUserDelete = async () => {
    if (user) {
      const res = await axios.post("/api/fb/auth/delete", {
        id: user.uid,
      });
      const data = await res.data;
      window.alert(data);
      await auth.signOut();
      return router.push("/");
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold text-center">退会手続き</h2>
        <p>
          こちらを退会されますと、お客様の出品情報、購入履歴を含む全てのお客様情報を削除いたします。現在の情報には完全にアクセスできなくなります。
        </p>
        <p>よろしいですか？</p>
      </div>
      <button onClick={handleIsOpen} className="py-3 px-8 text-red-500">
        削除
      </button>

      <Dialog
        open={isOpen}
        onClose={() => {
          return setIsOpen(false);
        }}
        className="flex fixed inset-0 z-30 justify-center items-center min-h-[400px]"
      >
        <Dialog.Overlay className="relative w-full h-full bg-gray opacity-50"></Dialog.Overlay>
        <Dialog.Panel className="overflow-hidden absolute p-6 space-y-10 w-[90%] max-w-md text-center align-middle bg-white rounded-2xl shadow-xl transition-all">
          <Dialog.Title as="h3" className="text-lg font-bold leading-6">
            本当に削除してよろしいですか？
          </Dialog.Title>

          <div className="flex justify-center mt-4">
            <button
              onClick={handleUserDelete}
              className="py-2 px-4 text-white bg-red-500 rounded-md"
            >
              削除
            </button>
            <button onClick={handleIsOpen} className="py-2 px-4">
              戻る
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

Setting.getLayout = Layout;

export default Setting;
