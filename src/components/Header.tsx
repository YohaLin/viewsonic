import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

const linkList = [
  {
    title: "Task1",
    url: "/task1",
  },
  {
    title: "Task2",
    url: "/task2",
  }
];

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];

  return (
    <div className="flex justify-between items-center w-full h-20 p-2 bg-red-500 rounded-full">
      <div className="flex justify-between items-center w-full h-full px-6 py-1 rounded-full border-dashed border-2">
        <Link to="/">
          <p className="w-fit h-full text-center text-d7 leading-[48px] text-white">Yoha</p>
        </Link>
        <ul className="flex justify-between items-center gap-6 w-fit h-fit">
          {linkList.map((item, index) => (
            <Link to={item.url} key={index}>
              <li
                className={clsx("text-white",{
                  " border-b": item.title.toLowerCase() === pathname,
                })}
              >
                {item.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
