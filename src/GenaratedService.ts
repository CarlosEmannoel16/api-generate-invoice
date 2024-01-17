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
    pageOrientation: any;
    content: any[];
  };

  constructor() {
    this.docDefinition = {
      content: [],
      pageOrientation: "landscape",
    };

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  async generateBooklet(params: GeneratedBookletParams) {
    this.docDefinition = {
    pageOrientation: 'landscape',
    content:[
          { text: "Carnê de Pagamento", fontSize: 18, bold: true, alignment: 'center' },
          { text: "Telefone para contato", fontSize: 12, alignment: 'center', margin:[0,0,0,10] },
              {
              
                table: {
                    widths: [100,100,150,130,100,140],
                    headerRows: 1,
                    body: [
                        [
                           {text: 'Parcela \n 1', alignment: 'center', style: 'tableHeader'},
                           {text: 'Vencimento \n 21/02/2023', alignment: 'center', style: 'tableHeader' }, 
                           {text: 'Local de Pagamento', alignment: 'center',style: 'tableHeader', colSpan:3},
                           '', 
                           '',
                           {text: 'Vencimento \n 21/02/2023', alignment: 'center', style: 'tableHeader' }, 
                             
                           
                       ],
                       [
                           {text: '(=) Valor do documento \n R$ 123,00', alignment: 'center', colSpan:2, style: 'tableHeader'},
                           {}, 
                           {text: 'Cedente', alignment: 'center', colSpan:3, style: 'tableHeader'},
                           '', 
                           '',
                           {text: 'Valor do documento \n R$ 134,90', alignment: 'center',  style: 'tableHeader' }, 
                             
                           
                       ],
                          [
                           {text: '(-) Desconto', alignment: 'center', colSpan:2, style: 'tableHeader'},
                           {}, 
                           {text: 'Data do documento \n 01/01/2021', alignment: 'center', style: 'tableHeader'},
                           {text: 'Número do documento \n 3928736', alignment: 'center', colSpan:2,style: 'tableHeader'},
                           '',
                           {text: '(-) Desconto', alignment: 'center',  style: 'tableHeader' }, 
                             
                           
                       ],
                    ]
                },
            
               
            },
    
        ]
    
  }

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
