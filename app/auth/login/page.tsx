import LoginForm from "@/components/auth/login-form";

export const metadata = {
  title: "Login - VulnScope",
  description: "Login to your VulnScope account",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
