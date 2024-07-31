import { BadRequestException } from '@nestjs/common';

export class DocumentVO {
  private _value: string;

  constructor(value: string) {
    this._value = value;

    this.validate();
  }

  get value() {
    return this._value;
  }

  private validate() {
    if (!this._value || !this.validateRegex())
      throw new BadRequestException('Documento inválido');
  }

  private validateRegex() {
    const regex = /^(\d{11}|\d{14})$/;
    return regex.test(this._value);
  }
}
