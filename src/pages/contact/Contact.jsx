import React from 'react'
import './Contact.css'
import ContactForm from '../../components/formValidation/FormValidation'

const Contact = ()=> {
  return (
    <div className='contact'>
      <ContactForm/>
      <div className='my-contact'>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.338851315552!2d3.6052179760216854!3d6.478696706982922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf98947c4885f%3A0xcdaf803812692e89!2sGreenland%20Estate!5e0!3m2!1sen!2sng!4v1729253557769!5m2!1sen!2sng"></iframe>
      </div>
    </div>
  )
}
export default Contact;
