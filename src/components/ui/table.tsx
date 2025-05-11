import React from "react";

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <table
        ref={ref}
        className={`w-full caption-bottom text-sm ${className}`}
        {...props}
      />
    );
  }
);
Table.displayName = "Table";

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={`border-b bg-gray-50 dark:bg-slate-800 ${className}`}
        {...props}
      />
    );
  }
);
TableHeader.displayName = "TableHeader";

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className = "", ...props }, ref) => {
    return <tbody ref={ref} className={`${className}`} {...props} />;
  }
);
TableBody.displayName = "TableBody";

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={`border-b transition-colors hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800/50 ${className}`}
        {...props}
      />
    );
  }
);
TableRow.displayName = "TableRow";

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={`h-12 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400 [&:has([role=checkbox])]:pr-0 ${className}`}
        {...props}
      />
    );
  }
);
TableHead.displayName = "TableHead";

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={`px-4 py-3.5 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
        {...props}
      />
    );
  }
);
TableCell.displayName = "TableCell";

interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {}

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <caption
        ref={ref}
        className={`mt-4 text-sm text-gray-500 dark:text-gray-400 ${className}`}
        {...props}
      />
    );
  }
);
TableCaption.displayName = "TableCaption"; 