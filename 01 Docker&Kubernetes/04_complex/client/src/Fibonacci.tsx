import React from "react";
import axios from "axios";

interface CustomError extends Error {
  code: string;
}

class Fibonacci extends React.Component<{}, {}> {
  state = {
    seenIndexes: [],
    values: {},
    index: "",
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    try {
      const values = await axios.get("/api/values/current");
      this.setState({ values: values.data });
    } catch (error) {
      console.log("error.code:", (error as CustomError).code);
    }
  }

  async fetchIndexes() {
    try {
      const seenIndexes = await axios.get("/api/values/all");
      this.setState({
        seenIndexes: seenIndexes.data,
      });
    } catch (error) {
      console.log("error.code:", (error as CustomError).code);
    }
  }

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post("/api/values", {
        index: this.state.index,
      });
      this.setState({ index: "" });
    } catch (error) {
      console.log("error.code:", (error as CustomError).code);
    }
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(", ");
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key as keyof typeof this.state.values]}
        </div>
      );
    }
    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input value={this.state.index} onChange={(event) => this.setState({ index: event.target.value })} />
          <button>Submit</button>
        </form>

        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated Values:</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fibonacci;
