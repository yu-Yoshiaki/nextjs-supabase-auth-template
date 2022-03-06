/* eslint-disable react/jsx-handler-names */
import { Dialog } from "@headlessui/react";
import { deleteUser } from "firebase/auth";
import type { CustomNextPage } from "next";
import { useState } from "react";
import { useUser } from "src/hook/useUser";
import { FixedLayout } from "src/layout";

const Setting: CustomNextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleDelete = async () => {
    if (user) {
      await deleteUser(user);
    }
  };

  return (
    <div>
      <button onClick={handleOpen} className="py-3 px-8 bg-blue-100">
        OPEN
      </button>

      <Dialog
        open={isOpen}
        onClose={() => {
          return setIsOpen(false);
        }}
        className="fixed top-0 left-0 z-50 m-auto mx-auto w-[90%] min-h-[400px] bg-green-100"
      >
        <Dialog.Overlay className="bg-black opacity-50" />

        <Dialog.Title className="text-xl font-bold">本当に削除してよろしいです？</Dialog.Title>

        <p>
          データベースの方から完全削除いたします。出品情報、購入履歴、ユーザー情報など、全てのお客様情報にアクセスできなくなります。
        </p>

        <button onClick={handleDelete} className="py-2 px-4 text-red-600">
          Delete
        </button>
        <button onClick={handleClose} className="py-2 px-4 text-blue-600">
          Cancel
        </button>
      </Dialog>
    </div>
  );
};

Setting.getLayout = FixedLayout;

export default Setting;
