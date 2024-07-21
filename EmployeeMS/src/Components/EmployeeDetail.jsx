import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const EmployeeDetail = () => {
    const [employee, setEmployee] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3000/employee/detail/'+id)
        .then(result => {
            setEmployee(result.data[0])
        })
        .catch(err => console.log(err))
    }, [])
    const handleLogout = () => {
        axios.get('http://localhost:3000/employee/logout')
        .then(result => {
          if(result.data.Status) {
            localStorage.removeItem("valid")
            navigate('/')
          }
        }).catch(err => console.log(err))
      }
  return (
    <div>
        <div className="p-2 d-flex justify-content-center shadow">
            <h4>Sistem za praćenje zaposlenika</h4>
        </div>
        <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
            <div className='d-flex align-items-center flex-column mt-5'>
                <h3>Ime: {employee.name}</h3>
                <h3>Email: {employee.email}</h3>
                <h3>Adresa: {employee.adress}</h3>
                <h3>Sati: {employee.sati}</h3>
            </div>
            <div>
                <button className='btn btn-danger' onClick={handleLogout}>Odjavi se</button>
            </div>
        </div>
    </div>
  )
}

export default EmployeeDetail