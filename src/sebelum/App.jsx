import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { IconButton, List, Paper, Typography, TextField } from "@mui/material";
import ListItemUser from "../components/ListItemUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddCircle } from "@mui/icons-material";
import AddUserDialog from "../components/AddUserDialog";
import Navbar from "../components/Navbar";
const BASE_API_URL = `https://reqres.in/api`;

function App() {
  const [users, setUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [percentage, setPercentage] = useState(null);
  const [result, setResult] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    async function getUsers() {
      await axios
        .get(`${BASE_API_URL}/users`)
        .then((res) => {
          const responseData = res.data.data;
          setUsers(responseData);
        })
        .catch((error) => {
          console.log(error);
          window.alert(error);
        });
    }
    getUsers();
  }, []);

  useEffect(() => {
    async function calculateLove() {
      const url = `https://love-calculator.p.rapidapi.com/getPercentage?sname=${firstName}&fname=${secondName}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "f89164673emsh75e6ab700285b7ep132e73jsnd1188017b343",
          "X-RapidAPI-Host": "love-calculator.p.rapidapi.com",
        },
      };



      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        
          setPercentage(data.percentage);
          setResult(data.result);
        } catch (error) {
          console.error("Terjadi kesalahan:", error);
        }
      }

    if (formSubmitted) {
        calculateLove();
        setFormSubmitted(false); // Reset status formSubmitted setelah perhitungan
      }
    }, [firstName, secondName, formSubmitted]);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true); // Saat formulir disubmit, memicu perhitungan kecocokan
  };

  return (
    <div className="App">
      <div className="list-container">
        <div className="list-title-wrapper">
          <Typography variant="h4">List User</Typography>
          <IconButton onClick={openDialog}>
            <AddCircle />
          </IconButton>
        </div>
        <Paper elevation={2} style={{ maxHeight: "700px", overflow: "auto" }}>
          <List>
            {users.map((d) => (
              <ListItemUser
                key={d.id}
                image={d.avatar}
                primaryText={`${d.first_name} ${d.last_name}`}
                secondaryText={`Email: ${d.email}`}
              />
            ))}
            {newUsers.map((d) => (
              <ListItemUser
                key={d.id}
                image={d.avatar}
                primaryText={d.name}
                secondaryText={`Job: ${d.job}`}
              />
            ))}
          </List>
        </Paper>
      </div>
      {isDialogOpen && (
        <AddUserDialog
          open={isDialogOpen}
          onClose={closeDialog}
          users={newUsers}
          setUsers={setNewUsers}
        />
      )}

      <div className="love-calculation">
        <Typography variant="h5">Love Calculator</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nama Orang Pertama"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
            label="Nama Orang Kedua"
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)}
            required
          />
          <button type="submit">Hitung</button>
        </form>
        {percentage !== null && (
          <div>
            <p>{`${firstName} dan ${secondName}`}</p>
            <p>Persentase Kecocokan: {percentage}%</p>
            <p>Pesan: {result}</p>
          </div>
        )}
      </div>
    </div>
  );
  <Router>
    <Navbar />
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/countries" component={Countries} />
    </Switch>
  </Router>

}

export default App;
