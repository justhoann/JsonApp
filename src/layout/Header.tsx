import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div>
			<Nav
				defaultActiveKey='/home'
				as='ul'
				className='bg-dark justify-content-around mb-4'>
				<Nav.Item as='li'>
					<Link to='/users'>Users</Link>
				</Nav.Item>
				<Nav.Item as='li'>
					<Link to='/photos'>Photos</Link>
				</Nav.Item>
			</Nav>
		</div>
	);
};

export default Header;
