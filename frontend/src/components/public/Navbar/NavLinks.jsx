import { Link } from "react-router-dom";

const NavLinks = () => {
  const links = [
    {
      name: "Browse",
      to: "/browse",
    },
    {
      name: "Sci-Fi & Cyber",
      to: "/sci-fi",
    },
    {
      name: "Fantasy",
      to: "/fantasy",
    },
    {
      name: "Horror",
      to: "/horror",
    },
  ];
  return (
    <div className="hidden lg:flex items-center gap-8">
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.to}
          className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
