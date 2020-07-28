class GetDataDB {
  private cadena: string = '';
  private finalCadena: number = 0;
  private result: string = '';

  public init(query: object[], finalString: number, inicioString: number) {
    this.cadena = JSON.stringify(query);
    this.finalCadena = this.cadena.length - finalString;
    this.result = this.cadena.substring(inicioString, this.finalCadena);

    return this.result;
  }
}

export const getDataDB = new GetDataDB();
