import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import moment from 'moment';
import { FaGreaterThan, FaTimesCircle } from 'react-icons/fa';

const AppointmentPopup = styled(Popup)`
  border-radius: 1.5rem;
  padding: 0 !important;
  border: none !important;
  width: 50rem !important;
  overflow: hidden;
`;

const AppointmentWrapper = styled.div`
  position: relative;
`;

AppointmentWrapper.Header = styled.div`
  height: 3rem;
  font-size: 20px;
  font-weight: bold;
  background: ${props => props.backgroundColor};
  color: #ffffff;
  width: 100%;
  padding: 0.5rem 1rem;
  line-height: 1.5;
  text-align: center;
`;

AppointmentWrapper.Close = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 0.25rem;
  line-height: 1;
  font-size: 2rem;
  color: #ffffff;
`;

AppointmentWrapper.Body = styled.div`
  background: #ffffff;
  width: 100%;
  padding: 1rem 1rem 0 1rem;
`;

AppointmentWrapper.Footer = styled.div`
  display: flex;
  padding: 0.5rem 1rem 1rem 1rem;

  & > div {
    width: 50%;
    text-align: center;
  }
`;

const UserInformation = styled.div`
  display: flex;
  padding: 0.5rem;

  & > div {
    width: 50%;
    display: flex;
    justify-content: space-between;
    padding-right: 1rem;
  }
`;

const AdjustButton = styled.button`
  background: #dddddd;
  color: #ffffff;
  padding: 2px 15px;
  margin: 0 10px;
  border-radius: 6px;
  cursor: pointer;
`;

const NoteWrapper = styled.div`
  border: 1px solid #dddddd;
  background: #eeeeee;
  padding: 0.5rem;
  overflow-x: scroll;
  height: 10rem;
`;

NoteWrapper.Form = styled.form`
  display: flex;

  & > input {
    flex: 1;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-right: none;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    padding: 0 1rem;
  }
  & > button {
    width: 5rem;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background: #0071c5;
    color: #ffffff;
    line-height: 2.8;
    cursor: pointer;
    text-align: center;
  }
`;

const NoteInformation = styled.div`
  display: flex;
  padding: 0.5rem;

  & > div:nth-child(1),
  & > div:nth-child(2) {
    width: 20%;
  }

  & > div:last-child {
    width: 60%;
  }
`;

const AppointmentInformation = styled.div`
  display: flex;
  padding: 0.5rem;

  & > div {
    width: 30%;
    display: flex;
    justify-content: space-between;
    padding-right: 1rem;
  }
`;

const Button = styled.button`
  border-radius: 4px;
  background: ${props => (props.primary ? '#0071c5' : '#eeeeee')};
  color: ${props => (props.primary ? '#ffffff' : '#333333')};
  border: 1px solid #dddddd;
  font-size: 1rem;
  line-height: 2.8;
  height: 100%;
  cursor: pointer;
  text-align: center;
  padding: 0 2rem;
