// import {
//     MaterialReactTable,
//     MaterialReactTableProps,
//     useMaterialReactTable
// } from 'material-react-table';
// import { useTableStyles } from './styles';
// import { ExampleToolbar } from './Toolbar/ExampleToolbar';
// import { getTableConfig } from './table-config';

// const MaterialTable = ({
//     columns = [],
//     data = [],
//     isLoading = false
// }: MaterialReactTableProps<any> & { isLoading: boolean }) => {
//     const customTableStyles = useTableStyles();
//     const tableConfig = getTableConfig(customTableStyles, isLoading);

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const table = useMaterialReactTable({
//         ...tableConfig,
//         columns,
//         state: { isLoading },
//         data: data || [],
//         muiTablePaperProps: {
//             elevation: 0,
//             sx: {
//                 backgroundColor: 'background.paper', // uses theme.palette.background.paper
//                 borderRadius: 2 // or theme.shape.borderRadius
//             }
//         },
//         muiTableBodyCellProps: {
//             sx: {
//                 backgroundColor: 'background.default', // for body cells
//                 color: 'text.primary'
//             }
//         },
//         muiTableHeadCellProps: {
//             sx: {
//                 backgroundColor: 'background.paper', // for header cells
//                 color: 'text.primary'
//             }
//         },
//         muiTableContainerProps: {
//             sx: {
//                 backgroundColor: 'background.default'
//             }
//         },
//         muiFilterTextFieldProps: {
//             sx: {
//                 backgroundColor: 'background.paper'
//             }
//         }
//     });

//     table.options.renderTopToolbar = (
//         <ExampleToolbar
//             table={table}
//             toolbarStyle={customTableStyles.toolbarStyle}
//         />
//     );

//     return (
//         <>
//             <MaterialReactTable table={table} />
//         </>
//     );
// };

// export default MaterialTable;
