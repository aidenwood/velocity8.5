/* eslint-disable */

// Note! this function is gets treated as a string.
export function spCode()  {
  
  // for mobile we keep iterations very low for improved performance
  setMaxIterations(1);
  backgroundColor(160,0,255);
  let scroll = input();
  let t = time *.1+scroll;

  let n = noise(vec3(0, 0, -1*t) + noise(getRayDirection() *1 + t))
  displace(n*.2);
  let n2 = noise( getRayDirection()*10000 +time);
  let col = vec3(nsin(n*2) + ncos(n*10)) + n2*.2;
  
  color(col)
  metal(n)
  shine(n)
  
  sphere(0.5+length(col)*.01);

};