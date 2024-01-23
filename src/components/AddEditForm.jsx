import React, { Component } from "react";

//add and edit form component
export class AddEditForm extends Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
    this.formHandler = this.formHandler.bind(this);
  }

  //onSubmit using ternary operation to switch functions based on passed props of this.state.forEdit
  submitHandler = (e, id) => {
    e.preventDefault();

    if (!this.props.forEdit) {
      this.props.addData();
    } else {
      this.props.updateData(id);
    }
  };

  //oChange for input box, function using ternary operation to switch functions based on passed props of this.state.forEdit
  formHandler = (e) => {
    if (!this.props.forEdit) {
      this.props.handleTarget(e);
    } else {
      this.props.editHandleTarget(e);
    }
  };

  render() {
    const forEdit = this.props.forEdit; //pass props and declaring as variables

    return (
      <>
        <form onSubmit={(e) => this.submitHandler(e, this.props.data.id)}>
          <div className="input-group w-75 mb-3 p-3 m-auto ">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Add your tasks here"
              id="title"
              value={this.props.data.title}
              onChange={(e) => this.formHandler(e)}
              required
            />

            {/* change button UI based on status if for edit, default is save button */}
            {!forEdit ? (
              <button type="submit" className="btn btn-primary">
                {" "}
                Save Tasks{" "}
              </button>
            ) : (
              <>
                <button type="submit" className="btn btn-success">
                  Edit Tasks
                </button>
                <button
                  className="btn btn-warning "
                  onClick={() => this.props.cancelEdit()}
                >
                  Cancel Edit
                </button>
              </>
            )}
          </div>
        </form>
      </>
    );
  }
}

export default AddEditForm;
