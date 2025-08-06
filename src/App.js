import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { Footer } from "./components/Footer";
import CircleOfFifths from "./components/CircleOfFifths";
import { useMusicTheory } from "./hooks/useMusicTheory";

function App() {
  const { selectedKey, currentScale, keyType, selectKey, circleFifthsArrayRight, circleFifthsArrayLeft } =
    useMusicTheory();

  return (
    <Container fluid className="app-container">
      <Row className="justify-content-center mb-3">
        <Col xs={12}>
          <h1 className="text-center main-title">Circle of Fifths</h1>
          <p className="text-center text-white-50 subtitle">Explore scales and keys in the circle of fifths</p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} lg={11} xl={10}>
          <Card className="main-card">
            <Card.Body className="p-lg-4 p-3">
              {/* Unified Music Theory Interface */}
              <Row className="g-3 g-lg-4">
                {/* Circle of Fifths Section */}
                <Col xs={12} lg={8} xl={7} className="order-1 order-lg-1">
                  <Card className="h-100 circle-card">
                    <Card.Header className="d-none d-md-block">
                      <h5 className="mb-0">Interactive Circle of Fifths</h5>
                      <small className="text-muted">Click any key to explore its scale and relationships</small>
                    </Card.Header>
                    <Card.Body className="d-flex justify-content-center align-items-center p-2 p-md-3">
                      <CircleOfFifths selectedKey={selectedKey} onKeySelect={selectKey} />
                    </Card.Body>
                  </Card>
                </Col>

                {/* Scale Information Panel */}
                <Col xs={12} lg={4} xl={5} className="order-2 order-lg-2">
                  <div className="scale-info-panel">
                    {/* Quick Key Selection */}
                    <Card className="mb-4">
                      <Card.Header>
                        <h6>Quick Select</h6>
                      </Card.Header>
                      <Card.Body>
                        <div className="mb-3">
                          <small className="text-muted d-block mb-2">Sharp Keys</small>
                          <div className="key-buttons-compact">
                            {circleFifthsArrayRight.slice(0, 4).map((key, index) => (
                              <Button
                                key={key}
                                size="sm"
                                variant={selectedKey === key ? "primary" : "outline-primary"}
                                onClick={() => selectKey(key)}
                                className="key-button-compact me-1 mb-1"
                              >
                                {key}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <small className="text-muted d-block mb-2">Flat Keys</small>
                          <div className="key-buttons-compact">
                            {circleFifthsArrayLeft.slice(1, 5).map((key) => (
                              <Button
                                key={key}
                                size="sm"
                                variant={selectedKey === key ? "primary" : "outline-primary"}
                                onClick={() => selectKey(key)}
                                className="key-button-compact me-1 mb-1"
                              >
                                {key}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>

                    {/* Current Scale Display */}
                    {currentScale.length > 0 && (
                      <Card className="mb-4">
                        <Card.Header>
                          <h6>
                            {selectedKey} {keyType === "minor" ? "Natural Minor" : "Major"} Scale
                          </h6>
                        </Card.Header>
                        <Card.Body>
                          <div className="scale-notes-horizontal">
                            <div className="d-flex flex-wrap gap-2 mb-3">
                              {currentScale.map((note, index) => (
                                <div key={index} className="scale-note-item text-center">
                                  <Badge bg="info" className="scale-note-badge d-block mb-1">
                                    {note}
                                  </Badge>
                                  <small className="text-muted d-block">{index + 1}</small>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    )}

                    {/* Key Information */}
                    {selectedKey && (
                      <Card>
                        <Card.Header>
                          <h6>Key Information</h6>
                        </Card.Header>
                        <Card.Body>
                          <div className="key-info">
                            <div className="mb-2">
                              <strong>Current Key:</strong> {selectedKey}
                            </div>
                            <div className="mb-2">
                              <strong>Type:</strong> {keyType === "minor" ? "Natural Minor" : "Major"}
                            </div>
                            <div className="mb-2">
                              <strong>Pattern:</strong>{" "}
                              <small className="text-muted">
                                {keyType === "minor" ? "W-H-W-W-H-W-W" : "W-W-H-W-W-W-H"}
                              </small>
                            </div>
                            {keyType === "major" && (
                              <div className="mb-2">
                                <strong>Relative Minor:</strong>{" "}
                                <Button
                                  size="sm"
                                  variant="outline-secondary"
                                  onClick={() => {
                                    const relativeMinors = {
                                      C: "Am",
                                      G: "Em",
                                      D: "Bm",
                                      A: "F#m",
                                      E: "C#m",
                                      B: "G#m",
                                      "F#": "D#m",
                                      F: "Dm",
                                      Bb: "Gm",
                                      Eb: "Cm",
                                      Ab: "Fm",
                                      Db: "Bbm",
                                      Gb: "Ebm",
                                    };
                                    const relativeMinor = relativeMinors[selectedKey];
                                    if (relativeMinor) selectKey(relativeMinor);
                                  }}
                                >
                                  {(() => {
                                    const relativeMinors = {
                                      C: "Am",
                                      G: "Em",
                                      D: "Bm",
                                      A: "F#m",
                                      E: "C#m",
                                      B: "G#m",
                                      "F#": "D#m",
                                      F: "Dm",
                                      Bb: "Gm",
                                      Eb: "Cm",
                                      Ab: "Fm",
                                      Db: "Bbm",
                                      Gb: "Ebm",
                                    };
                                    return relativeMinors[selectedKey] || "None";
                                  })()}
                                </Button>
                              </div>
                            )}
                          </div>
                        </Card.Body>
                      </Card>
                    )}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Footer />
    </Container>
  );
}

export default App;
