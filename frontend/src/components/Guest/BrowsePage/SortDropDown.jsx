import { ChevronDown } from "lucide-react";

const SortDropDown = ({sortOptions, sortBy, setSortBy}) => {
  return (
     <div className="relative group">
              <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-purple-600 transition-colors">
                {sortBy} <ChevronDown size={14} />
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 py-2">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSortBy(opt)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-purple-600 ${
                      sortBy === opt
                        ? "text-purple-600 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
  )
}

export default SortDropDown