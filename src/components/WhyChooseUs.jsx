import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaAward, FaClock, FaTags } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const features = [
  {
    icon: <FaAward />,
  },
  {
    icon: <FaClock />,
  },
  {
    icon: <FaTags />,
  },
];

const WhyChooseUs = () => {
  const { t } = useTranslation();
  return (
    <Container id="about" className="py-5 why-choose-us">
      <h2 className="text-center mb-4">{t('about.title')}</h2>
      <Row>
        {features.map((feature, index) => (
          <Col key={index} xs={12} sm={6} md={4} className="text-center mb-4">
            <div className="fs-1 mb-3">{feature.icon}</div>
            <h4>{t(`about.features.${index}.title`)}</h4>
            <p>{t(`about.features.${index}.description`)}</p>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WhyChooseUs;