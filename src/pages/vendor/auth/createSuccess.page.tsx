import type { CustomNextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

const CreateSuccess: CustomNextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/vendor/account/${id}/read`);

  if (error) return <div>Error</div>;
  if (!data) return <div>Lodading...</div>;

  return (
    <div>
      <div>Success,{id}</div>
      <ul>
        <li>{data.chargesEnabled}</li>
        <li>{data.detailsSubmitted}</li>
      </ul>
    </div>
  );
};

export default CreateSuccess;
