const InfoCard = ({ icon, label, value }) => (
  <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
    <div className="p-2 bg-white rounded-lg w-fit shadow-sm">{icon}</div>
    <div className="flex flex-col">
      <span className="text-xs text-gray-500 font-medium">{label}</span>
      <span className="text-sm font-semibold text-gray-900 leading-tight">
        {value}
      </span>
    </div>
  </div>
);

export default InfoCard;
