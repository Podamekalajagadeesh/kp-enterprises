import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <h5>KP enterprises</h5>
            <p>{t('footer.description')}</p>
          </Col>
          <Col xs={12} md={6} className="text-md-end">
            <p>{t('footer.contact')}: <a href="tel:+919500056535" className="text-light">95000 56535</a></p>
            <div>
              <a href="https://www.instagram.com/KPEnterprises" target="_blank" rel="noopener noreferrer" className="text-light">
                <FaInstagram size={30} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;