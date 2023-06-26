import React, { Component } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Feed from "./components/feed";
import './App.css';

class App extends Component {

  render() {
    return (
      <React.Fragment>
      <nav>
        <Navbar/>
      </nav>
      <main className="container-fluid">
        <Feed/>
      </main>
      <footer>
        {/* <Footer/> */}
      </footer>
    </React.Fragment>
    );
  }
}

export default App;
