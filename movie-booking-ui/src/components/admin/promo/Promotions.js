import React, { useState } from 'react';
import './Promotions.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';

const Promotions = ({ promotions: initialPromotions }) => {
  const [promotions, setPromotions] = useState(initialPromotions);
  const [newPromotion, setNewPromotion] = useState('');

  const handleAddPromotion = () => {
    if (newPromotion.trim() !== '') {
      // Create a new promotion object, for example
      const newPromo = { title: newPromotion };

      // Update the promotions state with the new promotion
      setPromotions([...promotions, newPromo]);

      // Clear the input field
      setNewPromotion('');
    }
  };

  return (
    <div className="promotions-container">
      <h2 className="promotions-title">Ongoing Promotions</h2>
      <ul className="promotions-list">
        {promotions.map((promotion, index) => (
          <li key={index} className="promotion-item">
            {promotion.title}
            <button className="remove-promotion">
              <DeleteOutlineOutlinedIcon style={{ color: 'black', width: '28px', height: '28px' }} />
            </button>
          </li>
        ))}
      </ul>
      <div className="add-promotion-container">
        <input
          type="text"
          placeholder="New Promotion"
          value={newPromotion}
          onChange={(e) => setNewPromotion(e.target.value)}
        />
        <button className="add-promotion" onClick={handleAddPromotion}>
          <AddIcon style={{ color: 'white', width: '28px', height: '28px' }} />
        </button>
      </div>
    </div>
  );
};

export default Promotions;
