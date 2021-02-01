import React, { Component } from "react";
import { Toast } from "react-bootstrap";

export default class ToastComponent extends Component {
  render() {
    const toastCss = {
      position: "fixed",
      top: "10px",
      right: "10px",
      zIndex: "1",
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.2) ",
    };
    return (
      <div style={toastCss}>
        <Toast
          className={`border text-white ${
            this.props.type === "success"
              ? "border-success bg-success"
              : this.props.type === "danger"
              ? "border-danger bg-danger"
              : "border-primary bg-primary"
          }`}
          show={this.props.show}
        >
          <Toast.Header
            className={`text-white  ${
              this.props.type === "success"
                ? "border-success bg-success"
                : this.props.type === "danger"
                ? "border-danger bg-danger"
                : "border-primary bg-primary"
            }`}
            closeButton={false}
          >
            <strong className="mr-auto">Succès</strong>
          </Toast.Header>
          <Toast.Body>
            {this.props.type === "success"
              ? "Opération enregistrée avec succès."
              : this.props.type === "danger"
              ? "Opération modifiée avec succès."
              : "Opération signée avec succès."}
          </Toast.Body>
        </Toast>
      </div>
    );
  }
}
