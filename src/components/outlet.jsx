import React from "react";
import { Outlet } from "react-router-dom";
import Headers from "./headers";
import '../CSS/outlet.css'
function OutletCompo(){
    return (
        <div className="outlet-container">
            <Headers/>
            <Outlet></Outlet>
        </div>
    )
}

export default OutletCompo