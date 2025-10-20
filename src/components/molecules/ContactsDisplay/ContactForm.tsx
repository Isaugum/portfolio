import { useState } from 'react';
import './ContactForm.scss';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className='contact-form'>
      <h4 className='contact-form__title'>Send me a message</h4>

      {submitStatus === 'success' && (
        <div className='contact-form__success'>
          <span className='contact-form__success-icon'>✅</span>
          <p>Thank you! Your message has been sent successfully.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className='contact-form__error'>
          <span className='contact-form__error-icon'>❌</span>
          <p>
            Sorry, there was an error sending your message. Please try again.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className='contact-form__form'>
        <div className='contact-form__field'>
          <label htmlFor='name' className='contact-form__label'>
            Name *
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className={`contact-form__input ${errors.name ? 'contact-form__input--error' : ''}`}
            placeholder='Your full name'
            disabled={isSubmitting}
          />
          {errors.name && (
            <span className='contact-form__error-text'>{errors.name}</span>
          )}
        </div>

        <div className='contact-form__field'>
          <label htmlFor='email' className='contact-form__label'>
            Email *
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className={`contact-form__input ${errors.email ? 'contact-form__input--error' : ''}`}
            placeholder='your.email@example.com'
            disabled={isSubmitting}
          />
          {errors.email && (
            <span className='contact-form__error-text'>{errors.email}</span>
          )}
        </div>

        <div className='contact-form__field'>
          <label htmlFor='subject' className='contact-form__label'>
            Subject *
          </label>
          <input
            type='text'
            id='subject'
            name='subject'
            value={formData.subject}
            onChange={handleChange}
            className={`contact-form__input ${errors.subject ? 'contact-form__input--error' : ''}`}
            placeholder="What's this about?"
            disabled={isSubmitting}
          />
          {errors.subject && (
            <span className='contact-form__error-text'>{errors.subject}</span>
          )}
        </div>

        <div className='contact-form__field'>
          <label htmlFor='message' className='contact-form__label'>
            Message *
          </label>
          <textarea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            className={`contact-form__textarea ${errors.message ? 'contact-form__textarea--error' : ''}`}
            placeholder='Tell me about your project or just say hello!'
            rows={5}
            disabled={isSubmitting}
          />
          {errors.message && (
            <span className='contact-form__error-text'>{errors.message}</span>
          )}
        </div>

        <button
          type='submit'
          className='contact-form__submit'
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className='contact-form__spinner'></span>
              Sending...
            </>
          ) : (
            <>
              <span className='contact-form__submit-icon'>🚀</span>
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};
