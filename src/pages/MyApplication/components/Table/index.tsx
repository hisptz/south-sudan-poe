import { Table as DTable, TableHead, TableRowHead, TableCellHead, TableBody, TableRow, TableCell, TableFoot, TableFooterButton, Button } from '@dhis2/ui'
import { Link } from 'react-router-dom';
import styles from './Table.module.css'

const Table = () => {


    return (<div>
        <DTable suppressZebraStriping>
            <TableHead>
                <TableRowHead>
                    <TableCellHead>
                        Date
                    </TableCellHead>
                    <TableCellHead>
                        Point of Entry
                    </TableCellHead>
                    <TableCellHead>
                        Actions
                    </TableCellHead>
                </TableRowHead>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>
                        Meti
                    </TableCell>
                    <TableCell>
                        Abiodun
                    </TableCell>
                    <TableCell dense>
                        <Link className={styles["Table-Link"]} to="/profile/123">View</Link>
                        <Link className={styles["Table-Link"]} to="/registration/123">Edit</Link>
                    </TableCell>
                </TableRow>
            </TableBody>
            <TableFoot>
                <TableRow>
                    <TableCell colSpan="8">
                        {/* <TableFooterButton /> */}
                    </TableCell>
                </TableRow>
            </TableFoot>
        </DTable>
    </div>)
}

export default Table;