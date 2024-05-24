import {useState} from 'react';
import './list.css';
import axios from 'axios';
import Modal from '../modal/modal';
import { useNavigate } from 'react-router-dom';

const PropertyList = ({ properties, type }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sellerData, setSellerData] = useState(null);
    const navigate = useNavigate();
    const handleUpdate = (property) => {
        navigate(`/add-property/${property._id}`, { state: {property} });
    };

    const handleInterestedClick = async (sellerId) => {
        try {
          const response = await axios.post('/getSeller', { sellerId });
          setSellerData(response.data.data);
          setIsModalOpen(true);
        } catch (error) {
          console.error("Error fetching seller data:", error);
        }
      };

      const handleDeleteClick = async (propertyId) => {
        try {
            console.log(propertyId);
          const response = await axios.delete(`/property/delete/${propertyId}`);
          console.log('Property deleted:', response.data);
            window.location.reload();
        } catch (error) {
          console.error("Error deleting property:", error);
        }
      };

  return (
    <div className="property-list">
      {properties.map((property) => (
        <div key={property.id} className="property-item">
          <p><strong>Location:</strong> {property.location}</p>
          <p><strong>Area:</strong> {property.area} sq ft</p>
          <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
          <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
          <div className="property-buttons">
            {type === 'buyer' && <button className="interested-button" 
            onClick={() => handleInterestedClick(property.sellerId)}>Interested</button>}
            {type === 'seller' && (
              <>
                <button className="update-button" onClick={() => handleUpdate(property)}>Update</button>
                <button className="delete-button" onClick={() => handleDeleteClick(property._id)}>Delete</button>
              </>
            )}
          </div>
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} sellerData={sellerData} />
    </div>
  );
};

export default PropertyList;
