//The path animation code is an adaptation I (Matheus Demetrio) did from  Nick McMillan's CodePen https://codepen.io/hey-nick/pen/KVWvJv

import React, { Component } from 'react'

const randomRange = function (min, max) {
    return ~~(Math.random() * (max - min + 1)) + min
};

export default class SineWave extends Component {
    constructor(props) {
        super(props);
        this.svgRef = React.createRef();
        this.divRef = React.createRef();
    }

    createPathString = (path) => {

        var completedPath = '',
            comma = ',',
            ampl = 50; // pixel range from 0, aka how deeply they bend

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

    };

    createLines = () => {
        while (this.svgRef.current.firstChild) {
            this.svgRef.current.removeChild(this.svgRef.current.firstChild);
        }

        const lineDataArr = [];
        const numberOfLines = 3;
        const minSpeed = 25;
        const maxSpeed = 100;

        let newPathEl1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let newPathEl2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let newPathEl3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        // create an arr which contains objects for all lines
        // createPathString() will use this array
        const currentWidth = this.divRef.current.clientWidth || 0;
        const currentHeigth = this.divRef.current.clientHeight || 0;

        for (var i = 0; i < numberOfLines; i++) {

            var lineDataObj = {
                counter: randomRange(1, 1000), // a broad counter range ensures lines start at different cycles (will look more random)
                startX: randomRange(-5, -40),
                startY: randomRange((currentHeigth / 2) - 20, (currentHeigth / 2) + 20),
                endX: randomRange(currentWidth, currentWidth + 20), // viewbox = 200
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
            newPathEl1.setAttribute('d', this.createPathString(lineDataArr[0]));
            newPathEl2.setAttribute('d', this.createPathString(lineDataArr[1]));
            newPathEl3.setAttribute('d', this.createPathString(lineDataArr[2]));
            requestAnimationFrame(animLoop);
        }

        //Add transition to ease path appearing in case of resize
        newPathEl1.setAttribute("style", "transition: opacity .20s ease-in-out; - moz - transition: opacity .20s ease -in -out; -webkit - transition: opacity .20s ease -in -out; ");
        newPathEl2.setAttribute("style", "transition: opacity .50s ease-in-out; - moz - transition: opacity .50s ease -in -out; -webkit - transition: opacity .50s ease -in -out; ");
        newPathEl3.setAttribute("style", "transition: opacity .90s ease-in-out; - moz - transition: opacity .90s ease -in -out; -webkit - transition: opacity .90s ease -in -out; ");

        newPathEl1.setAttribute('stroke', "#7d65ef");
        newPathEl1.setAttribute('stroke-width', "2");
        newPathEl1.setAttribute('opacity', "0");

        newPathEl2.setAttribute('stroke', "#9274ee");
        newPathEl2.setAttribute('stroke-width', "2");
        newPathEl2.setAttribute('opacity', "0");

        newPathEl3.setAttribute('stroke', "#ddd");
        newPathEl3.setAttribute('stroke-width', "1");
        newPathEl3.setAttribute('opacity', "0");


        this.svgRef.current.appendChild(newPathEl1);
        this.svgRef.current.appendChild(newPathEl2);
        this.svgRef.current.appendChild(newPathEl3);

        //set opacity
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
