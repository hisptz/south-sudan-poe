import {IconSearch24} from '@dhis2/ui'

export default function Landing() {

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 500,
            width: "100%"
        }}>
            <div className="icon-64">
                <IconSearch24/>
            </div>
            <h3>
                Enter the passport number above to search for the existing applications
            </h3>
        </div>
    )
}
