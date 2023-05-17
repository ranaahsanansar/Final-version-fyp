import React from 'react';
import {
	FaAngleRight,
	FaAngleLeft, 
	FaChartBar, 
	FaThLarge, 
	FaShoppingCart, 
	FaCog,
	FaSignOutAlt,
	FaBars
} from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import './Styles/SidebarStyle.css'

const ICON_SIZE = 20;

function Sidebar({visible, show}) {

	return (
		<>
			<div className="mobile-nav">
				<button
					className="mobile-nav-btn"
					onClick={() => show(!visible)}
				>
					<FaBars size={24}  />
				</button>
			</div>
			<nav className={!visible ? 'navbar' : 'sideNavBar'}>
				<button
					type="button"
					className="nav-btn"
					onClick={() => show(!visible)}
				>
					{ !visible
						? <FaAngleRight size={30} /> : <FaAngleLeft size={30} />}
				</button>
				<div>
					<NavLink
						className="logo"
						to="/"
					>
							{/* <img
								src={require("../assets/Images/logoCoin.png")}
								alt="logo"
							/> */}
                            Logo
					</NavLink>
					<div className="links nav-top">
						<NavLink to="/" className="nav-link">
							<FaThLarge size={ICON_SIZE} />
							<span>Home</span>
						</NavLink>
						<NavLink to="/filter" className="nav-link">
							<FaChartBar size={ICON_SIZE} />
							<span>Explore</span>
						</NavLink>
						<NavLink to="/orders" className="nav-link">
							<FaShoppingCart size={ICON_SIZE} />
							<span>By Coins</span> 
						</NavLink>
						<NavLink to="/orders" className="nav-link">
							<FaShoppingCart size={ICON_SIZE} />
							<span>Stack Coins</span> 
						</NavLink>
					</div>
				</div>

				<div className="links">
					<NavLink to="/settings" className="nav-link">
						<FaCog size={ICON_SIZE} />
						<span>Settings</span> 
					</NavLink>
					<NavLink to="/Sign-out" className="nav-link">
						<FaSignOutAlt size={ICON_SIZE} />
						<span>Logout</span> 
					</NavLink>
				</div>
			</nav>
		</>
  );
}

export default Sidebar;
