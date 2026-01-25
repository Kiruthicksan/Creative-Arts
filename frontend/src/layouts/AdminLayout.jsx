

import { Outlet } from 'react-router-dom';




const AdminLayout = () => {
    return (
       <div>
       
         <main >
            {/* chidrens of parent route we give in app.jsx */}
            <Outlet />  
         </main>
        
       </div>
    );
};

export default AdminLayout;
