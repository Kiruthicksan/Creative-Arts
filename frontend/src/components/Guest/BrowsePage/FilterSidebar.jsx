import { Check, SlidersHorizontal } from "lucide-react";
const FilterSidebar = ({ filterOptions, selectedFilters, toggleFilter }) => {
  return (
    <div className="hidden lg:block w-64 space-y-8 shrink-0">
      <div className="flex items-center gap-2 font-bold text-gray-900 pb-4 border-b border-gray-100">
        <SlidersHorizontal size={18} /> Filters
      </div>

      {filterOptions.map((section) => (
        <div key={section.id}>
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">
            {section.title}
          </h3>
          <div className="space-y-2">
            {section.options.map((opt) => {
              const isSelected = selectedFilters[section.id].includes(
                opt.value,
              );
              return (
                <label
                  key={opt.value}
                  className="flex items-center gap-3 cursor-pointer group select-none"
                >
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-purple-600 border-purple-600"
                        : "bg-white border-gray-300 group-hover:border-purple-500"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFilter(section.id, opt.value);
                    }}
                  >
                    {isSelected && <Check size={12} className="text-white" />}
                  </div>
                  <span
                    className={`text-sm transition-colors ${isSelected ? "text-gray-900 font-medium" : "text-gray-600 group-hover:text-gray-900"}`}
                    onClick={() => toggleFilter(section.id, opt.value)}
                  >
                    {opt.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;
