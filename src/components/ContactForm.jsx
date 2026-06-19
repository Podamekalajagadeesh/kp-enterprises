import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { services } from '../servicesData.jsx';
import { useTranslation } from 'react-i18next';
import { generateBookingId } from './BookingStatus';

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState({ submitted: false, success: false, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validation, setValidation] = useState({
    name: true,
    email: true,
    service: true,
    message: true
  });

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim() !== '';
      case 'email':
        return /\S+@\S+\.\S+/.test(value);
      case 'service':
        return value !== '';
      case 'message':
        return value.trim() !== '';
      default:
        return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setValidation(prevValidation => ({
      ...prevValidation,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newValidation = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      service: validateField('service', formData.service),
      message: validateField('message', formData.message)
    };
    setValidation(newValidation);

    if (Object.values(newValidation).every(isValid => isValid)) {
      setIsSubmitting(true);
      try {
        const response = await axios.post(import.meta.env.VITE_API_URL, formData);
        if (response.status === 200) {
          // Generate unique booking ID and store it in localStorage for status tracking
          const newBookingId = generateBookingId();
          const newBooking = {
            id: newBookingId,
            date: new Date().toISOString().split('T')[0],
            service: formData.service,
            status: 'pending',
            customerName: formData.name,
            location: formData.message.match(/Chennai|Thiruvallur|Avadi|Poonamallee|Ambattur|Anna Nagar|T. Nagar|Adyar/)?.[0] || 'Chennai',
            bookingId: newBookingId
          };
          const existingBookings = JSON.parse(localStorage.getItem('contactFormSubmissions') || '[]');
          existingBookings.push(newBooking);
          localStorage.setItem('contactFormSubmissions', JSON.stringify(existingBookings));
          
          setStatus({ submitted: true, success: true, message: `${t('contact.success')} Your booking ID is: ${newBookingId}. Save this to check your booking status later.` });
          setFormData({ name: '', email: '', service: '', message: '' });
        }
      } catch (error) {
        setStatus({ submitted: true, success: false, message: t('contact.error') });
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setStatus({ submitted: false, success: false, message: '' }), 5000);
      }
    }
  };

  return (
    <Container id="contact" className="py-5 contact-form">
      <h2 className="text-center mb-4">{t('contact.title')}</h2>
      <Row>
        <Col xs={12} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          {status.submitted && <Alert variant={status.success ? 'success' : 'danger'}>{status.message}</Alert>}
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>{t('contact.form.name')}</Form.Label>
              <Form.Control type="text" placeholder={t('contact.form.namePlaceholder')} name="name" value={formData.name} onChange={handleChange} isInvalid={!validation.name} />
              <Form.Control.Feedback type="invalid">
                {t('contact.form.nameError')}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>{t('contact.form.email')}</Form.Label>
              <Form.Control type="email" placeholder={t('contact.form.emailPlaceholder')} name="email" value={formData.email} onChange={handleChange} isInvalid={!validation.email} />
              <Form.Control.Feedback type="invalid">
                {t('contact.form.emailError')}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupService">
              <Form.Label>{t('contact.form.service')}</Form.Label>
              <Form.Select name="service" value={formData.service} onChange={handleChange} isInvalid={!validation.service}>
                <option>{t('contact.form.choose')}</option>
                {services.map((service, index) => (
                  <option key={index} value={service.title}>{t(`services.items.${index}.title`)}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {t('contact.form.serviceError')}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupMessage">
              <Form.Label>{t('contact.form.message')}</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder={t('contact.form.messagePlaceholder')} name="message" value={formData.message} onChange={handleChange} isInvalid={!validation.message} />
              <Form.Control.Feedback type="invalid">
                {t('contact.form.messageError')}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Sending...
                </>
              ) : (
                t('contact.form.submit') || 'Submit'
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactForm;