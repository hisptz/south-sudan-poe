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
    TableRowHead,
} from "@dhis2/ui";
import React, {useEffect, useMemo} from "react";
import {Link} from "react-router-dom";
import {Booking, BookingTableData} from "../../../../core/models/Booking.model";
import styles from "./Table.module.css";
import NoResults from "../NoResults";
import {useRecoilValueLoadable, useResetRecoilState, useSetRecoilState,} from "recoil";
import {
    bookingPaginationSelector,
    bookingTableList,
    currentSearchedPassportNumberState,
    expiredBooking,
} from "../../../../core/states/Booking_state";
import Loader from "../../../../shared/components/Loader";
import {useAlert} from "@dhis2/app-runtime";

const Table = () => {
    const {state: paginationState, contents: paginationContent} = useRecoilValueLoadable(
        bookingPaginationSelector
    );
    const {state, contents: expiredContent} = useRecoilValueLoadable(expiredBooking);
    const setPagination = useSetRecoilState(bookingPaginationSelector);
    const resetSearch = useResetRecoilState(currentSearchedPassportNumberState);
    const data = useRecoilValueLoadable(bookingTableList);

    const dataLoading = data.state === "loading";
    const paginationLoading = paginationState === "loading";
    const {show, hide} = useAlert(
        ({message}) => message,
        ({type}) => ({...type, duration: 3000})
    );
    const onPageChange = (newPage: any) => {
        setPagination((prevState: any) => ({
            ...prevState,
            page: newPage,
        }));
    };

    const tableData = useMemo(() => {
        if (data.state === "hasValue") {
            return Booking.getTableData(data.contents);
        }
        return [];
    }, [data]);

    useEffect(() => {
        if (data.state === "hasError" || paginationState === "hasError") {
            resetSearch();
            show({
                message: data.state === "hasError" ? `${data.contents}` : paginationContent,
                type: {
                    critical: true,
                },
            });

            setTimeout(() => {
                hide();
            }, 3000);
        }
    }, [data.state, paginationState]);

    if (data.state === "hasValue" && data.contents.length === 0) {
        return <NoResults/>;
    }

    const pagination = paginationContent;

    return (
        <div>
            <React.Suspense fallback={<Loader/>}>
                <DTable suppressZebraStriping>
                    <TableHead>
                        <TableRowHead>
                            <TableCellHead>S/n</TableCellHead>
                            <TableCellHead>Date</TableCellHead>
                            <TableCellHead>Point of Entry</TableCellHead>
                            <TableCellHead>Actions</TableCellHead>
                        </TableRowHead>
                    </TableHead>
                    {dataLoading ? (
                        <>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={12}>
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                minHeight: 500,
                                            }}
                                        >
                                            <CircularLoader small/>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </>
                    ) : (
                        <TableBody>
                            {tableData?.map((booking: BookingTableData, index: number) => {
                                let profileLink: string = /profile/ + booking.id;
                                let RegistrationLink: string = /registration/ + booking.id;
                                const newTo = {
                                    pathname: profileLink,
                                    canbeEdited: index !== 0,
                                };
                                return (
                                    <TableRow key={index + "booking-table-key"}>
                                        <TableCell>{booking.position}</TableCell>
                                        <TableCell>{booking.date}</TableCell>
                                        <TableCell>{booking.poe}</TableCell>
                                        {!expiredContent?.expired ? (
                                            <TableCell dense>
                                                <Link
                                                    className={styles["Table-Link"]}
                                                    to={newTo}
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    hidden={index !== 0}
                                                    className={styles["Table-Link"]}
                                                    to={RegistrationLink}
                                                >
                                                    Edit
                                                </Link>
                                            </TableCell>
                                        ) : (
                                            <TableCell dense></TableCell>
                                        )}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    )}
                    <TableFoot>
                        <TableRow>
                            <TableCell colSpan="12">
                                {pagination && (
                                    <Pagination
                                        hidePageSizeSelect
                                        {...pagination}
                                        onPageChange={onPageChange}
                                        onPageSizeChange={() => {
                                        }}
                                    />
                                )}
                            </TableCell>
                        </TableRow>
                    </TableFoot>
                </DTable>
            </React.Suspense>
        </div>
    );
};

export default Table;
