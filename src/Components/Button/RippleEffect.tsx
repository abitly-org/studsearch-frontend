import * as React from 'react';
import rgba from 'color-rgba';
import { findDOMNode } from 'react-dom';

import './RippleEffect.scss';

function takeXY(event : MouseEvent | TouchEvent) : [number, number] | null {
  if (event instanceof MouseEvent)
    return [event.clientX, event.clientY];
  if (event instanceof TouchEvent) {
    const touch = event.changedTouches[0];
    if (touch === undefined || touch === null)
      return null;
    return [touch.clientX, touch.clientY];
  }
  return null;
}
const pow2 = (a: number) => Math.pow(a, 2);
const nextFrame = (callback: () => void) => {
  if (window.requestAnimationFrame)
      window.requestAnimationFrame(callback);
  else setTimeout(callback, 15);
};

/**
 * Bugs with ej2 classNames update forces me to port my own ripple effect implementation to the React.
 * Ported my own implementation to React/TypeScript, that have been used in a lot of my projects.
 */
class RippleEffect extends React.Component<{
  disabled?: boolean;
  color?: string;
  onClick?: (event: MouseEvent) => void;
  duration?: number;
  fadeOutDuration?: number;
}> {

  constructor(props: any) {
    super(props);
  }

  onDown(element: HTMLElement, event: MouseEvent | TouchEvent) {
    if (this.props.disabled)
      return;
    
    const coordinates = takeXY(event);
    if (coordinates === null)
      return;
    
    const rect = element.getBoundingClientRect();
    const [x, y] = [coordinates[0] - rect.left, coordinates[1] - rect.top];
    const radius = Math.sqrt(
      Math.max(
        pow2(x) + pow2(y),
        pow2(x - rect.width) + pow2(y),
        pow2(x - rect.width) + pow2(y - rect.height),
        pow2(x) + pow2(y - rect.height)
      )
    ) * 1.05;

    const duration = this.props.duration || 120;
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.top = y + "px";
    ripple.style.left = x + "px";
    ripple.style.width = ripple.style.height = '0px';
    ripple.style.transitionDuration = duration + 'ms';
    if (this.props.color)
      ripple.style.backgroundColor = `rgba(${rgba(this.props.color)?.slice(0, 3)}, 0.24)`;
    ripple.setAttribute('data-start', Date.now().toString());
    ripple.addEventListener('click', e => this.props?.onClick?.(e));
    nextFrame(() => {
      ripple.style.top = (y - radius) + 'px';
      ripple.style.left = (x - radius) + 'px';
      ripple.style.width = ripple.style.height = (radius * 2) + 'px';
    });
    
    element.appendChild(ripple);
  }

  onUp(element : HTMLElement) {
    const ripples : NodeListOf<any> = element.querySelectorAll('.ripple');
    if (ripples === null)
      return;

    const duration = this.props.duration || 120;
    for (let i = 0; i < ripples.length; ++i) {
      const ripple = ripples[i];
      if (ripple.style === undefined)
        continue;

      const startTime = parseInt(ripple.attributes['data-start']),
          passedTime = Date.now() - startTime;
      const fadeOut = () => {
        ripple.style.opacity = '0';
        setTimeout(() => {
          if (ripple !== null)
            ripple.remove()
        }, this.props.fadeOutDuration || 120);
      }

      if (passedTime > duration) {
        fadeOut();
      } else {
        setTimeout(fadeOut, duration - passedTime);
      }
    }
  }

  onDownListener: any;
  onUpListener: any;
  componentDidMount() {
    const div = findDOMNode(this);
    if (div === null)
      return;
    // @ts-ignore
    this.onDownListener = this.onDown.bind(this, div);
    div.addEventListener('mousedown',   this.onDownListener);
    div.addEventListener('touchstart',  this.onDownListener, {passive: true});
    
    // @ts-ignore
    this.onUpListener = this.onUp.bind(this, div);
    div.addEventListener('contextmenu',   this.onUpListener);
    window.addEventListener('mouseup',    this.onUpListener);
    window.addEventListener('mouseleave',   this.onUpListener);
    window.addEventListener('touchend',   this.onUpListener);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup',     this.onUpListener);
    window.removeEventListener('mouseleave',  this.onUpListener);
    window.removeEventListener('touchend',    this.onUpListener);
  }
  
  render() {  
    return (
      <span className="ripples">
        { this.props.children }
      </span>
    );
  }
};

export default RippleEffect;