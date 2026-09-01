import { useNavigate } from "react-router";

export default function Table({ table }) {
  const isAvailable = table.status === "libre";
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tables/${table.number}`);
  };

  return (
    <button
      className={`
        flex h-15 w-15 items-center justify-center
        rounded-full
        text-lg font-bold text-white
        shadow-sm
        transition-transform
        hover:scale-105
        ${
          isAvailable
            ? "bg-success/90 hover:bg-[#1B8A5A]"
            : "bg-danger/90 hover:bg-[#C9363C]"
        }
      `}
      title={`Mesa ${table.number} - ${table.status}`}
      onClick={handleClick}
    >
      {table.number}
    </button>
  );
}
