import React from 'react';
import { Modal, ModalHeader, ModalBody, FormGroup, Label, NavbarBrand } from 'reactstrap';
import picter1 from '../img/1.jpg';
import picter2 from '../img/2.jpg';
import picter3 from '../img/3.jpg';
import picter4 from '../img/4.jpg';
import picter5 from '../img/5.jpg';
import picter6 from '../img/6.jpg';
import picter7 from '../img/7.jpg';
import picter8 from '../img/8.jpg';
import picter9 from '../img/9.jpg';
import picter10 from '../img/10.jpg';
import picter11 from '../img/11.jpg';
import picter12 from '../img/12.jpg';
import picter13 from '../img/13.jpg';
import picter14 from '../img/14.jpg';
import picter15 from '../img/15.jpg';
import picter16 from '../img/16.jpg';
import picter17 from '../img/17.jpg';
import picter18 from '../img/18.jpg';
import picter19 from '../img/19.jpg';
import picter20 from '../img/20.jpg';
import picter21 from '../img/21.jpg';
import picter22 from '../img/22.jpg';
import picter23 from '../img/23.jpg';
import picter24 from '../img/24.jpg';
import picter25 from '../img/25.jpg';
import picter26 from '../img/26.jpg';
import picter27 from '../img/27.jpg';
import picter28 from '../img/28.jpg';
import picter29 from '../img/29.jpg';
import picter30 from '../img/30.jpg';
import picter31 from '../img/31.jpg';
import picter32 from '../img/32.jpg';
import picter33 from '../img/33.jpg';
import picter34 from '../img/34.jpg';
import picter35 from '../img/35.jpg';
import picter36 from '../img/36.jpg';



const photos = [
  { src: picter1 },
  { src: picter2 },
  { src: picter3 },
  { src: picter4 },
  { src: picter5 },
  { src: picter6 },
  { src: picter7 },
  { src: picter8 },
  { src: picter9 },
  { src: picter10 },
  { src: picter11 },
  { src: picter12 },
  { src: picter13 },
  { src: picter14 },
  { src: picter15 },
  { src: picter16 },
  { src: picter17 },
  { src: picter18 },
  { src: picter19 },
  { src: picter20 },
  { src: picter21 },
  { src: picter22 },
  { src: picter23 },
  { src: picter24 },
  { src: picter25 },
  { src: picter26 },
  { src: picter27 },
  { src: picter28 },
  { src: picter29 },
  { src: picter30 },
  { src: picter31 },
  { src: picter32 },
  { src: picter33 },
  { src: picter34 },
  { src: picter35 },
  { src: picter36 },



 ];

