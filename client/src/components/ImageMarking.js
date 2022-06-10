import React, {useEffect, useRef, useState} from 'react';
import FileService from '../services/FileService';


const ImageMarking = (props) => {
    const [nodes, setNodes] = useState(props.markings);

    const [reqState, setReqState] = useState(false);  
    const canvasRef = useRef(null);
    const radius = 5;
    let dragNode, dragPoint;

    useEffect(() => {
      // console.log("In useEffect");
      // console.log(help);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const image = new Image();
      image.src = `${props.path}/${props.name}`;

      

      const links = [[0, 1], [1, 2], [2, 3], [3, 4],
                    [0, 5], [5, 6], [6, 7], [7, 8],
                    [0, 9], [9, 10], [10, 11], [11, 12],
                    [0, 13], [13, 14], [14, 15], [15, 16],
                    [0, 17], [17, 18], [18, 19], [19, 20],
                    [5, 9], [9, 13], [13, 17]];

      image.onload = () => {
        setNodes(nodes.map(node => {
          node.x*=image.naturalWidth; 
          node.y*=image.naturalHeight;
          return node;
        }))
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
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
        let pos = getMousePosFromEvent(event);
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
        
    }, [reqState])


    async function getMarking() {
      try {
        console.log("Marking...");
        const response = await FileService.fetchImageMarking();
        console.log("Marking: ", response.data);
        //setNodes(response.data);
        //setReqState(!reqState)
      } catch(e) {
        console.log(e);
      }
    }

    // console.log("In render()");

    return (
        <div>
          <canvas className='canvas' ref={canvasRef} />
        </div>
    );
};

export default ImageMarking;
