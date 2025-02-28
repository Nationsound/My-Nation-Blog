import React, { useState } from "react";
import ContactForm from "../../components/formValidation/FormValidation";
import DisplayData from "../../components/contactMessages/ContactMessages";

 const ContainerComponent = () => {
  const [submittedData, setSubmittedData] = useState([]);

  const handleData = (data) => {
    setSubmittedData([...submittedData, data]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Contact Form</h1>
      <ContactForm onFormSubmit={handleData} />
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Submitted Data:</h2>
        <DisplayData data={submittedData} />
      </div>
    </div>
  );
};

export default ContainerComponent;
