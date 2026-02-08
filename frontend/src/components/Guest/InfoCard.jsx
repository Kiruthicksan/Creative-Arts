const InfoCard = ({ icon, label, value }) => {
  return (
    <div className="flex flex-col gap-3 p-4 bg-white/80 backdrop-blur rounded-2xl border border-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
      <div className="p-2.5 bg-purple-50 rounded-xl w-fit text-purple-600">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
          {label}
        </span>
        <span className="text-sm font-bold text-gray-900 leading-tight">
          {value}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
