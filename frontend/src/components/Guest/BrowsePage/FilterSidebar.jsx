import { Check, SlidersHorizontal } from "lucide-react";
const FilterSidebar = ({ filterOptions, selectedFilters, toggleFilter }) => {
  return (
    <div className="hidden lg:block w-72 shrink-0 space-y-8 sticky top-8 self-start">
      <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white shadow-xl shadow-purple-900/5">
        <div className="flex items-center gap-2 font-bold text-gray-900 pb-4 border-b border-gray-200/60 mb-6">
          <SlidersHorizontal size={20} className="text-purple-600" />
          <span className="font-serif text-lg tracking-tight">Filters</span>
        </div>

        <div className="space-y-8">
          {filterOptions.map((section) => (
            <div key={section.id}>
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="space-y-3">
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
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${
                          isSelected
                            ? "bg-purple-600 border-purple-600 shadow-sm shadow-purple-200"
                            : "bg-white border-gray-300 group-hover:border-purple-400 group-hover:bg-purple-50"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFilter(section.id, opt.value);
                        }}
                      >
                        {isSelected && (
                          <Check size={14} className="text-white stroke-[3]" />
                        )}
                      </div>
                      <span
                        className={`text-sm transition-colors duration-200 ${isSelected ? "text-purple-900 font-semibold" : "text-gray-600 group-hover:text-gray-900"}`}
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
      </div>
    </div>
  );
};

export default FilterSidebar;
