import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { CalendarIcon, Send, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const eventTypes = [
  "Trade Show",
  "Convention",
  "Corporate Event",
  "Concert / Festival",
  "Private Event",
  "High Security Event",
  "Other",
];

const budgetRanges = [
  "Under $5,000",
  "$5,000 - $15,000",
  "$15,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000+",
  "Discuss Later",
];

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    event_type: "",
    budget: "",
    location: "",
    details: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.event_type) {
      toast.error("Please fill in required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        event_date: date ? format(date, "yyyy-MM-dd") : null,
      };

      await axios.post(`${API}/bookings`, payload);

      toast.success("Booking request submitted!", {
        description: "I'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        event_type: "",
        budget: "",
        location: "",
        details: "",
      });
      setDate(null);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit request", {
        description: "Please try again or contact directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="section-padding bg-[#0A0A0A]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-4 block">
            Get In Touch
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-white">
            Book Services
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <div>
            <h3 className="font-heading text-2xl font-semibold tracking-wide uppercase text-white mb-6">
              Let's Work Together
            </h3>
            <p className="font-body text-zinc-400 leading-relaxed mb-8">
              Ready to bring your event to life with professional AV and stage
              technology? Fill out the form and I'll get back to you within 24
              hours to discuss your project.
            </p>

            <div className="space-y-6">
              <div
                data-testid="contact-email"
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 flex items-center justify-center border border-blue-500/30 text-blue-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-zinc-500 block mb-1">
                    Email
                  </span>
                  <span className="font-body text-white">
                    contact@proavtech.com
                  </span>
                </div>
              </div>

              <div
                data-testid="contact-phone"
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 flex items-center justify-center border border-blue-500/30 text-blue-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-zinc-500 block mb-1">
                    Phone
                  </span>
                  <span className="font-body text-white">(555) 123-4567</span>
                </div>
              </div>

              <div
                data-testid="contact-location"
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 flex items-center justify-center border border-blue-500/30 text-blue-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-zinc-500 block mb-1">
                    Service Area
                  </span>
                  <span className="font-body text-white">
                    Nationwide (All 50 States)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="glass-effect p-8">
            <form
              data-testid="booking-form"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="name"
                    className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-zinc-500 mb-2 block"
                  >
                    Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    data-testid="input-name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="input-tech"
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-zinc-500 mb-2 block"
                  >
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    data-testid="input-email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="input-tech"
                    required
                  />
                </div>
              </div>

              {/* Phone & Event Type Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="phone"
                    className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-zinc-500 mb-2 block"
                  >
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    data-testid="input-phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 000-0000"
                    className="input-tech"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="event_type"
                    className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-zinc-500 mb-2 block"
                  >
                    Event Type *
                  </Label>
                  <Select
                    value={formData.event_type}
                    onValueChange={(value) =>
                      handleSelectChange("event_type", value)
                    }
                  >
                    <SelectTrigger
                      data-testid="select-event-type"
                      className="input-tech h-12"
                    >
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800">
                      {eventTypes.map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="text-white hover:bg-zinc-800"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Date & Budget Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-zinc-500 mb-2 block">
                    Event Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-testid="input-date"
                        className="input-tech w-full justify-start text-left font-normal h-12"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-zinc-500" />
                        {date ? (
                          format(date, "PPP")
                        ) : (
                          <span className="text-zinc-500">Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="bg-zinc-900"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label
                    htmlFor="budget"
                    className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-zinc-500 mb-2 block"
                  >
                    Budget Range
                  </Label>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) =>
                      handleSelectChange("budget", value)
                    }
                  >
                    <SelectTrigger
                      data-testid="select-budget"
                      className="input-tech h-12"
                    >
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800">
                      {budgetRanges.map((range) => (
                        <SelectItem
                          key={range}
                          value={range}
                          className="text-white hover:bg-zinc-800"
                        >
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Location */}
              <div>
                <Label
                  htmlFor="location"
                  className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-zinc-500 mb-2 block"
                >
                  Event Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  data-testid="input-location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, State or Venue"
                  className="input-tech"
                />
              </div>

              {/* Details */}
              <div>
                <Label
                  htmlFor="details"
                  className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-zinc-500 mb-2 block"
                >
                  Event Details
                </Label>
                <Textarea
                  id="details"
                  name="details"
                  data-testid="input-details"
                  value={formData.details}
                  onChange={handleInputChange}
                  placeholder="Tell me about your event, requirements, and any specific needs..."
                  className="input-tech min-h-[120px]"
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                data-testid="submit-booking-btn"
                disabled={isSubmitting}
                className="btn-primary w-full py-4 h-auto text-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Booking Request
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
