import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employeems"
})

con.connect(function(err) {
    if(err) {
        console.log("Greška prilikom konekcije")
    } else {
        console.log("Uspješna konekcija sa bazom")
    }
})

export default con;
