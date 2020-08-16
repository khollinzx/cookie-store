import React, { Fragment, useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';

const Building = () => {
  // Getting the Mode from the localStorage *if any was set
  function getInitialMode() {
    // passing the value to the saveMode variable
    const saveMode = JSON.parse(localStorage.getItem('dark'));
    // if any was set : set to true
    return saveMode || true;
  };

  // Initializing the skin Mode
  // passsing the gotten skin mode to the useState
  const [skinMode, setSkinMode] = useState(getInitialMode());

  // storing the skinMode to localStorage and looping / mounting the value with UseEffect
  useEffect(() => {
    localStorage.setItem('dark', JSON.stringify(skinMode));
    document.body.style.backgroundColor = skinMode === true ? "white" : "black";
  }, [skinMode]);

  // Intializing the form data
  const [formData, setFormData] = useState({
    itemName: '',
    itemQuantity: '',
  });

  // Extracting values from formData
  const { itemName, itemQuantity } = formData;

  // Getting input from each input fields and passingg it to formDate
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    // Setting the Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
        'Access-Control-Allow-Headers': '*',
      },
    };

    // Initializing FormData Library
    const formValue = new FormData();
    // Appending values to FormData
    formValue.append('itemName', itemName);
    formValue.append('itemQuantity', itemQuantity);

    // Posting the Data to PHP Server;
    // and Extracting the response to the variable data
    const { data } = await axios.post('/create.php', formValue, config);

    // Validating callback Maessage
    if (data.status === 200) {
      // SweetAlert 
      Swal.fire({
        title: 'Your Order Has been Taken',
        text: 'Thanks for Ordering',
        icon: 'success',
        timer: 2000,
      });
    } else if (data.status === 400 || data.status === 404) {
      Swal.fire({
        title: data.message,
        icon: 'warning',
        showConfirmButton: true,
      });
    }
  };

  return (
    <Fragment>
      <Navbar skin={skinMode} />
      <div className="container">
        <div className="surrounding">
          <div onClick={() => setSkinMode((prevMode) => !prevMode)} className={skinMode ? 'sun' : 'moon'}></div>
          <div className="building-top"></div>
          <div className="building-wall">
            <div className="signboard text-center">
              <p className="text-uppercase py-1 font-weight-bolder">
                Cookie Bakery
              </p>
            </div>
            <div className={skinMode ?  'window-left' : 'window-left-close'}></div>
            <div className={skinMode ?  'window-right' : 'window-right-close'}></div>
            <button className="door" data-toggle='modal' data-target='#door'>
              <div className="handle"></div>
              <div className="sign">
                <p>{skinMode ? 'OPEN' : 'CLOSED'}</p>
              </div>
            </button>
            <div className="mailbox text-center">
              <div className="swing"></div>
              <p className="py-4">Mail Box</p>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <div className='modal fade' id={skinMode ? 'door' : ''} role='dialog' aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalCenterTitle'>
                Your Order
              </h5>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close' >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form action='' onSubmit={(e) => onSubmit(e)}>
                <label htmlFor='itemName'> Item</label>
                <input type='text' className='form-control' name='itemName' placeholder='Cookies' value={itemName} onChange={(e) => onChange(e)} />
                <label htmlFor='itemQuantity'> Quantity</label>
                <input type='number' className='form-control' name='itemQuantity' placeholder='Quantity' value={itemQuantity} onChange={(e) => onChange(e)} />
                <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' data-dismiss='modal'>
                    Close
                  </button>
                  <button type='submit' className='btn btn-primary'>
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Building;
