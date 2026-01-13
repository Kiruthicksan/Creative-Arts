import React from 'react'
import { Download, Shield, Zap } from 'lucide-react'
const WhyChooseUs = () => {

    const whyChooseUsData = [
        {
            icon :<Shield />,
            title: "Secure Downloads",
            description: "All files are protected with secure, signed URLs. Download with confidence.",
        },
        {
            icon :<Zap />,
            title: "Instant Access",
            description: "Get immediate access to your purchases. No waiting, no hassle.",
        },
        {
            icon :<Download />,
            title: "Lifetime Access",
            description: "Download your purchases anytime. Your library is always available.",
        },
    ]

  return (
    <section className='bg-gray-50'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center'>
            <h2 className='text-2xl font-bold mb-4'>Why Choose CreativeArts?</h2>
            <p className='text-gray-600 mb-6'>Join thousands of customers who trust CreativeArts for premium digital products</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16'>
                {whyChooseUsData.map((item, index) => (
                    <div key={index} className='bg-white rounded-lg shadow-md p-6 border border-gray-200'>
                        <div className='flex items-center justify-center mb-4 bg-[#7c3aed]/10 text-[#7c3aed] p-3 rounded-full w-fit mx-auto'>
                            {item.icon}
                        </div>
                        <h3 className='text-lg font-bold mb-2 line-clamp-1 text-gray-900'>{item.title}</h3>
                        <p className='text-[#6d6d78] text-sm line-clamp-2 leading-relaxed'>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default WhyChooseUs