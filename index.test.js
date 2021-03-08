const app = require("./App");

const userService = app.userService;
const bookService = app.bookService;
const lendService = app.lendService;

//Test cases
//User
const validUser = {
    email: "teste@hotmail.com",
    name: "teste",
    surname: "teste",
    age: 99
};

const emptyEmailUser = {
    email: "",
    name: "teste",
    surname: "teste",
    age: 99
};

const emptyNameUser = {
    email: "teste@hotmail.com",
    name: "",
    surname: "teste",
    age: 99
};

const emptyAgeUser = {
    email: "teste@hotmail.com",
    name: "Teste",
    surname: "teste",
    age: null
};

//Book
const validBook = {
    code: "12345",
    name: "Teste",
    category: "Teste",
    author: "Teste",
    UserEmail: "teste@hotmail.com"
};

const noCodeBook = {
    code: "",
    name: "Teste",
    category: "Teste",
    author: "Teste",
    UserEmail: "teste@hotmail.com"
};

const noNameBook = {
    code: "12345",
    name: "",
    category: "Teste",
    author: "Teste",
    UserEmail: "teste@hotmail.com"
};

const noAuthor = {
    code: "12345",
    name: "Teste",
    category: "Teste",
    author: "",
    UserEmail: "teste@hotmail.com"
};

const noOwner = {
    code: "12345",
    name: "Teste",
    category: "Teste",
    author: "Teste",
    UserEmail: ""
};

//Lend
const validLend = {
    BookCode: "12345",
    UserEmail: "teste"
};

const noCodeLend = {
    BookCode: "",
    UserEmail: "teste"
};

const noEmailLend = {
    BookCode: "12345",
    UserEmail: ""
};

//TESTS
//User creation
test('If database is not created, must return null!\nIf user already exists or not, must return an object containing error/success message.', async() => {
    const outputSuccess = {
        success: app.constants.userSaveSuccessMsg
    };
    const outputErrorUserDuplicate = {
        error: app.constants.userExistsMsg
    };
    const data = null;
    try {
        const data = await userService.insert(validUser);
        expect(data).toEqual(outputSuccess);
    } catch (err) {
        if(err.error.name == 'SequelizeDatabaseError') {
            expect(data).toEqual(null);
        } else expect(err).toEqual(outputErrorUserDuplicate);
    };
    expect.assertions(1);
});

//User creation with empty email
test('User with no email must return null.', async() => {
    const data = null;
    try {
        const data = await userService.insert(emptyEmailUser);
    } catch (err) {
            expect(data).toEqual(null);
    };
    expect.assertions(1);
});

//User creation with empty name
test('User with no name must return null.', async() => {
    const data = null;
    try {
        const data = await userService.insert(emptyNameUser);
    } catch (err) {
            expect(data).toEqual(null);
    };
    expect.assertions(1);
});

//User creation with empty age
test('User with no age must return null.', async() => {
    const data = null;
    try {
        const data = await userService.insert(emptyAgeUser);
    } catch (err) {
            expect(data).toEqual(null);
    };
    expect.assertions(1);
});

//Book creation
test('If database is not created, must return null!\nIf dont, must return an object containing error/success message.', async() => {
    const outputSuccess = {
        success: app.constants.userNotFoundMsg
    };
    const data = null;
    try {
        const data = await bookService.insert(validBook);
        expect(data).toEqual(outputSuccess);
    } catch (err) {
           expect(data).toEqual(null);
    };
    expect.assertions(1);
});

//Book creation with empty code
test('Book with no code must return null.', async() => {
    const data = null;
    try {
        const data = await bookService.insert(noCodeBook);
    } catch (err) {
            expect(data).toEqual(null);
    };
    expect.assertions(1);
});

//Book creation with empty name
test('Book with no name must return null.', async() => {
    const data = null;
    try {
        const data = await bookService.insert(noNameBook);
    } catch (err) {
            expect(data).toEqual(null);
    };
    expect.assertions(1);
});

//Book creation with empty author
test('Book with no author must return null.', async() => {
    const data = null;
    try {
        const data = await bookService.insert(noAuthor);
    } catch (err) {
            expect(data).toEqual(null);
    };
    expect.assertions(1);
});

//Book creation with empty Owner
test('Book with no owner must return null.', async() => {
    const data = null;
    try {
        const data = await bookService.insert(noOwner);
    } catch (err) {
            expect(data).toEqual(null);
    };
    expect.assertions(1);
});

//Lend creation
test('If database is not created, must return null!\nIf dont, must return an object containing error/success message.', async() => {
    const outputSuccess = {
        success: app.constants.userNotFoundMsg
    };
    const data = null;
    try {
        const data = await lendService.insert(validLend);
        expect(data).toEqual(outputSuccess);
    } catch (err) {
           expect(data).toEqual(null);
    };
    expect.assertions(1);
});

//Lend creation with empty book code
test('Lend with no book code must return null.', async() => {
    const data = null;
    try {
        const data = await lendService.insert(noCodeLend);
    } catch (err) {
            expect(data).toEqual(null);
    };
    expect.assertions(1);
});

//Lend creation with empty user email
test('Lend with no user email must return null.', async() => {
    const data = null;
    try {
        const data = await lendService.insert(noEmailLend);
    } catch (err) {
            expect(data).toEqual(null);
    };
    expect.assertions(1);
});
