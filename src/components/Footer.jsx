import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const whatsappMessage = encodeURIComponent("Hello! I'd like to inquire about your appliance repair services.");
  const whatsappUrl = `https://wa.me/919500056535?text=${whatsappMessage}`;
  
  return (
    <>
      {/* Floating WhatsApp Button */}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={40} />
      </a>
      <footer className="footer">
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <h5>KP Enterprises</h5>
              <p>{t('footer.description')}</p>
            </Col>
            <Col xs={12} md={6} className="text-md-end">
              <p>{t('footer.contact')}: <a href="tel:+919500056535" className="text-light">95000 56535</a></p>
              <div className="d-flex gap-3 justify-content-md-end justify-content-center align-items-center">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-light">
                  <FaWhatsapp size={30} />
                </a>
                <a href="https://www.instagram.com/KPEnterprises" target="_blank" rel="noopener noreferrer" className="text-light">
                  <FaInstagram size={30} />
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;