import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-6 w-full h-full">
      <p className="text-d6">
        This project was specifically made for a ViewSonic interview.
      </p>
      <p className="text-d3">
        You can access Task 1 and Task 2 using the buttons below or through the header.
      </p>
      <div className="flex gap-4 w-fit h-full m-auto">
          <Button style="w-fit h-12 px-4 py-2 rounded-lg" text={"Task1"} onClick={() => navigate("/task1")}/>
          <Button style="w-fit h-12 px-4 py-2 rounded-lg" text={"Task2"} onClick={() => navigate("/task2")} />
      </div>
    </div>
  );
};

export default Home;
