

import { Outlet } from 'react-router-dom';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';

const GuestLayout = () => {
    return (
       <div>
        <Navbar />
         <main >
            {/* chidrens of parent route we give in app.jsx */}
            <Outlet />  
         </main>
         <Footer />
       </div>
    );
};

export default GuestLayout;
