

import { Outlet } from 'react-router-dom';
import Navbar from '../components/public/Navbar';

const CustomerLayout = () => {
    return (
       <div>
        <Navbar />
         <main >
            {/* chidrens of parent route we give in app.jsx */}
            <Outlet />  
         </main>
       </div>
    );
};

export default CustomerLayout;
