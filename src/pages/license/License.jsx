import React from 'react';

const License = ()=> {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">License</h1>
      
      <div className="space-y-6 text-lg text-gray-700">
        <p>
          The content, services, and materials provided on <strong>My Nation Blog</strong> 
          (MNB) are owned by us and are protected by copyright, trademark, and other 
          intellectual property laws. By using this website, you agree to comply with 
          all the terms outlined in this License Agreement.
        </p>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Use of Content</h2>
          <p>
            You are granted a limited, non-exclusive, and non-transferable license to 
            access and use the materials available on MNB for personal, non-commercial 
            purposes only. You may view, download, and print the materials for personal 
            use, but you may not modify, distribute, or reproduce any content without 
            prior written permission from us.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Restrictions</h2>
          <p className="mb-4">The following actions are prohibited:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>You may not copy, reproduce, or distribute the content for commercial purposes without permission.</li>
            <li>You may not reverse engineer, decompile, or attempt to extract the source code of any software or application provided by MNB.</li>
            <li>You may not use our content in a way that violates applicable laws or infringes upon the rights of others.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Third-Party Content</h2>
          <p>
            MNB may include links to third-party websites or content, including but not 
            limited to advertisements, news articles, or promotional material. We are not 
            responsible for the accuracy, legality, or content of these third-party websites, 
            and the inclusion of any third-party links does not imply endorsement.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to the website at 
            any time if we believe that you have violated this License Agreement. Upon 
            termination, your right to use our content will immediately cease.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Changes to License</h2>
          <p>
            We may update this License Agreement from time to time. Any changes will be 
            posted on this page, and you are encouraged to review the agreement periodically 
            to stay informed of any updates.
          </p>
        </div>
      </div>
    </div>
  );
}
export default License;
