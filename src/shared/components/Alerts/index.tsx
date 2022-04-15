import {AlertBar, AlertStack} from '@dhis2/ui'
import {useAlerts} from "@dhis2/app-runtime";


export default function Alerts() {
    const alerts = useAlerts();

    return (
        <AlertStack>
            {
                alerts?.map(alert => (
                    <AlertBar key={`${alert.id}-alert`}  {...alert} success={alert.options.success}
                              critical={alert.options.critical}
                              onHidden={alert.remove} duration={alert.options.duration}>{alert.message}</AlertBar>
                ))
            }
        </AlertStack>
    )

}
