import React from 'react';
import parasImage from '../assest/paras.jpg'; // Replace with the actual image filename
import vanshikaImage from '../assest/vanshika.jpeg'; // Replace with the actual image filename

const About = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">About UrbanGrocers</h1>
      <p className="text-lg text-center mb-12">
        UrbanGrocers is committed to providing the best quality groceries with a user-friendly shopping experience.
        Our mission is to make your grocery shopping easier and more convenient.
      </p>

      <h2 className="text-3xl font-semibold text-center mb-6">Our Team</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        {/* Card for Paras Pandey */}
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs text-center">
          <img
            src={parasImage}
            alt="Paras Pandey"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold">Paras Pandey</h3>
          <p className="text-gray-600">Founder & CEO</p>
        </div>

        {/* Card for Vanshika Kapoor */}
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs text-center">
          <img
            src={vanshikaImage}
            alt="Vanshika Kapoor"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold">Vanshika Kapoor</h3>
          <p className="text-gray-600">Co-Founder & COO</p>
        </div>
      </div>
    </div>
  );
};

export default About;
