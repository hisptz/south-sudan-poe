import { Button, IconArrowLeft24 } from '@dhis2/ui';
import { useSetRecoilState } from 'recoil';
import { currentSearchedPassportNumberState } from '../../../../core/states/Booking_state';
import styles from './Search.module.css'

import { useBookingPagination} from '../../../../core/hooks/booking.hooks';

function Search() {
    let setCurrentSearchedPassportNumberState = useSetRecoilState<string>(currentSearchedPassportNumberState);
    useBookingPagination()
   function Search(searchIndex:string){
        setCurrentSearchedPassportNumberState(searchIndex);
    }
    return (
        <div className={styles.container}>
            <input  id="searchInPut" placeholder='Passport Number' /> <Button onClick={()=>{
let inputSearchIndex:string = document.getElementById("searchInPut").value as string;
                               if(inputSearchIndex.length>0){
                                return  Search(inputSearchIndex)
                               }

            }} name="Primary button" primary value="default">Search</Button>
        </div>
    )
}

export default Search;

