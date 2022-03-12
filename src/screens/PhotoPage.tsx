import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, FormControl, Row } from "react-bootstrap";
import { PHOTO_URL } from "../CONSTANTS/constants";
import { IPhoto } from "./../model/model";

const PhotoPage = () => {
	const [photos, setPhotos] = useState<IPhoto[]>([]);
	const [limit, setLimit] = useState<number>(12);
	const [isSearch, setIsSearch] = useState<boolean>(false);
	const [idAlbumParam, setIdAlbumParam] = useState<number>(1);
	const handleLoadMore = () => {
		setLimit((limit) => limit + 12);
	};
	const handleChangeInputSearch = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setIsSearch(false);
		setIdAlbumParam(Number(e.target.value));
	};
	const handleSearchBtn = () => {
		setIsSearch(true);
	};
	useEffect(() => {
		fetch(
			PHOTO_URL +
				`?_start=0&_limit=${limit}${
					isSearch ? `&albumId=${idAlbumParam}` : ""
				}`,
		)
			.then((res) => res.json())
			.then((data) => {
				setPhotos(data);
			});
	}, [limit, isSearch]);

	return (
		<div>
			<h1>Photos</h1>
			<Row>
				<Col xs={2} md={2} xxl={2} lg={2}>
					<Form.Select>
						<option value='albumId'>Album Id</option>
					</Form.Select>
				</Col>
				<Col xs={2} md={2} xxl={2} lg={2}>
					<FormControl
						onChange={handleChangeInputSearch}
						placeholder='Search by album id'
					/>
				</Col>
				<Col xs={2} md={2} xxl={2} lg={2}>
					<Button onClick={() => handleSearchBtn()} variant='primary'>
						Search
					</Button>
				</Col>
			</Row>
			<Row className='mt-5'>
				{photos.length === 0 ? (
					<h3>No result</h3>
				) : (
					photos.map((photo, index) => {
						return (
							<Col
								className='my-3'
								key={index}
								xs={3}
								md={3}
								lg={3}
								xl={3}
								xxl={3}>
								<Card style={{ width: "100%" }}>
									<Card.Img variant='top' src={photo.url} />
									<Card.Body>
										<Card.Title className='text-truncate'>
											{photo?.title}
										</Card.Title>
										<Card.Text>Id:#{photo?.id}</Card.Text>
										<Card.Text>
											Album Id:#{photo?.albumId}
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						);
					})
				)}
			</Row>
			{photos.length === 0 ? (
				<></>
			) : (
				<div className='photo__page__btn__field my-5'>
					<Button onClick={handleLoadMore} variant='primary'>
						Load more
					</Button>
				</div>
			)}
		</div>
	);
};

export default PhotoPage;
