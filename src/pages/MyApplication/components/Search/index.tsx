import { Button,InputField } from '@dhis2/ui';
import { useSetRecoilState } from 'recoil';
import { currentSearchedPassportNumberState } from '../../../../core/states/Booking_state';
import styles from './Search.module.css'

import { useBookingPagination} from '../../../../core/hooks/booking.hooks';
import { useState } from 'react';

function Search() {
    let setCurrentSearchedPassportNumberState = useSetRecoilState<string>(currentSearchedPassportNumberState);
    const [searchValue, setSearchValue] = useState<string>('');

   function Search(searchIndex:string){
        setCurrentSearchedPassportNumberState(searchIndex);
    }
    return (
        <div className={styles.container}>
            <InputField 
             value={searchValue}
             onChange={({value}:any) => setSearchValue(value)}
             placeholder={"Passport Number"}
            /> <Button name="Primary button" onClick={()=> Search(searchValue)} primary value="default">Search</Button>
        </div>
    )
}

export default Search;
