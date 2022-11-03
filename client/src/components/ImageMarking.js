import React, { useEffect, useRef, useState } from "react";
import {observer} from 'mobx-react-lite';

import {updateFile} from "../actions/filesActions.js";
import filesStore from "../store/filesStore.js";
import defaultMarkings from "./adds/markingsDefault.json";

const ImageMarking = (props) => {

    const [resized, setResized] = useState(false);
    const file = filesStore.getFileById(props.imageId);
    const canvasWrapperRef = useRef(null);
    const canvasRef = useRef(null);
    const radius = 5;
    const nodes = [];
    let dragNode, dragPoint, imageSize;

    window.addEventListener('resize', () => {
        setResized(!resized)
        if (canvasWrapperRef) {
            canvasWrapperRef.current.style.width = ''; 
            canvasWrapperRef.current.style.height = ''; 
        }
    })

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const image = new Image();
        const path = process.env.REACT_APP_FILE_DIRECTORY+`/${file.user}/${file.name}`;
        image.src = path;

        if (file.markings.length > 0) {
            file.markings.forEach(f => nodes.push({x: f.x, y: f.y}));
        } else {
            defaultMarkings.forEach(f => nodes.push({x: f.x, y: f.y}));
        }
        const links = [
            [0, 1], [1, 2], [2, 3], [3, 4],
            [0, 5], [5, 6], [6, 7], [7, 8],
            [0, 9], [9, 10], [10, 11], [11, 12], 
            [0, 13], [13, 14], [14, 15], [15, 16],
            [0, 17], [17, 18], [18, 19], [19, 20],
            [5, 9], [9, 13], [13, 17],
        ];

        image.onload = () => {
            imageSize = resizeImageBlock(image, canvasWrapperRef.current);

            nodes.forEach((node) => {
                node.x *= imageSize.width;
                node.y *= imageSize.height;
            });
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
    }, [resized]); //nodes

    async function updateMarkings() {
        const resultNodes = nodes.map((node) => {
            const newNode = {
                x: node.x / imageSize.width,
                y: node.y / imageSize.height,
            };
            return newNode;
        });
        const response = await updateFile(file.id, {markings: resultNodes});
    }

    //proportional resize canvas(and might wrapper) depending on wrapper sizes set by css
    function resizeImageBlock(image, imageWrapper) {
        const wrapperWidth = imageWrapper.clientWidth;
        const wrapperHeight = imageWrapper.clientHeight;
        const containerW = document.getElementsByClassName("container")[0].clientWidth;

        if (image.naturalWidth > wrapperWidth) {
            const newHeight = image.naturalHeight * (wrapperWidth / image.naturalWidth);
            if (newHeight < wrapperHeight) {
                imageWrapper.style.height = newHeight + 5 + 'px'; //scroll issues
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
            <div className="editor-block editor__left-block">
                <h3 className="editor-block__title">{file.name}</h3>
                <button onClick={updateMarkings} className="btn editor__btn btn_blue">
                    Зберегти розмітку
                </button>
            </div>
        </div>
    );
};

export default observer(ImageMarking);
