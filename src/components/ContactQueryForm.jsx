import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitCustomerQuery } from '../services/firebase';
import { triggerMakeWebhook } from '../services/makeWebhook';

export default function ContactQueryForm() {
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Please enter your contact number.';
    } else if (!/^[0-9+()\- ]{7,16}$/.test(formData.contactNumber.trim())) {
      newErrors.contactNumber = 'Please enter a valid contact number.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field as user types
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }

    if (submissionError) {
      setSubmissionError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmissionError(null);
    setIsSubmitting(true);

    try {
      const result = await submitCustomerQuery({
        name: formData.name.trim(),
        contactNumber: formData.contactNumber.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      if (result.success) {
        setIsSubmitted(true);
        setSubmissionError(null);

        // Send to Make.com Custom Webhook AFTER Firestore successfully creates document.
        // Webhook execution is non-blocking: failures will never invalidate the successful Firestore submission.
        triggerMakeWebhook({
          name: formData.name.trim(),
          contactNumber: formData.contactNumber.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          createdAt: result.createdAt || new Date().toISOString(),
        }).catch((webhookErr) => {
          console.warn('Make.com webhook trigger error (non-fatal):', webhookErr);
        });
      } else {
        setSubmissionError(result.error || "Sorry, we couldn't submit your query right now. Please try again.");
      }
    } catch (err) {
      console.error('Error submitting query:', err);
      setSubmissionError(err?.message || "Sorry, we couldn't submit your query right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      contactNumber: '',
      email: '',
      message: '',
    });
    setErrors({});
    setSubmissionError(null);
    setIsSubmitted(false);
  };

  return (
    <section id="query-form-section" className="mt-12 sm:mt-16">
      {/* Premium Animated Card Container with smooth hover scale */}
      <div className="relative group max-w-3xl mx-auto transition-transform duration-500 ease-out hover:scale-[1.01] motion-reduce:hover:scale-100">
        
        {/* Ambient brand glow along the border, elevated on hover */}
        <div
          className="absolute -inset-[2px] rounded-[22px] query-form-glow opacity-30 group-hover:opacity-75 blur-[10px] transition-opacity duration-500 pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Refined Animated Warm-Gold & Deep-Red Shimmering Border Frame */}
        <div className="relative p-[2px] rounded-[22px] query-form-animated-border shadow-[0_4px_24px_-4px_rgba(40,20,10,0.06),0_2px_8px_-2px_rgba(40,20,10,0.04)] group-hover:shadow-[0_16px_36px_-6px_rgba(209,47,36,0.18),0_8px_24px_-4px_rgba(209,160,58,0.22)] transition-shadow duration-500">
          
          {/* Clean and light inner card for optimal text readability */}
          <div className="bg-white rounded-[20px] p-6 sm:p-10 relative overflow-hidden">
            
            {/* Subtle warm decorative background accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-rose-50/70 via-amber-50/40 to-transparent rounded-bl-full pointer-events-none -z-0 opacity-70" />

            <div className="relative z-10">
              {/* Form Header */}
              <div className="text-center max-w-xl mx-auto mb-8">
                <h3 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-[#1A1A1A] tracking-tight mb-2">
                  A Word From You, A Step From Us!!
                </h3>
                <p className="text-[15px] sm:text-[16px] text-[#554D46] font-normal leading-relaxed">
                  We&apos;d love to hear from you. Send us your query and our team will get back to you.
                </p>
              </div>

              {isSubmitted ? (
                /* Submission Confirmation State */
                <div id="query-success-message" className="text-center py-8 sm:py-10 px-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-[20px] font-bold text-[#1A1A1A] mb-2">
                    Thank you! Your query has been submitted successfully.
                  </h4>
                  <p className="text-[15px] text-[#554D46] max-w-md mx-auto leading-relaxed mb-6">
                    Our team at AYYAN SNACKS SPOT has received your details and will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    id="btn-query-send-another"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-[10px] bg-[#FAF7F2] border border-[#E8DFD3] text-[14px] font-semibold text-[#1A1A1A] hover:bg-white hover:border-[#D12F24] hover:text-[#D12F24] transition-colors cursor-pointer"
                  >
                    Send Another Query
                  </button>
                </div>
              ) : (
                /* Query Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  
                  {/* Desktop: [ Name ] [ Contact Number ] / Mobile: Stacked */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    
                    {/* 1. Name */}
                    <div>
                      <label htmlFor="query-name" className="block text-[14px] font-medium text-[#1A1A1A] mb-1.5">
                        Name <span className="text-[#D12F24]">*</span>
                      </label>
                      <input
                        type="text"
                        id="query-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        autoComplete="name"
                        className={`w-full px-4 py-3 rounded-[10px] text-[15px] text-[#1A1A1A] bg-white border ${
                          errors.name
                            ? 'border-[#D12F24] ring-1 ring-[#D12F24]'
                            : 'border-[#E2D9CF] hover:border-[#D1A03A]/70 focus:border-[#D12F24]'
                        } focus:ring-2 focus:ring-[#D12F24]/15 outline-none transition-all duration-300 ease-out placeholder:text-stone-400`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-[13px] text-[#D12F24] flex items-center gap-1 font-normal">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* 2. Contact Number */}
                    <div>
                      <label htmlFor="query-contact" className="block text-[14px] font-medium text-[#1A1A1A] mb-1.5">
                        Contact Number <span className="text-[#D12F24]">*</span>
                      </label>
                      <input
                        type="tel"
                        id="query-contact"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="Enter your contact number"
                        autoComplete="tel"
                        className={`w-full px-4 py-3 rounded-[10px] text-[15px] text-[#1A1A1A] bg-white border ${
                          errors.contactNumber
                            ? 'border-[#D12F24] ring-1 ring-[#D12F24]'
                            : 'border-[#E2D9CF] hover:border-[#D1A03A]/70 focus:border-[#D12F24]'
                        } focus:ring-2 focus:ring-[#D12F24]/15 outline-none transition-all duration-300 ease-out placeholder:text-stone-400`}
                      />
                      {errors.contactNumber && (
                        <p className="mt-1.5 text-[13px] text-[#D12F24] flex items-center gap-1 font-normal">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.contactNumber}</span>
                        </p>
                      )}
                    </div>

                  </div>

                  {/* 3. Email Address */}
                  <div>
                    <label htmlFor="query-email" className="block text-[14px] font-medium text-[#1A1A1A] mb-1.5">
                      Email Address <span className="text-[#D12F24]">*</span>
                    </label>
                    <input
                      type="email"
                      id="query-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      autoComplete="email"
                      className={`w-full px-4 py-3 rounded-[10px] text-[15px] text-[#1A1A1A] bg-white border ${
                        errors.email
                          ? 'border-[#D12F24] ring-1 ring-[#D12F24]'
                          : 'border-[#E2D9CF] hover:border-[#D1A03A]/70 focus:border-[#D12F24]'
                      } focus:ring-2 focus:ring-[#D12F24]/15 outline-none transition-all duration-300 ease-out placeholder:text-stone-400`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-[13px] text-[#D12F24] flex items-center gap-1 font-normal">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* 4. Your Message */}
                  <div>
                    <label htmlFor="query-message" className="block text-[14px] font-medium text-[#1A1A1A] mb-1.5">
                      Your Message <span className="text-[#D12F24]">*</span>
                    </label>
                    <textarea
                      id="query-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      className={`w-full px-4 py-3 rounded-[10px] text-[15px] text-[#1A1A1A] bg-white border ${
                        errors.message
                          ? 'border-[#D12F24] ring-1 ring-[#D12F24]'
                          : 'border-[#E2D9CF] hover:border-[#D1A03A]/70 focus:border-[#D12F24]'
                      } focus:ring-2 focus:ring-[#D12F24]/15 outline-none transition-all duration-300 ease-out resize-y min-h-[120px] placeholder:text-stone-400`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-[13px] text-[#D12F24] flex items-center gap-1 font-normal">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submission Error Banner */}
                  {submissionError && (
                    <div
                      id="query-error-message"
                      className="p-4 rounded-[10px] bg-red-50 border border-[#D12F24]/30 text-[#D12F24] text-[14px] flex items-center gap-2.5 font-medium"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0 text-[#D12F24]" />
                      <span>{submissionError}</span>
                    </div>
                  )}

                  {/* 5. Submit Button */}
                  <div className="pt-2 flex justify-center sm:justify-end">
                    <button
                      type="submit"
                      id="btn-submit-query"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto min-w-[180px] h-[48px] px-8 rounded-[10px] bg-[#D12F24] hover:bg-[#B7241A] text-white font-semibold text-[16px] transition-all duration-300 ease-out hover:shadow-[0_8px_20px_-4px_rgba(209,47,36,0.38)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Submit Query</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
