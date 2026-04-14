import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-gray-100 mt-10">
      
      <div className="max-w-6xl mx-auto px-6 py-6 text-center space-y-3">

        {/* Copyright */}
        <p className="text-gray-600">
          © 2026 JobPortal. All rights reserved.
        </p>

        {/* Owner */}
        <p>
          Powered by{" "}
          <a
            href="https://github.com/Adiya-Barswal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Aditya Singh
          </a>
        </p>

        {/* Links */}
        <div className="flex justify-center gap-6 text-sm">
          <Link
            to="/privacy-policy"
            className="text-gray-600 hover:text-[#6A38C2]"
          >
            Privacy Policy
          </Link>

          <Link
            to="/terms"
            className="text-gray-600 hover:text-[#6A38C2]"
          >
            Terms of Service
          </Link>
        </div>

      </div>
    </div>
  );
}