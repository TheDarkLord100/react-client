// SellerProfile.js
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import PropertyList from '../../components/list/list';
import './seller.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SellerProfile = () => {

    const { updateRole } = useContext(AuthContext);

    useEffect(() => {
      updateRole('seller');
    }, [updateRole]);

  const [properties, setProperties] = useState([]);

    useEffect(() => {
        async function fetchProperties() {
            const response = await axios.get('/property/view/' + localStorage.getItem('userId'));
        console.log(response.data);
        setProperties(response.data);
        }
        fetchProperties();
    }, []);


  return (
    <div className="seller-profile">
      <div className="profile-details">
        <h2>Profile Details</h2>
        <p><strong>Name:</strong> {localStorage.getItem('name')}</p>
        <p><strong>Username:</strong> {localStorage.getItem('username')}</p>
        <p><strong>Email:</strong> {localStorage.getItem('email')}</p>
        <p><strong>Phone:</strong> {localStorage.getItem('phone')}</p>
      </div>
      <div className="properties-section">
        <div className="properties-header">
          <h2>Your Properties</h2>
          <Link to="/add-property" className="add-property-link">Add New Property</Link>
        </div>
        <PropertyList properties={properties} type={"seller"}/>
      </div>
    </div>
  );
};

export default SellerProfile;
