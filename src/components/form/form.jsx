import React, { useState } from 'react';
import './form.css'; 
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const PropertyForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [formData, setFormData] = useState(location.state?.property || {
    location: '',
    area: '',
    bedrooms: '1',
    bathrooms: '1',
    schools: false,
    colleges: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      updateSubmit(e);
    } else {
      newSubmit(e);
    }
  };

  const updateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/property/update/${id}`, formData);
      console.log('Property updated:', response.data);
      toast.success('Property updated successfully');
      navigate(-1);
    } catch (error) {
      console.error("Error updating property:", error);
      toast.error('Failed to update property');
    }
  };

  const newSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/property/add', {
        ...formData,
        sellerId: localStorage.getItem('userId'),
      });
      console.log('Property added:', response.data);
      toast.success('Property added successfully');
      navigate(-1);
    } catch (error) {
      console.error("Error adding property:", error);
      toast.error('Failed to add property');
    }
  };

  return (
    <div className="add-property">
      <h2>{id ? 'Update Property' : 'Add New Property'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="area">Area (sq ft):</label>
          <input
            type="number"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="bedrooms">Number of Bedrooms:</label>
          <select
            id="bedrooms"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label htmlFor="bathrooms">Number of Bathrooms:</label>
          <select
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label htmlFor="schools">
            <input
              type="checkbox"
              id="schools"
              name="schools"
              checked={formData.schools}
              onChange={handleChange}
            />
            Schools Nearby
          </label>
        </div>
        <div>
          <label htmlFor="colleges">
            <input
              type="checkbox"
              id="colleges"
              name="colleges"
              checked={formData.colleges}
              onChange={handleChange}
            />
            Colleges Nearby
          </label>
        </div>
        <button type="submit">{id ? 'Update Property' : 'Add Property'}</button>
      </form>
    </div>
  );
};

export default PropertyForm;
