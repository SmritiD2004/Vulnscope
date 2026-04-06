import RegisterForm from "@/components/auth/register-form";

export const metadata = {
  title: "Register - VulnScope",
  description: "Create a new VulnScope account",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
}
