<template lang="pug">
  v-container(grid-list-xl)
    v-layout(row, wrap)
      v-flex(xs8, offset-xs2)
        v-card.ma-3.elevation-10(width="595",height="842")
          v-card-text.l-margen(id="pdf-doc") 
            .l-header
              img(src="@/assets/logo-mcpsmh.png")
              h1.l-color.text-xs-center {{muni}}
            h2.l-lice.text-xs-center.py-2 LICENCIA DE FUNCIONAMIENTO N° 
              span.red--text {{nroLic}}
            h4.l-lice-des.text-xs-center PARA ESTABLECIMIENTOS COMERCIALES, INDUSTRIARLES, SERVICIOS Y DE ACTIVIDADES PROFESIONALES
            br
            p.l-lice-con DE CONFORMIDAD CON EL ART. 74 DE LA CONSTITUCION POLITICA DEL PERU, NUMERAL 3.6 DEL ART. 83° DE LA LEY ORGANICA DE MUNICIPALIDADES N° 27972, LEY N° 28976 LEY MARCO DE LICENCIA DE FUNCIONALIDADES, SE OTORGA LA PRESENTE A:
            .grid-parent
              h6 RAZON SOCIAL
                span :
              h6 {{administrado}}
              h6 RUC
                span :
              h6 {{ruc}}
              h6 ESTABLECIMIENTO AUTORIZADO
                span :
              h6 {{giro}}
              h6 GIRO
                span :
              h6 {{giro}}        
              h6 HORARIO
                span :
              h6 8AM A 6PM
              h6 AREA DE EDIFICAION
                span :
              h6 {{area}} MT2
              h6 ZONIFICACION
                span :
              h6 RDB(RESIDENCIAL DE DENSIDAD BAJA)
              h6 UBICACION
                span :
              h6 {{direccion}} {{zona}}
              h6 TIPO DE LICENCIA
                span :
              h6 INDETERMINADA
              h6 EXPEDIENTE ADMINISTRATIVO
                span :
              h6 {{nroExp}}
              h6 RESOLUCION DE GERENCIA
                span :
              h6 {{nroRes}}
            h6.py-3.text-xs-right CERTIFICADO DE DEFENSA CIVIL N° 045-2014 DE FECHA 20/04/2018
            p.l-lice-con "EN EL CASO QUE SE VIOLE LA TRANQUILIDAD DE LOS VECINOS O SE ALTERE EL ORDEN PUBLICO U OTRAS NORMAS MUNICIPALES SERA CAUSAL DE REVOCATORIA LA LICENCIA DE FUNCIONAMIENTO"
            h6.text-xs-right.l-lice-con C.P. SANTA MARIA DE HUACHIPA, 15 DE MAYO DEL 2018
            .img-grid-parent.py-3
              qriously(value="www.munihuachipa.gob.pe",:size="100")
              img.mx-auto(src="@/assets/firma1.png")
              img.mx-auto(src="@/assets/firma2.png")
            p.l-lice-con "LA LICENCIA DE FUNCIONAMIENTO ES PERSONAL E INTRANSFERIBLE, LA LICENCIA DE FUNCIONAMIENTO DEBERA SER EXIBIDA EN UN LUGAR VISIBLE"
        v-fab-transition
          v-btn(color="blue",dark,fixed,bottom,right,fab,@click="downloadFile")
            v-icon file_download
</template>
<script>
import jsPDF from "jsPDF";
import html2canvas from "html2canvas";
export default {
  data: () => ({
    muni: "Municipalidad del Centro Poblado Santa Maria de Huachipa",
    nroLic: "00768",
    administrado: "ECO - RIN S.A.C.",
    ruc: "20144649215",
    direccion: "AV. LAS TORRES MZ. F LT 05",
    zona: "LA CAPITANA",
    giro: "ALMACENAMIENTO Y DEPOSITO DE VEHICULOS DE CARGA PESADA",
    area: "2,811.34",
    nroExp: "1560-2017",
    nroRes: "001-2018-GAT/MCPSMH",
  }),

  methods: {
    downloadFile() {
      let pdfName = "licencia";
      var doc = new jsPDF({
        format: "a4"
      });

      html2canvas(document.getElementById("pdf-doc"), {
        scale: "5"
      }).then(canvas => {
        console.log("Capturando");
        doc.addImage(canvas, "JPEG", 5, 5, 200, 285);
        doc.save(pdfName + ".pdf");
      });
    }
  }
};
</script>
<style lang="scss">
.l-lice {
  font-size: 26px;
  span {
    float: none;
  }
}
.l-lice-des {
  font-size: 12px;
}
.l-lice-con {
  text-align: justify;
  font-style: italic;
  font-size: 10px;
}
.l-header {
  display: grid;
  grid-column-gap: 1em;
  grid-template-columns: 10% 90%;
  h1 {
    letter-spacing: 1px;
    line-height: 1.2;
  }
  img {
    width: 65px;
  }
}
.l-margen {
  border: 16px solid #0d762e;
}
.l-color {
  color: #0d762e;
}
.grid-parent {
  display: grid;
  grid-gap: 0.75em;
  grid-template-columns: 35% 65%;
}
span {
  float: right;
}
.img-grid-parent {
  display: grid;
  grid-template-columns: 20% 40% 40%;
  grid-gap: 1em;
  img {
    width: 150px;
  }
}
</style>


