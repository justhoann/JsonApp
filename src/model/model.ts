interface ICompany {
	name: string;
	bs: string;
	catchPhrase: string;
}

interface IAddress {
	city: string;
	street: string;
	suite: string;
	zipcode: string;
	geo: {
		lat: string;
		lng: string;
	};
}

export interface IUser {
	name: string;
	id: number;
	phone: string;
	website: string;
	username: string;
	email: string;
	company: ICompany;
	address: IAddress;
}

export interface IAlbum {
	userId: number;
	id: number;
	title: string;
}

export interface IPhoto {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}
