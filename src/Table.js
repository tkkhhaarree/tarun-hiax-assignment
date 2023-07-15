import styled from "styled-components";
import { Fragment } from "react";

function Table({ csvArray, config }) {
   const renderedHeaders = config.map((column) => {
      if (column.header) {
         return <Fragment key={column.label}>{column.header()}</Fragment>;
      }
      return <th key={column.label}>{column.label}</th>;
   });

   const renderedRows = csvArray.map((row) => {
      const renderedCells = config.map((column) => {
         return <td key={column.label}>{column.render(row)}</td>;
      });
      return <tr key={row.name}>{renderedCells}</tr>;
   });
   return (
      <div>
         <TableContaier style={{ height: "500px", width: "800px" }}>
            {csvArray.length > 0 ? (
               <>
                  <div
                     style={{
                        maxWidth: "fit-content",
                        maxHeight: "fit-content",
                     }}
                  >
                     <TableItems
                        style={{
                           overflowX: "scroll",
                           overflowY: "scroll",
                           height: "500px",
                        }}
                     >
                        <table
                           style={{
                              minWidth: "max-content",
                              borderCollapse: "separate",
                           }}
                        >
                           <TableHeader style={{}}>
                              <tr>{renderedHeaders}</tr>
                           </TableHeader>

                           <Body>{renderedRows}</Body>
                        </table>
                     </TableItems>
                  </div>
               </>
            ) : null}
         </TableContaier>
      </div>
   );
}

const TableContaier = styled.div`
   max-width: 100%;
   table {
      box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.75);
      padding: 4px;
      border-collapse: collapse;
   }
`;

const TableItems = styled.div`
   &::-webkit-scrollbar {
      width: 0.5em;
      height: 0.5em;
   }

   &::-webkit-scrollbar-thumb {
      background-color: #b791db;
      border-radius: 3px;

      &:hover {
         background: #c4b2d6;
      }
   }
`;

const TableHeader = styled.thead`
   font-size: 14px;
   background-color: #28ad5e;
   color: #fff;
   position: sticky;
   top: 0px;
   height: 25px;
   th {
      width: auto;
      line-height: 1;
   }
`;

const Body = styled.tbody`
   td {
      width: auto;

      line-height: 1;
   }
   tr {
      border-bottom: 1pt solid #c9c6c5;
   }
`;

export default Table;
