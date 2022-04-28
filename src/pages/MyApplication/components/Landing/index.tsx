import {IconSearch24} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n';


export default function Landing() {

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 500,
            margin: "auto",
            padding: 16,
            textAlign: "center"
        }}>
            <div className="icon-64">
                <IconSearch24/>
            </div>
            <h3>
                {
                    i18n.t("Enter the passport number above to search for the existing applications")
                }
            </h3>
        </div>
    )
}
