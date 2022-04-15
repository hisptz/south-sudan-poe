import {IconError24} from '@dhis2/ui'

export default function Error({error, resetErrorBoundary}: { error: any, resetErrorBoundary: () => void }) {

    return (
        <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 8
        }}>

            <div className="icon-64">
                <IconError24/>
            </div>
            <h1 style={{margin: 4}}>Error</h1>
            <p style={{margin: 4}}>
                {(typeof error === "string" ? error : error.message) ?? "Something went wrong."}
            </p>
        </div>
    )
}
