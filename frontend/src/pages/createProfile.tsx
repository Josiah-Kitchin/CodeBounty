
import React, { useState } from 'react';
import axiosInstance from '../axios.config';
import "./styles/createProfile.css";
import { useNavigate } from 'react-router-dom'


/* The create profile page will be the page after sigining up to set interests and other profile fields */ 
/* ---------------------------------------------------------------------------------------------------- */


const InterestsForm: React.FC = () => {
  const navigate = useNavigate();

  const [interestInput, setInterestInput] = useState<string>('');  // Store current input
  const [interests, setInterests] = useState<string[]>(["Programming!"]);  // Store list of interests

  // Handle change in interest input
  const handleInterestInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestInput(e.target.value);
  };

  // Handle adding an interest to the list
  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent adding empty or duplicate interests
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput(''); // Clear the input after adding
    }
  };

  // Handle removing an interest from the list
  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const response = await axiosInstance.post('/profiles', { interests });
      console.log('Interests saved successfully', response.data);
      if (response.status === 200) {
        navigate("/dashboard")
      }
    } catch (error) {
      console.error('Error saving interests', error);
    }
  };

  return (
    <div className="profile-form-container">
      <h2>Create Your Profile with Interests</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="input-group">
          <label htmlFor="interestInput">Interests</label>
          <div className="interests-container">
            <input
              type="text"
              id="interestInput"
              value={interestInput}
              onChange={handleInterestInputChange}
              placeholder="Type an interest and press Enter"
            />
            <button
              type="button"
              onClick={handleAddInterest}
              className="add-interest-btn"
            >
              Add Interest
            </button>
          </div>
          <div className="interests-list">
            {interests.map((interest, index) => (
              <span key={index} className="interest-item">
                {interest}
                <button
                  type="button"
                  onClick={() => handleRemoveInterest(interest)}
                  className="remove-interest-btn"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
        <button type="submit" className="submit-btn">
          Save Interests
        </button>
      </form>
    </div>
  );
};

export default InterestsForm;

