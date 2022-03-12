import React, { useEffect } from "react";
import { Container, Nav } from "react-bootstrap";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import UserPage from "./screens/UserPage";
import PhotoPage from "./screens/PhotoPage";
import UserDetailPage from "./screens/UserDetailPage";
import Header from "./layout/Header";

function App() {
	let navigate = useNavigate();
	const currentPath = useLocation();
	useEffect(() => {
		if (currentPath.pathname === "/") {
			navigate("/users");
		}
	}, [currentPath, navigate]);
	return (
		<div className='App'>
			<Container>
				<Header />
				<Routes>
					<Route path='/users' element={<UserPage />}></Route>
					<Route path='users/:id' element={<UserDetailPage />} />
					<Route path='/photos' element={<PhotoPage />}></Route>
				</Routes>
			</Container>
		</div>
	);
}

export default App;
