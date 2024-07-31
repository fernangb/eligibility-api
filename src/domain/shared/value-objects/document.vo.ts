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
    const CPF_LENGTH = 11;
    const CNPJ_LENGTH = 14;

    if (this._value.length !== CPF_LENGTH && this._value.length !== CNPJ_LENGTH)
      throw new BadRequestException('Documento inválido');
  }
}
