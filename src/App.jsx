import React, { Component, useId } from "react";

import AddEditForm from "./components/AddEditForm";
import ViewForm from "./components/ViewForm";
import Card from "./container/Card";
import OnTopBtn from "./components/OnTopBtn";
import Note from "./components/Note";

//main App of this application. all states and function is stored here and passed thru props to other components
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: 0,
        title: "",
        completed: false,
      }, //state for input
      newData: [], //state to store newly added data of the user
      retrieveData: [], //state to store thre retrieve data from the json placeholder
      forEdit: false, //for edit button state
      status: false, //for editing status per tasks state
    };

    //use different state for newly added data by user and retrieve data from json placeholder
    //since it does not reflect and change the json placholder, pls check the inspect>>network tab to see the fetching is working

    //binding function to this to make it points to correct mfunction
    this.fetchData = this.fetchData.bind(this);
    this.addData = this.addData.bind(this);
    this.handleTarget = this.handleTarget.bind(this);
    this.editHandleTarget = this.editHandleTarget.bind(this);

    this.deleteData = this.deleteData.bind(this);
    this.updateData = this.updateData.bind(this);
    this.statusUpdate = this.statusUpdate.bind(this);
    this.forEditBtn = this.forEditBtn.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  //to load data from http Get json placeholder upon showing of web pages and every reloading
  componentDidMount() {
    this.fetchData();
  }

  //function for fetching data from http json placeholder, use async/await and try/catch, use console log to see results and for debugging
  fetchData = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const getData = await res.json();

        this.setState({ retrieveData: getData });
        console.log(this.state.data);
        console.log("successfull data fetch");
      } else {
        console.error("cannot fetch data");
      }
    } catch (error) {
      console.error("cannot connect to http -get", error);
    }
  };

  //function for adding new data to hhtp json plceholder and will show results on screen, use async/await and try/catch, use console log to see results and for debugging
  addData = async (e) => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.data),
      });

      if (res.ok) {
        alert("Successful data added");

        this.setState((prevState) => ({
          newData: [...prevState.newData, this.state.data],
          data: {
            id: 0,
            title: "",
            completed: false,
          },
        }));
        console.log("data added", this.state.data);
      } else {
        alert("NOT Successful");
        console.log("error adding");
      }
    } catch (error) {
      console.error("cannot connect to http - add", error);
    }
  };

  //for input changes for adding new data
  handleTarget = (e) => {
    const { id, value } = e.target;
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [id]: value,
        completed: false,
        id: this.state.newData.length + 100,
      },
    }));
  };

  //for input changes for editing existing data
  editHandleTarget = (e) => {
    const { id, value } = e.target;
    this.setState((prevState) => ({
      data: { ...prevState.data, [id]: value },
    }));
  };

  //delete function. this filter and update state for newly added data by the user and the retrieve data from the json placeholder for any deleted item
  deleteData = async (id) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        console.log("deleted sucessfully");
        alert("deleted sucessfully");

        //filter and make new array without the id passed here by the delete button
        const filteredData = this.state.newData.filter(
          (item) => item.id !== id
        );
        const retrievedFilter = this.state.retrieveData.filter(
          (item) => item.id !== id
        );

        //the new array will be updated the newaData for newly added by the user and retrieve data from the json placeholder
        this.setState({ newData: filteredData, retrieveData: retrievedFilter });
      } else {
        console.error("delete not sucessfully");
        alert("delete not sucessfully");
      }
    } catch (error) {
      console.error("error hhtp del", error);
    }
  };

  //update function. this filter and update state for newly added data by the user and the retrieve data from the json placeholder for any edited item based on the id passed on edit tasks
  updateData = async (id) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state.data),
        }
      );

      if (res.ok) {
        console.log("updated sucessfully");
        alert("updated sucessfully");

        //check if the id exist on newData and retrieveData
        const filterIdND = this.state.newData.some((item) => item.id === id);
        const filterIdRetrieve = this.state.retrieveData.some(
          (item) => item.id === id
        );

        //if true, below condition will update, newData and retrieve data will have same id
        // since i use for newly added the id start with 100 to make sure my http action will go on based on json placholder
        // but below codes will only update based on where they are save and not affect each other
        if (filterIdND) {
          //update state for newData
          this.setState((prevState) => ({
            newData: prevState.newData.map((item) =>
              item.id === id ? { ...item, title: this.state.data.title } : item
            ),
          }));
          console.log("edited successfully", this.state.data);

          this.setState({
            forEdit: false,
            data: {
              id: 0,
              title: "",
              completed: false,
            },
          });
        } else if (filterIdRetrieve) {
          //update state for retrieve data
          this.setState((prevState) => ({
            retrieveData: prevState.retrieveData.map((item) =>
              item.id === id ? { ...item, title: this.state.data.title } : item
            ),
          }));
          console.log("edited successfully", this.state.data);
          this.setState({
            forEdit: false,
            data: {
              id: 0,
              title: "",
              completed: false,
            },
          });
        } else {
          console.log("not edited", this.state.data);
        }
      }
    } catch (error) {
      console.error("error hhtp edit", error);
    }
  };

  //trigger the edit form and update state for forEdit to true, grab the id based on the click item
  forEditBtn = (id) => {
    this.setState({ forEdit: true });
    const filterData =
      this.state.newData.find((item) => item.id === id) ||
      this.state.retrieveData.find((item) => item.id === id);
    this.setState({
      data: {
        id: filterData.id,
        title: filterData.title,
        completed: filterData.completed,
      },
    });

    console.log("edit", this.state.forEdit);
    console.log("edit data", this.state.data);

    //scrolltop, added this for UX
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Add smooth scrolling behavior
    });
  };

  //trigger cancel edit form and update the forEdit to false
  cancelEdit = () => {
    this.setState({
      forEdit: false,
      data: {
        id: 0,
        title: "",
        completed: false,
      },
    });
  };

  //for checkbox function, update the state status if done or not. this is based on data stored in data.completed
  statusUpdate = async (id, data) => {
    //use try since setState is async and to update imediately
    try {
      // Set the new status in the state based on opposite status since state is not updating imediately
      this.setState(
        {
          status: {
            id: data.is,
            title: data.title,
            completed: !data.completed,
          },
        },
        async () => {
          console.log("status change", this.state.status);

          try {
            // Attempt to update the status on the server
            const res = await fetch(
              `https://jsonplaceholder.typicode.com/todos/${id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(this.state.status),
              }
            );

            if (res.ok) {
              console.log("Updated STATUS successfully");
              alert("Updated STATUS successfully");

              // check if ID exist in newData or retrieveData
              const filterIdND = this.state.newData.some(
                (item) => item.id === id
              );
              const filterIdRetrieve = this.state.retrieveData.some(
                (item) => item.id === id
              );

              //if true, below condition will update, newData and retrieve data will have same id
              // since i use for newly added the id start with 100 to make sure my http action will go on based on json placholder
              // but below codes will only update based on where they are save and not affect each other
              if (filterIdND) {
                //update newData
                this.setState((prevState) => ({
                  newData: prevState.newData.map((item) =>
                    item.id === id
                      ? { ...item, completed: !item.completed }
                      : item
                  ),
                }));
                console.log("Edited STATUS successfully", this.state.status);
              } else if (filterIdRetrieve) {
                //update retrieveData
                this.setState((prevState) => ({
                  retrieveData: prevState.retrieveData.map((item) =>
                    item.id === id
                      ? { ...item, completed: !item.completed }
                      : item
                  ),
                }));
                console.log("Edited STATUS successfully", this.state.status);
              } else {
                console.log("Not edited", this.state.status);
              }
            } else {
              console.log("Failed to update STATUS");
              alert("Failed to update STATUS");
            }
          } catch (error) {
            console.error("Error updating data:", error);
          }
        }
      );
    } catch (error) {
      console.error("Error in statusUpdate:", error);
    }
  };

  render() {
    return (
      <>
        <Card>
          <Note />
          <h1 className="display-4 p-2 my-4  text-center">To-Do-App</h1>
          <AddEditForm
            addData={this.addData}
            data={this.state.data}
            handleTarget={this.handleTarget}
            editHandleTarget={this.editHandleTarget}
            forEdit={this.state.forEdit}
            updateData={this.updateData}
            cancelEdit={this.cancelEdit}
          />
          <ViewForm
            retrieveData={this.state.retrieveData}
            newData={this.state.newData}
            deleteData={this.deleteData}
            forEditBtn={this.forEditBtn}
            forEdit={this.forEdit}
            statusUpdate={this.statusUpdate}
          />
          <OnTopBtn />
        </Card>
      </>
    );
  }
}

export default App;
