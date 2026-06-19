import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ServiceAreas = () => {
  const { t } = useTranslation();
  const areas = t('serviceAreas.areas', { returnObjects: true });

  return (
    <Container id="areas" className="py-5 service-areas">
      <h2 className="text-center mb-5">{t('serviceAreas.title')}</h2>
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8} className="text-center">
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            {areas.map((area, index) => (
              <Badge key={index} bg="primary" pill className="fs-6 py-2 px-4 area-badge">
                <FaMapMarkerAlt className="me-2" />
                {area}
              </Badge>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ServiceAreas;