// // // import { Routes, Route, Link, Navigate } from "react-router-dom";
// // // import Home from "./pages/Home.jsx";
// // // import Properties from "./pages/Properties.jsx";
// // // import PropertyPage from "./pages/PropertyPage.jsx";
// // // import Login from "./pages/Login.jsx";
// // // import Signup from "./pages/Signup.jsx";
// // // import Preferences from "./pages/Preferences.jsx";
// // // import { AuthProvider, useAuth } from "./auth/AuthContext.jsx";

// // // function Nav() {
// // //   const { user, logout } = useAuth();
// // //   return (
// // //     <nav style={{display:"flex",gap:12,padding:12,background:"#1e40af",color:"#fff"}}>
// // //       <Link to="/">Home</Link>
// // //       <Link to="/properties">Properties</Link>
// // //       {user ? (
// // //         <>
// // //           <Link to="/preferences">Preferences</Link>
// // //           <button onClick={logout} style={{marginLeft:"auto"}}>Logout</button>
// // //         </>
// // //       ) : (
// // //         <span style={{marginLeft:"auto"}}>
// // //           <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
// // //         </span>
// // //       )}
// // //     </nav>
// // //   );
// // // }

// // // function PrivateRoute({ children }) {
// // //   const { user } = useAuth();
// // //   return user ? children : <Navigate to="/login" replace />;
// // // }

// // // export default function App() {
// // //   return (
// // //     <AuthProvider>
// // //       <Nav />
// // //       <Routes>
// // //         <Route path="/" element={<Home />} />
// // //         <Route path="/properties" element={<Properties />} />
// // //         <Route path="/properties/:id" element={<PropertyPage />} />
// // //         <Route path="/login" element={<Login />} />
// // //         <Route path="/signup" element={<Signup />} />
// // //         <Route path="/preferences" element={<PrivateRoute><Preferences /></PrivateRoute>} />
// // //       </Routes>
// // //     </AuthProvider>
// // //   );
// // // }

// // // src/App.jsx
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Navbar from "./components/Navbar";
// // import Home from "./pages/Home";
// // import PropertyList from "./pages/PropertyList";
// // import PropertyDetail from "./pages/PropertyDetail";

// // function App() {
// //   return (
// //     <Router>
// //       <Navbar />
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="/properties" element={<PropertyList />} />
// //         <Route path="/properties/:id" element={<PropertyDetail />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;



// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from "./auth/AuthContext";

// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import PropertyList from "./pages/PropertyList";
// import PropertyDetail from "./pages/PropertyDetail";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Preferences from "./pages/Preferences";

// // ✅ PrivateRoute Wrapper
// function PrivateRoute({ children }) {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/login" replace />;
// }

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/properties" element={<PropertyList />} />
//           <Route path="/properties/:id" element={<PropertyDetail />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />

//           {/* ✅ Protected Route */}
//           <Route
//             path="/preferences"
//             element={
//               <PrivateRoute>
//                 <Preferences />
//               </PrivateRoute>
//             }
//           />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PropertyList from "./pages/PropertyList";
import PropertyDetail from "./pages/PropertyDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Preferences from "./pages/Preferences";

// ✅ PrivateRoute Wrapper
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ Protected Route */}
        <Route
          path="/preferences"
          element={
            <PrivateRoute>
              <Preferences />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
