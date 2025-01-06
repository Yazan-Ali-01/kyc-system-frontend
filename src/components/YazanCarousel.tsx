import { GradientHeading } from "./ui/gradient-heading";
import { LogoCarousel } from "./ui/logo-carousel";

export function YazanCarousel() {
  return (
    <div className="space-y-8">
      <div className="w-full max-w-screen-lg mx-auto flex flex-col items-center space-y-8">
        <div className="text-center space-y-2">
          <GradientHeading variant="secondary" size="lg">
            Welcome to My KYC Verification Assessment
          </GradientHeading>
          <GradientHeading size="md">
            Secure Identity Verification by{" "}
            <span className="font-semibold text-primary">Yazan</span>
          </GradientHeading>
          <GradientHeading size="sm" variant="light">
            Built with 💻 Node, React, Tailwind, and a lot of coffee! Took me
            over 25 hours to get it just right.
          </GradientHeading>
        </div>

        <LogoCarousel columnCount={3} />
      </div>
    </div>
  );
}
