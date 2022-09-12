export interface IUser {
    name: string,
    dateOfBirth: string,
    email: string,
    phoneNumber: string,
    education: {
        instituteName: string, 
        degree: string, 
        percentage: string},
    hobbies?: boolean[],
    gender: string,
    address?: string,
    summary?: string,
    hobbyValues?: string[],
    hobby?: any[],
    uid?: string,
    id?: number
};

