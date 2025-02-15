import { cls } from "@/utils/cls";

type IndicatorProps = {
  order: number;
  setOrder: (order: number | ((preOrder: number) => number)) => void;
};

const Indicator = ({ order, setOrder }: IndicatorProps) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => setOrder(0)}
        className={cls(
          "bg-white rounded-full w-2 h-2",
          order === 0 ? "" : "opacity-50"
        )}
      />
      <button
        onClick={() => setOrder(1)}
        className={cls(
          "bg-white rounded-full w-2 h-2",
          order === 1 ? "" : "opacity-50"
        )}
      />
      <button
        onClick={() => setOrder(2)}
        className={cls(
          "bg-white rounded-full w-2 h-2",
          order === 2 ? "" : "opacity-50"
        )}
      />
    </div>
  );
};

export default Indicator;
