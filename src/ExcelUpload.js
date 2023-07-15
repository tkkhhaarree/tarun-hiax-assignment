import { useState } from "react";
import styled from "styled-components";
import SortableTable from "./SortableTable";
import { Audio } from "react-loader-spinner";

function ExcelUpload() {
   const [csvFile, setCsvFile] = useState();
   const [csvArray, setCsvArray] = useState([]);
   const [headers, setHeaders] = useState([]);
   const [loader, setLoader] = useState(false);

   const submit = () => {
      const file = csvFile;
      const reader = new FileReader();

      reader.onload = function (e) {
         const text = e.target.result;
         // console.log(text);
         processCSV(text);
      };

      reader.readAsText(file);
   };

   const processCSV = (str, delim = ",") => {
      const updatedStr1 = str.replace(/"/g, "");
      const updatedStr = updatedStr1.replace(/;/g, ",");

      const headers = updatedStr
         .slice(0, updatedStr.indexOf("\n"))
         .split(delim);
      const rows = updatedStr.slice(updatedStr.indexOf("\n") + 1).split("\n");

      const headerconfig = headers.reduce((obj, header, i) => {
         obj[i] = header;
         return obj;
      }, []);

      const newArray = rows.map((row) => {
         const values = row.split(delim);
         const eachObject = headers.reduce((obj, header, i) => {
            obj[header] = values[i];
            return obj;
         }, {});
         return eachObject;
      });

      setHeaders(headerconfig);
      setCsvArray(newArray);
   };

   const headerConfig = headers.map((header, i) => {
      return {
         label: header,
         render: (stock) => stock[header],
         sortValue: (stock) => stock[header],
      };
   });

   return (
      <>
         <Container>
            <Form id="csv-form">
               <MyInput
                  type="file"
                  accept=".csv"
                  id="csvFile"
                  style={{
                     border: "none",
                     height: "100px",
                     background: "#535454",
                     paddingTop: "10px",
                     paddingLeft: "5px",
                     borderRadius: "5px",
                     color: "#fff",
                     cursor: "pointer",
                     transition: "background .2s ease-in-out",
                  }}
                  onChange={(e) => {
                     setCsvFile(e.target.files[0]);
                  }}
               ></MyInput>

               <button
                  style={{
                     marginTop: "10px",
                     padding: "5px",
                     color: "white",
                     background: "#42f575",
                     borderRadius: "5px",
                     border: "1px solid #618c6d",
                  }}
                  onClick={(e) => {
                     e.preventDefault();
                     setLoader(true);
                     setTimeout(() => {
                        setLoader(false);
                        setCsvArray([]);
                        if (csvFile) submit();
                     }, 3000);
                  }}
               >
                  Submit
               </button>
            </Form>

            <div
               style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
               }}
            >
               <Audio
                  height="80"
                  width="80"
                  radius="9"
                  color="green"
                  ariaLabel="three-dots-loading"
                  wrapperStyle
                  wrapperClass
                  visible={loader}
               />
            </div>

            {csvArray.length > 0 && (
               <div style={{ display: "flex", justifyContent: "center" }}>
                  <SortableTable
                     csvArray={csvArray}
                     headerConfig={headerConfig}
                  />
               </div>
            )}
         </Container>
      </>
   );
}

const Container = styled.div`
   grid-area: main;
   position: relative;
   max-width: 100vw;
`;

const MyInput = styled.input`
   &::file-selector-button {
      border: 2px solid #6c5ce7;
      padding: 0.2em 0.4em;
      border-radius: 0.2em;
      background-color: #42f575;
      border-radius: 5px;
      transition: 1s;
   }
`;

const Form = styled.form`
    margin-top: 10px;
   height: 78px;

   align-items: center;
   display: flex;
   flex-direction: column;
   justify-content: center;
   margin-bottom: 30px;
}`;

export default ExcelUpload;
