import {CircularLoader} from '@dhis2/ui'

export default function Loader({...props}) {


    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
            }}
        ><CircularLoader {...props} /></div>
    )
}
