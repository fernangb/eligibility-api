import { DocumentVO } from './document.vo';

describe('Document Value Object', () => {
  it('should throw error if document is empty', () => {
    const value = undefined;

    expect(() => {
      new DocumentVO(value);
    }).toThrow('Documento inválido');
  });

  it('should throw error if document has wrong length', () => {
    const value = '12345';

    expect(() => {
      new DocumentVO(value);
    }).toThrow('Documento inválido');
  });

  it('should throw error if document has alphanumeric characters', () => {
    const value = '123456789aa';

    expect(() => {
      new DocumentVO(value);
    }).toThrow('Documento inválido');
  });

  it('should create a valid CPF document', () => {
    const value = '12345678900';

    expect(new DocumentVO(value).value).toEqual(value);
  });

  it('should create a valid CNPJ document', () => {
    const value = '12345678900123';

    expect(new DocumentVO(value).value).toEqual(value);
  });
});
