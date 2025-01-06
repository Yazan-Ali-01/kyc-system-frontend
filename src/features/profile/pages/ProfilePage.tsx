import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

import { useAuth } from "@/features/auth/context/AuthContext";
import { useUpdateProfile } from "@/features/auth/api/auth.query";

type ProfileUpdates = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export default function ProfilePage() {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const role = user?.role;

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName ?? "");
      setLastName(user.lastName ?? "");
      setEmail(user.email ?? "");
    }
  }, [user]);

  const updateProfile = useUpdateProfile();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const updates: ProfileUpdates = {};

    if (firstName !== user?.firstName) updates.firstName = firstName;
    if (lastName !== user?.lastName) updates.lastName = lastName;
    if (email !== user?.email) updates.email = email;

    if (Object.keys(updates).length === 0) {
      toast.error("Please modify some fields before saving.");
      return;
    }

    try {
      await updateProfile.mutateAsync(updates);
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while updating your profile"
      );
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value={role}
              readOnly
              disabled
              className="bg-muted"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
