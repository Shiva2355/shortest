import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalUrl: "", // Stores the long URL entered by the user
      shortenedUrls: [], // Array to store shortened URLs and their originals
    };
  }

  // Function to generate a random short string
  generateShortCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let shortCode = "";
    for (let i = 0; i < 6; i++) {
      shortCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return shortCode;
  };

  // Function to handle the shortening of a URL
  handleShortenUrl = () => {
    const { originalUrl, shortenedUrls } = this.state;

    if (!originalUrl.trim()) {
      alert("Please enter a valid URL.");
      return;
    }

    const shortCode = this.generateShortCode();
    const shortUrl = `${window.location.origin}/${shortCode}`;

    // Update state to include the new short URL
    this.setState({
      shortenedUrls: [...shortenedUrls, { originalUrl, shortUrl }],
      originalUrl: "", // Clear the input field after shortening
    });
  };

  // Handle input changes
  handleInputChange = (event) => {
    this.setState({ originalUrl: event.target.value });
  };

  render() {
    const { originalUrl, shortenedUrls } = this.state;

    return (
      <div className="App">
        <h1>URL Shortener</h1>
        <div>
          <input
            type="text"
            placeholder="Enter your URL here"
            value={originalUrl}
            onChange={this.handleInputChange}
            style={{ width: "300px", padding: "10px", margin: "10px 0" }}
          />
          <button
            onClick={this.handleShortenUrl}
            style={{ padding: "10px 20px", cursor: "pointer" }}
          >
            Shorten URL
          </button>
        </div>

        {shortenedUrls.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h3>Shortened URLs:</h3>
            <ul>
              {shortenedUrls.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.shortUrl}
                  </a>{" "}
                  → {item.originalUrl}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default App;


