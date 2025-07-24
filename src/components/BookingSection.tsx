import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, Loader2Icon } from 'lucide-react';

type EventType = 'family' | 'couple' | 'private';

interface FormFields {
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: string;
  message: string;
  eventType: EventType;
  // Family specific
  childrenCount?: string;
  specialRequirements?: string;
  // Couple specific
  occasion?: string;
  preferredTime?: string;
  // Private booking specific
  eventPurpose?: string;
  cateringNeeded?: boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

const BookingSection = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventType>('family');
  const [formData, setFormData] = useState<FormFields>({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    message: '',
    eventType: 'family',
    childrenCount: '',
    specialRequirements: ''
  });
  const [minDate, setMinDate] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{
    [key: string]: boolean;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Set minimum date to today
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setMinDate(`${year}-${month}-${day}`);
  }, []);

  const handleEventChange = (eventType: EventType) => {
    setSelectedEvent(eventType);
    setFormData(prev => ({
      ...prev,
      eventType
    }));
  };

  const validateField = (name: string, value: string | boolean | undefined) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value) error = 'Name is required';
        break;
      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value.toString())) {
          error = 'Email is invalid';
        }
        break;
      case 'phone':
        if (!value) error = 'Phone number is required';
        break;
      case 'date':
        if (!value) error = 'Date is required';
        break;
      case 'guests':
        if (!value) {
          error = 'Number of guests is required';
        } else if (parseInt(value.toString()) < 1) {
          error = 'At least 1 guest is required';
        }
        break;
    }
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, newValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate on blur
    const error = validateField(name, type === 'checkbox' ? checked : value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // Validate all required fields
    for (const [field, value] of Object.entries(formData)) {
      if (['name', 'email', 'phone', 'date', 'guests'].includes(field)) {
        const error = validateField(field, value);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as { [key: string]: boolean });
    setTouched(allTouched);

    // Validate all fields
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = document.querySelector('.error-message');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // In a real application, you would send this data to your backend
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          guests: '',
          message: '',
          eventType: 'family',
          childrenCount: '',
          specialRequirements: ''
        });
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="booking" 
      className="relative py-20 -mt-20"
      style={{
        backgroundImage: `url(https://uploadthingy.s3.us-west-1.amazonaws.com/q2Cv5K93wFYPkqzZ35hSAd/480738701_1494041901533684_5740182246678582737_n.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 -bottom-px bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header with glassmorphism card */}
        <div className="text-center mb-12">
          <div className="bg-white/40 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/50 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-[#D4AF37] bg-clip-text text-transparent [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">
              Book Your Event
            </h2>
            <p className="text-gray-800 max-w-3xl mx-auto font-medium [text-shadow:0_1px_2px_rgba(255,255,255,0.8)]">
              Create unforgettable memories at The Ruin
            </p>
          </div>
        </div>

        {/* Main booking form container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40 p-6 md:p-10">
            
            {/* Event type selection with glassmorphism buttons */}
            <div className="flex flex-wrap justify-center mb-8 gap-4">
              {[
                { type: 'family', label: 'Family Day' },
                { type: 'couple', label: 'Couples Event' },
                { type: 'private', label: 'Private Booking' }
              ].map(event => (
                <button
                  key={event.type}
                  onClick={() => handleEventChange(event.type as EventType)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none  2 backdrop-blur-md border border-white/30 ${
                    selectedEvent === event.type
                      ? 'bg-[#D4AF37]/90 text-black shadow-lg'
                      : 'bg-white/20 text-black hover:bg-white/30'
                  }`}
                >
                  {event.label}
                </button>
              ))}
            </div>

            {submitSuccess ? (
              <div className="bg-green-500/20 backdrop-blur-md border border-green-300/50 rounded-2xl p-8 text-center shadow-xl">
                <CheckCircleIcon className="mx-auto text-green-400 h-12 w-12 mb-4 drop-shadow-lg" />
                <h3 className="text-2xl font-bold text-white mb-2 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
                  Thank You!
                </h3>
                <p className="text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                  Your booking request has been submitted successfully. We'll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-white/90 mb-2 font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-black/20 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-white placeholder-white/60 ${
                        errors.name && touched.name
                          ? 'border-red-400 focus:ring-red-300'
                          : 'focus:ring-[#D4AF37] focus:border-[#D4AF37]/50'
                      }`}
                      placeholder="Enter your full name"
                      required
                    />
                    {errors.name && touched.name && (
                      <p className="text-red-400 text-sm mt-1 error-message [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-white/90 mb-2 font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-black/20 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-white placeholder-white/60 ${
                        errors.email && touched.email
                          ? 'border-red-400 focus:ring-red-300'
                          : 'focus:ring-[#D4AF37] focus:border-[#D4AF37]/50'
                      }`}
                      placeholder="Enter your email"
                      required
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-400 text-sm mt-1 error-message [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block text-white/90 mb-2 font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-black/20 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-white placeholder-white/60 ${
                        errors.phone && touched.phone
                          ? 'border-red-400 focus:ring-red-300'
                          : 'focus:ring-[#D4AF37] focus:border-[#D4AF37]/50'
                      }`}
                      placeholder="Enter your phone number"
                      required
                    />
                    {errors.phone && touched.phone && (
                      <p className="text-red-400 text-sm mt-1 error-message [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Date Field */}
                  <div>
                    <label htmlFor="date" className="block text-white/90 mb-2 font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                      Event Date <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      min={minDate}
                      className={`w-full px-4 py-3 bg-black/20 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-white ${
                        errors.date && touched.date
                          ? 'border-red-400 focus:ring-red-300'
                          : 'focus:ring-[#D4AF37] focus:border-[#D4AF37]/50'
                      }`}
                      required
                    />
                    {errors.date && touched.date && (
                      <p className="text-red-400 text-sm mt-1 error-message [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                        {errors.date}
                      </p>
                    )}
                  </div>

                  {/* Guests Field */}
                  <div>
                    <label htmlFor="guests" className="block text-white/90 mb-2 font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                      Number of Guests <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      min="1"
                      className={`w-full px-4 py-3 bg-black/20 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-white placeholder-white/60 ${
                        errors.guests && touched.guests
                          ? 'border-red-400 focus:ring-red-300'
                          : 'focus:ring-[#D4AF37] focus:border-[#D4AF37]/50'
                      }`}
                      placeholder="Number of guests"
                      required
                    />
                    {errors.guests && touched.guests && (
                      <p className="text-red-400 text-sm mt-1 error-message [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                        {errors.guests}
                      </p>
                    )}
                  </div>

                  {/* Dynamic fields based on event type */}
                  {selectedEvent === 'family' && (
                    <div>
                      <label htmlFor="childrenCount" className="block text-white/90 mb-2 font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                        Number of Children
                      </label>
                      <input
                        type="number"
                        id="childrenCount"
                        name="childrenCount"
                        value={formData.childrenCount}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-4 py-3 bg-black/20 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]/50 transition-all duration-200 text-white placeholder-white/60"
                        placeholder="Number of children"
                      />
                    </div>
                  )}

                  {selectedEvent === 'couple' && (
                    <>
                      <div>
                        <label htmlFor="occasion" className="block text-white/90 mb-2 font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                          Occasion
                        </label>
                        <select
                          id="occasion"
                          name="occasion"
                          value={formData.occasion}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/20 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]/50 transition-all duration-200 text-white"
                        >
                          <option value="" className="bg-gray-800 text-white">Select an occasion</option>
                          <option value="anniversary" className="bg-gray-800 text-white">Anniversary</option>
                          <option value="proposal" className="bg-gray-800 text-white">Proposal</option>
                          <option value="date" className="bg-gray-800 text-white">Special Date</option>
                          <option value="other" className="bg-gray-800 text-white">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="preferredTime" className="block text-white/90 mb-2 font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                          Preferred Time
                        </label>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/20 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]/50 transition-all duration-200 text-white"
                        >
                          <option value="" className="bg-gray-800 text-white">Select a time</option>
                          <option value="breakfast" className="bg-gray-800 text-white">Breakfast (8AM - 10AM)</option>
                          <option value="lunch" className="bg-gray-800 text-white">Lunch (12PM - 2PM)</option>
                          <option value="sunset" className="bg-gray-800 text-white">Sunset (4PM - 6PM)</option>
                          <option value="dinner" className="bg-gray-800 text-white">Dinner (7PM - 10PM)</option>
                        </select>
                      </div>
                    </>
                  )}

                  {selectedEvent === 'private' && (
                    <>
                      <div>
                        <label htmlFor="eventPurpose" className="block text-white/90 mb-2 font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                          Event Purpose
                        </label>
                        <select
                          id="eventPurpose"
                          name="eventPurpose"
                          value={formData.eventPurpose}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/20 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]/50 transition-all duration-200 text-white"
                        >
                          <option value="" className="bg-gray-800 text-white">Select event purpose</option>
                          <option value="corporate" className="bg-gray-800 text-white">Corporate Event</option>
                          <option value="birthday" className="bg-gray-800 text-white">Birthday Party</option>
                          <option value="wedding" className="bg-gray-800 text-white">Wedding Reception</option>
                          <option value="other" className="bg-gray-800 text-white">Other</option>
                        </select>
                      </div>
                      <div className="flex items-center bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/20">
                        <input
                          type="checkbox"
                          id="cateringNeeded"
                          name="cateringNeeded"
                          checked={formData.cateringNeeded}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-0 rounded bg-white/20 border-white/30"
                        />
                        <label htmlFor="cateringNeeded" className="ml-3 text-white/90 font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                          I need catering services
                        </label>
                      </div>
                    </>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-white/90 mb-2 font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-black/20 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]/50 transition-all duration-200 text-white placeholder-white/60"
                    placeholder="Tell us more about your event..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-[#D4AF37]/90 backdrop-blur-md hover:bg-[#D4AF37] text-white font-medium py-4 px-10 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] border border-[#D4AF37]/30 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <Loader2Icon className="animate-spin mr-2" size={18} />
                        Submitting...
                      </span>
                    ) : (
                      'Request a Quote'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-[#D4AF37]/5 rounded-full blur-lg animate-pulse delay-500"></div>
      <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-md animate-pulse delay-700"></div>
    </section>
  );
};

export default BookingSection;