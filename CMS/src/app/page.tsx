import Table from "./components/Table";
import ListSchool from "./components/ListSchool";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAll } from "../../api";
import { HomeOutlined } from "@ant-design/icons";

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const data = await GetAll(0);
  const topSchool = await GetAll(parseInt(searchParams?.entities?.toString() ?? "10"));

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-1"></div>
      <div className="col-span-4">
        <br />
        <h1><HomeOutlined /> School Management</h1>
        <br />
        <Table
          ipaging={data ?? { totalCount: 0, schools: [] }}
          pageSize={searchParams?.pageSize ? searchParams?.pageSize?.toString() : "5"}
        />
        <ToastContainer />
      </div>
      <div className="col-span-1"></div>
      <div className="col-span-4">
        <br />
        <h1><HomeOutlined /> Top School</h1>
        <br />
        <ListSchool
          ipaging={topSchool ?? { totalCount: 0, schools: [] }}
          entities={parseInt(searchParams?.entities?.toString() ?? "5")}
        />
        <ToastContainer />
      </div>
      <div className="col-span-1"></div>
    </div>
  );
}
