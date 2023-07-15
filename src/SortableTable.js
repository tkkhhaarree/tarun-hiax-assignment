import Table from "./Table";
import useSort from "./hooks/use-Sort";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import styled from "styled-components";

function SortableTable(props) {
   const { csvArray, headerConfig } = props;

   const { sortOrder, sortBy, setSortColumn, sortedData } = useSort(
      csvArray,
      headerConfig
   );

   const updatedConfig = headerConfig.map((column) => {
      if (!column.sortValue) {
         return column;
      }
      return {
         ...column,
         header: () => (
            <th onClick={() => setSortColumn(column.label)}>
               <IconBox>
                  {column.label}
                  {getIcons(column.label, sortBy, sortOrder)}
               </IconBox>
            </th>
         ),
      };
   });

   return <Table {...props} csvArray={sortedData} config={updatedConfig} />;
}

function getIcons(label, sortBy, sortOrder) {
   if (label !== sortBy) {
      return (
         <div>
            <AiOutlineArrowUp />
            <AiOutlineArrowDown />
         </div>
      );
   }
   if (sortOrder === null) {
      return (
         <div>
            <AiOutlineArrowUp />
            <AiOutlineArrowDown />
         </div>
      );
   } else if (sortOrder === "asc") {
      return (
         <div>
            <AiOutlineArrowUp />
         </div>
      );
   } else if (sortOrder === "desc") {
      return (
         <div>
            <AiOutlineArrowDown />
         </div>
      );
   }
}

const IconBox = styled.div`
   display: flex;
   justify-content: space-between;
`;

export default SortableTable;
