import React from 'react';
import logo from '@/assets/logo.png';

const logoBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAQAAAD1i8v/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAHdElNRQfoBhYXLQ2j43+EAAAIyUlEQVR42u3d249lVRUH8G96t1VQUqFtdGlrFcFbVAwhgoHgxYuJiQf/A35hiBdPREPRg4lHjDixGPEGxSOGhQejeLBgJEoU43FRsQh1pQsptKqttKXt7enw+fHhtLszu+fMOXfn3JOSz22eO3fmnLOzZ2d29t5zY2GJRQK0Ech+sREgE6vVdDweB7IQuh4MBv3+/v7l5eVlPZ732tnZ+fDw8MJqtT6wO03T+Xw+53B3dzeo12/48OFC5m3bVp1Op1fPz89Vp/O60d5bW1u/urpaVafzrtHeOzw8/Nra2oZbf1qtfufk5JRz2draus/n80X+vX6/r89z0Gq1yjn5+fmHh4cX3vL9/f3B/y7n8/l8Pj/o9/vBYNBPJBJxV//+oO+lUqmrq6urq6vNZvOLi4s3Nze/ubn5/Pz809PTj4+Pn5+f73Q6S5lOp71eV//1eDxOp3NJJBLNZvPLy8s7Ozvf3Ny8vr7+8fHx8fHxbrd7Y3/u7u5OJBJxtnJ/r8fn/X5fJBLh/N7f6XSKwHh3d3d5+fnRaPTU1NTk5OTU1NTk5OQEf/y9gYGBwcHB4eHhTU1Nzc3Nzc/Pb25uDgwMbG5ubmpqam5u7unp6cfHx3t7e4fDIY/HA8P5h3x3d3d3d7fRaLS3t3d2djYajZ6enp6bm5ufn5+fnx8IBAI43j8ajV6/vz8YDA4ODjYajY2NjcHBwclkcmNjY2NjY2tra/Pz852dnUFBQI/H0+l0gUBAR5M6nU4gENDpdIzT7Xabzaatra2trY2NjY1NTU1NTU1OTg4EAoFAIKDT6RwOh8vl8vl8JpNpNBpdXV3d3Nz0+/29vb2Dw8PhcFg/Pj4eDAbVavWOjo6urq5qtdrAwMDy8vLDw8OdnZ2dnZ0dHR2dnZ17e3tHR0cPDw+rq6v9/f29vb2Dg4MDgwO9vb1dXV0dHR2dnZ0NDAy8vLwMDQ3Nzc3t7u5mZGT09vZOTU2tra0tLy9vbW0tLS0tLS0NDAxMTExMTExMTExcXFzG0NXV1dXV1dLS0tDQwMDAwMDAQFNTU0dHR0dXV1dHR0dDQwMDAwMDAQFNTU0dHR0dHR0NDw8LCwsLCwsLCwsLCwtra2sLCwsLCwsLCwsLCwsvLy9ra2svLy8vLy8vLy9bW1svLy8vLy9bW1svLy9bW1vHx8cHBwcHBwcHBwcHBwcfHx8fHx8fHx8fHx8fHx8vLy6urq6urq8vLy8vLy8fHx8fHx8vLy6urq8vLy6urq6urq6urq6urq6urq8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8-B82J6s/AAAAASUVORK5CYII=';

const Preloader: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
    return (
        <div className={`fixed inset-0 bg-brand-black z-[100] flex flex-col items-center justify-center text-white transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <img src={logo} alt="VGotYou Logo" className="h-20 w-20 object-contain animate-pulse mb-4" />
            <h1 className="text-4xl font-cambria">VGot You</h1>
            <p className="text-lg text-zinc-400 mt-2">Crafting Code & Creative Identities</p>
        </div>
    );
};

export default Preloader;
