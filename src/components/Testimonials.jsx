import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaStar, FaUserCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Testimonials = () => {
  const { t } = useTranslation();
  const defaultTestimonials = t('testimonials.items', { returnObjects: true });
  const [allTestimonials, setAllTestimonials] = useState(defaultTestimonials);

  // Load customer reviews from localStorage
  useEffect(() => {
    const customerReviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
    // Combine default testimonials with customer-submitted reviews
    const combined = [...defaultTestimonials, ...customerReviews.map(review => ({
      name: review.name,
      location: review.location,
      text: review.text
    }))];
    setAllTestimonials(combined);
  }, [defaultTestimonials]);

  return (
    <Container id="testimonials" className="py-5 testimonials">
      <h2 className="text-center mb-5">{t('testimonials.title')}</h2>
      <Row>
        {allTestimonials.map((testimonial, index) => (
          <Col key={index} xs={12} md={4} className="mb-4">
            <Card className="h-100 testimonial-card text-center p-4">
              <Card.Body>
                <div className="mb-3">
                  <FaUserCircle size={60} className="text-primary" />
                </div>
                <div className="mb-3 text-warning">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <Card.Text className="mb-4 fst-italic">"{testimonial.text}"</Card.Text>
                <h5 className="mb-1">{testimonial.name}</h5>
                <p className="text-muted small">{testimonial.location}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Testimonials;