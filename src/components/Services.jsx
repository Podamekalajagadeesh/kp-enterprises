import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { services } from '../servicesData.jsx';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();
  return (
    <Container id="services" className="py-5">
      <h2 className="text-center mb-4">{t('services.title')}</h2>
      <Row>
        {services.map((service, index) => (
          <Col key={index} xs={12} sm={6} md={6} lg={3} className="mb-4">
            <Card className="text-center h-100 service-card">
              <Card.Body>
                <div className="fs-1 mb-3">{service.icon}</div>
                <Card.Title>{t(`services.items.${index}.title`)}</Card.Title>
                <Card.Text>{t(`services.items.${index}.description`)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Services;