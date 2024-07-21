import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    sati: "",
    adress: "",
    category_id: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Forma je poslata");


    axios.post('http://localhost:3000/auth/add_employee', employee)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/employee')
        } else {
            alert(result.data.Error)
        }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Dodaj zaposlenika</h3>
        <form className="row g-1" onSubmit={handleSubmit}>

          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Ime
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Unesite ime"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Unesite email"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputPassword4" className="form-label">
              Šifra
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Unesite šifru"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputSati" className="form-label">
              Sati
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSati"
              placeholder="Unesite sate"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, sati: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputAdress" className="form-label">
              Adresa
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAdress"
              placeholder="Unesite adresu"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, adress: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Kategorija
            </label>
            <select name="category" id="category" className="form-select"
                onChange={(e) => setEmployee({...employee, category_id: e.target.value})}>
              {category.map((c) => {
                return <option value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>
          
          
            <button type="submit" className="btn btn-primary w-100">
              DODAJ
            </button>
          
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;