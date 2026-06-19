import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert, Card, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaClock, FaCheckCircle, FaSpinner, FaTimesCircle, FaCalendarAlt } from 'react-icons/fa';

// Generate a booking ID when someone submits the contact form (to integrate with existing ContactForm)
export const generateBookingId = () => {
  return 'BK' + Math.random().toString(36).substring(2, 6).toUpperCase();
};

const BookingStatus = () => {
  const { t } = useTranslation();
  const [bookingId, setBookingId] = useState('');
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  // In a real app, this would come from your backend API
  // This is mock data to demonstrate the functionality
  const mockBookings = {
    'BK001': {
      id: 'BK001',
      date: '2024-06-20',
      service: 'AC Repair',
      status: 'confirmed',
      customerName: 'Rajesh Kumar',
      location: 'Chennai'
    },
    'BK002': {
      id: 'BK002',
      date: '2024-06-18',
      service: 'Refrigerator Repair',
      status: 'completed',
      customerName: 'Priya Sharma',
      location: 'Thiruvallur'
    },
    'BK003': {
      id: 'BK003',
      date: '2024-06-21',
      service: 'Washing Machine Service',
      status: 'pending',
      customerName: 'Amit Patel',
      location: 'Avadi'
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="text-warning" />;
      case 'confirmed':
        return <FaSpinner className="text-primary" />;
      case 'inProgress':
        return <FaSpinner className="text-info" spin />;
      case 'completed':
        return <FaCheckCircle className="text-success" />;
      case 'cancelled':
        return <FaTimesCircle className="text-danger" />;
      default:
        return <FaClock className="text-secondary" />;
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'primary';
      case 'inProgress':
        return 'info';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const handleCheckStatus = async (e) => {
    e.preventDefault();
    if (!bookingId.trim()) {
      setError(t('bookingStatus.notFound'));
      return;
    }

    setIsChecking(true);
    setError('');
    setBooking(null);

    // Simulate API call to check booking status
    setTimeout(() => {
      const foundBooking = mockBookings[bookingId.toUpperCase()];
      if (foundBooking) {
        setBooking(foundBooking);
      } else {
        // Also check localStorage for bookings submitted through the contact form
        const submissions = JSON.parse(localStorage.getItem('contactFormSubmissions') || '[]');
        const userBooking = submissions.find(sub => sub.bookingId === bookingId.toUpperCase());
        if (userBooking) {
          setBooking(userBooking);
        } else {
          setError(t('bookingStatus.notFound'));
        }
      }
      setIsChecking(false);
    }, 1000);
  };

  return (
    <Container id="booking-status" className="py-5 service-areas">
      <h2 className="text-center mb-5">{t('bookingStatus.title')}</h2>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={handleCheckStatus} className="mb-4">
            <Form.Group className="mb-3">
              <Form.Label>{t('bookingStatus.bookingId')}</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder={t('bookingStatus.bookingIdPlaceholder')}
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                />
                <Button variant="primary" type="submit" disabled={isChecking}>
                  {isChecking ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    t('bookingStatus.check')
                  )}
                </Button>
              </div>
            </Form.Group>
          </Form>

          {error && <Alert variant="danger">{error}</Alert>}

          {booking && (
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h4>Booking #{booking.id}</h4>
                    <p className="text-muted mb-1"><FaCalendarAlt className="me-2" />{booking.date}</p>
                    <p className="mb-1">{booking.service}</p>
                    <p className="text-muted small">{booking.location}</p>
                  </div>
                  <Badge bg={getStatusBadgeVariant(booking.status)} className="p-2 fs-6">
                    <span className="d-flex align-items-center gap-2">
                      {getStatusIcon(booking.status)}
                      {t(`bookingStatus.statuses.${booking.status}`)}
                    </span>
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          )}

          <div className="mt-4 text-center text-muted small">
            <p>Try these demo booking IDs: BK001, BK002, BK003</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingStatus;