import { Github, Instagram, Mail, Star, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-bold text-gray-900">CreativeArts</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              The premium marketplace for digital creative products. Discover
              stunning designs, illustrations, and stories from talented
              creators worldwide.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-gray-50 rounded-full text-gray-600 hover:bg-gray-100 hover:text-purple-600 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-50 rounded-full text-gray-600 hover:bg-gray-100 hover:text-purple-600 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-50 rounded-full text-gray-600 hover:bg-gray-100 hover:text-purple-600 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Marketplace Column */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Marketplace</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors">
                  Browse All
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors">
                  Graphics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors">
                  UI Kits
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors">
                  Illustrations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors">
                  eBooks
                </a>
              </li>
            </ul>
          </div>

         

          {/* Newsletter Column */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Newsletter</h3>
            <p className="text-gray-500 text-sm mb-4">
              Get weekly updates on new products.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} CreativeArts. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900">
              Terms
            </a>
            <a href="#" className="hover:text-gray-900">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-900">
              License
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
