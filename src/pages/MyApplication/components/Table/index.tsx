import { Table as DTable, TableHead, TableRowHead, TableCellHead, TableBody, TableRow, TableCell, TableFoot, TableFooterButton } from '@dhis2/ui'


function Table() {


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
                        Onyekachukwu
                    </TableCell>
                    <TableCell>
                        Kariuki
                    </TableCell>
                    <TableCell>
                        Incomplete
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Kwasi
                    </TableCell>
                    <TableCell>
                        Okafor
                    </TableCell>
                    <TableCell>
                        Complete
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Siyabonga
                    </TableCell>
                    <TableCell>
                        Abiodun
                    </TableCell>
                    <TableCell>
                        Incomplete
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Chiyembekezo
                    </TableCell>
                    <TableCell>
                        Okeke
                    </TableCell>
                    <TableCell>
                        Incomplete
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Mtendere
                    </TableCell>
                    <TableCell>
                        Afolayan
                    </TableCell>
                    <TableCell>
                        Complete
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Inyene
                    </TableCell>
                    <TableCell>
                        Okonkwo
                    </TableCell>
                    <TableCell>
                        Complete
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Amaka
                    </TableCell>
                    <TableCell>
                        Pretorius
                    </TableCell>
                    <TableCell>
                        Incomplete
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Meti
                    </TableCell>
                    <TableCell>
                        Abiodun
                    </TableCell>
                    <TableCell>
                        Incomplete
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