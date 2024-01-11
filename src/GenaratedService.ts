import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import fs from "fs";
export type GeneratedBookletParams = {
  title: string;
  nameCustomer: string;
  descriptionProduct: string;
  priceProduct: number;
  numberOfInstallments: number;
  installmentValue: number;
  dateOfPurchase: Date;
  id: string;
};

export class GeneratedBookletService {
  private docDefinition: {
    content: any[];
  };

  constructor() {
    this.docDefinition = {
      content: [],
    };

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  async generateBooklet(params: GeneratedBookletParams) {
    this.docDefinition.content = [
        { text: "Carne de Pagamento", fontSize: 18, bold: true, alignment: 'center' },
        { text: "Telefone para contato", fontSize: 12, alignment: 'center', margin:[0,0,0,10] },
            {
              style: 'tableExample',
          
              table: {
                 widths: [50, 100, 150, 150],
                  headerRows: 1,
                  body: [
                      [
                          [
                              {text: 'Parcela', alignment: 'center', border: [true]}, 
                              {text: '1', alignment: 'center', bold: true}
                         ],
              
      
                         [
                             {text: 'Vencimento', alignment: 'center', border: [true] }, 
                             {text: '01/02/2023', alignment: 'center', bold: true}
                         ], 
                         
                         [ {text: 'Local de Pagamento', alignment: 'center', border: [true]}],
                         [
                             {text: 'Vencimento', alignment: 'center', border: [true] }, 
                             {text: '01/02/2023', alignment: 'center', bold: true}
                         ],
                         
                         
                    ],
                    
                        [
                       {
                           colSpan: 2,
                           text: 'Valor do documento \n R$ 3.345,90',
                           alignment: 'center'
                       },
                        {
                           
                        },
                        [{text: 'Cedente', alignment: 'center', border: [true] }],
                         [
                              {text: '(=) Valor do documento', alignment: 'center', border: [true] }, 
                             {text: '01/02/2023', alignment: 'center', bold: true}
                         ],
                         
                         
                    ],
                      
                  ]
              },
          
                  layout: {
                  hLineWidth: function (i, node) {
                      if(i==0) return 2
                      return 1
                  },
                  vLineWidth: function (i, node) {
                      return 1
                  },
                  hLineColor: function (i, node) {
                      return 'black';
                  },
                  vLineColor: function (i, node) {
                      return 'black';
                  },
                  hLineStyle: function (i, node) {
                      if (i === 0 || i === node.table.body.length) {
                          return null;
                      }
                      
                      return {dash: {length: 10, space: 1}};
                  },
                  vLineStyle: function (i, node) {
                      if (i === 0 || i === node.table.widths.length) {
                          return null;
                      }
                      return {dash: {length: 4}};
                  },
                  paddingLeft: function(i, node) { return 0; },
                  // paddingRight: function(i, node) { return 4; },
                  paddingTop: function(i, node) { return 0; },
                  // paddingBottom: function(i, node) { return 2; },
                  // fillColor: function (i, node) { return null; }
              }
          },
  
      ]

    const pdfData = pdfMake.createPdf(this.docDefinition);

    return new Promise((resolve, reject) => {
      pdfData.getBuffer((buffer: any) => {
        fs.writeFile("teste.pdf", buffer, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      });
    });
  }
}

const a = new GeneratedBookletService();
a.generateBooklet({
  title: "Título",
  nameCustomer: "Nome do Cliente",
  descriptionProduct: "Descrição do Produto",
  priceProduct: 100,
  numberOfInstallments: 10,
  installmentValue: 10,
  dateOfPurchase: new Date(),
  id: "123",
})
  .then(() => {})
  .catch(() => {
    console.log("error");
  });
