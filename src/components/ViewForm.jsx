import React, { Component } from "react";
import { CiEdit } from "react-icons/ci";
import { FiDelete } from "react-icons/fi";

//view all data component
export class ViewForm extends Component {
  render() {
    return (
      <>
        <table className="table table-striped text-center table-bordered table-hover table-light">
          <thead>
            <tr>
              <th> </th>
              <th className="w-75">Tasks</th>
              <th>Status</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/*ternary operations detremining first is array or not,  this is for newly entered data of the user and not from json placeholder. 
            This will be updated once added newly tasks. It still response to http Post since i used id start with 100 which is acceptable for json plceholder http with id from 1 to 200 */}
            {Array.isArray(this.props.newData) ||
            this.props.newData.length > 0 ? (
              this.props.newData.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value={item.completed}
                        checked={item.completed ? true : false}
                        onChange={(e) => this.props.statusUpdate(item.id, item)}
                      />
                    </td>
                    <td
                      className={
                        item.completed
                          ? "text-start text-wrap text-decoration-line-through"
                          : "text-start text-wrap"
                      }
                    >
                      {item.title}
                    </td>
                    <td>{item.completed ? "done" : "not"}</td>
                    <td>
                      <button
                        type="button"
                        className="btn  btn-outline-secondary"
                        onClick={() => this.props.forEditBtn(item.id)}
                      >
                        <CiEdit className="w-1" />
                      </button>
                      <button
                        type="button"
                        className="btn   btn-outline-danger"
                        onClick={() => this.props.deleteData(item.id)}
                      >
                        <FiDelete />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>No Newly Added Data</td>
              </tr>
            )}
            {/*ternary operations detremining first is array or not,  this is for retrieve data from the json placeholder https://jsonplaceholder.typicode.com/todos once the loading the page. 
                This is will be updated if edited, and delete. I word around the code to show it on screen. For Http respponse if ok, see Inspect>>Network Tab to see further details*/}
            {Array.isArray(this.props.retrieveData) ||
            this.props.data.retrieveData > 0 ? (
              this.props.retrieveData.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value={item.completed}
                        checked={item.completed ? true : false}
                        onChange={(e) => this.props.statusUpdate(item.id, item)}
                      />
                    </td>
                    <td
                      className={
                        item.completed
                          ? "text-start text-wrap text-decoration-line-through"
                          : "text-start text-wrap"
                      }
                    >
                      {item.title}
                    </td>
                    <td>{item.completed ? "done" : "not"}</td>
                    <td>
                      <button
                        type="button"
                        className="btn  btn-outline-secondary"
                        onClick={() => this.props.forEditBtn(item.id)}
                      >
                        <CiEdit className="w-1" />
                      </button>
                      <button
                        type="button"
                        className="btn   btn-outline-danger"
                        onClick={() => this.props.deleteData(item.id)}
                      >
                        <FiDelete />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>No Data</td> {/*if no data to show */}
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  }
}

export default ViewForm;
