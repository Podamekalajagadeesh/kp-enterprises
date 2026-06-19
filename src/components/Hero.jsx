import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <Container fluid className="hero">
      <Container>
        <Row>
          <Col>
            <h1>{t('hero.title')}</h1>
            <p>{t('hero.subtitle')}</p>
            <Button variant="primary" href="#contact" className="animate-float">{t('hero.button')}</Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Hero;