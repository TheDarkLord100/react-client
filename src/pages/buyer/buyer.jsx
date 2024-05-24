import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import PropertyList from '../../components/list/list';
import { AuthContext } from '../../context/authContext';
import './buyer.css';

export default function Buyer() {
  const { updateRole } = useContext(AuthContext);
  useEffect(() => {
    updateRole('buyer');
  }, [updateRole]);

  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    area: '',
    bedrooms: '',
    bathrooms: ''
  });

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await axios.get('/property/view');
        setAllProperties(response.data);
        setFilteredProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    }
    fetchProperties();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const filtered = allProperties.filter(property => {
      return (
        property.location.toLowerCase().includes(filters.location.toLowerCase()) &&
        (!filters.area || property.area >= parseInt(filters.area)) &&
        (!filters.bedrooms || property.bedrooms >= parseInt(filters.bedrooms)) &&
        (!filters.bathrooms || property.bathrooms >= parseInt(filters.bathrooms))
      );
    });
    setFilteredProperties(filtered);
  }, [allProperties, filters]);

  const handleFilterSubmit = () => {
    const filtered = allProperties.filter(property => {
      return (
        property.location.toLowerCase().includes(filters.location.toLowerCase()) &&
        (!filters.area || property.area >= parseInt(filters.area)) &&
        (!filters.bedrooms || property.bedrooms >= parseInt(filters.bedrooms)) &&
        (!filters.bathrooms || property.bathrooms >= parseInt(filters.bathrooms))
      );
    });
    setFilteredProperties(filtered);
  };

  return (
    <div className="properties-section">
      <div className="properties-header">
        <h2>All Properties</h2>
        <div className="filters-container">
          <input type="text" name="location" placeholder="Location" value={filters.location} onChange={handleFilterChange} />
          <input type="number" name="area" placeholder="Area" value={filters.area} onChange={handleFilterChange} />
          <input type="number" name="bedrooms" placeholder="Bedrooms" value={filters.bedrooms} onChange={handleFilterChange} />
          <input type="number" name="bathrooms" placeholder="Bathrooms" value={filters.bathrooms} onChange={handleFilterChange} />
          <button onClick={handleFilterSubmit}>Apply Filters</button>
        </div>
      </div>
      <PropertyList properties={filteredProperties} type="buyer" />
    </div>
  );
}
