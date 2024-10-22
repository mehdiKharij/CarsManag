import React from 'react';
import { Navbar, Container, Col } from 'react-bootstrap';

class Footer extends React.Component {
    render() {
        let fullYear = new Date().getFullYear(); // Get the current year
        return (
            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Container>
                    <Col lg={12} className="text-center text-white"> {/* Changed to text-white */}
                        <div>
                            {fullYear} - {fullYear + 1}, All Rights Reserved by Master MIOLA
                        </div>
                    </Col>
                </Container>
            </Navbar>
        );
    }
}

export default Footer;
