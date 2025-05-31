import React from "react";

export const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
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

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
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

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className = "", ...props }, ref) => {
    return <tbody ref={ref} className={`${className}`} {...props} />;
  }
);
TableBody.displayName = "TableBody";

export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
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

export const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
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

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
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

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
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