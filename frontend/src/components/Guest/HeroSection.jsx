import { Zap } from "lucide-react";
const HeroSection = () => {
    return (
        <div className='flex items-center justify-center h-[calc(100vh-4rem)] flex-col bg-[linear-gradient(135deg,#f3e8ff_0%,#ffffff_100%)]'>


            <div className='text-center space-y-4 max-w-2xl px-4'>
                <p className='flex items-center gap-2 text-[#7c3bed] justify-center text-xs w-fit bg-[#7c3bed]/10 px-3 py-1 rounded-full mx-auto border border-[#7c3bed]/10 hover:bg-[#7c3bed]/20 transition-all'><Zap className="w-4 h-4 text-[#7c3bed]" /> Over 10,000+ premium digital products</p>
                <h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                    Discover Premium <span className='bg-[linear-gradient(135deg,rgb(124,59,237)_0%,rgb(235,71,153)_100%)] bg-clip-text text-transparent'>Digital Creations</span>
                </h1>
                <p className='text-lg md:text-xl text-gray-600 max-w-lg mx-auto'>
                    Discover and purchase unique creative assets for your next project.
                </p>
                <div className='pt-4'>
                    <button className='bg-[#7c3bed] text-white px-8 py-3 rounded-full font-medium hover:bg-[#7c3bed]/90 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/20 cursor-pointer'>
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection