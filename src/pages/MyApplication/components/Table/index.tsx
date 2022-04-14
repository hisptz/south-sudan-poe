import { Table as DTable, TableHead, TableRowHead, TableCellHead, TableBody, TableRow, TableCell, TableFoot, TableFooterButton, Button ,Pagination} from '@dhis2/ui'
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Booking, BookingTableData } from '../../../../core/models/Booking.model';
import { bookingTableList } from '../../../../core/states/Booking_state';
import styles from './Table.module.css'

const Table = () => {

  const [page, setPage] = useState(0);
    const onPageChange = (newPage:any) => {
    setPage(newPage - 1);
  };


    
        let setBookingTableList = useRecoilValue<Booking[]>(bookingTableList);

  let bookingTableData:BookingTableData[] =   Booking.getTableData(setBookingTableList)
   
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
             {bookingTableData?.map((booking:BookingTableData, index:number) => {
                 let profileLink: string  = /profile/ + booking.id;
                 let RegistrationLink: string  = /registration/ + booking.id;
                    return   <TableRow key={index}>
                        <TableCell>
                            {booking.date}
                            </TableCell>
                            <TableCell>
                            {booking.poe}
                            </TableCell>
                            <TableCell dense>
                        <Link className={styles["Table-Link"]} to={profileLink}>View</Link>
                        <Link hidden={index !== 0 ?true :false}
                        className={styles["Table-Link"]} to={RegistrationLink}>Edit</Link>
                    </TableCell>
                            </TableRow>
                    
             }) }

            </TableBody>
            <TableFoot >
                <TableRow>
                    <TableCell colSpan="12"           
>
          <Pagination
            hidePageSizeSelect
            total={bookingTableData.length}
            pageCount={10}
            pageSize={10}
            page={page + 1}
            onPageChange={onPageChange}
            onPageSizeChange={() => {}}
          />
                    </TableCell>
                </TableRow>
            </TableFoot>
        </DTable>
    </div>)
}

export default Table;