import { useAuth } from "@/features/auth/context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome {user?.firstName}!</p>
    </div>
  );
};
export default ProfilePage;
