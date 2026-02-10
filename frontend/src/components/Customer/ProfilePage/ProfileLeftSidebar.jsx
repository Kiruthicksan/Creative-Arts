
import { motion } from 'framer-motion'
import { User, Calendar, Sparkles, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProfileLeftSidebar = ({user, formatDate}) => {
  return (
   <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 space-y-6"
          >
            {/* Personal Details Card */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white shadow-xl shadow-purple-900/5 hover:shadow-purple-900/10 transition-shadow">
              <h3 className="text-lg font-bold mb-6 text-gray-900 font-serif flex items-center gap-2">
                <span className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full"></span>
                About You
              </h3>
              <div className="space-y-4">
                <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-purple-100 hover:shadow-md transition-all">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:scale-110 transition-transform">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                      User Name
                    </p>
                    <p className="text-gray-900 font-bold text-lg mt-0.5">
                      {user.userName || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-purple-100 hover:shadow-md transition-all">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:scale-110 transition-transform">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                      Member Since
                    </p>
                    <p className="text-gray-900 font-bold text-lg mt-0.5">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Library Promo Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl shadow-purple-900/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold font-serif mb-2">
                  Your Digital Library
                </h3>
                <p className="text-purple-100 mb-8 leading-relaxed opacity-90">
                  Access all your purchased assets, downloads, and premium
                  content in one place.
                </p>
                <Link
                  to="/library"
                  className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg shadow-black/5"
                >
                  Go to Library <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
  )
}

export default ProfileLeftSidebar