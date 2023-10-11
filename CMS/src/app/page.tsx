import Table from "./components/Table";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAll } from "../../api";

export default async function Home() {
  const data = await GetAll();

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-2"></div>
      <div className="col-span-2">
        <h1>Management School</h1>
        <br />
        <Table ipaging={data ?? { totalCount: 0, schools: [] }} />
        <ToastContainer />
      </div>
      <div className="col-span-2"></div>
    </div>
  );
}
