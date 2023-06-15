import React, { useEffect } from "react"

function LineCanvas(props): JSX.Element {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)

    useEffect(() => {

        if (props.linePoints.length !== 2) {
            return;
        }
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')

        if (!context) {
            return;
        }

        context.fillStyle = 'transparent'
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)

        context.beginPath()
        context.moveTo(props.linePoints[0].x, props.linePoints[0].y)
        context.lineTo(props.linePoints[1].x, props.linePoints[1].y)
        context.lineWidth = 10 
        context.strokeStyle = 'red'
        context.stroke()
    }, [props.linePoints])

    return <canvas ref={canvasRef} className="winning-line" {...props} />
}

export default LineCanvas