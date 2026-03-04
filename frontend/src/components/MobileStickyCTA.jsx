import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";

const MobileStickyCTA = ({ onClick }) => {
  return (
    <div
      data-testid="mobile-sticky-cta"
      className="mobile-sticky-cta md:hidden"
    >
      <Button
        onClick={onClick}
        className="btn-primary w-full py-4 h-auto text-sm"
      >
        <CalendarCheck className="w-4 h-4 mr-2" />
        Book Services Now
      </Button>
    </div>
  );
};

export default MobileStickyCTA;
