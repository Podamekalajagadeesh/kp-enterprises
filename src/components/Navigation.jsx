import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';

const Navigation = () => {
  const { t } = useTranslation();

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#home">{t('nav.brand')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link href="#services">{t('nav.services')}</Nav.Link>
            <Nav.Link href="#about">{t('nav.about')}</Nav.Link>
            <Nav.Link href="#contact">{t('nav.contact')}</Nav.Link>
            <Button variant="primary" className="ms-2" href="#contact">{t('nav.book')}</Button>
            <LanguageSwitcher />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;