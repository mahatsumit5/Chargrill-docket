"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Customer, Dietary, OrderItems } from "@prisma/client";
import Image from "next/image";
import { OrderDropDownMenu, UserDropdownMenu } from "../dropdown/DropdownMenu";
import { Title } from "../title/Title";

interface DataTableProps<T> {
  data: T[];
  type: "customer" | "items" | "user" | "order";
}

export function DataTable<T>({ data, type }: DataTableProps<T>) {
  const customerColumns: ColumnDef<T>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    // {
    //   accessorKey: "status",
    //   header: "Status",
    //   cell: ({ row }) => (
    //     <div className="capitalize">{row.getValue("status")}</div>
    //   ),
    // },
    {
      accessorKey: "firstName",
      header: "First Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("firstName")}</div>
      ),
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("lastName")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left"
          >
            Email
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "address",
      header: () => <div className="text-left">Address</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">{row.getValue("address")}</div>
        );
      },
    },
    {
      accessorKey: "city",
      header: () => <div className="text-left">City</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">{row.getValue("city")}</div>
        );
      },
    },
    {
      accessorKey: "country",
      header: () => <div className="text-left">Country</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">{row.getValue("country")}</div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const customer = row.original;
        console.log(customer);
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => {}}>
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const itemColumns: ColumnDef<T>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    // {
    //   accessorKey: "status",
    //   header: "Status",
    //   cell: ({ row }) => (
    //     <div className="capitalize">{row.getValue("status")}</div>
    //   ),
    // },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "dietary",
      header: ({ column }) => {
        return "Dietary";
      },
      cell: ({ row }) => {
        const diet = row.getValue("dietary") as Dietary[];
        console.log(diet.length);
        return (
          <ul className="uppercase flex flex-col list-disc">
            {diet.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        );
      },
    },
    {
      accessorKey: "images",
      header: () => <div className="text-left">Thumbnail</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">
            <Image
              alt=""
              width={250}
              height={250}
              src={row.getValue("images")}
              className="rounded-md "
            />
          </div>
        );
      },
    },
  ];
  const orderColumns: ColumnDef<T>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    // {
    //   accessorKey: "id",
    //   header: "ID",
    //   cell: ({ row }) => (
    //     <div className=" break-words">
    //       {(row.getValue("id") as string).slice(0, 4)}
    //     </div>
    //   ),
    // },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      accessorKey: "customer",
      header: "Full Name",
      cell: ({ row }) => {
        const customer: Customer = row.getValue("customer");
        return (
          <div className="capitalize w-fit ">
            {customer.firstName} {customer.lastName}
          </div>
        );
      },
    },
    // {
    //   accessorKey: "customer",
    //   header: "Email",
    //   cell: ({ row }) => {
    //     const customer: Customer = row.getValue("customer");
    //     return <div className="">{customer.email}</div>;
    //   },
    // },
    // {
    //   accessorKey: "customer",
    //   header: "Phone",
    //   cell: ({ row }) => {
    //     const customer: Customer = row.getValue("customer");
    //     return <div className="capitalize">{customer.phone}</div>;
    //   },
    // },
    {
      accessorKey: "totalAmount",

      header: "Total",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("totalAmount")}</div>
      ),
    },
    {
      accessorKey: "pickupTime",
      header: "Order Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("pickupTime"));
        const orderDate = date.toLocaleDateString();
        const time = date.toLocaleTimeString();
        return <div className="capitalize">{orderDate}</div>;
      },
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("paymentStatus")}</div>
      ),
    },
    {
      accessorKey: "cartItems",
      header: "Items",
      cell: ({ row }) => {
        const items: OrderItems[] = row.getValue("cartItems");
        return <div className="capitalize">{items.length}</div>;
      },
    },
  ];

  function getColumns(): ColumnDef<T>[] {
    switch (type) {
      case "customer":
        return customerColumns;
      case "items":
        return itemColumns;
      case "order":
        return orderColumns;
      default:
        return itemColumns;
    }
  }

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns: getColumns(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const UserHeader = () => {
    return (
      <div className="flex  justify-between items-center py-4 w-full ">
        <div className=" w-full">
          <Title title="All Users" />
        </div>
        <div className="flex gap-2 w-full justify-end">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-secondary sm:h-8 hidden md:block"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="border">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <UserDropdownMenu />
        </div>
      </div>
    );
  };
  const OrderHeader = () => {
    return (
      <div className="flex  justify-between items-center py-4 w-full  ">
        <div className=" w-full">
          <Title title="All Orders" />
        </div>
        <div className="flex gap-2 w-full justify-start sm:justify-end">
          <Input
            placeholder="Search your order id"
            value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("id")?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-secondary sm:h-8 hidden md:block "
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="border">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          <OrderDropDownMenu />
        </div>
      </div>
    );
  };
  function getHeaders(): React.ReactNode {
    switch (type) {
      case "customer":
        return UserHeader();
      case "items":
        return UserHeader();
      case "order":
        return OrderHeader();
      default:
        return UserHeader();
    }
  }
  return (
    <div className="w-full">
      {/* Header */}

      {getHeaders()}
      {/*  */}
      <div className="overflow-hidden rounded-md shadow-black border  ">
        <Table className="rounded-md ">
          <TableHeader className="border-none">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={customerColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {/*  */}
    </div>
  );
}
