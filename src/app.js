import User from "./User.js";
const tableauUser = [];
const url = 'https://randomuser.me/api/?results=20';


const getUsers = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const cleanedData = clean(data.results);
        console.log(cleanedData);
        cleanedData.forEach((person) => {
            tableauUser.push(new User(person));
        });
        filterAlphabet(tableauUser);
        renderUsers();
    }
    catch (error) {
        console.log("Il y a une erreur grosse merde");
    }
}

function clean(data) {
    const people = data;
    return people.map((person) => {
        return {
            title: person.name.title,
            lastName: person.name.last,
            firstName: person.name.first,
            city: person.location.city,
            age: person.dob.age,
            country: person.location.country,
            email: person.email,
            photo: person.picture.large
        };
    });
}

function filterAlphabet(tab) {
    return tab.sort((a, b) =>
        a.lastName.localeCompare(b.lastName));
}

function filterAge(tab) {
    return tab.sort((a, b) => a.age - b.age);
}

function renderUsers() {
    tableauUser.forEach((user) => {
        user.render();
    })
}

document.querySelector("#sort--name").addEventListener("click", () => {
    filterAlphabet(tableauUser);
    document.querySelector("#sort--name").classList.add("selected");
    document.querySelector("#sort--age").classList.remove("selected");
    renderUsers();
})

document.querySelector("#sort--age").addEventListener("click", () => {
    filterAge(tableauUser);
    document.querySelector("#sort--name").classList.remove("selected");
    document.querySelector("#sort--age").classList.add("selected");
    renderUsers();
})

getUsers();