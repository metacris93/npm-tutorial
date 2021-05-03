const messages = [
    "Oscar",
    "Ana",
    "Nicolas",
    "Jessica",
    "Diego",
    "Laura",
    "Cristian"
];
const randomMsg = () => {
    const message = messages[Math.floor(Math.random() * messages.length)];
    console.log(message);
}
module.exports = { randomMsg };
