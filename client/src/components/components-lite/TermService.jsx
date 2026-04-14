import React from "react";

const TermService = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800">
      
      <h1 className="text-3xl font-bold text-center mb-6">
        Terms of Service
      </h1>

      <p className="text-center text-gray-600 mb-6">
        These terms govern your use of JobPortal. By using our platform, you agree to follow them.
      </p>

      <div className="space-y-6">

        <div>
          <h2 className="font-semibold text-xl">1. Acceptance of Terms</h2>
          <p className="mt-2">
            By using our platform, you agree to these terms and conditions.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl">2. Use of Service</h2>
          <ul className="list-disc ml-6 mt-2">
            <li>Use platform legally</li>
            <li>Provide correct information</li>
            <li>Do not misuse services</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-xl">3. Job Applications</h2>
          <p className="mt-2">
            We do not guarantee job placement. Recruiters are responsible for job listings.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl">4. Account Responsibility</h2>
          <p className="mt-2">
            You are responsible for your account credentials.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl">5. Prohibited Activities</h2>
          <ul className="list-disc ml-6 mt-2">
            <li>Fake job posting</li>
            <li>Spamming</li>
            <li>Hacking attempts</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-xl">6. Changes</h2>
          <p className="mt-2">
            We may update these terms anytime.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl">7. Contact</h2>
          <p className="mt-2">
            support@jobportal.com
          </p>
        </div>

      </div>
    </div>
  );
};

export default TermService;