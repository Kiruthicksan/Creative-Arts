import React from 'react'
import InfoCard from './InfoCard'
import { FileText, Database, Download, ShieldCheck } from 'lucide-react'

const InfoGrid = ({product}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <InfoCard
              icon={<FileText size={20} className="text-purple-500" />}
              label="Format"
              value="ZIP (Figma, React)"
            />
            <InfoCard
              icon={<Database size={20} className="text-purple-500" />}
              label="Size"
              value="245 MB"
            />
            <InfoCard
              icon={<Download size={20} className="text-purple-500" />}
              label="Downloads"
              value={product.downloads.toLocaleString()}
            />
            <InfoCard
              icon={<ShieldCheck size={20} className="text-purple-500" />}
              label="License"
              value="Commercial"
            />
          </div>
  )
}

export default InfoGrid