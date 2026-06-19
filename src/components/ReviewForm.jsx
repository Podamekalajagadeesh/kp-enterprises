import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ReviewForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    text: ''
  });
  const [status, setStatus] = useState({ submitted: false, success: false, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validation, setValidation] = useState({
    name: true,
    location: true,
    text: true
  });

  // Get all valid service areas to validate customer location
  const validAreas = t('serviceAreas.areas', { returnObjects: true });

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim() !== '';
      case 'location':
        return value.trim() !== '' && validAreas.some(area => area.toLowerCase().includes(value.toLowerCase().trim()));
      case 'text':
        return value.trim().length >= 10;
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
      location: validateField('location', formData.location),
      text: validateField('text', formData.text)
    };
    setValidation(newValidation);

    if (Object.values(newValidation).every(isValid => isValid)) {
      setIsSubmitting(true);
      try {
        // Store review in localStorage to persist it (in real app, this would go to backend)
        const existingReviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
        existingReviews.push({
          ...formData,
          date: new Date().toISOString()
        });
        localStorage.setItem('customerReviews', JSON.stringify(existingReviews));
        
        setStatus({ submitted: true, success: true, message: t('reviewForm.success') });
        setFormData({ name: '', location: '', text: '' });
      } catch (error) {
        setStatus({ submitted: true, success: false, message: t('reviewForm.error') });
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setStatus({ submitted: false, success: false, message: '' }), 5000);
      }
    }
  };

  return (
    <Container id="review-form" className="py-5 contact-form">
      <h2 className="text-center mb-4">{t('reviewForm.title')}</h2>
      <Row>
        <Col xs={12} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          {status.submitted && <Alert variant={status.success ? 'success' : 'danger'}>{status.message}</Alert>}
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formReviewName">
              <Form.Label>{t('reviewForm.name')}</Form.Label>
              <Form.Control 
                type="text" 
                placeholder={t('reviewForm.namePlaceholder')} 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                isInvalid={!validation.name} 
              />
              <Form.Control.Feedback type="invalid">
                {t('contact.form.nameError')}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formReviewLocation">
              <Form.Label>{t('reviewForm.location')}</Form.Label>
              <Form.Control 
                type="text" 
                placeholder={t('reviewForm.locationPlaceholder')} 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
                isInvalid={!validation.location} 
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid service area (we only serve Chennai, Thiruvallur and surrounding areas)
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formReviewText">
              <Form.Label>{t('reviewForm.text')}</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={4} 
                placeholder={t('reviewForm.textPlaceholder')} 
                name="text" 
                value={formData.text} 
                onChange={handleChange} 
                isInvalid={!validation.text} 
              />
              <Form.Control.Feedback type="invalid">
                Please write a review of at least 10 characters
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Submitting...
                </>
              ) : (
                t('reviewForm.submit') || 'Submit Review'
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ReviewForm;