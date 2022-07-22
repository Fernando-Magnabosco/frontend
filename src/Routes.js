import React from "react";
import { Route, Routes } from "react-router-dom";

import Ads from "./pages/Ads";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/notFound";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import AdPage from "./pages/adPage";
import NewAd from "./pages/newAd";
import User from "./pages/User";
import Update from "./pages/Update";
import editAd from "./pages/editAd";

import { Private } from "./components/Private";

const routes = () => {
    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/ad/:id" element={<AdPage />} />
            <Route path="/ads" element={<Ads />} />
            <Route path="/post-an-ad" element={<NewAd />} />
            <Route path="/*" element={<NotFound />} />

            {/* Private */}
            <Route path="/about" element={<Private component={About} />} />
            <Route path="/edit/:id" element={<Private component={editAd} />} />
            <Route path="/my-account" element={<Private component={User} />} />
            <Route path="/update" element={<Private component={Update} />} />
        </Routes>
    );
};

export default routes;
