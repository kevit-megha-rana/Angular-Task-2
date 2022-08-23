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
    hobby?: any[]
};

export class UserService{

userDetails : IUser[] = [
    {
        name: 'Hetanshi Rana',
        dateOfBirth: '2002-10-28',
        email: 'hetanshi@gmail.com',
        phoneNumber: '9879910007',
        education: {
            instituteName: 'Marwadi University', 
            degree: 'BBA Honors', 
            percentage: '80'},
        hobbies: [false, true, false, false, false],
        hobby: [
            {name: 'Cricket', value: 'cricket', selected: false},
            {name: 'Mobile-games', value: 'mobile-games', selected: true},
            {name: 'Movie', value: 'movie', selected: false},
            {name: 'Travelling', value: 'travelling', selected: false},
            {name: 'Sleeping', value: 'sleeping', selected: false}],
        hobbyValues: ['mobile-games'],
        gender: 'female',
    }
];

getUserById(index:number){
    return this.userDetails[index];
}

updateUser(index:number,user:IUser){
    this.userDetails[index] = user;
}

}