export class Name {
    first: string;
    last: string;
}

export class Friend {
    id: number;
    name: string;
}

export class Picture {
    large: string;
    medium: string;
    thumbnail: string;
}

export class Customer {
    id: number;
    guid: string;
    isActive: boolean;
    balance: string;
    age: number;
    eyeColor: string;
    gender: string;
    randomImageId: number;
    name: Name;
    company: string;
    email: string;
    phone: string;
    address: string;
    about: string;
    registered: Date;
    latitude: number;
    longitude: number;
    tags: string[];
    friends: Friend[];
    picture: Picture;
}
