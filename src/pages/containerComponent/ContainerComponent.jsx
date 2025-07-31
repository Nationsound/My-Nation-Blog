import React, { useState } from "react";
import ContactForm from "../../components/formValidation/FormValidation";

 const ContainerComponent = () => {
  const [submittedData, setSubmittedData] = useState([]);

  const handleData = (data) => {
    setSubmittedData([...submittedData, data]);
  };
  console.log('submittedData:', submittedData);


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-[#959A4A]">Leave Us Your Review Here:</h1>
      <ContactForm onFormSubmit={handleData} /> 
    </div>
  );
};

export default ContainerComponent;
