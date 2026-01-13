import { ArrowRight, Zap } from "lucide-react";
const HeroSection = () => {
    return (
        <div className='flex items-center justify-center h-[calc(100vh-4rem)] flex-col bg-[linear-gradient(135deg,#f3e8ff_0%,#ffffff_100%)]'>


            <div className='text-center space-y-4 max-w-5xl px-4'>
                <p className='flex items-center gap-2 text-[#7c3bed] justify-center text-xs w-fit bg-[#7c3bed]/10 px-3 py-1 rounded-full mx-auto border border-[#7c3bed]/10 hover:bg-[#7c3bed]/20 transition-all'><Zap className="w-4 h-4 text-[#7c3bed]" /> Over 10,000+ premium digital products</p>
                <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-serif'>
                    Discover Premium <span className='bg-[linear-gradient(135deg,rgb(124,59,237)_0%,rgb(235,71,153)_100%)] bg-clip-text text-transparent'>Digital Creations</span>
                </h1>
                <p className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto'>
                   The marketplace for stunning graphics, UI kits, illustrations, eBooks, and digital art. Created by talented artists, ready for your next project.
                </p>
                <div className='pt-4'>
                    <button className='bg-[#7c3bed] text-white px-8 py-3 rounded-full font-medium hover:bg-[#7c3bed]/90 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/20 cursor-pointer flex items-center gap-2 hover:text-[#7c3bed] hover:bg-white hover:border hover:border-[#7c3bed] hover:shadow-none hover:transform-none hover:scale-100 mx-auto'>
                       Explore Products <ArrowRight />
                    </button>
                </div>
                <div className='flex items-center gap-20 justify-center pt-8'>
                    <div className='flex flex-col items-center gap-1 border-r border-gray-200 pr-10'>
                        <p className='text-2xl font-bold'>50K+</p>
                        <span className='text-sm text-gray-600'>Happy Customers</span>
                    </div>
                    <div className='flex flex-col items-center gap-1'>
                        <p className='text-2xl font-bold'>10K+</p>
                        <span className='text-sm text-gray-600'>Products</span>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default HeroSection