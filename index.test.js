const app = require("./App");

const userService = app.userService;
const bookService = app.bookService;

//Test cases
//User
const emptyEmailUser = {
    email: "",
    name: "teste",
    surname: "teste",
    age: 99
};

const emptyNameUser = {
    email: "teste_empty_user@hotmail.com",
    name: "",
    surname: "teste",
    age: 99
};

const emptyAgeUser = {
    email: "teste_empty_age@hotmail.com",
    name: "Teste",
    surname: "teste",
    age: null
};

//Book
const noCodeBook = {
    code: "",
    name: "Teste",
    category: "Teste",
    author: "Teste",
    UserEmail: "teste@hotmail.com"
};

const noNameBook = {
    code: "123",
    name: "",
    category: "Teste",
    author: "Teste",
    UserEmail: "teste@hotmail.com"
};

//TESTS
//User creation with empty email
test('User with no email must return null.', async() => {
     
    try {
        const data = await userService.insert(emptyEmailUser);
    } catch (err) {
        expect(err.error.errors[0].path).toEqual('email');
    };
    expect.assertions(1);
});

//User creation with empty name
test('User with no name must return null.', async() => {
     
    try {
        const data = await userService.insert(emptyNameUser);
    } catch (err) {
        expect(err.error.errors[0].path).toEqual('name');
    };
    expect.assertions(1);
});

//User creation with empty age
test('User with no age must return null.', async() => {
     
    try {
        const data = await userService.insert(emptyAgeUser);
    } catch (err) {
        expect(err.error.errors[0].path).toEqual('age');
    };
    expect.assertions(1);
});

//Book creation with empty code
test('Book with no code must return null.', async() => {
     
    try {
        const data = await bookService.insert(noCodeBook);
    } catch (err) {
        expect(err.error.errors[0].path).toEqual('code');
    };
    expect.assertions(1);
});

//Book creation with empty name
test('Book with no name must return null.', async() => {
     
    try {
        const data = await bookService.insert(noNameBook);
    } catch (err) {
        let test = JSON.stringify(err)
        expect(err.error.errors[0].path).toEqual('name');
    };
    expect.assertions(1);
});

