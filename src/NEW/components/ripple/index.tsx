import * as React from 'react';
import nextFrame from '../../utils/nextFrame';
import './index.scss';

export enum RippleColor {
  white = 'rgba(255, 255, 255, 0.24)',
  primary50 = 'rgba(249, 244, 239, 0.25)',
  primary100 = 'rgba(245, 157, 51, 0.12)'
}

const DURATION = 250;
const FADE_OUT_DURATION = 300;

class Ripples extends React.Component<{
  color?: RippleColor,
  disabled?: boolean,

  duration?: number,
  fadeOutDuration?: number
}> {
  container = React.createRef<HTMLDivElement>();

  onDown(e: MouseEvent | TouchEvent) {
    if (this.props.disabled)
      return;
      
    const div = this.container.current;
    if (!div)
      return;

    const xy = this.takeXY(e);
    if (!xy)
      return;

    const rect = div.getBoundingClientRect();
    const [x, y] = [xy[0] - rect.left, xy[1] - rect.top];
    const radius = Math.sqrt(
      Math.max(
        Math.pow(x, 2)              + Math.pow(y, 2),
        Math.pow(x - rect.width, 2) + Math.pow(y, 2),
        Math.pow(x - rect.width, 2) + Math.pow(y - rect.height, 2),
        Math.pow(x, 2)              + Math.pow(y - rect.height, 2)
      )
    ) * 1.05;

    const duration = this.props.duration ?? DURATION;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.top = y + "px";
    ripple.style.left = x + "px";
    ripple.style.width = ripple.style.height = '0px';
    ripple.style.transitionDuration = duration + 'ms';
    if (this.props.color)
      ripple.style.backgroundColor = this.props.color;
    ripple.setAttribute('data-start', Date.now().toString());

    nextFrame(() => {
      ripple.style.top = (y - radius) + 'px';
      ripple.style.left = (x - radius) + 'px';
      ripple.style.width = ripple.style.height = (radius * 2) + 'px';
    });

    div.appendChild(ripple);
  }

  onUp() {
    const div = this.container.current;
    const ripples = div?.querySelectorAll?.('span.ripple') as NodeListOf<HTMLSpanElement>;
    if (!ripples)
      return;

    const duration = this.props.duration ?? DURATION;
    for (let i = 0; i < ripples?.length; ++i) {
      const ripple = ripples?.[i];
      if (!ripple)
        continue;

      const startTime = parseInt(ripple?.getAttribute?.('date-start') ?? '0'),
            passedTime = Date.now() - startTime;

      if (passedTime > duration)
        this.fadeOut(ripple);
      else
        setTimeout(() => this.fadeOut(ripple), duration - passedTime);
    }
  }

  fadeOut(ripple: HTMLSpanElement) {
    ripple.style.opacity = '0';
    setTimeout(
      () => ripple?.remove?.(),
      this.props.fadeOutDuration ?? FADE_OUT_DURATION
    );
  }

  onDownListener: any;
  onUpListener: any;
  componentDidMount() {
    const div = this.container.current;
    if (div === null)
      return; // wtf?

    this.onDownListener = this.onDown.bind(this);
    div.addEventListener('mousedown',   this.onDownListener);
    div.addEventListener('touchstart',  this.onDownListener, { passive: true });
    
    this.onUpListener = this.onUp.bind(this);
    div.addEventListener('contextmenu',   this.onUpListener);
    window.addEventListener('mouseup',    this.onUpListener);
    window.addEventListener('mouseleave', this.onUpListener);
    window.addEventListener('touchend',   this.onUpListener);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup',     this.onUpListener);
    window.removeEventListener('mouseleave',  this.onUpListener);
    window.removeEventListener('touchend',    this.onUpListener);
  }

  render() {
    return <div className='AppRipples' ref={this.container} />
  }

  private takeXY(event : MouseEvent | TouchEvent) : [number, number] | null {
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
}

export default Ripples;