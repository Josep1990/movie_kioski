import React, { Component } from 'react';

class FooterComponent extends Component { //this react component render the footer on the browser
    render() {
        return (
            <div>
                <footer className="footer">
                    <span className="text-muted">All Rights Reserved @Jose Paulo || @Henrique Demetrio</span>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;