`;

class Appointment extends React.Component {
  state = {
    noteValue: '',
    services: [
      {
        name: 'Service 1',
        price: 50,
        duration: 30,
      },
      {
        name: 'Service 2',
        price: 50,
        duration: 30,
      },
      {
        name: 'Service 3',
        price: 50,
        duration: 30,
      },
    ],
    products: [
      {
        name: 'Product 1',
        price: 20,
        amount: 5,
      },
      {
        name: 'Product 2',
        price: 20,
        amount: 5,
      },
    ],
    notes: [
      {
        name: 'Rickie Da Vinci',
        date: '05/22/2018',
        content: "Note about customer's service",
      },
      {
        name: 'Rickie Da Vinci',
        date: '03/14/2018',
        content: "Note about customer's service",
      },
    ],
  };

  subtractService(index) {
    this.setState(state => {
      const { services } = state;
      if (services[index].duration >= 15) {
        services[index].duration -= 15;
      }
      return {
        services,
      };
    });
  }

  addService(index) {
    this.setState(state => {
      const { services } = state;
      services[index].duration += 15;
      return {
        services,
      };
    });
  }

  subtractProduct(index) {
    this.setState(state => {
      const { products } = state;
      if (products[index].amount >= 1) {
        products[index].amount -= 1;
      }
      return {
        products,
      };
    });
  }

  addProduct(index) {
    this.setState(state => {
      const { products } = state;
      products[index].amount += 1;
      return {
        products,
      };
    });
  }

  handleSubmit(e) {
    const { notes, noteValue } = this.state;
    e.preventDefault();
    this.setState({
      noteValue: '',
      notes: [
        {
          name: 'Rickie Da Vinci',
          date: moment().format('DD/MM/YYYY'),
          content: noteValue,
        },
        ...notes,
      ],
    });
  }

  handleChange(e) {
    this.setState({ noteValue: e.target.value });
  }

  getTotalPrice() {
    const { services, products } = this.state;
    let total = 0;
    services.forEach(service => {
      total += service.price * (service.duration / 15);
    });
    products.forEach(product => {
      total += product.price * product.amount;
    });
    return total;
  }

  closeModal() {
    //
  }

  renderHeader() {
    const { appointment } = this.props;
    if (appointment.status === 'ASSIGNED') {
      return (
        <AppointmentWrapper.Header backgroundColor="#ffe400">
          Unconfirmed Appointment
        </AppointmentWrapper.Header>
      );
    }
    if (appointment.status === 'CONFIRMED') {
      return (
        <AppointmentWrapper.Header backgroundColor="#98e6f8">
          Confirmed Appointment
        </AppointmentWrapper.Header>
      );
    }
    if (appointment.status === 'CHECKED_IN') {
      return (
        <AppointmentWrapper.Header backgroundColor="#00b4f7">
          Checked-in Appointment
        </AppointmentWrapper.Header>
      );
    }
    if (appointment.status === 'PAID') {
      return (
        <AppointmentWrapper.Header backgroundColor="#00dc00">
          Paid Appointment
        </AppointmentWrapper.Header>
      );
    }
    return (
      <AppointmentWrapper.Header backgroundColor="#00dc00">
        Appointment
      </AppointmentWrapper.Header>
    );
  }

  renderBody() {
    const { appointment } = this.props;
    return (
      <AppointmentWrapper.Body>
        <UserInformation>
          <div>
            <span>Customer name: </span>
            <strong>{appointment.userFullName}</strong>
          </div>
          <div>
            <span>Phone number: </span>
            <strong>{appointment.phoneNumber}</strong>
          </div>
        </UserInformation>
        {this.renderServices()}
        {this.renderProducts()}
        {this.renderNotes()}
        <AppointmentInformation>
          <div>
            <span>Arriving in: </span>
            <strong>{moment(appointment.start).fromNow()}</strong>
          </div>
          <div>&nbsp;&nbsp;</div>
          <div>
            <span>Total: </span>
            <strong>${this.getTotalPrice()}</strong>
          </div>
        </AppointmentInformation>
      </AppointmentWrapper.Body>
    );
  }

  renderService = (service, index) => (
    <tr key={index}>
      <td>{service.name}</td>
      <td style={{ textAlign: 'center' }}>
        <AdjustButton onClick={() => this.subtractService(index)}>
          -15&#39;
        </AdjustButton>
        {service.duration}
        <AdjustButton onClick={() => this.addService(index)}>
          +15&#39;
        </AdjustButton>
      </td>
      <td style={{ textAlign: 'center' }}>
        {service.price * (service.duration / 15)}
      </td>
    </tr>
  );

  renderServices() {
    const { services } = this.state;
    return (
      <table>
        <thead>
          <tr>
            <th width="50%">Selected Services</th>
            <th width="30%" style={{ textAlign: 'center' }}>
              Duration (ms)
            </th>
            <th style={{ textAlign: 'center' }}>Price ($)</th>
          </tr>
        </thead>
        <tbody>{services.map(this.renderService)}</tbody>
      </table>
    );
  }

  renderProduct = (product, index) => (
    <tr key={index}>
      <td>{product.name}</td>
      <td style={{ textAlign: 'center' }}>
        <AdjustButton onClick={() => this.subtractProduct(index)}>
          -
        </AdjustButton>
        {product.amount}
        <AdjustButton onClick={() => this.addProduct(index)}>+</AdjustButton>
      </td>
      <td style={{ textAlign: 'center' }}>{product.price * product.amount}</td>
    </tr>
  );

  renderProducts() {
    const { products } = this.state;
    return (
      <table>
        <thead>
          <tr>
            <th width="50%">Selected Products</th>
            <th width="30%" style={{ textAlign: 'center' }}>
              Amount
            </th>
            <th style={{ textAlign: 'center' }}>Price ($)</th>
          </tr>
        </thead>
        <tbody>{products.map(this.renderProduct)}</tbody>
      </table>
    );
  }

  renderNote = (note, index) => (
    <NoteInformation key={index}>
      <div>
        <strong>{note.date}</strong>
      </div>
      <div>{note.name}</div>
      <div>{note.content}</div>
    </NoteInformation>
  );

  renderNotes() {
    const { notes } = this.state;
    return (
      <NoteWrapper>
        <NoteWrapper.Form onSubmit={e => this.handleSubmit(e)}>
          <input
            value={this.state.noteValue}
            onChange={e => this.handleChange(e)}
          />
          <button type="submit">
            <FaGreaterThan />
          </button>
        </NoteWrapper.Form>
        {notes.map(this.renderNote)}
      </NoteWrapper>
    );
  }

  render() {
    const { appointment } = this.props;
    return (
      <AppointmentPopup
        closeOnDocumentClick
        open={!!appointment}
        onClose={this.closeModal}
      >
        <AppointmentWrapper>
          <AppointmentWrapper.Close onClick={() => this.closeModal()}>
            <FaTimesCircle />
          </AppointmentWrapper.Close>
          {this.renderHeader()}
          {this.renderBody()}
          <AppointmentWrapper.Footer>
            <div>
              <Button onClick={() => this.closeModal()}>Cancel</Button>
            </div>
            <div>
              <Button onClick={() => this.closeModal()} primary="true">
                Confirm
              </Button>
            </div>
          </AppointmentWrapper.Footer>
        </AppointmentWrapper>
      </AppointmentPopup>
    );
  }
}

Appointment.propTypes = {
  appointment: PropTypes.any,
  // services: PropTypes.any,
  // products: PropTypes.any,
};

export default Appointment;
