import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { USERS_URL } from "../CONSTANTS/constants";
import { IUser } from "./../model/model";

const UserPage = () => {
	let navigate = useNavigate();
	const [users, setUsers] = useState<IUser[]>([]);
	const apiGet = () => {
		fetch(USERS_URL)
			.then((response) => response.json())
			.then((data) => {
				setUsers(data);
			});
	};

	useEffect(() => {
		apiGet();
	}, []);

	const handleToUserDetail = (index: number) => {
		navigate(`/users/${index}`);
	};
	return (
		<div>
			<h1>User</h1>
			<Table striped hover>
				<thead>
					<tr>
						<th>id</th>
						<th>name</th>
						<th>username</th>
						<th>email</th>
						<th>phone</th>
						<th>website</th>
						<th>city</th>
						<th>Company Name</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => {
						return (
							<tr
								key={index}
								onClick={() => handleToUserDetail(user.id)}>
								<td>{user.id}</td>
								<td>{user.name}</td>
								<td>{user.username}</td>
								<td>{user.email}</td>
								<td>{user.phone}</td>
								<td>{user.website}</td>
								<td>{user.address.city}</td>
								<td>{user.company.name}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
};

export default UserPage;
