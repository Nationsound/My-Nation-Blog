import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
    <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Privacy Policy</h1>
    
    <div className="space-y-6 text-lg text-gray-700">
      <p>
        At <strong>My Nation Blog</strong> (MNB), we respect your privacy and are committed to 
        protecting your personal information. This Privacy Policy explains how we collect, use, 
        and safeguard your data when you visit our website and use our services.
      </p>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Information We Collect</h2>
        <p>
          We may collect personal information that you provide directly to us when you create an 
          account, subscribe to our newsletter, or engage with certain features of our website. 
          The types of information we may collect include:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>Personal details (name, email address, etc.)</li>
          <li>Account-related information (username, password, etc.)</li>
          <li>Payment information (if applicable)</li>
          <li>Usage data (IP address, browser type, device information, etc.)</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">How We Use Your Information</h2>
        <p>
          The information we collect may be used for the following purposes:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>To provide and personalize our services</li>
          <li>To communicate with you (e.g., for account-related matters, marketing, etc.)</li>
          <li>To improve the functionality and performance of our website</li>
          <li>To comply with legal requirements and protect our rights</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">How We Protect Your Information</h2>
        <p>
          We use a combination of technical, administrative, and physical measures to protect your personal 
          information from unauthorized access, disclosure, alteration, and destruction. However, no method 
          of online data transmission or electronic storage is 100% secure, so we cannot guarantee absolute 
          security.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sharing Your Information</h2>
        <p>
          We do not sell, trade, or rent your personal information to third parties. We may share your 
          information with trusted service providers or partners who assist us in operating our website 
          and providing our services. These third parties are obligated to keep your information confidential 
          and secure.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Cookies</h2>
        <p>
          We use cookies and similar technologies to enhance your experience on our website. 
          Cookies are small text files that are stored on your device when you visit our site. 
          They help us remember your preferences, analyze site traffic, and provide a more personalized 
          experience. You can control cookie settings through your browser, but please note that disabling 
          cookies may affect your ability to use certain features of our website.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal information at any time. 
          If you wish to exercise these rights, please contact us using the information provided 
          on our website. We will respond to your request in accordance with applicable laws.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. When we make changes, we will post 
          the updated policy on this page with a revised date. We encourage you to review this policy 
          periodically to stay informed about how we are protecting your information.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy, please contact us at <strong>contact@mynationblog.com</strong>.
        </p>
      </div>
    </div>
  </div>
  )
}

export default PrivacyPolicy