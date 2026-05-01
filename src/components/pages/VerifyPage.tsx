import { useState } from "react";
import VerifyContent from "../generics/verify/VerifyContent";
import AuthPopup from "./AuthPopup";
import { API_BASE_URL } from "../../utils/config";

export default function VerifyPage() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <VerifyContent
        endpoint={`${API_BASE_URL}/auth/verify`}
        onSuccess={() => setTimeout(() => setShowLoginPopup(true), 3000)}
        onClose={() => setShowLoginPopup(true)}
      />

      {showLoginPopup && (
        <AuthPopup
          initialAuthType="login"
          initialMethod="email"
          onClose={() => setShowLoginPopup(false)}
        />
      )}
    </div>
  );
}
