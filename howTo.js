//Database Stuff
let database = firebase.database().ref()

let testUsername = 'deybyr647', testFirstName='Deyby', testLastName='Rodriguez', testEmail='deybyr647@gmail.com', testPassword='testPassword', testSavedArticles = ['medium', 'e'];

let refreshDB = () => {
    //e.preventDefault();
    const newUser = new User(testFirstName, testLastName, testEmail, testUsername, testPassword, testSavedArticles);
    console.log(newUser);
    database.push(newUser);
}

class User{
    constructor(firstName, lastName, email, username, password, savedArticles){
        this.name = {
            firstName,
            lastName
        };

        this.email = email;
        this.username = username;
        this.password = password;
        this.savedArticles = savedArticles;
    }
}