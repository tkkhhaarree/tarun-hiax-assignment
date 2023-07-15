import { useState } from "react";

function useSort(data, config) {
   const [sortOrder, setSortOrder] = useState(null);
   const [sortBy, setSortby] = useState(null);

   const setSortColumn = (label) => {
      if (sortBy && label !== sortBy) {
         setSortOrder("asc");
         setSortby(label);
         return;
      }

      if (sortOrder === null) {
         setSortOrder("asc");
         setSortby(label);
      } else if (sortOrder === "asc") {
         setSortOrder("desc");
         setSortby(label);
      } else if (sortOrder === "desc") {
         setSortOrder(null);
         setSortby(null);
      }
   };

   let sortedData = data;
   if (sortOrder && sortBy) {
      const { sortValue } = config.find((column) => column.label === sortBy);
      sortedData = [...data].sort((a, b) => {
         const valueA = sortValue(a);
         const valueB = sortValue(b);

         const reverseOrder = sortOrder === "asc" ? 1 : -1;

         if (typeof valueA === "string") {
            return valueA.localeCompare(valueB) * reverseOrder;
         } else {
            return (valueA - valueB) * reverseOrder;
         }
      });
   }

   return { sortOrder, sortBy, setSortColumn, sortedData };
}

export default useSort;
