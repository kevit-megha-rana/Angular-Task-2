export enum EnumRegex{
    Name = "[^ 0-9][A-Za-z ]{1,}",
    PhoneNumber = "[7-9][0-9]{9}",
    InstituteName = "[A-Za-z]{1,}[A-Za-z.&() ]{1,}",
    Degree = "[A-Za-z]{1,}[A-Za-z.&(),\/ ]{1,}",
    Percentage = "^[1-9][0-9]?(\.[0-9]{1,2})?$",
    Password = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
}


