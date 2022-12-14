import React from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export default function Editcar(props) {
    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({
        brand: '', model: '', color: '', fuel: '', year: '', price: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
        setCar({
            brand: props.car.brand, 
            model: props.car.model, 
            color: props.car.color, 
            fuel: props.car.fuel, 
            year: props.car.year, 
            price: props.car.price 
        })
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value})
    }

    const updateCar = () => {
        props.updateCar(car, props.car._links.car.href);
        handleClose();
    }

    return(
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Car</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="brand"
                        value={car.brand}
                        label="Brand"
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        margin="dense"
                        name="model"
                        value={car.model}
                        label="Model"
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        margin="dense"
                        name="color"
                        value={car.color}
                        label="Color"
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        margin="dense"
                        name="year"
                        value={car.year}
                        label="Year"
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        margin="dense"
                        name="fuel"
                        value={car.fuel}
                        label="Fuel"
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        value={car.price}
                        label="Price"
                        onChange={e => handleInputChange(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={updateCar}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}