import React from "react"
import { useTable, usePagination, useRowSelect, useFilters } from "react-table"
import { Link, useLocation } from "react-router-dom"
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronDoubleRightIcon,
  ChevronRightIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline"

import Checkbox from "../Checkbox"
import { DefaultColumnFilter } from "../../utils/table"

// Create a default prop getter
const defaultPropGetter = () => ({})

const Table = ({
  columns,
  data,
  getRowProps = defaultPropGetter,
}) => {
  const location = useLocation()
  // Get the path for the correct detail page
  const getDetailBasePath = () => {
    // Clicked from Incoming List View page
    if (location.pathname.includes('/shipping/list/')) {
      return '/shipping/detail/'
    } else if (location.pathname.includes('/shipping/detail/')) {
      return '/shipping/detail/resets/'
    } else if (location.pathname.includes('viewResets')) {
      return '/viewResets/'
    } else {
      return '/detail/'
    }
  }
  const detailPath = getDetailBasePath()

  const filterTypes = React.useMemo(
    () => ({
      // Use default filter
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Set up default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of rows, page for pagination
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: { pageSize: 5 },
    },
    useFilters,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <Checkbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to render a checkbox
          Cell: ({ row }) => (
            <div>
              <Checkbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
        {
          id: "detail",
          Header: () => <div></div>,
          Cell: ({ row }) => (
            <Link
              to={`${detailPath}${row.cells[1].value}`}
              className="px-6 py-2 text-xs font-medium text-cyan-600 hover:text-cyan-900 tracking-wider cursor-pointer"
            >
              View
            </Link>
          ),
        },
      ])
    }
  )

  // Render UI for table
  return (
    <>
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-200"
      >
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.render("Header")}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, rowIdx) => {
            prepareRow(row)
            return (
              <tr
                {...row.getRowProps(getRowProps(row))}
                className={rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                    >
                      {cell.render("Cell")}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* Bottom Tool Bar */}
      <div
        className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
        aria-label="Bottom Toolbar"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Page <span className="font-medium">{pageIndex + 1}</span> of{" "}
            <span className="font-medium">{pageOptions.length}</span>
          </p>
        </div>

        <div className="flex-1 flex justify-between sm:justify-end">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="relative inline-flex items-center px-4 py-2 hover:bg-gray-200 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
          >
            <ChevronDoubleLeftIcon className="w-5 h-5" aria-hidden="true" />
          </button>

          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="relative inline-flex items-center px-4 py-2 hover:bg-gray-200 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
          >
            <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
          </button>

          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="relative inline-flex items-center px-4 py-2 hover:bg-gray-200 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
          >
            <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
          </button>

          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="relative inline-flex items-center px-4 py-2 hover:bg-gray-200 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
          >
            <ChevronDoubleRightIcon className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  )
}

export default Table