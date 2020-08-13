let messageTitleInput = document.querySelector('#messageTitle');
let messageAuthorInput = document.querySelector('#messageAuthor');
let messageContentInput = document.querySelector('#messageContent');
let messageSubmitButton = document.querySelector('#messageSubmit');

class Message{
    constructor(title, author, message){
        this.title = title;
        this.author = author;
        this.message = message;
    }
}

let database = firebase.database().ref();

let updateDB = (event) => {
    event.preventDefault();

    let messageTitle = messageTitleInput.value;
    let messageAuthor = messageAuthorInput.value;
    let messageContent = messageContentInput.value;

    let messageObj = new Message(messageTitle, messageAuthor, messageContent);
    console.log(messageObj);

    database.push(messageObj);

    messageTitleInput.value = '';
    messageAuthorInput.value = '';
    messageContentInput.value = '';
}

messageSubmitButton.addEventListener('click', updateDB);
