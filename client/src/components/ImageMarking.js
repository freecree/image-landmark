import React, { useEffect, useRef, useState } from "react";
import FileService from "../services/FileService";

const ImageMarking = (props) => {

  const canvasWrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const radius = 5;
  const [nodes, setNodes] = useState(props.markings);
  let dragNode, dragPoint, imageSize;
  // const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // let imageSize;
    const image = new Image();
    image.src = `${props.path}/${props.name}`;

    const links = [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [0, 5], [5, 6], [6, 7], [7, 8],
      [0, 9], [9, 10], [10, 11], [11, 12], 
      [0, 13], [13, 14], [14, 15], [15, 16],
      [0, 17], [17, 18], [18, 19], [19, 20],
      [5, 9], [9, 13], [13, 17],
    ];

    image.onload = () => {
      console.log("canvas wrapper: ", canvasWrapperRef.current);
      console.log("canvas wrapper sizes: ", canvasWrapperRef.current.offsetWidth, canvasWrapperRef.current.offsetHeight);
      imageSize = resizeImageBlock(image, canvasWrapperRef.current);

      console.log("On load: ", imageSize);

      nodes.forEach((node) => {
        node.x *= imageSize.width;
        node.y *= imageSize.height;
      });
      // console.log(canvasWrapperRef.current);
      console.log("height: ", canvasWrapperRef.current.offsetHeight);

      // canvas.width = image.naturalWidth;
      // canvas.height = image.naturalHeight;
      canvas.width = imageSize.width; 
      canvas.height = imageSize.height;
      draw();
    };


    function draw() {
      ctx.drawImage(image, 0, 0, imageSize.width, imageSize.height);
      links.forEach(function (link) {
        let i0 = link[0],
          i1 = link[1];
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(nodes[i0].x, nodes[i0].y);
        ctx.lineTo(nodes[i1].x, nodes[i1].y);
        ctx.strokeStyle = "#02FA00";
        ctx.stroke();
      });

      nodes.forEach(function (node) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#FF01B8";
        ctx.fill();
      });
    }

    function getMousePosFromEvent(evt) {
      let rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
      };
    }

    function getNodeByPos(pos) {
      let result;
      nodes.forEach(function (node) {
        if (
          pos.x >= node.x - radius &&
          pos.x < node.x + radius &&
          pos.y >= node.y - radius &&
          pos.y < node.y + radius
        ) {
          result = node;
        }
      });
      return result;
    }

    function getMousePosFromEvent(evt) {
      let rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
      };
    }

    function getNodeByPos(pos) {
      let result;
      nodes.forEach(function (node) {
        if (
          pos.x >= node.x - radius &&
          pos.x < node.x + radius &&
          pos.y >= node.y - radius &&
          pos.y < node.y + radius
        ) {
          result = node;
        }
      });
      return result;
    }

    canvas.addEventListener("mousedown", function (event) {
      let pos = getMousePosFromEvent(event);
      dragNode = getNodeByPos(pos);
      console.log("mousedown: dragNode ", dragNode);
      if (dragNode !== undefined) {
        dragPoint = {
          x: pos.x - dragNode.x,
          y: pos.y - dragNode.y,
        };
      }
    }, false );

    canvas.addEventListener("mouseup", function () {
      dragNode = undefined;
    }, false);

    canvas.addEventListener("mousemove", function (event) {
      let pos;
      if (dragNode !== undefined) {
        pos = getMousePosFromEvent(event);
        dragNode.x = pos.x - dragPoint.x;
        dragNode.y = pos.y - dragPoint.y;
        draw();
      }
    }, false);
  }, []); //nodes

  async function updateMarkings() {
    const resultNodes = nodes.map((node) => {
      const newNode = {
        x: node.x / imageSize.width,
        y: node.y / imageSize.height,
      };
      return newNode;
    });
    const response = await FileService.updateFile(props.id, resultNodes);
    console.log("Update resp: ", response?.data?.markings);
    //setNodes(response.data.markings);
  }

  function resizeImageBlock(image, imageWrapper) {
      const wrapperWidth = imageWrapper.clientWidth;
      const wrapperHeight = imageWrapper.clientHeight;

      if (image.naturalWidth > wrapperWidth) {
        const newHeight = image.naturalHeight * (wrapperWidth / image.naturalWidth);
        if (newHeight < wrapperHeight) {
          imageWrapper.style.height = newHeight + 5 + 'px';
          imageWrapper.style.width = wrapperWidth + 'px'; 
        }
        return {width: wrapperWidth, height: newHeight};
      } else {
       imageWrapper.style.width = image.naturalWidth + 'px';
     }
      return {width: image.naturalWidth, height: image.naturalHeight};
  }

  return (
    <div className="wrapper editor__content">
      <div className="editor__image-block" ref={canvasWrapperRef}>
        <canvas className="canvas" ref={canvasRef} />
      </div>
      <div className="editor__left-block">
        <h2>{props.name}</h2>
        <button onClick={updateMarkings} className="btn btn_blue editor__btn">
          Зберегти розмітку
        </button>
      </div>
    </div>
  );
};

export default ImageMarking;
