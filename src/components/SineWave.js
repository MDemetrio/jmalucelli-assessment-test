//This code is based on this Nick McMillan's CodePen https://codepen.io/hey-nick/pen/KVWvJv to animate a svg sine wave
//It was coded imperatively and manipulate DOM directly, not using react features like state and virtual dom  
//This is because it does not provide much value to this webapp objetive at the moment, but it could be refactored to a better, react compliant component. 

import React, { Component } from 'react'

const randomRange = function (min, max) {
    return ~~(Math.random() * (max - min + 1)) + min
};

const createPathString = function (path) {

    var completedPath = '',
        comma = ',',
        ampl = 25; // pixel range from 0, aka how deeply they bend

    var current = {
        x: ampl * Math.sin(path.counter / path.sin),
        y: ampl * Math.cos(path.counter / path.cos)
    };

    var newPathSection = 'M' +
        // starting point
        path.startX +
        comma +
        path.startY +
        // quadratic control point
        ' Q' +
        path.pointX +
        comma +
        (current.y * 1.5).toFixed(3) + // 1.5 to amp up the bend a little
        // center point intersection
        ' ' +
        ((current.x) / 10 + path.centerX).toFixed(3) +
        comma +
        ((current.y) / 5 + path.centerY).toFixed(3) +
        // end point with quadratic reflection (T) (so the bottom right mirrors the top left)
        ' T' +
        path.endX +
        comma +
        path.endY;
    path.counter++;

    completedPath += newPathSection;


    return completedPath;
}

export default class SineWave extends Component {
    constructor(props) {
        super(props);
        this.svgRef = React.createRef();
        this.divRef = React.createRef();
    }

    createLines = () => {
        const currentSvg = this.svgRef.current;
        const currentDiv = this.divRef.current;

        //remove lines in case the window is resized, so they can be created again based on new size
        while (this.svgRef && currentSvg && currentSvg.firstChild) {
            currentSvg.removeChild(currentSvg.firstChild);
        }

        const lineDataArr = [];
        const numberOfLines = 3;
        const minSpeed = 25;
        const maxSpeed = 100;

        let newPathEl1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let newPathEl2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let newPathEl3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        const currentWidth = (currentDiv && currentDiv.clientWidth) || 0;
        const currentHeigth = (currentDiv && currentDiv.clientHeight) || 0;

        // create an arr which contains objects for all lines
        // createPathString() will use this array
        for (var i = 0; i < numberOfLines; i++) {

            var lineDataObj = {
                counter: randomRange(1, 1000), // a broad counter range ensures lines start at different cycles (will look more random)
                startX: randomRange(-5, -40),
                startY: randomRange((currentHeigth / 2) - 20, (currentHeigth / 2) + 20),
                endX: randomRange(currentWidth, currentWidth + 20),
                endY: randomRange((currentHeigth / 2) - 20, (currentHeigth / 2) + 20),
                sin: randomRange(minSpeed, maxSpeed),
                cos: randomRange(minSpeed, maxSpeed),
                pointX: randomRange(30, 55),
                centerX: randomRange((currentWidth / 2) - 20, (currentWidth / 2) + 20),
                centerY: randomRange((currentHeigth / 2) - 20, (currentHeigth / 2) + 20)
            }

            lineDataArr.push(lineDataObj)
        }

        const animLoop = () => {
            newPathEl1.setAttribute('d', createPathString(lineDataArr[0]));
            newPathEl2.setAttribute('d', createPathString(lineDataArr[1]));
            newPathEl3.setAttribute('d', createPathString(lineDataArr[2]));
            requestAnimationFrame(animLoop);
        }

        //The transition smooths path appearing in case of resize

        newPathEl1.setAttribute('stroke', "#7d65ef");
        newPathEl1.setAttribute('stroke-width', "2");
        newPathEl1.setAttribute('opacity', "0");
        newPathEl1.setAttribute("style", "transition: opacity .20s ease-in-out; - moz - transition: opacity .20s ease -in -out; -webkit - transition: opacity .20s ease -in -out; ");

        newPathEl2.setAttribute('stroke', "#9274ee");
        newPathEl2.setAttribute('stroke-width', "2");
        newPathEl2.setAttribute('opacity', "0");
        newPathEl2.setAttribute("style", "transition: opacity .50s ease-in-out; - moz - transition: opacity .50s ease -in -out; -webkit - transition: opacity .50s ease -in -out; ");

        newPathEl3.setAttribute('stroke', "#ddd");
        newPathEl3.setAttribute('stroke-width', "1");
        newPathEl3.setAttribute('opacity', "0");
        newPathEl3.setAttribute("style", "transition: opacity .90s ease-in-out; - moz - transition: opacity .90s ease -in -out; -webkit - transition: opacity .90s ease -in -out; ");


        currentSvg && currentSvg.appendChild(newPathEl1);
        currentSvg && currentSvg.appendChild(newPathEl2);
        currentSvg && currentSvg.appendChild(newPathEl3);

        //set opacity after appending, so it don't glitch visually in case of resize
        setTimeout(() => {
            newPathEl1.setAttribute('opacity', "1");
            newPathEl2.setAttribute('opacity', "1");
            newPathEl3.setAttribute('opacity', "1");
        }, 500);

        // once the path elements are created, start the animation loop
        animLoop();
    };

    componentDidMount = () => {
        this.createLines();
        window.addEventListener("resize", this.createLines);
    }

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions);
    }



    render() {
        return (
            //height and width set on both div and svg as a workaround to firefox behaving differently from other browsers
            <div ref={this.divRef} style={{ height: '32vh', width: '100vw', overflow: 'hidden', position: 'absolute', top: 0, left: 0 }} aria-hidden={true}>
                <svg style={{ height: '32vh', width: '100vw' }}
                    fill='none'
                    vectorEffect='non-scaling-stroke'
                    ref={this.svgRef}
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg">

                </svg>
            </div>
        )
    }
}
