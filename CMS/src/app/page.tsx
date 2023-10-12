import Table from "./components/Table";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAll } from "../../api";

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const data = await GetAll();

  console.log(searchParams);
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-2"></div>
      <div className="col-span-2">
        <h1>Management School</h1>
        <br />
        <Table
          ipaging={data ?? { totalCount: 0, schools: [] }}
          pageSize={searchParams?.pageSize ? searchParams?.pageSize?.toString() : "5"}
        />
        <ToastContainer />
      </div>
      <div className="col-span-2"></div>
    </div>
  );
}
