import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import { FaGreaterThan, FaTimesCircle } from 'react-icons/fa';

const AppPopup = styled(Popup)`
  border-radius: 1.5rem;
  padding: 0 !important;
  border: none !important;
  overflow: hidden;
`;

const AppPopupWrapper = styled.div`
  position: relative;
`;

AppPopupWrapper.Header = styled.div`
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

AppPopupWrapper.Close = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 0.25rem;
  line-height: 1;
  font-size: 2rem;
  color: #ffffff;
  cursor: pointer;
`;

AppPopupWrapper.Body = styled.div`
  background: #ffffff;
  width: 100%;
  padding: 1rem 1rem 0 1rem;
`;

AppPopupWrapper.Footer = styled.div`
  display: flex;
  padding: 0.5rem 1rem 1rem 1rem;

  & > div {
    width: 1000%;
    text-align: center;
  }
`;

// ************************************************* //
// ************************************************* //
// ************************************************* //

const SearchingPopup = styled(AppPopup)`
  width: 30rem !important;
`;

const SearchingWrapper = styled(AppPopupWrapper)`
  //
`;

SearchingWrapper.Header = styled(AppPopupWrapper.Header)`
  //
`;

SearchingWrapper.Body = styled(AppPopupWrapper.Body)`
  text-align: center;
`;

SearchingWrapper.Close = styled(AppPopupWrapper.Close)`
  //
`;

SearchingWrapper.Footer = styled(AppPopupWrapper.Footer)`
  //
`;

// ************************************************* //
// ************************************************* //
// ************************************************* //

const AddingPopup = styled(AppPopup)`
  width: 30rem !important;
`;

const AddingWrapper = styled(AppPopupWrapper)`
  //
`;

AddingWrapper.Header = styled(AppPopupWrapper.Header)`
  //
`;

AddingWrapper.Body = styled(AppPopupWrapper.Body)`
  text-align: center;
`;

AddingWrapper.Close = styled(AppPopupWrapper.Close)`
  //
`;

AddingWrapper.Footer = styled(AppPopupWrapper.Footer)`
  //
`;

// ************************************************* //
// ************************************************* //
// ************************************************* //

const Form = styled.form`
  width: 100%;
  text-align: center;

  &.left {
    text-align: left;

    input {
      text-align: left;
    }
  }

  & > input {
    width: 100%;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    text-align: center;

    &.w-50 {
      width: 50%;
    }
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

class AddAppointment extends React.Component {
  state = {
    isOpenSearchingPopup: true,
    isOpenAddingPopup: false,
    phoneNumber: '',
  };

  closeAllModal() {
    this.setState({
      isOpenSearchingPopup: true,
      isOpenAddingPopup: false,
      phoneNumber: '',
    });
    const { closeAddingAppointment } = this.props;
    closeAddingAppointment();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isOpenSearchingPopup: false,
      isOpenAddingPopup: true,
    });
  }

  handleChange(e) {
    this.setState({ phoneNumber: e.target.value });
  }

  render() {
    const { isOpenSearchingPopup, isOpenAddingPopup } = this.state;
    const { appointment } = this.props;
    if (!appointment) return '';
    return (
      <div>
        <SearchingPopup open={isOpenSearchingPopup}>
          <SearchingWrapper>
            <SearchingWrapper.Close onClick={() => this.closeAllModal()}>
              <FaTimesCircle />
            </SearchingWrapper.Close>
            <SearchingWrapper.Header backgroundColor="#00b4f7">
              Add Appointment
            </SearchingWrapper.Header>
            <SearchingWrapper.Body>Enter phone number</SearchingWrapper.Body>
            <SearchingWrapper.Footer>
              <Form onSubmit={e => this.handleSubmit(e)}>
                <input
                  value={this.state.phoneNumber}
                  onChange={e => this.handleChange(e)}
                  type="number"
                />
                <div>
                  <Button type="submit" primary>
                    Next
                  </Button>
                </div>
              </Form>
            </SearchingWrapper.Footer>
          </SearchingWrapper>
        </SearchingPopup>
        <AddingPopup
          open={isOpenAddingPopup}
          onClose={() => this.closeAllModal()}
        >
          <AddingWrapper>
            <AddingWrapper.Close onClick={() => this.closeAllModal()}>
              <FaTimesCircle />
            </AddingWrapper.Close>
            <AddingWrapper.Header backgroundColor="#00b4f7">
              Add Appointment
            </AddingWrapper.Header>
            <AddingWrapper.Body>
              <div>Phone number is not exist ! Get information !</div>
              <Form onSubmit={e => e.preventDefault()}>
                <input value={this.state.phoneNumber} type="number" disabled />
              </Form>
              <Form className="left" onSubmit={e => e.preventDefault()}>
                <div>Customer Name</div>
                <input placeholder="First Name" className="w-50" />
                <input placeholder="Last Name" className="w-50" />
                <div>Referrer Phone Number</div>
                <input placeholder="0123 123 123" />
              </Form>
              <NoteWrapper>
                <NoteWrapper.Form onSubmit={e => e.preventDefault()}>
                  <input
                    value={this.state.noteValue}
                    onChange={e => this.handleChange(e)}
                  />
                  <button type="submit">
                    <FaGreaterThan />
                  </button>
                </NoteWrapper.Form>
              </NoteWrapper>
            </AddingWrapper.Body>
            <AddingWrapper.Footer>
              <div>
                <Button type="submit" primary>
                  Next
                </Button>
              </div>
            </AddingWrapper.Footer>
          </AddingWrapper>
        </AddingPopup>
      </div>
    );
  }
}

AddAppointment.propTypes = {
  appointment: PropTypes.any,
  closeAddingAppointment: PropTypes.func,
};

export default AddAppointment;