
import { Shield } from "lucide-react";

const AuthSecurity = () => {
  return (
    <div className="mt-6 flex items-center justify-center">
      <div className="flex items-center text-sm text-gray-500">
        <Shield className="h-4 w-4 text-red-500 mr-2" />
        <span>Your data is secure and encrypted</span>
      </div>
    </div>
  );
};

export default AuthSecurity;
