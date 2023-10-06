"use client";
import Table from "./components/Table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSWR from "swr";
import { ISchoolPaging } from "./type/schoolPaging";
import { urlGetAll } from "../../api";

export default function Home() {
  const fetcher = (url: string) => fetch(url).then((e) => e.json());

  const { data, error, isLoading } = useSWR(urlGetAll, fetcher);

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-2"></div>
      <div className="col-span-2">
        <h1>Management School</h1>
        <br />
        <Table ipaging={data} />
        <ToastContainer />
      </div>
      <div className="col-span-2"></div>
    </div>
  );
}