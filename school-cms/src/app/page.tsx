import { getAll } from "../../api";
import AddTask from "./components/AddNewTask";
import ListSchool from "./components/ListSchool";

export default async function Home() {
  const schools = await getAll();
  return (
    <div className="grid grid-cols-6 gap-4 text-center">
      <div className="col-span-2"></div>
      <div className="col-span-2 text-center">
        <h1>School</h1>
        <br />
        <AddTask />
        <br />
        <ListSchool schools={schools?.schools} totalCount={1}/>
      </div>
      <div className="col-span-2"></div>
    </div>
  );
}
