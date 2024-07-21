import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        }
        else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
    
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategories(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_employee/'+id)
    .then(result => {
        if(result.data.Status) {
            window.location.reload()
        }
        else {
            alert(result.data.Error)
        }
    })
  }

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown";
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Lista zaposlenika</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Dodaj zaposlenika
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Ime</th>
              <th>Email</th>
              <th>Adresa</th>
              <th>Sati</th>
              <th>Kategorija</th>
              <th>Opcije</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.adress}</td>
                <td>{e.sati}</td>
                <td>{getCategoryName(e.category_id)}</td>
                <td>
                  
                  <Link
                    to={`/dashboard/edit_employee/` + e.id}
                    className="btn btn-info btn-sm me-2">
                    Uredi
                  </Link>
                  
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.id)}>
                    Obriši
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;