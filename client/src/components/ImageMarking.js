import React, {useEffect, useRef, useState} from 'react';
import ImageService from '../services/ImageService';
import './imageMarking.css';


const ImageMarking = () => {
    const [nodes, setNodes] = useState([
      {"x": 0.5990986227989197, "y": 0.8236007690429688},
      {"x": 0.44304341077804565, "y": 0.7544143795967102},
      {"x": 0.31793516874313354, "y": 0.6391657590866089},
      {"x": 0.21029773354530334, "y": 0.5551186800003052},
      {"x": 0.11153236031532288, "y": 0.5093718767166138},
      {"x": 0.4809638261795044, "y": 0.45765969157218933},
      {"x": 0.4479699730873108, "y": 0.30422329902648926},
      {"x": 0.42753225564956665, "y": 0.20945298671722412},
      {"x": 0.41402000188827515, "y": 0.12698444724082947},
      {"x": 0.5833084583282471, "y": 0.4519297480583191},
      {"x": 0.5770583152770996, "y": 0.28351467847824097},
      {"x": 0.5696728229522705, "y": 0.17617502808570862},
      {"x": 0.5624780058860779, "y": 0.08589652180671692},
      {"x": 0.6793758869171143, "y": 0.4802565276622772},
      {"x": 0.6933917999267578, "y": 0.3239215612411499},
      {"x": 0.6942440271377563, "y": 0.2241552174091339},
      {"x": 0.6895493268966675, "y": 0.13454383611679077},
      {"x": 0.7701131105422974, "y": 0.5329120755195618},
      {"x": 0.8236520886421204, "y": 0.41969263553619385},
      {"x": 0.8544243574142456, "y": 0.3433017134666443},
      {"x": 0.8793704509735107, "y": 0.2687773108482361}]);
    const canvasRef = useRef(null);
    const radius = 5;
    let dragNode, dragPoint;

    useEffect(() => {
      console.log("In useEffect");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const image = new Image();
      image.src = 'hand.jpg';

      setNodes(nodes.map(node => {
        node.x*=527; 
        node.y*=600;
        return node;
      }))

      const links = [[0, 1], [1, 2], [2, 3], [3, 4],
                    [0, 5], [5, 6], [6, 7], [7, 8],
                    [0, 9], [9, 10], [10, 11], [11, 12],
                    [0, 13], [13, 14], [14, 15], [15, 16],
                    [0, 17], [17, 18], [18, 19], [19, 20],
                    [5, 9], [9, 13], [13, 17]];

      image.onload = () => {
        draw();
      }

      function draw() {
        ctx.drawImage(image, 0, 0);
        links.forEach(function(link) {
          let i0 = link[0],
            i1 = link[1];

          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(nodes[i0].x, nodes[i0].y);
          ctx.lineTo(nodes[i1].x, nodes[i1].y);
          ctx.strokeStyle = '#02FA00';
          ctx.stroke();
        });

        nodes.forEach(function(node) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, 2*Math.PI);
          ctx.fillStyle = '#FF01B8';
          ctx.fill();
        });
      }

      function getMousePosFromEvent(evt) {
        let rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      };
    
      function getNodeByPos(pos) {
        let result;
        nodes.forEach(function(node) {
          if ((pos.x >= node.x - radius) && (pos.x < node.x + radius) && (pos.y >= node.y - radius) && (pos.y < node.y + radius)) {
            result = node;
          }
        });
        return result;
      };

      canvas.addEventListener('mousedown', function(event) {
        let pos = getMousePosFromEvent(event, canvas);
        dragNode = getNodeByPos(pos);
        if (dragNode !== undefined) {
          dragPoint = {
            x: pos.x - dragNode.x,
            y: pos.y - dragNode.y
          }
        }
      }, false);
          
      canvas.addEventListener('mouseup', function() {
        dragNode = undefined;
      }, false);
    
      canvas.addEventListener('mousemove', function(event) {
        let pos;
        if (dragNode !== undefined) {
          pos = getMousePosFromEvent(event);
          dragNode.x = pos.x - dragPoint.x;
          dragNode.y = pos.y - dragPoint.y;
          draw();
        }
      }, false);
        
    }, [])


    async function getMarking() {
      try {
        console.log("Marking...");
        const response = await ImageService.fetchImageMarking();
        console.log("Marking: ", response.data);
        setNodes(response.data);
        
      } catch(e) {
        console.log(e);
      }
    }

    console.log("In render()");

    return (
        <div>
          <button onClick={getMarking}>Получить разметку изображение</button>
          <div>{nodes.arr}</div>
          <canvas className='canvas' ref={canvasRef} width={527} height={600}/>
        </div>
    );
};

export default ImageMarking;
