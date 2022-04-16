import {
    CircularLoader,
    Pagination,
    Table as DTable,
    TableBody,
    TableCell,
    TableCellHead,
    TableFoot,
    TableHead,
    TableRow,
    TableRowHead
} from '@dhis2/ui'
import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import {Booking, BookingTableData} from '../../../../core/models/Booking.model';
import styles from './Table.module.css'
import NoResults from "../NoResults";
import {useRecoilState, useRecoilValueLoadable} from "recoil";
import {bookingPaginationSelector, bookingTableList} from "../../../../core/states/Booking_state";
import Loader from "../../../../shared/components/Loader";

const Table = () => {
    const [pagination, setPagination] = useRecoilState(bookingPaginationSelector);
    const data = useRecoilValueLoadable(bookingTableList);

    const dataLoading = data.state === "loading";

    const onPageChange = (newPage: any) => {
        setPagination((prevState: any) => ({
            ...prevState,
            page: newPage
        }))
    };

    const tableData = useMemo(
        () => {
            if (data.state === "hasValue") {
                return Booking.getTableData(data.contents);
            }
            return [];
        },
        [data]
    );

    if (data.state === "hasError") {
        return <div>{data.contents.toString()}</div>
    }

    if (data.state === "hasValue" && data.contents.length === 0) {
        return <NoResults/>
    }


    return (<div style={{padding: 16}}>
        <React.Suspense fallback={<Loader/>}>
            <DTable suppressZebraStriping>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead>
                            S/n
                        </TableCellHead>
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
                {
                    dataLoading ? <>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={12}>
                                    <div style={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        minHeight: 500
                                    }}>
                                        <CircularLoader small/>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </> : <TableBody>
                        {tableData?.map((booking: BookingTableData, index: number) => {
                            let profileLink: string = /profile/ + booking.id;
                            let RegistrationLink: string = /registration/ + booking.id;
                            const newTo = {
                                pathname: profileLink,
                                canbeEdited: index !== 0
                            };
                            return <TableRow key={index + "booking-table-key"}>
                                <TableCell>
                                    {booking.position}
                                </TableCell>
                                <TableCell>
                                    {booking.date}
                                </TableCell>
                                <TableCell>
                                    {booking.poe}
                                </TableCell>
                                <TableCell dense>
                                    <Link className={styles["Table-Link"]} to={newTo}>View</Link>
                                    <Link hidden={index !== 0}
                                          className={styles["Table-Link"]} to={RegistrationLink}>Edit</Link>
                                </TableCell>
                            </TableRow>

                        })}

                    </TableBody>
                }
                <TableFoot>
                    <TableRow>
                        <TableCell colSpan="12"
                        >
                            {pagination && <Pagination
                                hidePageSizeSelect
                                {...pagination}
                                onPageChange={onPageChange}
                                onPageSizeChange={() => {
                                }}
                            />}
                        </TableCell>
                    </TableRow>
                </TableFoot>
            </DTable>
        </React.Suspense>

    </div>)

}

export default Table;
