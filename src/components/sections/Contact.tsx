import { useState, useEffect, useRef } from 'react';
import { portfolioContent } from '../../portfolioContent';
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import {
  MAX_SUBMISSIONS,
  MAX_SUBMISSIONS_PER_EMAIL,
  isRateLimited,
  isEmailRateLimited,
  recordSubmission,
  recordEmailSubmission,
  getSessionFingerprint,
  getRateLimitResetHours,
  containsSpamKeywords,
  isValidFormTiming,
  isHoneypotValid
} from '../../utils/emailSecurity';
import {
  validateName,
  validateEmail,
  validateSubject,
  validateMessage
} from '../../utils/formValidation';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const { description } = portfolioContent.contact;
const { socialLinks } = portfolioContent.footer;

// Type definition for form errors
type FormErrors = {
  [key: string]: string | null;
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '' // Security: Honeypot field for bots
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [rateLimitError, setRateLimitError] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const formStartTime = useRef<number>(Date.now());

  // Trigger entrance animation when component mounts
  useEffect(() => {
    setIsVisible(true);
    formStartTime.current = Date.now();
  }, []);

  // Cooldown timer effect
  useEffect(() => {
    if (cooldownSeconds > 0) {
      const timer = setInterval(() => {
        setCooldownSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [cooldownSeconds]);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    // Security: Check honeypot (should be empty)
    if (!isHoneypotValid(formData.honeypot)) {
      newErrors.general = 'Spam detected';
      return false;
    }
    
    // Security: Check form completion time (should take at least 3 seconds)
    if (!isValidFormTiming(formStartTime.current)) {
      newErrors.general = 'Please take your time to fill the form';
      return false;
    }
    
    // Field validations using utility functions
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) {
      newErrors.email = emailError;
    } else if (isEmailRateLimited(formData.email)) {
      // Security: Check if this email has exceeded submissions
      newErrors.email = `This email has reached the maximum of ${MAX_SUBMISSIONS_PER_EMAIL} messages per 24 hours`;
    }
    
    const subjectError = validateSubject(formData.subject);
    if (subjectError) newErrors.subject = subjectError;
    
    const messageError = validateMessage(formData.message);
    if (messageError) newErrors.message = messageError;
    
    // Security: Check for spam keywords
    const content = `${formData.subject} ${formData.message}`;
    if (containsSpamKeywords(content)) {
      newErrors.general = 'Your message contains prohibited content';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    
    // Clear error when user starts typing
    const errorKey = id as keyof typeof errors;
    if (errors[errorKey]) {
      setErrors({
        ...errors,
        [errorKey]: null
      });
    }
    
    // Clear rate limit error
    if (rateLimitError) {
      setRateLimitError(false);
    }
  };
  
  const handleFocus = (id: string) => {
    setFocusedField(id);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };


  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Security: Generate fingerprint for logging (privacy-friendly)
    const browserFingerprint = getSessionFingerprint();
    console.log('Session fingerprint:', browserFingerprint.substring(0, 8) + '...');
    
    // Security: Check rate limiting first
    if (isRateLimited()) {
      setRateLimitError(true);
      const hoursRemaining = getRateLimitResetHours();
      setErrors({
        general: `Rate limit exceeded. You can submit ${MAX_SUBMISSIONS} messages per 24 hours. Please try again in ${hoursRemaining} hours.`
      });
      return;
    }
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Debug: Log environment variables (remove in production)
      console.log('EmailJS Config:', {
        serviceId: serviceId ? '✓ Set' : '✗ Missing',
        templateId: templateId ? '✓ Set' : '✗ Missing',
        publicKey: publicKey ? '✓ Set' : '✗ Missing'
      });
      
      try {
        const response = await emailjs.send(
          serviceId,
          templateId,
          {
            title: `New Contact from ${formData.name}`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
          publicKey
        );

        console.log('Email sent successfully:', response);

        // Security: Record successful submission (both general and email-specific)
        recordSubmission();
        recordEmailSubmission(formData.email);
        
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setCooldownSeconds(60); // Start 60-second countdown
        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } catch (error) {
        setIsSubmitting(false);
        console.error('❌ EmailJS Error Details:', error);
        
        // Show user-friendly error message
        setErrors({
          general: 'Failed to send message. Please check your internet connection or try again later.'
        });
      }
    }
  };

  const clearForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
    setErrors({});
    setFocusedField(null);
  };

  return (
    <section 
      id="contact" 
      className="w-full border-b border-white/10 text-white py-12 md:py-20 lg:py-32 relative overflow-hidden bg-black/40"
    >
      {/* Enhanced animated background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-[600px] h-[700px] rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[600px] rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-cyan-500/5 to-blue-500/5 blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-cyan-400/35 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}></div>
      </div>
      
      {/* Vertical lines for structure */}
      <div className="absolute inset-0 z-0 pointer-events-none flex">
        <div className="h-full w-[15%] border-r border-white/5"></div>
        <div className="h-full w-[23.33%] border-r border-white/5"></div>
        <div className="h-full w-[23.34%] border-r border-white/5"></div>
        <div className="h-full w-[23.33%] border-r border-white/5"></div>
        <div className="h-full w-[15%]"></div>
      </div>
      
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black/95 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 z-10 relative max-w-[1300px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - DROP ME A LINE */}
          <div className="py-6 md:py-10 lg:py-20 lg:pr-10 flex flex-col justify-center">
            <div className={`transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                  DROP ME
                </span>
                <br />
                <span className="bg-gradient-to-r from-accent via-blue-400 to-purple-500 bg-clip-text text-transparent relative">
                  A LINE
                  <span className="absolute -bottom-2 left-0 w-20 md:w-24 h-0.5 bg-gradient-to-r from-accent to-purple-500"></span>
                </span>
              </h2>
              <p className="text-white/80 max-w-xl mb-8 text-sm sm:text-base md:text-lg leading-relaxed">
                {description}
              </p>
            </div>
            
            {/* Enhanced Connect Section */}
            <div className={`mt-auto transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '300ms' }}>
              <div className="relative mt-8">
                {/* Animated background container */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-purple-500/10 to-cyan-500/10 rounded-2xl blur-xl"></div>
                
                {/* Main connect container */}
                <div className="relative bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl p-8 overflow-hidden">
                  {/* Animated particles inside container */}
                  <div className="absolute top-2 right-2 w-1 h-1 bg-accent/60 rounded-full animate-ping"></div>
                  <div className="absolute bottom-4 left-4 w-0.5 h-0.5 bg-purple-400/60 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                  
                  {/* Header with animated line */}
                  <div className="relative mb-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                      </div>
                      <h3 className="text-white font-bold text-lg tracking-wide">CONNECT WITH ME</h3>
                    </div>
                    
                    {/* Animated underline */}
                    <div className="flex items-center gap-2">
                      <div className="h-px bg-gradient-to-r from-accent via-purple-400 to-cyan-400 flex-1 animate-pulse"></div>
                      <div className="w-2 h-px bg-accent animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                  </div>
                  
                  {/* Social links with enhanced styling */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    {socialLinks.map((link, index) => {
                      // Get platform info
                      const getPlatformInfo = (id: string) => {
                        switch (id) {
                          case 'github': 
                            return { 
                              icon: <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />, 
                              name: 'GitHub', 
                              color: 'from-gray-400 to-gray-600',
                              hoverColor: 'hover:shadow-gray-400/20'
                            };
                          case 'linkedin': 
                            return { 
                              icon: <FaLinkedinIn className="w-5 h-5 sm:w-6 sm:h-6" />, 
                              name: 'LinkedIn', 
                              color: 'from-blue-400 to-blue-600',
                              hoverColor: 'hover:shadow-blue-400/20'
                            };
                          case 'instagram': 
                            return { 
                              icon: <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />, 
                              name: 'Instagram', 
                              color: 'from-pink-400 to-purple-600',
                              hoverColor: 'hover:shadow-pink-400/20'
                            };
                          default: 
                            return { 
                              icon: null, 
                              name: '', 
                              color: 'from-white to-gray-400',
                              hoverColor: 'hover:shadow-white/20'
                            };
                        }
                      };
                      
                      const platformInfo = getPlatformInfo(link.id);
                      
                      return (
                        <a 
                          key={link.id} 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={`group relative flex flex-col items-center p-3 sm:p-4 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-500 hover:border-accent/50 hover:bg-accent/5 hover:scale-105 hover:shadow-xl ${platformInfo.hoverColor}`}
                          style={{ 
                            transitionDelay: `${index * 100}ms`,
                            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                            opacity: isVisible ? 1 : 0
                          }}
                        >
                          {/* Glow effect on hover */}
                          <div className={`absolute inset-0 bg-gradient-to-r ${platformInfo.color} rounded-xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300`}></div>
                          
                          {/* Icon container */}
                          <div className="relative z-10 text-white/70 group-hover:text-white transition-colors duration-300 mb-2">
                            {platformInfo.icon}
                          </div>
                          
                          {/* Platform name */}
                          <span className="relative z-10 text-[10px] sm:text-xs text-white/50 group-hover:text-white/80 transition-colors duration-300 font-medium">
                            {platformInfo.name}
                          </span>
                          
                          {/* Hover indicator */}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-accent to-purple-400 group-hover:w-full transition-all duration-300"></div>
                        </a>
                      );
                    })}
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-1 h-1 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-1 h-1 bg-purple-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-1 h-1 bg-cyan-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      <span className="text-white/40 text-xs mx-3">Let's build something amazing together</span>
                      <div className="w-1 h-1 bg-cyan-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
                      <div className="w-1 h-1 bg-purple-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.8s' }}></div>
                      <div className="w-1 h-1 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Professional Contact Form */}
          <div className={`transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '200ms' }}>
            
            {/* Professional form container */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
              {/* Clean header */}
              <div className="bg-white/5 p-6 border-b border-white/10">
                <h3 className="text-2xl font-semibold text-white mb-2 flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Message
                </h3>
                <p className="text-white/70 text-sm">Let's discuss your project requirements</p>
              </div>

              {/* Form body */}
              <div className="p-6">
                {/* General error message (rate limit, spam, etc.) */}
                {errors.general && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-red-400 font-medium">Unable to send message</p>
                      <p className="text-red-300/80 text-sm mt-1">{errors.general}</p>
                    </div>
                  </div>
                )}
              
                {/* Professional Success Message */}
                {submitSuccess && (
                  <div className="bg-green-50/10 border border-green-400/30 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <p className="text-green-400 font-medium">Message sent successfully!</p>
                        <p className="text-green-300/80 text-sm">I'll get back to you within 24 hours.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cooldown Timer - Shows after successful submission */}
                {cooldownSeconds > 0 && (
                  <div className="bg-green-50/5 border border-green-400/20 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-green-400 font-medium text-sm">Next message available in {cooldownSeconds}s</p>
                      </div>
                    </div>
                    
                    {/* Animated progress bar */}
                    <div className="relative w-full h-2 bg-green-900/20 rounded-full overflow-hidden">
                      <div 
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 ease-linear"
                        style={{ 
                          width: `${(cooldownSeconds / 60) * 100}%`
                        }}
                      >
                        {/* Animated shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-slide"></div>
                      </div>
                    </div>
                  </div>
                )}
              
              {/* Professional Form Fields */}
              <div className="space-y-6">
                {/* Security: Honeypot field - hidden from users, but bots will fill it */}
                <input
                  type="text"
                  id="honeypot"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute opacity-0 pointer-events-none"
                  aria-hidden="true"
                />
                
                {[
                  { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Name' },
                  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'Email' },
                  { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Subject' },
                  { id: 'message', label: 'Message', type: 'textarea', placeholder: 'Please describe your project requirements, timeline, and any specific details...' }
                ].map((field, index) => (
                  <div 
                    key={field.id}
                    className={`transition-all duration-500 ease-out ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                  >
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      {field.label}
                    </label>
                    
                    <div className="relative">
                      {field.type === 'textarea' ? (
                        <textarea 
                          id={field.id}
                          rows={5}
                          value={formData[field.id as keyof typeof formData]}
                          onChange={handleChange}
                          onFocus={() => handleFocus(field.id)}
                          onBlur={handleBlur}
                          placeholder={field.placeholder}
                          className={`w-full py-2 px-3 md:py-3 md:px-4 bg-white/5 backdrop-blur-sm text-white text-sm md:text-base border rounded-lg 
                            ${errors[field.id] ? 'border-red-400' : 
                              focusedField === field.id ? 'border-accent' : 
                              'border-white/20'} 
                            focus:outline-none transition-all duration-300 resize-none
                            placeholder-white/50 hover:border-white/30 hover:bg-white/10`}
                        />
                      ) : (
                        <input 
                          id={field.id}
                          type={field.type}
                          value={formData[field.id as keyof typeof formData]}
                          onChange={handleChange}
                          onFocus={() => handleFocus(field.id)}
                          onBlur={handleBlur}
                          placeholder={field.placeholder}
                          className={`w-full py-2 px-3 md:py-3 md:px-4 bg-white/5 backdrop-blur-sm text-white text-sm md:text-base border rounded-lg 
                            ${errors[field.id] ? 'border-red-400' : 
                              focusedField === field.id ? 'border-accent' : 
                              'border-white/20'} 
                            focus:outline-none transition-all duration-300
                            placeholder-white/50 hover:border-white/30 hover:bg-white/10`}
                        />
                      )}
                    </div>
                    
                    {/* Clean Error Message */}
                    {errors[field.id] && (
                      <p className="mt-2 text-red-400 text-sm flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {errors[field.id]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              
                {/* Professional Action Buttons */}
                <div 
                  className={`flex gap-4 justify-end pt-8 transition-all duration-500 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`} 
                  style={{ transitionDelay: '600ms' }}
                >
                  <button 
                    type="button"
                    onClick={clearForm}
                    className="px-4 py-2 md:px-6 md:py-2.5 bg-transparent border border-white/20 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 text-sm md:text-base"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reset
                  </button>
                  <button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting || cooldownSeconds > 0}
                    className="group relative inline-flex px-6 py-2 md:px-8 md:py-2.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg text-white font-medium text-sm md:text-base hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : cooldownSeconds > 0 ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Wait {cooldownSeconds}s
                        </>
                      ) : (
                        <>
                          <svg 
                            className="w-4 h-4 transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          Send Message
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
                  </button>
                </div>
                
                {/* Rate limit information */}
                <div className="mt-4 text-xs text-white/50 flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p>For security: Maximum {MAX_SUBMISSIONS} messages per 24 hours per browser, with 1-minute cooldown between submissions.</p>
                    <p className="mt-1">Each email address is limited to {MAX_SUBMISSIONS_PER_EMAIL} messages per 24 hours to prevent spam.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;