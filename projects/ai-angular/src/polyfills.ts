export function hasOwnProp(a: {}, b: PropertyKey): boolean {
  return Object.prototype.hasOwnProperty.call(a, b);
}
