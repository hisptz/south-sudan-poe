import { Link } from "react-router-dom";
import { Button, IconArrowLeft24 } from '@dhis2/ui'

function Navigate({path,label}:{path:string,label:string}) {
    return (
        <Link to={path}>
            <Button icon={<IconArrowLeft24 />} name="Primary button" value="default">{label}</Button>
        </Link>
    )
}

export default Navigate;