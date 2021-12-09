const nextFrame = (callback: FrameRequestCallback) => {
  if (window?.requestAnimationFrame)
    window?.requestAnimationFrame?.(callback);
  else
    setTimeout(callback, 16); // 16ms ~= 60fps
}
export default nextFrame;