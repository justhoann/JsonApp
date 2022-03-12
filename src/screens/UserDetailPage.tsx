import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAlbum, IUser } from "./../model/model";
import { ALBUMS_URL, USERS_URL } from "./../CONSTANTS/constants";
import {
	Button,
	Col,
	Form,
	FormControl,
	InputGroup,
	Row,
	Table,
} from "react-bootstrap";

const UserDetailPage = () => {
	const params = useParams();
	const [user, setUser] = useState<IUser>();
	const [email, setEmail] = useState<string>(user?.email || "");
	const [phone, setPhone] = useState<string>(user?.phone || "");
	const [website, setWebsite] = useState<string>(user?.website || "");
	const [showEditcontact, setShowEditcontact] = useState<boolean>(false);
	const [albums, setAlbums] = useState<IAlbum[]>([]);
	const [newTitle, setNewTitle] = useState<string>("");
	const handleEditContact = (
		email: string,
		phone: string,
		website: string,
	) => {
		fetch(USERS_URL + "/" + params.id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				website: website,
				phone: phone,
			}),
		});
	};

	const handleChangeInputToCreateAlbum = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setNewTitle(e.target.value);
	};
	const handleCreateNewAlbum = () => {
		fetch(ALBUMS_URL, {
			method: "POST",
			body: JSON.stringify({
				title: newTitle,
				id: Math.floor(1000 * Math.random()),
				userId: user?.id,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setAlbums((albums) => [data, ...albums]);
			});
	};
	const handleRemoveAlbum = async (id: number) => {
		try {
			await fetch(ALBUMS_URL + "/" + id, {
				method: "DELETE",
			});
			const AlbumsAfterRemove = albums.filter((album) => album.id !== id);
			setAlbums(AlbumsAfterRemove);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetch(USERS_URL + "/" + params.id)
			.then((response) => response.json())
			.then((data) => {
				setUser(data);
			});
	}, [setUser, params.id]);

	useEffect(() => {
		fetch(USERS_URL + "/" + params.id + "/albums")
			.then((res) => res.json())
			.then((data) => {
				setAlbums(data);
			});
	}, [setAlbums]);

	return (
		<div>
			<h1>{user?.name}</h1>
			<div className='mb-4'>
				<Row>
					<Col>
						<div className='mb-2'>
							<h2>Personal</h2>
							<Table>
								<tr>
									<td>Id:</td>
									<td>{user?.id}</td>
								</tr>
								<tr>
									<td>Username:</td>
									<td>{user?.username}</td>
								</tr>
							</Table>
						</div>
						<div className='mb-2'>
							<h2>Address:</h2>
							<Table>
								<tr>
									<td>Street:</td>
									<td>{user?.address.street}</td>
								</tr>
								<tr>
									<td>Suite:</td>
									<td>{user?.address.suite}</td>
								</tr>
								<tr>
									<td>City:</td>
									<td>{user?.address.city}</td>
								</tr>
								<tr>
									<td>Zipcode:</td>
									<td>{user?.address.zipcode}</td>
								</tr>
							</Table>
						</div>
						<div className='mb-2'>
							<h2>Company:</h2>
							<Table>
								<tr>
									<td>Name:</td>
									<td>{user?.company.name}</td>
								</tr>
								<tr>
									<td>CatchPhrase:</td>
									<td>{user?.company.catchPhrase}</td>
								</tr>
								<tr>
									<td>Bs:</td>
									<td>{user?.company.bs}</td>
								</tr>
							</Table>
						</div>
					</Col>
					<Col>
						<div className='mb-2'>
							<h2>Contact:</h2>
							{!showEditcontact && (
								<>
									<Table>
										<tr>
											<td>Email:</td>
											<td>
												{email === ""
													? user?.email
													: email}
											</td>
										</tr>
										<tr>
											<td>Website:</td>
											<td>
												{website === ""
													? user?.website
													: website}
											</td>
										</tr>
										<tr>
											<td>Phone:</td>
											<td>
												{phone === ""
													? user?.phone
													: phone}
											</td>
										</tr>
									</Table>
									<Button
										variant='success'
										onClick={() => {
											setShowEditcontact(true);
										}}>
										Edit
									</Button>
								</>
							)}
							{showEditcontact && (
								<>
									<InputGroup className='mb-3'>
										<InputGroup.Text id='basic-addon1'>
											Email
										</InputGroup.Text>
										<FormControl
											value={
												email === ""
													? user?.email
													: email
											}
											onChange={(
												e: React.ChangeEvent<HTMLInputElement>,
											) => {
												setEmail(e.target.value);
											}}
											placeholder='Username'
										/>
									</InputGroup>
									<InputGroup className='mb-3'>
										<InputGroup.Text id='basic-addon1'>
											Phone
										</InputGroup.Text>
										<FormControl
											value={
												phone === ""
													? user?.phone
													: phone
											}
											onChange={(
												e: React.ChangeEvent<HTMLInputElement>,
											) => {
												setPhone(e.target.value);
											}}
											placeholder='Phone'
										/>
									</InputGroup>
									<InputGroup className='mb-3'>
										<InputGroup.Text id='basic-addon1'>
											Website
										</InputGroup.Text>
										<FormControl
											value={
												website === ""
													? user?.website
													: website
											}
											onChange={(
												e: React.ChangeEvent<HTMLInputElement>,
											) => {
												setWebsite(e.target.value);
											}}
											placeholder='Website'
										/>
									</InputGroup>

									<Button
										variant='success'
										onClick={() => {
											handleEditContact(
												email,
												phone,
												website,
											);

											setShowEditcontact(false);
										}}>
										Submit
									</Button>
									<Button className='mx-3' variant='danger'>
										Reset
									</Button>
								</>
							)}
						</div>
					</Col>
				</Row>
			</div>
			<div className='mt-4'>
				<h2>Photo Albums</h2>
				<Row>
					<Col lg={6}>
						<InputGroup className='mb-3'>
							<FormControl
								onChange={handleChangeInputToCreateAlbum}
								placeholder='Title of new album'
							/>
							<Button
								onClick={handleCreateNewAlbum}
								className='mx-3'
								variant='success'>
								New Album
							</Button>
						</InputGroup>
					</Col>
				</Row>
				<Row>
					{albums.map((album, index) => {
						return (
							<Col key={index} lg={6}>
								<InputGroup className='mb-3'>
									<InputGroup.Text id='basic-addon1'>
										{index + 1}
									</InputGroup.Text>
									<FormControl value={album.title} />
									<Button
										onClick={() =>
											handleRemoveAlbum(album.id)
										}
										variant='danger'>
										X
									</Button>
								</InputGroup>
							</Col>
						);
					})}
				</Row>
			</div>
		</div>
	);
};

export default UserDetailPage;
