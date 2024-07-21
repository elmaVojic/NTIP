import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {
    const {id} = useParams()
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        sati: "",
        adress: "",
        category_id: "",
      });
      const [category, setCategory] = useState([])
      const navigate = useNavigate()

      useEffect(()=> {
        axios.get('http://localhost:3000/auth/category')
        .then(result => {
            if(result.data.Status) {
                setCategory(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))

        axios.get('http://localhost:3000/auth/employee/'+id)
        .then(result => {
            setEmployee({
                ...employee,
                name: result.data.Result[0].name,
                email: result.data.Result[0].email,
                adress: result.data.Result[0].adress,
                salary: result.data.Result[0].sati,
                category_id: result.data.Result[0].category_id,
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_employee/'+id, employee)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/employee')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Uredi informacije o zaposleniku</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Ime
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Unesite ime"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Unesite email"
              autoComplete="off"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>

          <div className='col-12'>
            <label for="inputSati" className="form-label">
              Sati
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSati"
              placeholder="Unesite sate"
              autoComplete="off"
              value={employee.sati}
              onChange={(e) =>
                setEmployee({ ...employee, sati: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label for="inputAdress" className="form-label">
              Adresa
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAdress"
              placeholder="Unesite adresu"
              autoComplete="off"
              value={employee.adress}
              onChange={(e) =>
                setEmployee({ ...employee, adress: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label for="category" className="form-label">
              Kategorija
            </label>
            <select name="category" id="category" className="form-select"
                onChange={(e) => setEmployee({...employee, category_id: e.target.value})}>
              {category.map((c) => {
                return <option value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              UREDI
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditEmployee