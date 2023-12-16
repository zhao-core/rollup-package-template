import { IClone } from "./IClone";
import { ICopy } from "./ICopy";

// A 2d rectangle defined by x and y position, width and height.
export class Rect implements IClone<Rect>, ICopy<Rect, Rect> {
  /** @internal */
  _x: number;
  /** @internal */
  _y: number;
  /** @internal */
  _width: number;
  /** @internal */
  _height: number;
  /** @internal */
  _onValueChanged: () => void = null;

  /**
   *  The x coordinate of the rectangle.
   */
  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
    this._onValueChanged && this._onValueChanged();
  }

  /**
   *  The y coordinate of the rectangle.
   */
  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
    this._onValueChanged && this._onValueChanged();
  }

  /**
   * The width of the rectangle, measured from the x position.
   */
  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
    this._onValueChanged && this._onValueChanged();
  }

  /**
   * The height of the rectangle, measured from the y position.
   */
  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
    this._onValueChanged && this._onValueChanged();
  }

  /**
   * Constructor of Rect.
   * @param x - The x coordinate of the rectangle, default 0
   * @param y - The y coordinate of the rectangle, default 0
   * @param width - The width of the rectangle, measured from the x position, default 0
   * @param height - The height of the rectangle, measured from the y position, default 0
   */
  constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
  }

  /**
   * Set the value of this rectangle.
   * @param x - The x coordinate of the rectangle
   * @param y - The y coordinate of the rectangle
   * @param width - The width of the rectangle, measured from the x position
   * @param height - The height of the rectangle, measured from the y position
   * @returns This rectangle
   */
  set(x: number, y: number, width: number, height: number): Rect {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._onValueChanged && this._onValueChanged();
    return this;
  }

  /**
   * Creates a clone of this rect.
   * @returns A clone of this rect
   */
  clone(): Rect {
    return new Rect(this.x, this.y, this.width, this.height);
  }

  /**
   * Copy this rect from the specified rect.
   * @param source - The specified rect
   * @returns This rect
   */
  copyFrom(source: Rect): Rect {
    this._x = source.x;
    this._y = source.y;
    this._width = source.width;
    this._height = source.height;
    this._onValueChanged && this._onValueChanged();
    return this;
  }
}
