import React, { Component } from "react";
import dog from "../images/dog.png"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { getPet, getAllPet, createPet, updatePet, deletePet } from "../services/petService";
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Buffer } from "buffer";
import CircularProgress from '@mui/material/CircularProgress';


class Feed extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            images: [],
            currentSelection: {},
            open: false,
        };

        const chunks = [];
        for (let i = 0; i < this.state.images.length; i += 3) {
            const chunk = this.state.images.slice(i, i + 3);
            chunks.push(chunk);
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        };
    }

    createPet = async (name, description, petName, breed, email, image) => {
        const pet = { 
            name,
            description,
            petName,
            breed,
            email,
            image
         };

        await createPet(pet);
    };

    readPet = async () => {
        // const petId = 123;
        // const pet = await getPet(petId);
        // return pet
    };

    readAllPets = async () => {
        const pets = await getAllPet()
        return pets
    };

    updatePet = async () => {
        // const petId = 123;
        // const updatedData = { /* Dados atualizados do pet */ };
        // await updatePet(petId, updatedData);
    };

    deletePet = async (id) => {
        await deletePet(id);
        this.setState((prevState) => ({
            images: prevState.images.filter((pet) => pet.id !== id),
        }));
    };

    async componentDidMount() {
        this.setState({ images: [] })
        this.setState({ loading: true })
        let pets = await this.readAllPets()
        pets.data.forEach((pet) => {
            this.setState((prevState) => ({
                images: [...prevState.images, {
                    name: pet.name, src: new Buffer.from(pet.image.data).toString("base64"), desc: pet.description,
                    email: pet.email, breed: pet.breed, petName: pet.petName, id: pet.id
                }],
            }));
        })
        this.setState({ loading: false })

    }

    renderChunks() {
        const { images } = this.state;
        const chunks = [];
        const chunkSize = 3;

        for (let i = 0; i < images.length; i += chunkSize) {
            const chunk = images.slice(i, i + chunkSize);
            chunks.push(chunk);
        }

        return chunks.map((chunk, index) => (
            
            <Box sx={{ flexGrow: 1, padding: 2}}>                
                <Grid container spacing={2}>  
                        {chunk[0] !== undefined ? (
                                <Grid xs={4}>
                                    <Card raised
                                        sx={{
                                            
                                            margin: "0 auto",
                                            padding: "0.1em",
                                        }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="250"
                                                alt={chunk[0].petName}
                                                title={chunk[0].petName}
                                                sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                                                image={`data:image/png;base64,${chunk[0].src}`}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    { chunk[0].petName }
                                                </Typography>
                                                <Typography variant="body2" color="text.primary">
                                                    { chunk[0].desc }
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Raça: {chunk[0].breed}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Nome Contato: {chunk[0].name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Email Contato: {chunk[0].email}
                                                </Typography>
                                                <IconButton aria-label="delete">
                                                    <DeleteIcon onClick={() => this.deletePet(chunk[0].id)}/>
                                                </IconButton>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                        ) : (<React.Fragment />)
                        }

                        {chunk[1] !== undefined ? (
                                <Grid xs={4}>
                                    <Card raised
                                        sx={{
                                            
                                            margin: "0 auto",
                                            padding: "0.1em",
                                        }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="250"
                                                alt={chunk[1].petName}
                                                title={chunk[1].petName}
                                                sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                                                image={`data:image/png;base64,${chunk[1].src}`}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {chunk[1].petName}
                                                </Typography>
                                                <Typography variant="body2" color="text.primary">
                                                    {chunk[1].desc}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Raça: {chunk[1].breed}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Nome Contato: {chunk[1].name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Email Contato: {chunk[1].email}
                                                </Typography>
                                                <IconButton aria-label="delete">
                                                    <DeleteIcon onClick={() => this.deletePet(chunk[1].id)} />
                                                </IconButton>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>

                        ) : (<React.Fragment />)
                        }

                        {chunk[2] !== undefined ? (
                                <Grid xs={4}>
                                    <Card raised
                                        sx={{
                                           
                                            margin: "0 auto",
                                            padding: "0.1em",
                                        }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="250"
                                                alt={chunk[2].petName}
                                                title={chunk[2].petName}
                                                sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                                                image={`data:image/png;base64,${chunk[2].src}`}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {chunk[2].petName}
                                                </Typography>
                                                <Typography variant="body2" color="text.primary">
                                                    {chunk[2].desc}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Raça: {chunk[2].breed}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Nome Contato: {chunk[2].name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Email Contato: {chunk[2].email}
                                                </Typography>
                                                <IconButton aria-label="delete">
                                                    <DeleteIcon onClick={() => this.deletePet(chunk[2].id)} />
                                                </IconButton>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>

                        ) : (<React.Fragment />)
                        }

                </Grid>
            </Box>            
        ));
    }

    handleOpen() {
        this.setState({open: true})
    }

    handleClose() {
        this.setState({ open: false })
    }

    async handleSubmit(event) {
        event.preventDefault();
        const name = event.target.name.value
        const description = event.target.description.value
        const petName = event.target.petName.value
        const breed = event.target.breed.value
        const email = event.target.email.value
        const image = event.target.petImage.files[0]
        await this.createPet(name, description, petName, breed, email, image)
        this.handleClose()
        this.componentDidMount()
    }

    render() {
        return ( 
            <div>
                
                <Box sx={{ flexGrow: 1, padding: 2 }}>
                    <Grid container spacing={2}>
                        <Grid xs={8}>
                            <TextField id="outlined-search" label="Pesquisar por uma raça" type="search" style={{width: "100%"}}  />
                        </Grid>
                        <Grid xs={4}>
                            <Button variant="contained" onClick={this.handleOpen} size="large" style={{ width: "100%", height: "100%", backgroundColor: "#f1566d" }}>
                                Adicione um Pet para adoção ❤️
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 1, padding: 2, display: this.state.loading === true ? 'flex' : 'none' }}>
                    <CircularProgress />
                </Box>
                {this.renderChunks()}
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <form autoComplete="off" onSubmit={this.handleSubmit}>

                        <DialogTitle>Adicione seu pet para adoção! ❤️</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Insira abaixo as informações necessárias para adicionar seu Pet na lista de Pets disponíveis para adoção.
                            </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="email"
                                    label="Email para contato"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Seu Nome"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />

                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="petName"
                                    label="Nome do Pet"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="breed"
                                    label="Raça do Pet"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="description"
                                    label="Nos dê uma descrição sobre seu animal!"
                                    type="text"
                                    fullWidth
                                    multiline
                                    variant="standard"
                                />
                                <Button
                                    variant="contained"
                                    component="label"
                                    style={{ marginTop: "1em" }}
                                >
                                    Imagem do Pet
                                    <input
                                        type="file"
                                        id="petImage"
                                        hidden
                                        required
                                    />
                                </Button>
                            
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose}>Cancelar</Button>
                            <Button type="submit">Por para Adoção!</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        )
    }
};



export default Feed;