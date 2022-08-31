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
    uid: string
};

export class UserService{

private _userDetails : IUser[] = [
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
        uid: '664e84ef-8eb4-b77e-da38-664e00257a8f'
    }
];

public get userDetails(){
    return this._userDetails;
}

// not used right now
public set userDetails(theUserDetails: IUser[]){
    this._userDetails = theUserDetails;
}

getUserById(userID:string){
    return this.userDetails.find(user => user.uid === userID);
}

updateUser(editID:string,user:IUser){
    let userIndex = this.userDetails.findIndex((userObj => userObj.uid === editID));
    this.userDetails[userIndex] = user;
}

}