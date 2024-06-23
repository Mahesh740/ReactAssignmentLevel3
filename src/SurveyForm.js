import React, { useState } from 'react';

const Survey = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    programmingLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: '',
    additionalQuestions: []
  });

  const [additionalAnswers, setAdditionalAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [finalSubmitted, setFinalSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAdditionalAnswerChange = (index, value) => {
    setAdditionalAnswers({
      ...additionalAnswers,
      [index]: value
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.surveyTopic) newErrors.surveyTopic = 'Survey Topic is required';
    if (formData.surveyTopic === 'Technology') {
      if (!formData.programmingLanguage) newErrors.programmingLanguage = 'Favorite Programming Language is required';
      if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of Experience is required';
    }
    if (formData.surveyTopic === 'Health') {
      if (!formData.exerciseFrequency) newErrors.exerciseFrequency = 'Exercise Frequency is required';
      if (!formData.dietPreference) newErrors.dietPreference = 'Diet Preference is required';
    }
    if (formData.surveyTopic === 'Education') {
      if (!formData.highestQualification) newErrors.highestQualification = 'Highest Qualification is required';
      if (!formData.fieldOfStudy) newErrors.fieldOfStudy = 'Field of Study is required';
    }
    if (!formData.feedback) newErrors.feedback = 'Feedback is required';
    if (formData.feedback && formData.feedback.length < 50) newErrors.feedback = 'Feedback must be at least 50 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchAdditionalQuestions = async (topic) => {
    // Mock API response
    const responses = {
      Technology: [
        'What is your favorite tech conference?', 
        'Which IDE do you use?', 
        'What is your preferred operating system?',
        'How often do you write code?',
        'What programming language do you want to learn next?',
        'Do you use version control?',
        'Do you contribute to open source projects?',
        'Do you prefer working remotely or in an office?',
        'What is your favorite coding challenge platform?',
        'Do you participate in hackathons?'
      ],
      Health: [
        'Do you take any supplements?', 
        'How often do you visit a doctor?', 
        'How would you rate your mental health?',
        'Do you smoke or use tobacco?',
        'How much water do you drink daily?',
        'Do you follow any specific diet?',
        'Do you have any chronic conditions?',
        'How often do you get a health check-up?',
        'Do you experience any allergies?',
        'What is your primary form of exercise?'
      ],
      Education: [
        'Do you plan to pursue further studies?', 
        'Do you have any certifications?', 
        'What was your favorite subject?',
        'Did you participate in any extracurricular activities?',
        'What was the most challenging aspect of your studies?',
        'How did you manage your study time?',
        'What is your highest educational achievement?',
        'Do you prefer online or in-person classes?',
        'Have you ever had a study group?',
        'What advice would you give to new students?'
      ]
    };
    return new Promise((resolve) => {
      setTimeout(() => resolve(responses[topic] || []), 1000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const additionalQuestions = await fetchAdditionalQuestions(formData.surveyTopic);
    setFormData({ ...formData, additionalQuestions });
    setLoading(false);
    setSubmitted(true);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    // Final submission logic here
    console.log('Form data:', formData);
    console.log('Additional answers:', additionalAnswers);
    setFinalSubmitted(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ display: submitted ? 'none' : 'block' }}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Survey Topic</label>
          <select
            className={`form-select ${errors.surveyTopic ? 'is-invalid' : ''}`}
            name="surveyTopic"
            value={formData.surveyTopic}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
          {errors.surveyTopic && <div className="invalid-feedback">{errors.surveyTopic}</div>}
        </div>
        {formData.surveyTopic === 'Technology' && (
          <div className="mb-3">
            <label className="form-label">Favorite Programming Language</label>
            <select
              className={`form-select ${errors.programmingLanguage ? 'is-invalid' : ''}`}
              name="programmingLanguage"
              value={formData.programmingLanguage}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
            </select>
            {errors.programmingLanguage && <div className="invalid-feedback">{errors.programmingLanguage}</div>}
            <label className="form-label mt-3">Years of Experience</label>
            <input
              type="number"
              className={`form-control ${errors.yearsOfExperience ? 'is-invalid' : ''}`}
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
            />
            {errors.yearsOfExperience && <div className="invalid-feedback">{errors.yearsOfExperience}</div>}
          </div>
        )}
        {formData.surveyTopic === 'Health' && (
          <div className="mb-3">
            <label className="form-label">Exercise Frequency</label>
            <select
              className={`form-select ${errors.exerciseFrequency ? 'is-invalid' : ''}`}
              name="exerciseFrequency"
              value={formData.exerciseFrequency}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Rarely">Rarely</option>
            </select>
            {errors.exerciseFrequency && <div className="invalid-feedback">{errors.exerciseFrequency}</div>}
            <label className="form-label mt-3">Diet Preference</label>
            <select
              className={`form-select ${errors.dietPreference ? 'is-invalid' : ''}`}
              name="dietPreference"
              value={formData.dietPreference}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
            {errors.dietPreference && <div className="invalid-feedback">{errors.dietPreference}</div>}
          </div>
        )}
        {formData.surveyTopic === 'Education' && (
          <div className="mb-3">
            <label className="form-label">Highest Qualification</label>
            <select
              className={`form-select ${errors.highestQualification ? 'is-invalid' : ''}`}
              name="highestQualification"
              value={formData.highestQualification}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
            {errors.highestQualification && <div className="invalid-feedback">{errors.highestQualification}</div>}
            <label className="form-label mt-3">Field of Study</label>
            <input
              type="text"
              className={`form-control ${errors.fieldOfStudy ? 'is-invalid' : ''}`}
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleChange}
            />
            {errors.fieldOfStudy && <div className="invalid-feedback">{errors.fieldOfStudy}</div>}
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Feedback</label>
          <textarea
            className={`form-control ${errors.feedback ? 'is-invalid' : ''}`}
            name="feedback"
            rows="4"
            value={formData.feedback}
            onChange={handleChange}
          />
          {errors.feedback && <div className="invalid-feedback">{errors.feedback}</div>}
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {submitted && (
        <form onSubmit={handleFinalSubmit}>
          <div className="mt-5">
            <h4>Survey Summary</h4>
            <p><strong>Full Name:</strong> {formData.fullName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Survey Topic:</strong> {formData.surveyTopic}</p>
            {formData.surveyTopic === 'Technology' && (
              <>
                <p><strong>Favorite Programming Language:</strong> {formData.programmingLanguage}</p>
                <p><strong>Years of Experience:</strong> {formData.yearsOfExperience}</p>
              </>
            )}
            {formData.surveyTopic === 'Health' && (
              <>
                <p><strong>Exercise Frequency:</strong> {formData.exerciseFrequency}</p>
                <p><strong>Diet Preference:</strong> {formData.dietPreference}</p>
              </>
            )}
            {formData.surveyTopic === 'Education' && (
              <>
                <p><strong>Highest Qualification:</strong> {formData.highestQualification}</p>
                <p><strong>Field of Study:</strong> {formData.fieldOfStudy}</p>
              </>
            )}
            <p><strong>Feedback:</strong> {formData.feedback}</p>
            {formData.additionalQuestions.length > 0 && (
              <>
                <h4>Additional Questions</h4>
                <ul className="list-group">
                  {formData.additionalQuestions.map((question, index) => (
                    <li key={index} className="list-group-item">
                      {question}
                      <input
                        type="text"
                        className="form-control mt-2"
                        value={additionalAnswers[index] || ''}
                        onChange={(e) => handleAdditionalAnswerChange(index, e.target.value)}
                      />
                    </li>
                  ))}
                </ul>
              </>
            )}
            <button type="submit" className="btn btn-primary mt-3">
              Submit Final
            </button>
            {finalSubmitted && <p className="mt-3 text-success">Form submitted successfully</p>}
          </div>
        </form>
      )}
    </>
  );
};

export default Survey;
