// import Login from "./Auth/Login";
// import Register from "./Auth/Register";
// import VerifyOtp from "./Auth/VerifyOtp";
// import CreatePassword from "./Auth/CreatePassword";
// import ForgotPassword from "./Auth/ForgotPassword";
// import ResetPassword from "./Auth/ResetPassword";



// import Home from "./home/Home";
// import About from "./home/About";
// import WorkFlow from "./home/WorkFlow";
// import NotFound from "./home/NotFound";
// import Contact from "./home/Contact";
// import Career from "./home/Career";
// import Blog from "./home/Blog";
// import BlogDetails from "./home/BlogDetails";
// import Policies from "./home/Policies";
// import FaqPage from "./home/FaqPage";
// import { Pricing } from "./home/Pricing";
// import Devloper from "./home/Devloper";

// import Dashboard from "./dashboard/Dashboard";
// import Profile from "./dashboard/Profile";



// export {
//     Login, Register, VerifyOtp, CreatePassword, ForgotPassword,ResetPassword, Devloper,
    
//     Home, About, WorkFlow, NotFound, Career, Contact, Blog, BlogDetails, Policies, FaqPage, Pricing,

//     Dashboard, Profile
// }

import { lazy } from "react";

// Auth
const Login = lazy(() => import("./Auth/Login"));
const Register = lazy(() => import("./Auth/Register"));
const VerifyOtp = lazy(() => import("./Auth/VerifyOtp"));
const CreatePassword = lazy(() => import("./Auth/CreatePassword"));
const ForgotPassword = lazy(() => import("./Auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./Auth/ResetPassword"));

// Home
const Home = lazy(() => import("./home/Home"));
const About = lazy(() => import("./home/About"));
const WorkFlow = lazy(() => import("./home/WorkFlow"));
const NotFound = lazy(() => import("./home/NotFound"));
const Contact = lazy(() => import("./home/Contact"));
const Career = lazy(() => import("./home/Career"));
const Blog = lazy(() => import("./home/Blog"));
const BlogDetails = lazy(() => import("./home/BlogDetails"));
const Policies = lazy(() => import("./home/Policies"));
const FaqPage = lazy(() => import("./home/FaqPage"));
const Pricing = lazy(() => import("./home/Pricing"));
const Devloper = lazy(() => import("./home/Devloper"));

// Dashboard
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Profile = lazy(() => import("./dashboard/Profile"));

export {
  Login,
  Register,
  VerifyOtp,
  CreatePassword,
  ForgotPassword,
  ResetPassword,

  Home,
  About,
  WorkFlow,
  NotFound,
  Career,
  Contact,
  Blog,
  BlogDetails,
  Policies,
  FaqPage,
  Pricing,
  Devloper,

  Dashboard,
  Profile,
};
