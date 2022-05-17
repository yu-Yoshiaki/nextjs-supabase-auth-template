import type { CustomNextPage } from "next";
import { useCallback } from "react";
import { useManageAccount } from "src/hook/vendor/useManageAccount";

const Create: CustomNextPage = () => {
  const { createAccount, createAccountLink, isLoading, setIsLoading } =
    useManageAccount();

  const handleClick = useCallback(async () => {
    setIsLoading(true);
    const { id } = await createAccount();
    await createAccountLink(id);
  }, [createAccount, createAccountLink, setIsLoading]);

  return (
    <div>
      {isLoading && (
        <div className="flex fixed inset-y-0 justify-center bg-white">
          <div className="w-10 h-10 rounded-full border-4 border-blue border-t-transparent animate-spin"></div>
        </div>
      )}
      <button onClick={handleClick}>オーナーアカウント作成</button>
    </div>
  );
};

export default Create;
