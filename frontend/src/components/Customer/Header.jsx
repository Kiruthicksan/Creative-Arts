
import useAuthStore from "../../store/useAuthStore";

const Header = () => {
  const { user } = useAuthStore();
  return (
    <div className="py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              {user?.userName.charAt(0).toUpperCase() + user?.userName.slice(1).toLowerCase()
              }
            </span>
            👋
          </h1>
          <p className="text-gray-500 max-w-md">
            Ready to find some inspiration today?
          </p>
        </div>

        <div className="hidden md:flex items-center gap-4 bg-purple-50 px-6 py-4 rounded-2xl border border-purple-100 max-w-md">
          <div className="w-1 h-12 bg-purple-400 rounded-full shrink-0"></div>
          <div>
            <p className="text-gray-700 italic font-medium text-sm">
              "Creativity is intelligence having fun."
            </p>
            <p className="text-purple-600 text-xs font-bold mt-1">
              – Albert Einstein
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
