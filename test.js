// import Crypto from "node:crypto";

// const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
// console.log(Math.round(Math.random() * 1e9));

// console.log(Crypto.randomBytes(16).toString("hex"));

/** ====================================================================== */

// const data = [1, 2, 3];

// const query = data
//   .map((item) => {
//     return `INSERT INTO nama_tabel (nama_kolom) VALUES (${item})`;
//   })
//   .join(";");

// console.log(query);

// const users = [
//   {
//     name: "John Doe",
//     username: "johndoe",
//     email: "johndoe@example.com",
//     password: "password1",
//   },
//   {
//     name: "Jane Doe",
//     username: "janedoe",
//     email: "janedoe@example.com",
//     password: "password2",
//   },
//   {
//     name: "Bob Smith",
//     username: "bobsmith",
//     email: "bobsmith@example.com",
//     password: "password3",
//   },
// ];

// const values = users.map((user) => [
//   user.name,
//   user.username,
//   user.email,
//   user.password,
// ]);

// const sql = "INSERT INTO users (name, username, email, password) VALUES ?";

// console.log(values);

/** ====================================================================== */

// const data = [
//   { name: "John", age: 25 },
//   { name: "Jane", age: 30 },
//   { name: "Alice", age: 28 },
// ];

// console.log(["hallo gess", data.map((obj) => [obj.name, obj.age])]);

/** ====================================================================== */

// console.log(undefined === false);