const initialState = {
  toptext: "",
  bottomtext: "",
  isTopDragging: false,
  isBottomDragging: false,
  topY: "10%",
  topX: "50%",
  bottomX: "50%",
  bottomY: "90%"
}

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      currentImage: 0,
      modalIsOpen: false,
      currentImagebase64: null,
      ...initialState
    };
  }

  openImage = (index) => {
    const image = photos[index];
    const base_image = new Image();
    base_image.src = image.src;
    const base64 = this.getBase64Image(base_image);
    this.setState(prevState => ({
      currentImage: index,
      modalIsOpen: !prevState.modalIsOpen,
      currentImagebase64: base64,
      ...initialState
    }));
  }

  toggle = () => {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen
    }));
  }

  changeText = (event) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    });
  }

  getStateObj = (e, type) => {
    let rect = this.imageRef.getBoundingClientRect();
    const xOffset = e.clientX - rect.left;
    const yOffset = e.clientY - rect.top;
    let stateObj = {};
    if (type === "bottom") {
      stateObj = {
        isBottomDragging: true,
        isTopDragging: false,
        bottomX: `${xOffset}px`,
        bottomY: `${yOffset}px`
      }
    } else if (type === "top") {
      stateObj = {
        isTopDragging: true,
        isBottomDragging: false,
        topX: `${xOffset}px`,
        topY: `${yOffset}px`
      }
    }
    return stateObj;
  }

  handleMouseDown = (e, type) => {
    const stateObj = this.getStateObj(e, type);
    document.addEventListener('mousemove', (event) => this.handleMouseMove(event, type));
    this.setState({
      ...stateObj
    })
  }

  handleMouseMove = (e, type) => {
    if (this.state.isTopDragging || this.state.isBottomDragging) {
      let stateObj = {};
      if (type === "bottom" && this.state.isBottomDragging) {
        stateObj = this.getStateObj(e, type);
      } else if (type === "top" && this.state.isTopDragging){
        stateObj = this.getStateObj(e, type);
      }
      this.setState({
        ...stateObj
      });
    }
  };

  handleMouseUp = (event) => {
    document.removeEventListener('mousemove', this.handleMouseMove);
    this.setState({
      isTopDragging: false,
      isBottomDragging: false
    });
  }

  convertSvgToImage = () => {
    const svg = this.svgRef;
    let svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    const svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    const img = document.createElement("img");
    img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));
    img.onload = function() {
      canvas.getContext("2d").drawImage(img, 0, 0);
      const canvasdata = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.download = "meme.png";
      a.href = canvasdata;
      document.body.appendChild(a);
      a.click();
    };
  }

  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
  }

  render() {
    const image = photos[this.state.currentImage];
    const base_image = new Image();
    base_image.src = image.src;
    var wrh = base_image.width / base_image.height;
    var newWidth = 600;
    var newHeight = newWidth / wrh;
    const textStyle = {
      fontFamily: "Impact",
      fontSize: "50px",
      textTransform: "uppercase",
      fill: "#FFF",
      stroke: "#000",
      userSelect: "none"
    }

    return (
      <div>
        <div className="main-content">
          <div className="sidebar">
            <NavbarBrand href="/">Meme generator</NavbarBrand>
            
            <p>
Click on the desired template and you can add upper and lower text to the meme-template, move the text and save the image by loading it.            </p>
          </div>
          <div className="content">
            {photos.map((image, index) => (
              <div className="image-holder" key={image.src}>
                <span className="meme-top-caption">Top text</span>
                <img
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    height: "100%"
                  }}
                  alt={index}
                  src={image.src}
                  onClick={() => this.openImage(index)}
                  role="presentation"
                />
              <span className="meme-bottom-caption">Bottom text</span>
              </div>
            ))}
          </div>
        </div>
        <Modal className="meme-gen-modal" isOpen={this.state.modalIsOpen}>
          <ModalHeader toggle={this.toggle}>Make-a-Meme</ModalHeader>
          <ModalBody>
            <svg
              width={newWidth}
              id="svg_ref"
              height={newHeight}
              ref={el => { this.svgRef = el }}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <image
                ref={el => { this.imageRef = el }}
                xlinkHref={this.state.currentImagebase64}
                height={newHeight}
                width={newWidth}
              />
              <text
                style={{ ...textStyle, zIndex: this.state.isTopDragging ? 4 : 1 }}
                x={this.state.topX}
                y={this.state.topY}
                dominantBaseline="middle"
                textAnchor="middle"
                onMouseDown={event => this.handleMouseDown(event, 'top')}
                onMouseUp={event => this.handleMouseUp(event, 'top')}
              >
                  {this.state.toptext}
              </text>
              <text
                style={textStyle}
                dominantBaseline="middle"
                textAnchor="middle"
                x={this.state.bottomX}
                y={this.state.bottomY}
                onMouseDown={event => this.handleMouseDown(event, 'bottom')}
                onMouseUp={event => this.handleMouseUp(event, 'bottom')}
              >
                  {this.state.bottomtext}
              </text>
            </svg>
            <div className="meme-form">
              <FormGroup>
                <Label for="toptext">Top Text</Label>
                <input className="form-control" type="text" name="toptext" id="toptext" placeholder="Add text to the top" onChange={this.changeText} />
              </FormGroup>
              <FormGroup>
                <Label for="bottomtext">Bottom Text</Label>
                <input className="form-control" type="text" name="bottomtext" id="bottomtext" placeholder="Add text to the bottom" onChange={this.changeText} />
              </FormGroup>
              <button onClick={() => this.convertSvgToImage()} className="btn btn-primary">Download Meme!</button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default MainPage;