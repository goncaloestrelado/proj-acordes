import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Music Theory Explorer</h5>
            <p className="text-muted">
              Explore the beautiful world of music theory through interactive tools and visualizations.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <h6>Created by</h6>
            <p>
              <a href="https://github.com/ST4R20RD" target="_blank" rel="noopener noreferrer" className="footer-link">
                Gonçalo Estrelado
              </a>
            </p>
            <p className="text-muted small">Built with React & Bootstrap</p>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="row">
          <div className="col-12 text-center">
            <p className="copyright text-muted">© 2025 Music Theory Explorer. Made with ❤️ for musicians.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
