

function isAdmin(req,res, next){
   const userRole = req.headers.role; 
   // Check if the user is an admin
   if (userRole === 'admin') {
       // User has admin role, proceed to next middleware
       res.status(200);
       next();
   } else {
       // User is not authorized, send 403 Forbidden response
       res.status(403).json({ message: 'Unauthorized' });
   }
};
export default isAdmin
