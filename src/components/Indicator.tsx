import { cls } from "@/utils/cls";

type IndicatorProps = {
  order: number;
  setOrder: (order: number | ((preOrder: number) => number)) => void;
};

const Indicator = ({ order, setOrder }: IndicatorProps) => {
  return (
    <div className="flex gap-3">
      {[0, 1, 2].map((el) => (
        <button
          onClick={() => setOrder(el)}
          className={cls(
            "bg-white rounded-full w-2 h-2",
            order === el ? "" : "opacity-50"
          )}
        />
      ))}
    </div>
  );
};

export default Indicator;
