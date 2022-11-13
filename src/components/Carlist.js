import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { Button, Snackbar } from "@mui/material";
import Addcar from "./Addcar";
import Editcar from "./Editcar";

export default function Carlist() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = React.useState(false);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
    }

    const handleClose = (event, reason) => {
        setOpen(false);
        }

    const action = (
        <React.Fragment>
          <Button size="small" onClick={handleClose}>X</Button>
        </React.Fragment>
      );

    const deleteCar = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
            setOpen(true);
        }
    }

    const saveCar = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const DeleteButton = p => {
        return (
            <div>
                <Button onClick={() => deleteCar(p.value)} color='error' size="small"> Delete </Button>
            </div>
        )
    }

    const EditButton = p => {
        return (
                <Editcar updateCar={updateCar} car= {p.data} />
        )
    }


    const columns = [
        { headerName: 'Brand', field: "brand", sortable:true, filter: true },
        { headerName: 'Model', field: "model", sortable:true, filter: true },
        { headerName: 'Color', field: "color", sortable:true, filter: true },
        { headerName: 'Year', field: "year", sortable:true, filter: true },
        { headerName: 'Fuel', field: "fuel", sortable:true, filter: true },
        { headerName: 'Price', field: "price", sortable:true, filter: true },
        { headerName: '', field: '', cellRenderer: EditButton },
        { headerName: '', field: "_links.self.href", cellRenderer: DeleteButton },
    ]

    return (
        <div className="ag-theme-material" style={{height:'700px', margin:'auto'}}>
            <Addcar saveCar={saveCar} />
            <AgGridReact
                columnDefs={columns}
                rowData={cars}>
            </AgGridReact>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message='Car deleted' action={action} />
        </div>
    );
}