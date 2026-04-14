import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800">
      
      <h1 className="text-3xl font-bold mb-6 text-center">
        Privacy Policy
      </h1>

      {/* Intro */}
      <p className="mb-4">
        This Privacy Policy explains how JobPortal collects, uses, and protects your information when you use our platform.
      </p>

      {/* 1 */}
      <h2 className="font-bold mt-6">1. Information We Collect</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>Name, email address, and password</li>
        <li>Resume/CV and profile details</li>
        <li>Job preferences and applications</li>
      </ul>

      {/* 2 */}
      <h2 className="font-bold mt-6">2. Usage Data</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>IP address</li>
        <li>Browser type</li>
        <li>Pages visited</li>
        <li>Time spent on pages</li>
      </ul>

      {/* 3 */}
      <h2 className="font-bold mt-6">3. How We Use Your Information</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>To provide and maintain our services</li>
        <li>To allow job applications</li>
        <li>To connect candidates with recruiters</li>
        <li>To improve our platform</li>
        <li>To provide customer support</li>
      </ul>

      {/* 4 */}
      <h2 className="font-bold mt-6">4. Data Security</h2>
      <p className="mt-2">
        We use secure technologies such as encrypted passwords and secure servers to protect your data.
      </p>

      {/* 5 */}
      <h2 className="font-bold mt-6">5. Sharing Your Information</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>Recruiters when you apply for jobs</li>
        <li>Service providers for platform operation</li>
        <li>Legal authorities if required</li>
      </ul>

      {/* 6 */}
      <h2 className="font-bold mt-6">6. Your Rights</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>Access your personal data</li>
        <li>Update your information</li>
        <li>Request deletion of your account</li>
      </ul>

      {/* 7 */}
      <h2 className="font-bold mt-6">7. Changes to This Policy</h2>
      <p className="mt-2">
        We may update this policy from time to time. Updates will be posted on this page.
      </p>

      {/* 8 */}
      <h2 className="font-bold mt-6">8. Contact Us</h2>
      <p className="mt-2">
        If you have any questions, contact us at support@jobportal.com
      </p>

    </div>
  );
};

export default PrivacyPolicy;